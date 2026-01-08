# Complete Vercel Deployment Walkthrough

This guide will walk you through deploying your All Day HD website to Vercel step-by-step.

---

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- [ ] A Vercel account (free tier is fine)
- [ ] A Brevo account (for newsletter functionality)
- [ ] Your `AllDayHD_Vercel` folder ready
- [ ] Git installed (optional, but recommended)

---

## 🚀 Method 1: Deploy via Vercel Dashboard (Easiest)

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** (top right)
3. Sign up with:
   - GitHub (recommended - easiest integration)
   - GitLab
   - Bitbucket
   - Email

### Step 2: Prepare Your Files

1. Navigate to your `AllDayHD_Vercel` folder:
   ```bash
   cd /Users/april/Documents/Cursor_Projects/alldayhd/alldayhd-website/AllDayHD_Vercel
   ```

2. **Optional but recommended:** Remove the archive file:
   ```bash
   rm project.zip
   ```

### Step 3: Deploy via Dashboard

#### Option A: Drag & Drop (Quickest)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Click **Browse** or drag your `AllDayHD_Vercel` folder into the upload area
4. Vercel will detect it as a static site
5. Click **Deploy**
6. Wait 1-2 minutes for deployment
7. **Done!** You'll get a URL like `your-project.vercel.app`

#### Option B: Import from Git (Recommended for updates)

1. **First, create a Git repository:**
   ```bash
   cd AllDayHD_Vercel
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub/GitLab:**
   - Create a new repository on GitHub
   - Follow GitHub's instructions to push your code:
   ```bash
   git remote add origin https://github.com/yourusername/your-repo.git
   git branch -M main
   git push -u origin main
   ```

3. **Import to Vercel:**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click **Add New** → **Project**
   - Click **Import Git Repository**
   - Select your repository
   - Vercel auto-detects settings (no build needed)
   - Click **Deploy**

---

## 🔧 Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

Or using Homebrew (Mac):
```bash
brew install vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

### Step 3: Deploy

1. Navigate to your project:
   ```bash
   cd AllDayHD_Vercel
   ```

2. Run deployment:
   ```bash
   vercel
   ```

3. Follow the prompts:
   - **Set up and deploy?** → Yes
   - **Which scope?** → Your account
   - **Link to existing project?** → No (first time)
   - **Project name?** → Press Enter (uses folder name) or type a name
   - **Directory?** → Press Enter (current directory)
   - **Override settings?** → No

4. Wait for deployment (1-2 minutes)

5. **Done!** You'll see:
   ```
   ✅ Production: https://your-project.vercel.app
   ```

### Step 4: Deploy to Production

For production deployment:
```bash
vercel --prod
```

---

## ⚙️ Step 4: Configure Environment Variables

**Important:** Do this before testing the newsletter form!

### Get Your Brevo Credentials

