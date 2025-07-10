// scripts/init-firestore.js
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, Timestamp } = require('firebase/firestore');

// Firebase config for genius-sa-tools
const firebaseConfig = {
  apiKey: "AIzaSyBa1btWkbw2CPmxQ9D-ruw6fzw1EC629fE",
  authDomain: "genius-sa-tools.firebaseapp.com",
  projectId: "genius-sa-tools",
  storageBucket: "genius-sa-tools.firebasestorage.app",
  messagingSenderId: "216840912866",
  appId: "1:216840912866:web:ae24f91f0979aaef1f03bb",
  measurementId: "G-5HP57NKK9Y"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleCategories = [
  {
    name: "Tax & SARS",
    slug: "tax-sars",
    description: "SARS tax information, eFiling guides, and tax compliance"
  },
  {
    name: "Business",
    slug: "business", 
    description: "Business registration, CIPC, and compliance guides"
  },
  {
    name: "Property",
    slug: "property",
    description: "Property investment, transfer, and rental guides"
  },
  {
    name: "Insurance",
    slug: "insurance",
    description: "Insurance comparisons and guides for South Africa"
  },
  {
    name: "Banking",
    slug: "banking",
    description: "Banking guides and account setup procedures"
  }
];

const sampleArticles = [
  {
    title: "How to Register for SARS eFiling",
    slug: "sars-efiling-registration",
    excerpt: "Complete step-by-step guide to register for SARS eFiling, submit tax returns, and manage your tax profile online.",
    content: `<h2>SARS eFiling Registration Guide</h2>
    <p>This comprehensive guide will walk you through the process of registering for SARS eFiling...</p>
    <h3>Required Documents</h3>
    <ul>
    <li>South African ID document</li>
    <li>Banking details</li>
    <li>Contact information</li>
    </ul>`,
    category: "Tax & SARS",
    author: "Tax Expert",
    published_at: Timestamp.now(),
    is_published: true,
    reading_time: 8,
    featured_image: "https://via.placeholder.com/800x400?text=SARS+eFiling"
  },
  {
    title: "Register a Company with CIPC",
    slug: "cipc-company-registration",
    excerpt: "Complete guide to registering your company with the Companies and Intellectual Property Commission (CIPC).",
    content: `<h2>CIPC Company Registration</h2>
    <p>Learn how to register your company with CIPC step by step...</p>
    <h3>Required Forms</h3>
    <ul>
    <li>CoR 14.1 form</li>
    <li>Memorandum of Incorporation</li>
    <li>Registration fees</li>
    </ul>`,
    category: "Business",
    author: "Business Expert", 
    published_at: Timestamp.now(),
    is_published: true,
    reading_time: 12,
    featured_image: "https://via.placeholder.com/800x400?text=CIPC+Registration"
  },
  {
    title: "Property Transfer Process in South Africa",
    slug: "property-transfer-guide",
    excerpt: "Complete guide to transferring property ownership in South Africa, including transfer duty and legal requirements.",
    content: `<h2>Property Transfer Process</h2>
    <p>Everything you need to know about property transfers in South Africa...</p>
    <h3>Transfer Duty Calculator</h3>
    <p>Use our calculator to determine your transfer duty costs...</p>`,
    category: "Property",
    author: "Property Expert",
    published_at: Timestamp.now(),
    is_published: true,
    reading_time: 15,
    featured_image: "https://via.placeholder.com/800x400?text=Property+Transfer"
  },
  {
    title: "Medical Aid vs Health Insurance in South Africa",
    slug: "medical-aid-vs-insurance",
    excerpt: "Understanding the difference between medical aid schemes and health insurance in South Africa.",
    content: `<h2>Medical Aid vs Health Insurance</h2>
    <p>Learn the key differences between medical aid and health insurance...</p>
    <h3>Medical Schemes</h3>
    <p>Medical schemes are regulated by the Council for Medical Schemes...</p>`,
    category: "Insurance",
    author: "Insurance Expert",
    published_at: Timestamp.now(),
    is_published: true,
    reading_time: 10,
    featured_image: "https://via.placeholder.com/800x400?text=Medical+Aid"
  },
  {
    title: "How to Open a Bank Account in South Africa",
    slug: "open-bank-account-guide",
    excerpt: "Requirements and process for opening different types of bank accounts with major South African banks.",
    content: `<h2>Opening a Bank Account in SA</h2>
    <p>Complete guide to opening bank accounts in South Africa...</p>
    <h3>FICA Requirements</h3>
    <p>All banks must comply with FICA regulations...</p>`,
    category: "Banking",
    author: "Banking Expert",
    published_at: Timestamp.now(),
    is_published: true,
    reading_time: 7,
    featured_image: "https://via.placeholder.com/800x400?text=Bank+Account"
  }
];

async function initializeFirestore() {
  try {
    console.log('Initializing Firestore with sample data...');
    
    // Add categories
    console.log('Adding categories...');
    for (const category of sampleCategories) {
      const docRef = await addDoc(collection(db, 'categories'), category);
      console.log(`Category added with ID: ${docRef.id}`);
    }
    
    // Add articles
    console.log('Adding articles...');
    for (const article of sampleArticles) {
      const docRef = await addDoc(collection(db, 'articles'), article);
      console.log(`Article added with ID: ${docRef.id}`);
    }
    
    console.log('Firestore initialization complete!');
  } catch (error) {
    console.error('Error initializing Firestore:', error);
  }
}

if (require.main === module) {
  initializeFirestore();
}

module.exports = { initializeFirestore };