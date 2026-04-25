# Pre-Deployment Checklist for AI Chatbot

## ✅ Before You Deploy

### 1. Environment Variables in Vercel
Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Add this variable:
- **Name**: `VITE_OPENROUTER_API_KEY`
- **Value**: Your OpenRouter API key (get it from https://openrouter.ai/keys)
- **Environments**: Check all three boxes (Production, Preview, Development)

### 2. Files to Commit
Make sure these files are in your GitHub repo:
- ✅ `src/components/ChatBot.tsx` (updated chatbot component)
- ✅ `chatbot-knowledge.json` (AI knowledge base)
- ✅ `api/chat.js` (serverless function)
- ✅ `.env.example` (template for others)
- ❌ `.env` (DO NOT commit - contains your secret key)

### 3. Deploy Steps

**Using GitHub Desktop:**
1. Open GitHub Desktop
2. Review changed files
3. Write commit message: "Fixed AI chatbot serverless function"
4. Click **Commit to main**
5. Click **Push origin**

**Using Command Line:**
```bash
cd Continental-Services
git add .
git commit -m "Fixed AI chatbot serverless function"
git push
```

### 4. After Deployment

Wait 2-3 minutes, then test:

1. **Open your live site**: https://continental-services.vercel.app
2. **Click the chat button** (bottom right)
3. **Test these questions:**
   - "What services do you offer?"
   - "Do you have brake pads?"
   - "What car parts do you have?"
   - "Is your service nationwide?"
4. **Test features:**
   - ✅ AI responds correctly
   - ✅ Links in responses are clickable
   - ✅ Clicking links keeps chat open
   - ✅ Clicking outside chat closes it
   - ✅ Chat reopens with previous messages

### 5. If Chat Doesn't Work

**Check Browser Console (F12):**
- Look for errors in the Console tab
- Common issues:
  - "API key not configured" → Add environment variable in Vercel
  - "500 error" → Check Vercel function logs
  - "Failed to fetch" → Check network tab

**Check Vercel Logs:**
1. Go to Vercel Dashboard
2. Click your project
3. Click **Deployments** → Latest deployment
4. Click **Functions** tab
5. Look for `/api/chat` errors

**Common Fixes:**
- Missing API key → Add `VITE_OPENROUTER_API_KEY` in Vercel settings
- After adding env var → Redeploy (Deployments → ... → Redeploy)

---

## 🎉 Success Indicators

Your chatbot is working when:
- ✅ Chat button appears and opens smoothly
- ✅ AI responds within 2-3 seconds
- ✅ Responses are clean (no thinking process shown)
- ✅ Links work and navigate correctly
- ✅ Chat closes when clicking outside
- ✅ No console errors

---

## 📝 Quick Reference

**Your OpenRouter Model**: `inclusionai/ling-2.6-flash:free`

**Knowledge Base Location**: `chatbot-knowledge.json`

**To Update AI Knowledge**:
1. Edit `chatbot-knowledge.json`
2. Commit and push
3. Vercel auto-deploys

**To Change AI Behavior**:
- Edit system prompt in `api/chat.js` (buildSystemPrompt function)
- Or edit `src/components/ChatBot.tsx` (buildSystemPrompt function)

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Chat not responding | Check API key in Vercel env vars |
| 500 error | Check Vercel function logs |
| Wrong answers | Update `chatbot-knowledge.json` |
| Thinking process showing | Already cleaned in code |
| Links not working | Check React Router setup |
| Chat won't close | Click-outside handler added |

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- OpenRouter Docs: https://openrouter.ai/docs
- Check Vercel function logs for detailed errors
