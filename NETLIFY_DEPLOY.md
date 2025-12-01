# Netlify Deployment Guide for PsychWebMD

This guide explains how to deploy your PsychWebMD application to Netlify.

## Prerequisites

- A Netlify account (free tier works)
- This repository connected to GitHub, GitLab, or Bitbucket (or deploy manually)

## Deployment Steps

### Option 1: Connect Git Repository (Recommended)

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)

2. **Log in to Netlify** at [app.netlify.com](https://app.netlify.com)

3. **Click "Add new site"** → **"Import an existing project"**

4. **Connect your Git provider** and select your repository

5. **Configure build settings** (these should auto-detect from `netlify.toml`):
   - Build command: `npx vite build`
   - Publish directory: `dist/public`
   - Node version: 20

6. **Click "Deploy site"**

### Option 2: Manual Deploy (Drag & Drop)

1. **Build locally:**
   ```bash
   npm install
   npx vite build
   ```

2. **Go to Netlify** → **Sites** → **Add new site** → **Deploy manually**

3. **Drag and drop** the `dist/public` folder to deploy

## Files Configured for Netlify

- `netlify.toml` - Build configuration and redirects
- `.nvmrc` - Node.js version specification
- `client/public/_redirects` - SPA routing fallback

## Post-Deployment

After deployment, Netlify will provide you with:
- A unique URL like `your-site-name.netlify.app`
- Option to add a custom domain
- Automatic HTTPS/SSL certificate

## Environment Variables

If you need to add environment variables:
1. Go to **Site settings** → **Environment variables**
2. Add any `VITE_` prefixed variables your app needs

## Continuous Deployment

Once connected to Git, Netlify will automatically:
- Build and deploy on every push to main/master branch
- Provide deploy previews for pull requests
