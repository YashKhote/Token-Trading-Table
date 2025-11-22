# Deployment Guide

This guide will help you deploy the Token Trading Table application to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier works)
- Git installed locally

## Step 1: Push to GitHub

1. Initialize git repository (if not already done):
```bash
git init
```

2. Add all files:
```bash
git add .
```

3. Create initial commit:
```bash
git commit -m "Initial commit: Token Trading Table"
```

4. Create a new repository on GitHub (or use existing one)

5. Add remote and push:
```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js configuration
5. Configure project settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install`
6. Click "Deploy"

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

## Step 3: Environment Variables (if needed)

If you add environment variables in the future:

1. Go to your project settings on Vercel
2. Navigate to "Environment Variables"
3. Add any required variables:
   - `NEXT_PUBLIC_WS_URL` (for WebSocket URL)
   - `NEXT_PUBLIC_API_URL` (for API endpoint)

## Step 4: Custom Domain (Optional)

1. Go to Project Settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Vercel will automatically provision SSL certificate

## Step 5: Verify Deployment

1. Check build logs for any errors
2. Visit the deployment URL provided by Vercel
3. Test all functionality:
   - Table loading
   - Sorting
   - Real-time updates
   - Modal interactions
   - Responsive design on mobile

## Troubleshooting

### Build Fails

- Check Node.js version (should be 18.x or higher)
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

### Runtime Errors

- Check function logs in Vercel dashboard
- Verify environment variables are set correctly
- Check browser console for client-side errors

### Performance Issues

- Enable Vercel Analytics to monitor performance
- Check Lighthouse scores
- Optimize images and assets
- Use Vercel's Edge Network for better global performance

## Continuous Deployment

Vercel automatically deploys:
- Every push to `main` branch → Production
- Every push to other branches → Preview deployment
- Pull requests → Preview deployment

## Performance Optimization

To achieve ≥90 Lighthouse score:

1. **Enable Automatic Static Optimization**: Already configured in Next.js
2. **Use Next.js Image Component**: For any images added
3. **Enable Compression**: Automatic in Vercel
4. **CDN Caching**: Automatic in Vercel Edge Network

## Monitoring

Vercel provides:
- Real-time Analytics
- Web Vitals monitoring
- Error tracking
- Performance insights

Access these from your project dashboard.

## Rollback

To rollback to a previous deployment:

1. Go to Deployments tab
2. Find the deployment you want to restore
3. Click the three dots menu
4. Select "Promote to Production"

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel CLI Reference](https://vercel.com/docs/cli)

