// app/api/auth/[...nextauth]/options.js
import CredentialsProvider from "next-auth/providers/credentials";
import { executeQuery } from '@/lib/db';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          // Get user from database
          const query = `
            SELECT id, name, email, password_hash, avatar
            FROM users
            WHERE email = @param0
          `;

          const users = await executeQuery(query, [credentials.email]);
          
          if (!users || users.length === 0) {
            return null;
          }

          const user = users[0];
          
          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password_hash
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            avatar: user.avatar
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.avatar = user.avatar;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.avatar = token.avatar;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  }
};