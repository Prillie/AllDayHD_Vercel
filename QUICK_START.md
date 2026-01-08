# Quick Start - Deploy to Vercel in 5 Minutes

The fastest way to get your site live on Vercel.

---

## 🚀 Fastest Method: Drag & Drop

### Step 1: Sign Up (1 minute)
1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** → Use GitHub, GitLab, or Email
3. Complete signup

### Step 2: Deploy (2 minutes)
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. **Drag your `AllDayHD_Vercel` folder** into the upload area
4. Click **Deploy**
5. Wait 1-2 minutes
6. **Done!** Your site is live at `your-project.vercel.app`

---

## ⚙️ Enable Newsletter (2 minutes)

### Get Brevo Credentials

1. **Sign up at [brevo.com](https://www.brevo.com)** (free)
2. **Get API Key:**
   - Settings → API Keys → Generate new key → Copy it
3. **Create List:**
   - Contacts → Lists → Create list → Note the List ID

### Add to Vercel

1. In Vercel dashboard → Your project → **Settings** → **Environment Variables**
2. Add:
   - `BREVO_API_KEY` = Your API key
   - `BREVO_LIST_ID` = Your list ID (just the number)
3. **Redeploy:** Deployments → ⋯ → Redeploy

### Configure Brevo

1. In Brevo: **Settings** → **SMTP** → **Double opt-in**
2. Enable it
3. Set redirect URL: `https://your-project.vercel.app/newsletter-confirmed.html`
4. Save

---

## ✅ Test It

1. Visit your site
2. Fill out newsletter form
3. Check email for confirmation
4. Click link → Should see confirmation page

---

## 📖 Need More Details?

See `DEPLOYMENT_WALKTHROUGH.md` for complete instructions.

---

**That's it! Your site is live! 🎉**

