# Deployment Guide for Vercel

Your frontend is in a subdirectory (`toxic-comment-frontend`), so you need to configure Vercel properly.

## Method 1: Vercel Dashboard (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)

2. Import your GitHub repository: `thebharathkumar/toxic-comment-detection`

3. **IMPORTANT**: Before clicking "Deploy", configure these settings:

   **Framework Preset:** Next.js

   **Root Directory:** `toxic-comment-frontend` ← Click "Edit" and set this!

   **Build Command:** `npm run build` (default is fine)

   **Output Directory:** `.next` (default is fine)

   **Install Command:** `npm install` (default is fine)

4. (Optional) Add environment variable:
   - **Name:** `HUGGINGFACE_API_KEY`
   - **Value:** Your Hugging Face API token from https://huggingface.co/settings/tokens
   - Note: App works in demo mode without this

5. Click **"Deploy"**

6. Wait 2-3 minutes for build to complete

7. Your app will be live at: `https://your-project-name.vercel.app`

## Method 2: Vercel CLI

```bash
cd toxic-comment-frontend
npx vercel --prod
```

The CLI will automatically detect the Next.js configuration.

## Method 3: Re-deploy Current Project

If you already have a Vercel project that's showing 404:

1. Go to your project settings: `https://vercel.com/your-username/your-project/settings`

2. Click **"General"** in the left sidebar

3. Scroll to **"Root Directory"**

4. Click **"Edit"** and enter: `toxic-comment-frontend`

5. Click **"Save"**

6. Go to **"Deployments"** tab

7. Click **"Redeploy"** on the latest deployment

## Troubleshooting

### Still getting 404?
- Make sure Root Directory is set to `toxic-comment-frontend`
- Check the build logs for errors
- Verify the branch is deployed (should be your claude branch or main)

### Build fails?
- Check that Node.js version is 18.x or higher in Vercel settings
- Look at build logs for specific error messages

### API not working?
- The app will work in demo mode without Hugging Face API key
- To enable real AI: Add `HUGGINGFACE_API_KEY` in environment variables

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