1. **Get Brevo API Key:**
   - Log in to [brevo.com](https://www.brevo.com)
   - Go to **Settings** → **API Keys** (or **SMTP & API** → **API Keys**)
   - Click **Generate a new API key**
   - Name it: "Website Newsletter"
   - **Copy the key** (you'll only see it once!)

2. **Get Your List ID:**
   - In Brevo, go to **Contacts** → **Lists**
   - Create a list or use an existing one
   - Click on the list
   - The **List ID** is in the URL or list details (e.g., `5`)

### Add Variables to Vercel

#### Via Dashboard:

1. Go to your project in [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **Settings** (top menu)
3. Click **Environment Variables** (left sidebar)
4. Add each variable:

   **Variable 1:**
   - **Name:** `BREVO_API_KEY`
   - **Value:** Your Brevo API key (paste it)
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Click **Save**

   **Variable 2:**
   - **Name:** `BREVO_LIST_ID`
   - **Value:** Your list ID (e.g., `5`)
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Click **Save**

   **Variable 3 (Optional):**
   - **Name:** `SITE_URL`
   - **Value:** `https://your-project.vercel.app` (or your custom domain)
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Click **Save**

#### Via CLI:

```bash
cd AllDayHD_Vercel
vercel env add BREVO_API_KEY
# Paste your API key when prompted
# Select: Production, Preview, Development

vercel env add BREVO_LIST_ID
# Enter your list ID (e.g., 5)
# Select: Production, Preview, Development

vercel env add SITE_URL
# Enter: https://your-project.vercel.app
# Select: Production, Preview, Development
```

### Redeploy After Adding Variables

**Important:** Environment variables only take effect after redeployment!

1. **Via Dashboard:**
   - Go to **Deployments** tab
   - Click **⋯** (three dots) on latest deployment
   - Click **Redeploy**

2. **Via CLI:**
   ```bash
   vercel --prod
   ```

---

## 📧 Step 5: Configure Brevo Double Opt-In

1. **Enable Double Opt-In:**
   - In Brevo, go to **Settings** → **SMTP & API** → **SMTP**
   - Scroll to **Double opt-in** section
   - Enable **Double opt-in for contacts**

2. **Set Confirmation Redirect URL:**
   - In the same section, set **Confirmation redirect URL** to:
     ```
     https://your-project.vercel.app/newsletter-confirmed.html
     ```
   - Replace `your-project.vercel.app` with your actual Vercel URL

3. **Optional - Customize Email Template:**
   - Go to **Campaigns** → **Email Templates**
   - Find **Double opt-in** template
   - Edit to match your brand
   - Save

---

## ✅ Step 6: Test Your Deployment

### Test 1: Site Loads

1. Visit your Vercel URL: `https://your-project.vercel.app`
2. Verify all pages load correctly
3. Check navigation links work

### Test 2: Newsletter Form

1. Go to the homepage
2. Scroll to newsletter section
3. Fill out the form:
   - Name: Test User
   - Email: Your real email (to test)
   - Goal: Test message
   - Check age verification
4. Click **Subscribe**
5. You should see: "Please check your email to confirm your subscription."
6. Check your email for Brevo confirmation
7. Click the confirmation link
8. You should be redirected to the confirmation page
9. Check Brevo dashboard → **Contacts** → Verify contact was added

### Test 3: Check Logs (if issues)

1. In Vercel dashboard, go to **Deployments**
2. Click on your deployment
3. Click **Functions** tab
4. Click on `/api/newsletter/subscribe`
5. View logs for any errors

---

## 🌐 Step 7: Add Custom Domain (Optional)

### Via Dashboard:

1. Go to **Settings** → **Domains**
2. Enter your domain (e.g., `alldayhd.com`)
3. Follow Vercel's instructions to:
   - Add DNS records to your domain provider
   - Verify domain ownership
4. Wait for DNS propagation (5-60 minutes)
5. Update `SITE_URL` environment variable if needed

### Update Brevo Redirect URL:

After adding custom domain, update Brevo:
- Go to **Settings** → **SMTP & API** → **SMTP**
- Update **Confirmation redirect URL** to:
  ```
  https://yourdomain.com/newsletter-confirmed.html
  ```

---

## 🔄 Step 8: Making Updates

### Method 1: Via Git (Recommended)

1. Make changes to your files
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update description"
   git push
   ```
3. Vercel automatically deploys (if connected to Git)

### Method 2: Via Dashboard

1. Go to **Deployments**
2. Click **⋯** → **Redeploy**
3. Or drag & drop updated folder again

### Method 3: Via CLI

```bash
cd AllDayHD_Vercel
# Make your changes
vercel --prod
```

---

## 🐛 Troubleshooting

### Site Not Loading

- **Check deployment status:** Go to **Deployments** → Check if deployment succeeded
- **Check build logs:** Click on deployment → View logs
- **Clear browser cache:** Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

### Newsletter Form Not Working

- **Check environment variables:** Settings → Environment Variables → Verify all are set
- **Redeploy after adding variables:** Variables only work after redeployment
- **Check Vercel logs:** Deployments → Functions → `/api/newsletter/subscribe` → View logs
- **Check browser console:** Open DevTools (F12) → Console tab → Look for errors
- **Verify Brevo API key:** Make sure it's correct and active
- **Verify list ID:** Make sure it matches your Brevo list

### 401 Unauthorized Error

- **Invalid API key:** Regenerate in Brevo and update in Vercel
- **API key not set:** Make sure `BREVO_API_KEY` is added to Vercel

### 400 Bad Request Error

- **Invalid list ID:** Check `BREVO_LIST_ID` matches your Brevo list
- **Email format:** Make sure email is valid

### Confirmation Email Not Received

- **Check spam folder**
- **Verify email in Brevo:** Settings → Email → Verify sender email
- **Check Brevo logs:** Settings → Logs → Look for email send status
- **Rate limits:** Free tier = 300 emails/day

### Contact Not Added After Confirmation

- **Check Brevo dashboard:** Contacts → Lists → Verify contact appears
- **Check confirmation link:** Should redirect to `/newsletter-confirmed.html`
- **Verify double opt-in enabled:** Brevo → Settings → SMTP → Double opt-in

---

## 📊 Monitoring Your Site

### Vercel Analytics (Optional)

1. Go to **Analytics** tab in Vercel dashboard
2. Enable Vercel Analytics (free tier available)
3. View traffic, performance, and user data

### Brevo Dashboard

- **Contacts:** View subscribers
- **Statistics:** Email open rates, clicks
- **Logs:** API calls and email sends

---

## 🎉 You're Live!

Your site should now be:
- ✅ Deployed on Vercel
- ✅ Accessible via `https://your-project.vercel.app`
- ✅ Newsletter form working with Brevo
- ✅ Double opt-in configured
- ✅ Ready for visitors!

---

## 📚 Quick Reference

### Important URLs

- **Vercel Dashboard:** [vercel.com/dashboard](https://vercel.com/dashboard)
- **Brevo Dashboard:** [app.brevo.com](https://app.brevo.com)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Brevo API Docs:** [developers.brevo.com](https://developers.brevo.com)

### Common Commands

```bash
# Deploy to production
vercel --prod

# View deployments
vercel ls

# View logs
vercel logs

# Remove deployment
vercel remove
```

### Environment Variables Checklist

- [ ] `BREVO_API_KEY` - Your Brevo API key
- [ ] `BREVO_LIST_ID` - Your Brevo list ID (number)
- [ ] `SITE_URL` - Your site URL (optional)

---

## 🆘 Need Help?

- **Vercel Support:** [vercel.com/support](https://vercel.com/support)
- **Brevo Support:** [help.brevo.com](https://help.brevo.com)
- **Check logs first:** Always check Vercel function logs for errors

---

*Last updated: 2025*

