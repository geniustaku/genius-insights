# Firebase Setup Guide

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "genius-sa-tools")
4. Choose whether to enable Google Analytics
5. Click "Create project"

## 2. Set up Firestore Database

1. In your Firebase console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (you can secure it later)
4. Select a location close to your users (e.g., "eur3" for Europe)
5. Click "Done"

## 3. Get Firebase Configuration

1. In your Firebase console, click the gear icon ⚙️ → "Project settings"
2. Scroll down to "Your apps" section
3. Click the web icon `</>` to add a web app
4. Register your app with a nickname (e.g., "genius-web-app")
5. Copy the Firebase configuration object

## 4. Set up Environment Variables

Create a `.env.local` file in your project root with your Firebase config:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ABC123DEF4

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

## 5. Set up Firestore Collections

### Articles Collection Structure:
```javascript
// Collection: articles
{
  id: "auto-generated-id",
  title: "Article Title",
  slug: "article-title",
  excerpt: "Brief description...",
  content: "Full article content...",
  category: "Tax & SARS",
  author: "Author Name",
  published_at: Timestamp,
  is_published: true,
  reading_time: 5,
  featured_image: "https://example.com/image.jpg"
}
```

### Categories Collection Structure:
```javascript
// Collection: categories
{
  id: "auto-generated-id",
  name: "Tax & SARS",
  slug: "tax-sars",
  description: "Tax and SARS related articles"
}
```

## 6. Sample Data

Add some sample data to test your setup:

### Sample Categories:
1. **Tax & SARS**
   - name: "Tax & SARS"
   - slug: "tax-sars"
   - description: "SARS tax information and procedures"

2. **Business**
   - name: "Business"
   - slug: "business"
   - description: "Business registration and compliance"

3. **Property**
   - name: "Property"
   - slug: "property" 
   - description: "Property investment and transfer guides"

### Sample Articles:
1. **SARS eFiling Registration**
   - title: "How to Register for SARS eFiling"
   - slug: "sars-efiling-registration"
   - category: "Tax & SARS"
   - is_published: true
   - published_at: Current timestamp

## 7. Security Rules (Optional)

Update Firestore security rules for production:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to published articles
    match /articles/{articleId} {
      allow read: if resource.data.is_published == true;
      allow write: if request.auth != null; // Only authenticated users can write
    }
    
    // Allow read access to categories
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users can write
    }
  }
}
```

## 8. Test Your Setup

Run your application:
```bash
npm run dev
```

Your app should now use Firestore instead of SQL Server!

## Migration Notes

- ✅ Firebase configuration created
- ✅ All SQL queries converted to Firestore
- ✅ Type definitions updated
- ✅ SQL dependencies removed
- ⚠️ You need to migrate your existing data to Firestore
- ⚠️ Update your environment variables
- ⚠️ Test all functionality