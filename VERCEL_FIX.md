# 🔧 VERCEL DEPLOYMENT FIX - Step by Step

## The Problem
Vercel is looking for Next.js in the **root directory** but your app is in the **toxic-comment-frontend** subdirectory.

## The Solution (Takes 3 Minutes)

### ✅ If You Already Have a Vercel Project Deployed:

#### Step 1: Go to Your Project Settings
```
1. Open https://vercel.com
2. Click on your project (toxic-comment-detection or similar name)
3. You should see "Deployments" tab by default
```

#### Step 2: Click Settings
```
Look at the top navigation bar:
[Overview] [Deployments] [Analytics] [Settings] [Logs]
                                      ^^^^^^^^^^^^
                                      CLICK HERE
```

#### Step 3: Click General (Left Sidebar)
```
Left sidebar will show:
- General  ← CLICK THIS
- Domains
- Environment Variables
- Git
- ...etc
```

#### Step 4: Find "Root Directory" Section
```
Scroll down on the General page until you see:

┌─────────────────────────────────────┐
│  Root Directory                     │
│  ────────────────────────────────   │
│  The directory within your project  │
│  in which your code is located.     │
│                                     │
│  [Edit]                             │
│  ☐ Include source files outside... │
└─────────────────────────────────────┘
```

#### Step 5: Click the [Edit] Button
```
Click the [Edit] button in the Root Directory section
```

#### Step 6: Enter the Directory Name
```
A text field will appear:

┌─────────────────────────────────────┐
│  Root Directory                     │
│  ┌───────────────────────────────┐  │
│  │ toxic-comment-frontend        │  │ ← TYPE THIS
│  └───────────────────────────────┘  │
│  [Save]  [Cancel]                   │
└─────────────────────────────────────┘

IMPORTANT: Type EXACTLY: toxic-comment-frontend
(no spaces, no slashes, no quotes)
```

#### Step 7: Click Save
```
Click the [Save] button
```

#### Step 8: Redeploy
```
1. Click the "Deployments" tab at the top
2. Find your latest deployment (should be at the top)
3. Click the three dots (...) on the right side of that deployment
4. Click "Redeploy"
5. Wait 2-3 minutes
```

#### Step 9: ✅ Success!
```
Your app should now work!
Visit your deployment URL (something like):
https://toxic-comment-detection-xxx.vercel.app
```

---

### ✅ If You Want to Start Fresh (Clean Deploy):

#### Option 1: Delete Current Project
```
1. Settings → General
2. Scroll to the very bottom
3. Find "Delete Project" section
4. Click "Delete Project" button
5. Type your project name to confirm
6. Click final delete button
```

#### Option 2: Create New Project
```
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Find and select: thebharathkumar/toxic-comment-detection
4. Click "Import"

CRITICAL STEP - Before clicking Deploy:
┌─────────────────────────────────────────────┐
│  Configure Project                          │
│  ──────────────────────────────────────     │
│  Framework Preset: Next.js                  │
│                                             │
│  Root Directory: ./       [Edit]            │
│                   ^^^^^^^^^^^^^^^^^^         │
│                   CLICK [Edit] HERE!        │
└─────────────────────────────────────────────┘

5. Click [Edit] next to "Root Directory"
6. Type: toxic-comment-frontend
7. Click Save
8. NOW click "Deploy"
9. Wait 2-3 minutes
```

---

## 🎯 Quick Checklist

Before deploying, verify:
- [ ] Root Directory is set to: `toxic-comment-frontend`
- [ ] Framework is detected as: `Next.js`
- [ ] Build Command is: `npm run build`
- [ ] Install Command is: `npm install`

---

## 📸 What You Should See After Successful Deploy

When you visit your Vercel URL, you should see:

```
╔════════════════════════════════════════════╗
║                                            ║
║     Toxic Comment Detection                ║
║     AI-powered content moderation          ║
║     using DistilBERT                       ║
║                                            ║
║  ┌──────────────────────────────────────┐  ║
║  │ Enter a comment to analyze:          │  ║
║  │ ┌──────────────────────────────────┐ │  ║
║  │ │ Type or paste a comment here...  │ │  ║
║  │ │                                  │ │  ║
║  │ └──────────────────────────────────┘ │  ║
║  │                                      │  ║
║  │ Try an example:                      │  ║
║  │ [This is great!] [You are stupid]   │  ║
║  │                                      │  ║
║  │     [ Analyze Comment ]              │  ║
║  └──────────────────────────────────────┘  ║
║                                            ║
╚════════════════════════════════════════════╝
```

With a **dark purple/gray gradient background**.

---

## ❌ Still Not Working?

### Check the Build Logs
```
1. Go to Deployments tab
2. Click on the failed deployment
3. Click "Build Logs"
4. Look for the specific error
5. Share the error message with me
```

### Common Issues:

**Error: "No Next.js version detected"**
→ Root Directory is NOT set to `toxic-comment-frontend`
→ Go back and set it correctly

**Error: 404 NOT_FOUND**
→ Same issue - Root Directory is wrong
→ Should be `toxic-comment-frontend` NOT empty, NOT `./`, NOT `/`

**Error: "Command not found: next"**
→ Node version might be wrong
→ Settings → General → Node.js Version → Set to `20.x`

---

## 🆘 Last Resort

If nothing works, share a screenshot of:
1. Your Settings → General page (Root Directory section)
2. Your latest deployment's Build Logs
3. The exact error you're seeing

I'll help you debug from there!
