// app/api/auth/register/route.js
import { executeQuery } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    
    // Validate input
    if (!name || !email || !password) {
      return Response.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    if (password.length < 8) {
      return Response.json(
        { message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    const checkQuery = `
      SELECT id FROM users WHERE email = @param0
    `;
    
    const existingUsers = await executeQuery(checkQuery, [email]);
    
    if (existingUsers && existingUsers.length > 0) {
      return Response.json(
        { message: 'Email already in use' },
        { status: 400 }
      );
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create the user
    const timestamp = new Date().toISOString();
    
    const insertQuery = `
      INSERT INTO users (
        name,
        email,
        password_hash,
        created_at,
        updated_at
      ) VALUES (
        @param0,
        @param1,
        @param2,
        @param3,
        @param4
      );
      SELECT SCOPE_IDENTITY() AS id;
    `;
    
    const result = await executeQuery(insertQuery, [
      name,
      email,
      hashedPassword,
      timestamp,
      timestamp
    ]);
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json(
      { message: 'Failed to register user' },
      { status: 500 }
    );
  }
}