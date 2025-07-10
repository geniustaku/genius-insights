// app/api/subscribe-firestore/route.js
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';

export async function POST(request) {
  try {
    const { email, name, interests, source, countryInterest, industryInterest } = await request.json();
    
    if (!email || !email.includes('@')) {
      return Response.json(
        { error: 'invalid_email', message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    
    // Check if the email already exists
    const subscribersRef = collection(db, 'subscribers');
    const q = query(subscribersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return Response.json(
        { error: 'already_subscribed', message: 'This email is already subscribed' },
        { status: 400 }
      );
    }
    
    // Prepare subscriber data
    const subscriberData = {
      email,
      name: name || null,
      interests: interests || [],
      countryInterest: countryInterest || null,
      industryInterest: industryInterest || null,
      source: source || 'newsletter_signup',
      status: 'active',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    // Add new subscriber to Firestore
    const docRef = await addDoc(subscribersRef, subscriberData);
    
    // Queue welcome email (would connect to email service)
    await sendWelcomeEmail(email, name);
    
    return Response.json({
      success: true,
      message: 'Successfully subscribed',
      subscriberId: docRef.id
    });
    
  } catch (error) {
    console.error('Subscription error:', error);
    
    return Response.json(
      { error: 'server_error', message: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}

// Helper function to send welcome email
async function sendWelcomeEmail(email, name) {
  // In production, this would connect to your email service provider
  // such as SendGrid, Mailchimp, Amazon SES, etc.
  
  try {
    // Example with a hypothetical email service
    /*
    const response = await fetch('https://api.your-email-service.com/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.EMAIL_API_KEY}`
      },
      body: JSON.stringify({
        to: email,
        template_id: 'welcome-template',
        dynamic_template_data: {
          name: name || 'there',
          current_year: new Date().getFullYear()
        }
      })
    });
    
    if (!response.ok) {
      throw new Error('Email service failed');
    }
    */
    
    // For now, just log that we would send an email
    console.log(`[EMAIL] Welcome email queued for ${email}`);
    
    return true;
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    // Don't fail the subscription if email sending fails
    return false;
  }
}