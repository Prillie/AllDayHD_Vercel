/**
 * Newsletter Confirmation Endpoint
 * Handles double opt-in confirmation from Brevo email links
 * 
 * This endpoint is called when users click the confirmation link in their email.
 * Brevo will redirect here with a token parameter.
 */

export default async function handler(req, res) {
  // Handle GET requests (from email confirmation link)
  if (req.method === 'GET') {
    const { token, email } = req.query;

    // If no token/email, show a generic confirmation page
    if (!token && !email) {
      return res.redirect(302, '/newsletter-confirmed.html');
    }

    // Brevo handles the actual confirmation on their end
    // We just need to redirect to a success page
    // The token/email params are for tracking if needed
    return res.redirect(302, '/newsletter-confirmed.html');
  }

  // Handle POST requests (if needed for manual confirmation)
  if (req.method === 'POST') {
    try {
      const { email, token } = req.body;

      if (!email) {
        return res.status(400).json({ 
          error: 'Email is required' 
        });
      }

      const brevoApiKey = process.env.BREVO_API_KEY;

      if (!brevoApiKey) {
        return res.status(500).json({ 
          error: 'Server configuration error' 
        });
      }

      // Get contact info to verify status
      const contactResponse = await fetch(
        `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'api-key': brevoApiKey
          }
        }
      );

      if (contactResponse.ok) {
        return res.status(200).json({ 
          success: true,
          message: 'Subscription confirmed successfully'
        });
      }

      return res.status(404).json({ 
        error: 'Contact not found' 
      });

    } catch (error) {
      console.error('Confirmation error:', error);
      return res.status(500).json({ 
        error: 'An unexpected error occurred' 
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

