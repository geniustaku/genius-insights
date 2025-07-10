# 🔥 Firebase Quick Setup Guide

## Step 1: Manual Firebase Project Creation

Since we can't create projects via CLI in this environment, please follow these steps:

### 1.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Project name: `genius-sa-tools` (or your preferred name)
4. Enable Google Analytics: Yes (recommended)
5. Choose Analytics location: South Africa or nearest
6. Click "Create project"

### 1.2 Set up Firestore Database
1. In Firebase console → "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" 
4. Select location: `eur3 (europe-west)` or closest to South Africa
5. Click "Done"

### 1.3 Get Firebase Configuration
1. In Firebase console → Project Settings (gear icon)
2. Scroll to "Your apps" → Click web icon `</>`
3. App nickname: `genius-web-app`
4. Check "Also set up Firebase Hosting"
5. Copy the config object

## Step 2: Configure Your App

### 2.1 Create Environment File
Create `.env.local` with your Firebase config:

```bash
# Replace with your actual Firebase config values
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ABC123DEF4

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-generate-random
```

### 2.2 Login to Firebase CLI
```bash
firebase login
```

### 2.3 Initialize Firebase in Your Project
```bash
cd /Users/genius/genius
firebase init
```

Choose:
- ✅ Firestore: Configure security rules and indexes files
- ✅ Hosting: Configure files for Firebase Hosting
- Select your project from the list
- Use existing files (firebase.json, firestore.rules, firestore.indexes.json)

## Step 3: Deploy and Test

### 3.1 Initialize Sample Data
```bash
node scripts/init-firestore.js
```

### 3.2 Test Your App
```bash
npm run dev
```

### 3.3 Deploy Firestore Rules
```bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

## Step 4: Verify Everything Works

1. ✅ App runs without SQL errors
2. ✅ Articles load from Firestore
3. ✅ Categories display correctly
4. ✅ No console errors

## Quick Commands Reference

```bash
# Start development server
npm run dev

# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy to Firebase Hosting
npm run build
npm run export
firebase deploy --only hosting

# Start Firestore emulator (for local development)
firebase emulators:start --only firestore
```

## 🚨 Important Notes

1. **Security Rules**: Currently in test mode - secure them for production
2. **Environment Variables**: Never commit `.env.local` to git
3. **Data Migration**: You'll need to migrate existing SQL data manually
4. **Billing**: Firebase has free tier, but monitor usage

## 🎯 What's Already Set Up

- ✅ Firebase configuration files
- ✅ Firestore security rules
- ✅ Database indexes for optimal queries
- ✅ Sample data initialization script
- ✅ All SQL queries converted to Firestore
- ✅ TypeScript interfaces updated
- ✅ SQL dependencies removed

Your app is ready for Firebase! Just complete the manual setup steps above. 🚀