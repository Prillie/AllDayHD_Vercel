# Google Search Console Setup Guide

This guide will help you set up Google Search Console for your All Day HD website.

---

## What is Google Search Console?

Google Search Console is a free tool that helps you:
- **Monitor** how Google sees your site
- **Submit** your sitemap for faster indexing
- **Track** search performance (what keywords bring traffic)
- **Fix** indexing issues
- **Request** re-indexing after updates

---

## Step 1: Create a Google Account

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Sign in with your Google account (or create one)
3. Click **Add Property**

---

## Step 2: Add Your Website

1. Choose **URL prefix** (recommended)
2. Enter your domain: `https://www.alldayhd.com` (or your actual domain)
3. Click **Continue**

---

## Step 3: Verify Ownership

Google needs to verify you own the site. Choose one method:

### Option A: HTML File Upload (Easiest)

1. Google will give you an HTML file to download (e.g., `google1234567890.html`)
2. Upload it to your site's root directory (`AllDayHD_Vercel/`)
3. Make sure it's accessible at: `https://www.alldayhd.com/google1234567890.html`
4. Click **Verify** in Google Search Console

### Option B: HTML Tag (Alternative)

1. Google will give you a meta tag like:
   ```html
   <meta name="google-site-verification" content="abc123xyz" />
   ```
2. Add it to your `index.html` in the `<head>` section
3. Commit and push to GitHub
4. Wait for Vercel to deploy
5. Click **Verify** in Google Search Console

### Option C: DNS Record (Most Permanent)

1. Google will give you a TXT record to add to your DNS
2. Add it in your domain registrar (where you manage DNS)
3. Wait for DNS propagation (5-60 minutes)
4. Click **Verify** in Google Search Console

**Recommendation:** Use **Option A (HTML file)** for fastest setup, or **Option C (DNS)** for permanent verification.

---

## Step 4: Submit Your Sitemap

After verification:

1. In Google Search Console, go to **Sitemaps** (left sidebar)
2. Enter: `sitemap.xml`
3. Click **Submit**
4. Google will start crawling your site

**Note:** The sitemap is already created at `/sitemap.xml` in your site.

---

## Step 5: Update Domain in Sitemap (If Needed)

If your domain is different from `www.alldayhd.com`:

1. Edit `sitemap.xml`
2. Replace all instances of `https://www.alldayhd.com` with your actual domain
3. Commit and push

---

## What You'll See in Search Console

After a few days/weeks, you'll see:

- **Performance**: Which keywords bring traffic
- **Coverage**: Which pages are indexed
- **Enhancements**: Mobile usability, structured data
- **Links**: Which sites link to you

---

## Important Notes

### Update Sitemap After Changes

When you add new pages or update content:

1. Update `sitemap.xml` with new `<lastmod>` dates
2. Commit and push
3. In Search Console → **Sitemaps** → Click **Resubmit**

### robots.txt

Your `robots.txt` file is already created and tells search engines:
- ✅ Index all pages
- ❌ Don't index `/api/` endpoints (not for public)

---

## Troubleshooting

### "Sitemap could not be read"
- Check that `sitemap.xml` is accessible at `https://yourdomain.com/sitemap.xml`
- Verify the XML format is valid
- Make sure you've deployed to Vercel

### "Property not verified"
- Make sure the verification file/tag is accessible
- Wait a few minutes after deploying
- Try a different verification method

### "No data yet"
- It takes 1-3 days for Google to start showing data
- Make sure your site is live and accessible
- Submit your sitemap and wait

---

## Next Steps

1. ✅ **Set up Search Console** (follow steps above)
2. ✅ **Submit sitemap** (`sitemap.xml`)
3. ⏳ **Wait 1-3 days** for initial data
4. 📊 **Monitor** performance and fix any issues
5. 🔄 **Update sitemap** when you add new pages

---

## Resources

- [Google Search Console Help](https://support.google.com/webmasters)
- [Sitemap Guidelines](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [robots.txt Guide](https://developers.google.com/search/docs/crawling-indexing/robots/intro)

---

*Your sitemap.xml and robots.txt are ready to go! Just verify ownership and submit.* 🚀
