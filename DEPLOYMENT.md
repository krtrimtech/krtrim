# CI/CD Pipeline for KRTRIM Static App Deployment

This repository includes automated CI/CD pipeline for deploying the KRTRIM React app to Google Cloud Platform as a static website.

## Prerequisites

1. **Google Cloud Project**: Create a GCP project
2. **Cloud Storage Bucket**: Create a bucket for hosting static files
3. **Cloud CDN** (optional): For better performance
4. **GitHub Secrets**: Configure the following secrets in your GitHub repository

## Required GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions, and add:

```
GCP_PROJECT_ID=your-project-id
GCP_SA_KEY=your-service-account-key-json
GCS_BUCKET_NAME=your-bucket-name
```

## Setup Instructions

### 1. Create Google Cloud Storage Bucket

```bash
# Create bucket for static hosting
gsutil mb gs://your-bucket-name

# Enable public access
gsutil web set -m index.html -e 404.html gs://your-bucket-name

# Set bucket permissions for public access
gsutil iam ch allUsers:objectViewer gs://your-bucket-name
```

### 2. Create Service Account

```bash
# Create service account
gcloud iam service-accounts create github-actions \
    --display-name="GitHub Actions"

# Grant necessary permissions
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
    --member="serviceAccount:github-actions@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/storage.admin"

# Create and download key
gcloud iam service-accounts keys create key.json \
    --iam-account=github-actions@YOUR_PROJECT_ID.iam.gserviceaccount.com
```

### 3. Configure Custom Domain (Optional)

```bash
# Verify domain ownership in Google Search Console
# Add CNAME record: www.yourdomain.com → c.storage.googleapis.com

# Update bucket for custom domain
gsutil web set -m index.html -e 404.html gs://your-bucket-name
```

## Deployment Process

1. **Push to main branch** → Triggers automated deployment
2. **Build React app** → Creates optimized production build
3. **Deploy to GCS** → Uploads files to Google Cloud Storage
4. **Invalidate CDN** → Clears cache for immediate updates

## Manual Deployment

```bash
# Build the application
npm run build

# Deploy to GCS
gsutil -m rsync -r -d dist/ gs://your-bucket-name

# Set cache control (optional)
gsutil -m setmeta -h "Cache-Control:public, max-age=3600" gs://your-bucket-name/**
```

## Environment Variables

The pipeline automatically handles:
- Production build optimization
- Asset compression
- Cache busting
- Error page routing

## Monitoring

- **Build Status**: Check GitHub Actions tab
- **Deployment Logs**: View in GitHub Actions workflow runs
- **Site Status**: Monitor via Google Cloud Console
- **Performance**: Use Google PageSpeed Insights

## Troubleshooting

### Common Issues:

1. **Permission Denied**: Check service account permissions
2. **Bucket Not Found**: Verify bucket name in secrets
3. **Build Failures**: Check Node.js version compatibility
4. **404 Errors**: Ensure SPA routing is configured

### Debug Commands:

```bash
# Check bucket configuration
gsutil web get gs://your-bucket-name

# List bucket contents
gsutil ls -la gs://your-bucket-name

# Check bucket permissions
gsutil iam get gs://your-bucket-name
```

## Performance Optimization

The pipeline includes:
- Asset minification
- Image optimization
- Gzip compression
- CDN caching headers
- Bundle splitting

## Security

- Service account has minimal required permissions
- Secrets are encrypted in GitHub
- HTTPS enforced via Cloud CDN
- CORS policies configured

## Cost Optimization

- Static hosting on GCS is cost-effective
- CDN reduces origin requests
- Compression reduces bandwidth
- Lifecycle policies for old builds
