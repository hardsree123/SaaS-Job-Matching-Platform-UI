/**
 * Vercel Serverless Function: Secure Lead Dispatcher
 * Route: POST /api/lead
 *
 * This function runs securely on the server-side in Vercel.
 * It reads non-prefixed environment variables (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID)
 * so that secrets are NEVER exposed in the client-side JavaScript bundle or browser.
 */

export default async function handler(req: any, res: any) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const lead = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const {
      planName,
      priceAmount,
      billingCycle,
      name,
      email,
      phone,
      company,
      targetDomain,
      submittedAt,
    } = lead;

    // Secure server-side environment variables (no VITE_ prefix, invisible to browser)
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;

    const formattedHtmlMessage = [
      `🔔 <b>NEW DIBSMATCH ORGANIZATION LEAD</b>`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `📋 <b>Plan:</b> ${planName || 'Pro'} Edition`,
      `💳 <b>Investment:</b> ${priceAmount || 'N/A'} (${(billingCycle || 'annual').toUpperCase()} Term)`,
      `👤 <b>Contact Name:</b> ${name || 'N/A'}`,
      `📧 <b>Work Email:</b> ${email || 'N/A'}`,
      `📞 <b>Call Back Phone:</b> ${phone || 'N/A'}`,
      `🏢 <b>Organization:</b> ${company || 'N/A'}`,
      targetDomain ? `🌐 <b>Desired Domain:</b> ${targetDomain}` : null,
      `⏰ <b>Submitted At:</b> ${submittedAt || new Date().toLocaleString()}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `⚡ <i>Secure serverless dispatch via Vercel Edge API</i>`,
    ]
      .filter(Boolean)
      .join('\n');

    let telegramSent = false;

    // 1. Dispatch to Telegram Bot API server-side
    if (botToken && chatId) {
      try {
        const teleRes = await fetch(`https://api.telegram.org/bot${botToken.trim()}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId.toString().trim(),
            text: formattedHtmlMessage,
            parse_mode: 'HTML',
          }),
        });
        const teleData = await teleRes.json();
        telegramSent = teleData.ok === true;
      } catch (err) {
        console.error('[Vercel API] Telegram dispatch error:', err);
      }
    }

    // 2. Dispatch to custom webhook if configured
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lead, formatted_html: formattedHtmlMessage }),
        });
      } catch (err) {
        console.error('[Vercel API] Webhook dispatch error:', err);
      }
    }

    return res.status(200).json({
      success: true,
      delivered: telegramSent,
      message: 'Lead processed securely on server',
    });
  } catch (error: any) {
    console.error('[Vercel API] Handler error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
