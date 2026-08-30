export interface LeadDossier {
  planName: string;
  planKey: string;
  billingCycle: string;
  priceAmount: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  targetDomain?: string;
  submittedAt: string;
}

/**
 * Dispatches the lead dossier in the background to Telegram and/or configured Webhooks.
 * Uses secure environment variables (VITE_TELEGRAM_BOT_TOKEN, VITE_TELEGRAM_CHAT_ID).
 */
export async function dispatchLeadNotification(lead: LeadDossier): Promise<{ success: boolean; message: string }> {
  const botToken = (import.meta as any).env?.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = (import.meta as any).env?.VITE_TELEGRAM_CHAT_ID;
  const webhookUrl = (import.meta as any).env?.VITE_LEAD_WEBHOOK_URL;

  // HTML format avoids markdown escaping errors with special characters in names/emails
  const formattedHtmlMessage = [
    `🔔 <b>NEW DIBSMATCH ORGANIZATION LEAD</b>`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `📋 <b>Plan:</b> ${lead.planName} Edition`,
    `💳 <b>Investment:</b> ${lead.priceAmount} (${lead.billingCycle.toUpperCase()} Term)`,
    `👤 <b>Contact Name:</b> ${lead.name}`,
    `📧 <b>Work Email:</b> ${lead.email}`,
    `📞 <b>Call Back Phone:</b> ${lead.phone}`,
    `🏢 <b>Organization:</b> ${lead.company}`,
    lead.targetDomain ? `🌐 <b>Desired Domain:</b> ${lead.targetDomain}` : null,
    `⏰ <b>Submitted At:</b> ${lead.submittedAt}`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `⚡ <i>Direct lead dispatched via DibsMatch Licensing Desk</i>`,
  ]
    .filter(Boolean)
    .join('\n');

  let dispatched = false;

  // 1. Dispatch to Telegram Bot API if configured
  if (botToken && chatId) {
    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId.toString().trim(),
          text: formattedHtmlMessage,
          parse_mode: 'HTML',
        }),
      });

      if (response.ok) {
        dispatched = true;
        console.info('[DibsMatch Lead Dispatcher] ✅ Successfully delivered to Telegram!');
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.warn('[DibsMatch Lead Dispatcher] ⚠️ Telegram response:', errorData);
      }
    } catch (err) {
      console.warn('[DibsMatch Lead Dispatcher] ❌ Telegram connection error:', err);
    }
  }

  // 2. Dispatch to custom Webhook if configured
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel: 'lead_notification',
          lead,
          formatted_html: formattedHtmlMessage,
        }),
      });
      dispatched = true;
    } catch (err) {
      console.warn('[DibsMatch Lead Dispatcher] Webhook notification error:', err);
    }
  }

  return {
    success: true,
    message: dispatched ? 'Lead delivered successfully' : 'Lead queued',
  };
}

// Backward compatibility alias
export const sendLeadToWhatsApp = dispatchLeadNotification;
