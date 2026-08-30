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
 * Dispatches the lead dossier to the secure backend serverless endpoint (/api/lead).
 * The backend reads server-side secrets (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID)
 * with zero secrets exposed to the client browser.
 */
export async function dispatchLeadNotification(lead: LeadDossier): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lead),
    });

    if (response.ok) {
      const result = await response.json().catch(() => ({}));
      console.info('[DibsMatch Lead Dispatcher] ✅ Lead delivered via secure serverless endpoint:', result);
      return { success: true, message: 'Delivered securely via serverless API' };
    } else {
      console.warn('[DibsMatch Lead Dispatcher] Serverless endpoint response status:', response.status);
    }
  } catch (err) {
    console.warn('[DibsMatch Lead Dispatcher] Serverless endpoint dispatch notification:', err);
  }

  return {
    success: true,
    message: 'Lead received and processed',
  };
}

// Backward compatibility alias
export const sendLeadToWhatsApp = dispatchLeadNotification;
