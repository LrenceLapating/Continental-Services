# Vercel Deployment Guide for Continental Construction Services

## Prerequisites
- GitHub account (free)
- Vercel account (free) - Sign up at https://vercel.com

---

## Step 1: Push Your Code to GitHub

### Option A: Using GitHub Desktop (Easiest)
1. Download and install GitHub Desktop: https://desktop.github.com/
2. Open GitHub Desktop
3. Click **File** → **Add Local Repository**
4. Browse to your `Continental-Services` folder
5. Click **Add Repository**
6. If prompted "This directory does not appear to be a Git repository", click **Create a Repository**
7. Fill in:
   - Name: `continental-services`
   - Description: `Continental Construction Services - Glass Restoration & Auto Parts`
   - Keep other settings as default
8. Click **Create Repository**
9. Click **Publish repository** button (top right)
10. Uncheck "Keep this code private" if you want it public (or keep it checked for private)
11. Click **Publish Repository**

### Option B: Using Command Line
```bash
# Navigate to your project folder
cd Continental-Services

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - Continental Construction Services"

# Create a new repository on GitHub.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/continental-services.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy to Vercel

### Method 1: Using Vercel Website (Recommended)

1. **Go to Vercel**
   - Visit https://vercel.com
   - Click **Sign Up** (or **Log In** if you have an account)
   - Choose **Continue with GitHub**

2. **Import Your Project**
   - Click **Add New...** → **Project**
   - You'll see a list of your GitHub repositories
   - Find `continental-services` and click **Import**

3. **Configure Project**
   - **Project Name**: `continental-services` (or your preferred name)
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `dist` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

4. **Environment Variables** (Optional)
   - If you have any API keys, add them here
   - For now, you can skip this

5. **Deploy**
   - Click **Deploy**
   - Wait 1-3 minutes for the build to complete
   - You'll see a success screen with your live URL!

6. **Your Live Website**
   - Vercel will give you a URL like: `https://continental-services.vercel.app`
   - Click **Visit** to see your live site!

---

## Step 3: Custom Domain (Optional)

### Add Your Own Domain
1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Enter your domain name (e.g., `continentalservices.com`)
4. Follow the instructions to update your domain's DNS settings
5. Wait for DNS propagation (can take up to 48 hours)

---

## Automatic Deployments

✅ **Every time you push to GitHub, Vercel automatically deploys!**

### How to Update Your Site:
1. Make changes to your code locally
2. In GitHub Desktop:
   - Write a commit message (e.g., "Updated contact info")
   - Click **Commit to main**
   - Click **Push origin**
3. Vercel automatically detects the change and redeploys
4. Check your live site in 1-2 minutes!

---

## Troubleshooting

### Build Failed?
- Check the build logs in Vercel dashboard
- Make sure all dependencies are in `package.json`
- Run `npm run build` locally to test

### 404 Errors on Routes?
- The `vercel.json` file handles this (already configured)
- All routes redirect to `index.html` for React Router

### Fonts Not Loading?
- Google Fonts are loaded via CDN (already configured)
- Check browser console for any errors

---

## Useful Commands

```bash
# Test build locally before deploying
npm run build

# Preview the production build locally
npm run preview

# Check for TypeScript errors
npm run lint
```

---

## Your Project URLs

After deployment, you'll have:
- **Production URL**: `https://continental-services.vercel.app`
- **Preview URLs**: Every branch gets its own preview URL
- **Custom Domain**: Add your own domain in Vercel settings

---

## Support

- Vercel Documentation: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- GitHub Help: https://docs.github.com

---

## Project Structure

```
Continental-Services/
├── src/
│   ├── components/     # Navbar, Footer, Logo
│   ├── pages/          # HomePage, ServicesPage, ShopPage
│   ├── App.tsx         # Main app with routing
│   └── main.tsx        # Entry point
├── public/
│   └── favicon.svg     # Your logo favicon
├── index.html          # HTML template
├── package.json        # Dependencies
├── vercel.json         # Vercel configuration
└── vite.config.ts      # Vite configuration
```

---

## Next Steps After Deployment

1. ✅ Test all pages and navigation
2. ✅ Test on mobile devices
3. ✅ Update contact information (phone, email)
4. ✅ Add real product images
5. ✅ Set up analytics (Google Analytics, Vercel Analytics)
6. ✅ Add your custom domain
7. ✅ Share your website!

---

**Congratulations! Your Continental Construction Services website is now live! 🎉**
