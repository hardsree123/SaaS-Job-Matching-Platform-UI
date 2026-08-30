import { defineConfig, loadEnv, Plugin } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Local Dev API Middleware to handle /api/lead during `npm run dev`
function devApiMiddleware(env: Record<string, string>): Plugin {
  return {
    name: 'dev-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/lead' && req.method === 'POST') {
          let body = ''
          req.on('data', (chunk) => {
            body += chunk
          })
          req.on('end', async () => {
            try {
              const lead = JSON.parse(body)
              const botToken = env.TELEGRAM_BOT_TOKEN || env.VITE_TELEGRAM_BOT_TOKEN
              const chatId = env.TELEGRAM_CHAT_ID || env.VITE_TELEGRAM_CHAT_ID
              const webhookUrl = env.LEAD_WEBHOOK_URL || env.VITE_LEAD_WEBHOOK_URL

              const formattedHtmlMessage = [
                `🔔 <b>NEW DIBSMATCH ORGANIZATION LEAD</b>`,
                `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
                `📋 <b>Plan:</b> ${lead.planName || 'Pro'} Edition`,
                `💳 <b>Investment:</b> ${lead.priceAmount || 'N/A'} (${(lead.billingCycle || 'annual').toUpperCase()} Term)`,
                `👤 <b>Contact Name:</b> ${lead.name || 'N/A'}`,
                `📧 <b>Work Email:</b> ${lead.email || 'N/A'}`,
                `📞 <b>Call Back Phone:</b> ${lead.phone || 'N/A'}`,
                `🏢 <b>Organization:</b> ${lead.company || 'N/A'}`,
                lead.targetDomain ? `🌐 <b>Desired Domain:</b> ${lead.targetDomain}` : null,
                `⏰ <b>Submitted At:</b> ${lead.submittedAt || new Date().toLocaleString()}`,
                `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
                `⚡ <i>Direct lead dispatched via DibsMatch Licensing Desk (Local Dev)</i>`,
              ]
                .filter(Boolean)
                .join('\n')

              let delivered = false
              if (botToken && chatId) {
                const teleRes = await fetch(
                  `https://api.telegram.org/bot${botToken.trim()}/sendMessage`,
                  {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      chat_id: chatId.toString().trim(),
                      text: formattedHtmlMessage,
                      parse_mode: 'HTML',
                    }),
                  }
                )
                const teleData = await teleRes.json()
                delivered = teleData.ok === true
              }

              if (webhookUrl) {
                try {
                  await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ lead, formatted_html: formattedHtmlMessage }),
                  })
                } catch {}
              }

              res.setHeader('Content-Type', 'application/json')
              res.statusCode = 200
              res.end(JSON.stringify({ success: true, delivered, mode: 'local-dev' }))
            } catch (err: any) {
              res.setHeader('Content-Type', 'application/json')
              res.statusCode = 500
              res.end(JSON.stringify({ error: err.message }))
            }
          })
          return
        }
        next()
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      devApiMiddleware(env),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    assetsInclude: ['**/*.svg', '**/*.csv'],
  }
})
