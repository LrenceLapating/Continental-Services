<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Continental Construction Services

Professional glass scratch removal and restoration services plus quality automotive parts.

## 🌐 Live Website

Visit: [Your Vercel URL will be here after deployment]

## 🚀 Features

- **Glass Restoration Services** - Professional scratch removal for residential and commercial properties
- **Car Parts Shop** - Quality automotive parts across 6 categories
- **AI Chatbot** - 24/7 customer support powered by OpenRouter AI
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Smooth Navigation** - React Router with smooth scroll sections
- **Modern UI** - Glassmorphism effects with Tailwind CSS
- **Fast Performance** - Built with Vite and React 19

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Vercel

## 📦 Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your OpenRouter API key to .env

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🤖 AI Chatbot Setup

1. Get your free API key from [OpenRouter](https://openrouter.ai/keys)
2. Add to `.env` file:
   ```
   VITE_OPENROUTER_API_KEY=your_key_here
   OPENROUTER_API_KEY=your_key_here
   ```
3. For Vercel deployment, add the key in **Settings → Environment Variables**

See [CHATBOT_SETUP.md](./CHATBOT_SETUP.md) for detailed instructions.

### Updating Chatbot Knowledge

The chatbot uses `chatbot-knowledge.json` as its knowledge base. You can easily add/update products without touching code:

```json
{
  "autoPartsInStock": {
    "engine": [
      {
        "name": "Your New Product",
        "features": "Product features",
        "available": true
      }
    ]
  }
}
```

See [KNOWLEDGE_BASE_GUIDE.md](./KNOWLEDGE_BASE_GUIDE.md) for complete instructions.

## 🚢 Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed Vercel deployment instructions.

## 📱 Pages

- **Home** - Hero, services overview, projects, about, contact
- **Services** - Detailed glass restoration services
- **Car Parts** - Product catalog with filtering and sorting
- **About** - Company information (smooth scroll section)
- **Projects** - Completed projects showcase (smooth scroll section)
- **Contact** - Contact form and information (smooth scroll section)

## 🎨 Brand Colors

- Primary: Lime Green (#C4D600)
- Secondary: Navy Blue (#1E3A5F)
- Background: Dark Blue (#020617)
- Accent: Cyan (#06B6D4)

## 📞 Contact

- Phone: +63 912 345 6789
- Email: info@continental-glass.com

## 📄 License

Apache-2.0

---

Built with ❤️ for Continental Construction Services

