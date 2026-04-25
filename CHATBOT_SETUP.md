# AI Chatbot Setup Guide

## Overview
Your Continental Services website now includes an AI-powered chatbot using OpenRouter. The chatbot can answer questions about your glass restoration services and auto parts.

## Features
- 💬 Floating chat widget (bottom-right corner)
- 🤖 AI-powered responses using OpenRouter
- 📱 Fully responsive design
- 🎨 Matches your website's glassmorphism theme
- ⚡ Real-time conversation
- 🔒 Secure API key handling via Vercel environment variables

## Setup Instructions

### 1. Get Your OpenRouter API Key

1. Visit [OpenRouter](https://openrouter.ai/)
2. Sign up for a free account
3. Go to [API Keys](https://openrouter.ai/keys)
4. Create a new API key
5. Copy the key (starts with `sk-or-v1-...`)

### 2. Configure Environment Variables

#### For Local Development:

1. Create a `.env` file in the `Continental-Services` folder:
   ```bash
   # IMPORTANT: Use VITE_ prefix for local development
   VITE_OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
   
   # For production (Vercel)
   OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
   ```

2. The `.env` file is already in `.gitignore` (won't be committed to Git)

3. **IMPORTANT**: After creating/updating `.env`, restart your dev server:
   ```bash
   # Stop the server (Ctrl+C) then restart:
   npm run dev
   ```

#### For Vercel Deployment:

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add this variable:
   - **Name**: `OPENROUTER_API_KEY`
   - **Value**: `sk-or-v1-your-actual-key-here`
   - **Environment**: Production, Preview, Development (check all)
4. Click **Save**
5. Redeploy your project

### 3. Test the Chatbot

#### Local Testing:
```bash
npm run dev
```
- Open http://localhost:3000
- Click the chat icon in the bottom-right corner
- Try asking: "What glass restoration services do you offer?"

#### Production Testing:
- After deploying to Vercel, visit your live site
- Test the chatbot with various questions

## Chatbot Capabilities

The AI assistant knows about:

### Glass Restoration Services:
- Scratch removal (minor to heavy)
- Residential & commercial restoration
- High-rise building service
- Construction glass repair
- Graffiti removal
- Environmental damage repair
- Pricing: 25-50% savings vs. replacement

### Auto Parts:
- Windshield glass
- Engine parts (filters, spark plugs)
- Brake systems
- Lighting (LED headlights, tail lights)
- Electrical components
- Accessories

### Company Information:
- Contact: +63 912 345 6789
- Email: info@continental-glass.com
- Service areas: Nationwide (Philippines)
- Completed projects list

## Customization

### Change AI Model

Edit `api/chat.js` or `src/components/ChatBot.tsx`:
```javascript
model: 'inclusionai/ling-2.6-flash:free', // Current model (FREE, fast, clean)
```

**Other Popular OpenRouter Models:**
- `inclusionai/ling-2.6-flash:free` - FREE, fast, clean responses
- `mistralai/mistral-7b-instruct:free` - FREE alternative
- `openai/gpt-3.5-turbo` - Fast and reliable ($0.50/1M tokens) - RECOMMENDED for production
- `anthropic/claude-3-haiku` - High quality ($0.25/1M tokens)
- `google/gemini-flash-1.5` - Fast Google model ($0.075/1M tokens)

**Note**: Free models are great for testing. For production with high traffic, consider GPT-3.5 Turbo for the best reliability and speed.

### Modify System Prompt

Edit `api/chat.js` (lines 28-60) to customize the chatbot's knowledge and personality.

### Adjust Response Length

Edit `api/chat.js` (line 71):
```javascript
max_tokens: 300, // Increase for longer responses
```

### Change Chat Position

Edit `src/components/ChatBot.tsx` (line 127):
```tsx
className="fixed bottom-6 right-6 ..." // Change position here
```

## Styling

The chatbot uses your existing design system:
- Glassmorphism effects (`.glass-dark`)
- Blue-to-cyan gradients
- Smooth animations with Motion
- Responsive design

## Cost Management

### Free Tier:
- OpenRouter offers free models (currently using Llama 3.1 8B)
- Rate limits apply (check OpenRouter dashboard)

### Paid Models:
- Set up billing in OpenRouter dashboard
- Monitor usage in OpenRouter analytics
- Set spending limits to control costs

## Troubleshooting

### Chatbot Not Responding:
1. Check browser console for errors (F12)
2. Verify API key is set in Vercel environment variables
3. Check OpenRouter dashboard for API status
4. Ensure you have credits/free tier available

### "API key not configured" Error:
- Make sure `OPENROUTER_API_KEY` is set in Vercel
- Redeploy after adding environment variables
- Check variable name spelling (case-sensitive)

### Slow Responses:
- Free models may have rate limits
- Consider upgrading to paid models for faster responses
- Check OpenRouter status page

### CORS Errors:
- The API route handles CORS automatically
- If issues persist, check Vercel function logs

## File Structure

```
Continental-Services/
├── api/
│   └── chat.js                    # Vercel serverless function
├── src/
│   ├── components/
│   │   └── ChatBot.tsx           # Chat UI component
│   ├── api/
│   │   └── chat.ts               # Client-side API helper
│   └── App.tsx                   # ChatBot integrated here
├── .env.example                  # Environment template
└── CHATBOT_SETUP.md             # This file
```

## Security Notes

- ✅ API key stored in environment variables (not in code)
- ✅ API calls go through Vercel serverless function (server-side)
- ✅ `.env` file excluded from Git
- ✅ CORS properly configured
- ⚠️ Never commit API keys to Git
- ⚠️ Don't expose API keys in client-side code

## Support

For OpenRouter issues:
- Documentation: https://openrouter.ai/docs
- Discord: https://discord.gg/openrouter
- Email: support@openrouter.ai

For chatbot customization:
- Modify `src/components/ChatBot.tsx` for UI changes
- Modify `api/chat.js` for AI behavior changes

## Next Steps

1. ✅ Get OpenRouter API key
2. ✅ Add to Vercel environment variables
3. ✅ Deploy to Vercel
4. ✅ Test the chatbot
5. 🎨 Customize responses and styling as needed
6. 📊 Monitor usage in OpenRouter dashboard

---

**Your AI chatbot is ready to help customers 24/7!** 🚀
