# Firebase Setup - Quick Start for Team

## 🎯 Purpose
This document helps your team connect their Next.js app to the **genius-sa-tools** Firebase project, sharing the same database, storage, and authentication.

---

## ⚡ Quick Setup (5 Minutes)

### Step 1: Copy Environment Variables

Create `.env.local` in your project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBa1btWkbw2CPmxQ9D-ruw6fzw1EC629fE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=genius-sa-tools.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=genius-sa-tools
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=genius-sa-tools.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=216840912866
NEXT_PUBLIC_FIREBASE_APP_ID=1:216840912866:web:ae24f91f0979aaef1f03bb
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-5HP57NKK9Y
```

### Step 2: Install Firebase

```bash
npm install firebase
```

### Step 3: Create Firebase Config File

Create `lib/firebase.ts`:

```typescript
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
```

### Step 4: Use Firebase in Your App

```typescript
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Fetch articles
const articlesRef = collection(db, 'articles');
const snapshot = await getDocs(articlesRef);
```

---

## 📚 Full Documentation

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for:
- Detailed setup instructions
- All Firebase services (Firestore, Auth, Storage, Analytics)
- Database schema and collection structures
- Security rules
- Complete usage examples
- Troubleshooting guide

---

## 🗄️ Shared Collections

Your app will have access to these collections:

### **articles**
- 13+ articles about tech, finance, business in Africa
- Fields: title, content, category, author, seo_keywords, etc.

### **analytics**
- Page views and event tracking
- Fields: event_type, page_path, timestamp, etc.

### **subscribers**
- Newsletter subscribers
- Fields: email, subscribed_at, is_active

---

## ⚠️ Important Notes

1. **Same Database:** You'll be using the SAME Firestore database as the main app
2. **Shared Data:** All apps see and can modify the same data
3. **Security Rules:** Write access requires authentication
4. **Test First:** Use a test environment before modifying production data

---

## 🔗 Useful Links

- Firebase Console: https://console.firebase.google.com/project/genius-sa-tools
- Firebase Docs: https://firebase.google.com/docs/web/setup
- Firestore Docs: https://firebase.google.com/docs/firestore

---

## 🆘 Need Help?

1. Check [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed examples
2. Review Firebase Console for data structure
3. Contact the team lead

---

**Project:** genius-sa-tools
**Last Updated:** January 2025
