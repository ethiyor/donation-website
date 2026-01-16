# Render Configuration Instructions

## Issue 1: Redirect from old URL
The old URL `donation-website-rcvb.onrender.com` needs to be redirected at the **Render dashboard level** since it's a different service.

### Steps to fix:
1. Go to Render Dashboard
2. Find the `donation-website-rcvb` service
3. Go to **Settings** → **Redirects/Rewrites**
4. Add a redirect rule:
   - **Source**: `https://donation-website-rcvb.onrender.com/*`
   - **Destination**: `https://ethiocare.org/:splat`
   - **Type**: Permanent (301)

**OR** if that service is no longer needed:
1. Update the service settings to redirect all traffic
2. Add environment variable: `REDIRECT_URL=https://ethiocare.org`

## Issue 2: Page refresh "not found" error
The `_redirects` file has been created and should work automatically.

### Verify in Render Dashboard:
1. Go to your frontend static site settings
2. Ensure **Publish Directory** is set to: `dist`
3. Ensure **Build Command** is: `npm install && npm run build`
4. The `_redirects` file should be automatically detected

### Alternative: Manual Render.yaml Configuration
If automatic detection doesn't work, use the `render.yaml` file that was just created in the root directory.

## Deploy
After making changes, commit and push:
```bash
git add .
git commit -m "Add Render configuration for redirects and routing"
git push
```

Then manually trigger a redeploy in Render dashboard if needed.
