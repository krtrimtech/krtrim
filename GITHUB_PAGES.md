# GitHub Pages Deployment Guide

This guide will help you deploy your KRTRIM app to GitHub Pages for free hosting.

## 🚀 Quick Setup

### 1. Enable GitHub Pages (REQUIRED FIRST STEP)

**⚠️ IMPORTANT: You must enable GitHub Pages manually before the workflow can run successfully.**

1. Go to your GitHub repository: `https://github.com/krtrimtech/krtrim`
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
5. Click **Save**

### 2. Verify Repository Permissions

Make sure your repository has the correct permissions:
1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select **Read and write permissions**
3. Check **Allow GitHub Actions to create and approve pull requests**
4. Click **Save**

### 3. Deploy Your App

After enabling Pages, push your code to trigger deployment:

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

The deployment will happen automatically via GitHub Actions!

## 📱 Access Your Live App

After deployment, your app will be available at:
```
https://krtrimtech.github.io/
```

**Note**: This assumes your repository is named exactly as your GitHub username organization (krtrimtech). If your repository has a different name, the URL would be `https://krtrimtech.github.io/repository-name/`.

## 🔧 How It Works

### Automated Workflow
The `.github/workflows/deploy.yml` file handles:

1. **Build Process**:
   - Installs Node.js and dependencies
   - Runs tests (optional)
   - Builds the React app for production

2. **Deployment**:
   - Configures GitHub Pages
   - Uploads build artifacts
   - Deploys to GitHub Pages

### Configuration Details
- **Base URL**: Configured for `/krtrim/` path
- **Build Output**: Uses `dist/` folder from Vite
- **SPA Routing**: Handles React Router properly
- **Assets**: All assets are properly referenced

## 🌟 Benefits of GitHub Pages

### ✅ Advantages
- **Free Hosting** - No cost for public repositories
- **Automatic SSL** - HTTPS enabled by default
- **CDN Support** - Global content delivery
- **Easy Setup** - No server configuration needed
- **Version Control** - Integrated with Git workflow

### 🔧 Features
- **Custom Domain Support** - Add your own domain
- **Automatic Builds** - Deploy on every push
- **Build Logs** - Monitor deployment status
- **Rollback Support** - Easy to revert changes

## 🌐 Custom Domain (Optional)

### Add Your Custom Domain

1. **Add CNAME file**:
   ```bash
   echo "yourdomain.com" > public/CNAME
   ```

2. **Configure DNS**:
   - Add CNAME record: `www.yourdomain.com` → `krtrimtech.github.io`
   - Add A records for apex domain:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

3. **Update Repository Settings**:
   - Go to Settings → Pages
   - Add your custom domain
   - Enable "Enforce HTTPS"

## 📊 Monitoring

### Check Deployment Status
- **Actions Tab**: View build and deployment logs
- **Deployments**: See deployment history
- **Pages Settings**: Monitor domain and SSL status

### Useful Links
- 🔗 **Live App**: https://krtrimtech.github.io/
- 📊 **Actions**: https://github.com/krtrimtech/krtrim/actions
- ⚙️ **Settings**: https://github.com/krtrimtech/krtrim/settings/pages

## 🐛 Troubleshooting

### Common Issues

1. **404 Errors on Refresh**:
   - GitHub Pages doesn't support SPA routing by default
   - The workflow includes a fallback to `index.html`

2. **Assets Not Loading**:
   - Check the base URL in `vite.config.ts`
   - Ensure paths start with `/krtrim/`

3. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are in `package.json`
   - Review build logs in Actions tab

### Debug Commands

```bash
# Test build locally
npm run build
npm run preview

# Check for TypeScript errors
npm run type-check

# Lint code
npm run lint
```

## 🔄 Updating Your Site

### Regular Updates
```bash
# Make your changes
git add .
git commit -m "Update: description of changes"
git push origin main
```

### Emergency Rollback
```bash
# Revert to previous commit
git revert HEAD
git push origin main
```

## 🎯 Performance

### Optimization Features
- **Static Assets**: Optimized for fast loading
- **Code Splitting**: Automatic bundle optimization
- **Compression**: Gzip enabled by GitHub Pages
- **Caching**: Browser caching for static assets

### Speed Benefits
- **Global CDN**: Fast loading worldwide
- **HTTP/2**: Modern protocol support
- **Compression**: Automatic gzip compression
- **Caching**: Efficient browser caching

## 📞 Support

If you encounter any issues:

1. **Check Actions Tab**: Review build logs
2. **Verify Settings**: Ensure Pages is configured correctly
3. **Test Locally**: Run `npm run build && npm run preview`
4. **Check Documentation**: GitHub Pages official docs

---

**🎉 Your KRTRIM app is now live on GitHub Pages!**

Share your live app: `https://krtrimtech.github.io/krtrim/`
