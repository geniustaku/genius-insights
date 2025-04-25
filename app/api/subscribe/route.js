// app/api/subscribe/route.js
import { executeQuery } from '@/lib/db';

export async function POST(request) {
  try {
    const { email, name, interests, source } = await request.json();
    
    if (!email || !email.includes('@')) {
      return Response.json(
        { error: 'invalid_email', message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    
    // Check if the email already exists
    const checkQuery = `
      SELECT id FROM subscribers WHERE email = @param0
    `;
    
    const existingSubscribers = await executeQuery(checkQuery, [email]);
    
    if (existingSubscribers.length > 0) {
      return Response.json(
        { error: 'already_subscribed', message: 'This email is already subscribed' },
        { status: 400 }
      );
    }
    
    // Insert new subscriber
    const interestsArray = interests || [];
    const formattedInterests = interestsArray.join(',');
    const timestamp = new Date().toISOString();
    
    const insertQuery = `
      INSERT INTO subscribers (
        email, 
        name, 
        interests, 
        source, 
        status, 
        created_at, 
        updated_at
      ) VALUES (
        @param0, 
        @param1, 
        @param2, 
        @param3, 
        @param4, 
        @param5, 
        @param6
      )
    `;
    
    await executeQuery(insertQuery, [
      email,
      name || null,
      formattedInterests || null,
      source || null,
      'active',
      timestamp,
      timestamp
    ]);
    
    // Queue welcome email (would connect to email service)
    await sendWelcomeEmail(email, name);
    
    return Response.json({
      success: true,
      message: 'Successfully subscribed'
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