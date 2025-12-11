# Deployment Guide for Vercel

Your frontend is in a subdirectory (`toxic-comment-frontend`), so you need to configure Vercel properly.

## Method 1: Vercel Dashboard (Recommended) ✅

### Step 1: Go to Vercel
Visit [vercel.com/new](https://vercel.com/new) and sign in with GitHub

### Step 2: Import Repository
- Click "Import Git Repository"
- Select: `thebharathkumar/toxic-comment-detection`
- Click "Import"

### Step 3: Configure Project Settings ⚠️ CRITICAL

**Before clicking Deploy**, you MUST configure these settings:

1. **Root Directory** (MOST IMPORTANT!)
   - Click "Edit" button next to Root Directory
   - Enter: `toxic-comment-frontend`
   - This tells Vercel where your Next.js app lives

2. **Framework Preset**
   - Should auto-detect as: `Next.js`
   - If not, select it manually

3. **Build Settings** (Leave as default)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Environment Variables** (Optional but recommended)
   - Click "Add" under Environment Variables
   - **Name:** `HUGGINGFACE_API_KEY`
   - **Value:** Your token from https://huggingface.co/settings/tokens
   - **Note:** App works in demo mode without this!

### Step 4: Deploy
- Click **"Deploy"** button
- Wait 2-3 minutes for build
- Your app will be live! 🎉

### Step 5: Get Your URL
Your app will be at: `https://toxic-comment-detection-xxxx.vercel.app`

## Method 2: Fix Existing Deployment (If You Already Deployed) 🔧

If you already created a Vercel project and it's showing a 404 or "No Next.js version detected" error:

### Option A: Update Project Settings (Easiest)

1. Go to your Vercel project dashboard
2. Click **Settings** (top navigation)
3. Click **General** (left sidebar)
4. Find **"Root Directory"** section
5. Click **"Edit"**
6. Type: `toxic-comment-frontend`
7. Click **"Save"**
8. Go to **Deployments** tab
9. Find the latest deployment
10. Click the three dots (**...**) → **"Redeploy"**
11. ✅ Done! Your app should work now

### Option B: Delete and Redeploy Fresh (Clean Slate)

1. Go to your project **Settings** → **General**
2. Scroll to bottom → Click **"Delete Project"**
3. Confirm deletion
4. Follow **Method 1** above to deploy fresh with correct settings

## Method 3: Vercel CLI (Advanced)

```bash
cd toxic-comment-frontend
npx vercel --prod
```

The CLI will automatically detect Next.js when run from inside the folder.

## Troubleshooting Common Issues

### ❌ Error: "No Next.js version detected"
**Cause:** Root Directory is not set correctly
**Fix:** Go to Settings → General → Root Directory → Set to `toxic-comment-frontend` → Redeploy

### ❌ 404: NOT_FOUND
**Cause:** Vercel is looking in the wrong folder
**Fix:** Same as above - set Root Directory to `toxic-comment-frontend`

### ❌ Build fails with package errors
**Cause:** Node version might be too old
**Fix:**
1. Go to Settings → General
2. Find "Node.js Version"
3. Set to `20.x` or `18.x`
4. Redeploy

### ⚠️ API predictions not working
**Normal!** The app works in two modes:
- **Demo Mode** (default): Uses keyword-based detection, works immediately
- **Production Mode**: Requires `HUGGINGFACE_API_KEY` environment variable

To enable production AI:
1. Get free API token: https://huggingface.co/settings/tokens
2. Add to Vercel: Settings → Environment Variables
3. Redeploy

## What Gets Deployed

- **Frontend:** Modern Next.js app with TypeScript and Tailwind
- **API Route:** `/api/predict` for toxicity detection
- **Demo Mode:** Works immediately without external dependencies
- **Production Mode:** Set HUGGINGFACE_API_KEY for real AI predictions

## Post-Deployment

After successful deployment:
1. Test with example comments
2. Try your own test cases
3. Share the URL!

Your app should look like:
- Clean dark UI with gradient background
- Text input area for comments
- Real-time analysis with probability scores
- Green/Red indicators for toxic/non-toxic
