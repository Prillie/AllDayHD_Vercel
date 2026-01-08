/**
 * Newsletter Subscription API Endpoint
 * Handles double opt-in newsletter signups via Brevo (formerly Sendinblue)
 * 
 * Environment Variables Required:
 * - BREVO_API_KEY: Your Brevo API key
 * - BREVO_LIST_ID: Your Brevo contact list ID
 * - SITE_URL: Your site URL (e.g., https://yourdomain.com)
 */

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, goal, 'age-verification': ageVerification } = req.body;

    // Validate required fields
    if (!email || !name) {
      return res.status(400).json({ 
        error: 'Name and email are required' 
      });
    }

    if (!ageVerification) {
      return res.status(400).json({ 
        error: 'Age verification is required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format' 
      });
    }

    // Get environment variables
    const brevoApiKey = process.env.BREVO_API_KEY;
    const brevoListId = process.env.BREVO_LIST_ID;
    const siteUrl = process.env.SITE_URL || process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'https://yourdomain.com';

    if (!brevoApiKey) {
      console.error('BREVO_API_KEY is not set');
      return res.status(500).json({ 
        error: 'Server configuration error' 
      });
    }

    if (!brevoListId) {
      console.error('BREVO_LIST_ID is not set');
      return res.status(500).json({ 
        error: 'Server configuration error' 
      });
    }

    // Prepare contact data for Brevo
    const contactData = {
      email: email,
      attributes: {
        FIRSTNAME: name.split(' ')[0] || name,
        LASTNAME: name.split(' ').slice(1).join(' ') || '',
        GOAL: goal || '',
        SIGNUP_DATE: new Date().toISOString(),
        SOURCE: 'Website Newsletter Form'
      },
      listIds: [parseInt(brevoListId)],
      emailBlacklisted: false,
      smsBlacklisted: false,
      updateEnabled: true
    };

    // Create or update contact in Brevo with double opt-in
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': brevoApiKey
      },
      body: JSON.stringify(contactData)
    });

    const brevoData = await brevoResponse.json();

    // Handle Brevo API responses
    if (!brevoResponse.ok) {
      // If contact already exists, that's okay - Brevo will send confirmation email
      if (brevoResponse.status === 400 && brevoData.code === 'duplicate_parameter') {
        // Update existing contact and resend double opt-in email
        const updateResponse = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': brevoApiKey
          },
          body: JSON.stringify({
            attributes: contactData.attributes,
            listIds: [parseInt(brevoListId)],
            emailBlacklisted: false
          })
        });

        if (!updateResponse.ok) {
          console.error('Brevo update error:', await updateResponse.text());
          return res.status(500).json({ 
            error: 'Failed to process subscription. Please try again.' 
          });
        }

        // Resend double opt-in email
        await fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': brevoApiKey
          },
          body: JSON.stringify({
            email: email
          })
        });

        return res.status(200).json({ 
          success: true,
          message: 'Please check your email to confirm your subscription.'
        });
      }

      console.error('Brevo API error:', brevoData);
      return res.status(500).json({ 
        error: 'Failed to process subscription. Please try again later.' 
      });
    }

    // Success - Brevo will automatically send double opt-in email
    return res.status(200).json({ 
      success: true,
      message: 'Please check your email to confirm your subscription.'
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({ 
      error: 'An unexpected error occurred. Please try again later.' 
    });
  }
}

