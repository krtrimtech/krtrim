#!/bin/bash

# KRTRIM GCP Deployment Setup Script
# This script helps you set up Google Cloud Platform for static hosting

set -e

echo "🚀 KRTRIM GCP Deployment Setup"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}$1${NC}"
}

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    print_error "Google Cloud CLI is not installed. Please install it first:"
    echo "https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Get project configuration
print_header "📋 Project Configuration"
read -p "Enter your GCP Project ID: " PROJECT_ID
read -p "Enter your bucket name (e.g., krtrim-app): " BUCKET_NAME
read -p "Enter your custom domain (optional, press enter to skip): " CUSTOM_DOMAIN

# Set the project
print_status "Setting GCP project to: $PROJECT_ID"
gcloud config set project $PROJECT_ID

# Enable required APIs
print_header "🔧 Enabling Required APIs"
print_status "Enabling Cloud Storage API..."
gcloud services enable storage.googleapis.com

print_status "Enabling Cloud CDN API..."
gcloud services enable compute.googleapis.com

# Create storage bucket
print_header "🪣 Creating Storage Bucket"
print_status "Creating bucket: gs://$BUCKET_NAME"
gsutil mb gs://$BUCKET_NAME

# Configure bucket for website hosting
print_status "Configuring bucket for static website hosting..."
gsutil web set -m index.html -e 404.html gs://$BUCKET_NAME

# Set bucket permissions for public access
print_status "Setting bucket permissions for public access..."
gsutil iam ch allUsers:objectViewer gs://$BUCKET_NAME

# Create service account for GitHub Actions
print_header "🔐 Creating Service Account"
SERVICE_ACCOUNT_NAME="github-actions-krtrim"
SERVICE_ACCOUNT_EMAIL="$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com"

print_status "Creating service account: $SERVICE_ACCOUNT_NAME"
gcloud iam service-accounts create $SERVICE_ACCOUNT_NAME \
    --display-name="GitHub Actions for KRTRIM" \
    --description="Service account for automated deployments"

# Grant necessary permissions
print_status "Granting Storage Admin role..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
    --role="roles/storage.admin"

# Create and download service account key
print_status "Creating service account key..."
gcloud iam service-accounts keys create key.json \
    --iam-account=$SERVICE_ACCOUNT_EMAIL

# Custom domain setup (if provided)
if [ ! -z "$CUSTOM_DOMAIN" ]; then
    print_header "🌐 Custom Domain Setup"
    print_warning "To use custom domain '$CUSTOM_DOMAIN', you need to:"
    echo "1. Verify domain ownership in Google Search Console"
    echo "2. Add CNAME record: $CUSTOM_DOMAIN → c.storage.googleapis.com"
    echo "3. Update bucket name to match your domain"
    
    # Create bucket with custom domain name if different
    if [ "$BUCKET_NAME" != "$CUSTOM_DOMAIN" ]; then
        print_status "Creating additional bucket for custom domain..."
        gsutil mb gs://$CUSTOM_DOMAIN
        gsutil web set -m index.html -e 404.html gs://$CUSTOM_DOMAIN
        gsutil iam ch allUsers:objectViewer gs://$CUSTOM_DOMAIN
    fi
fi

# Create 404 error page
print_header "📄 Creating Error Pages"
cat > 404.html << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found | KRTRIM</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #f97316, #ea580c);
            color: white;
            text-align: center;
        }
        .container {
            max-width: 500px;
            padding: 2rem;
        }
        h1 { font-size: 4rem; margin: 0; }
        p { font-size: 1.2rem; margin: 1rem 0; }
        a {
            color: white;
            text-decoration: none;
            background: rgba(255,255,255,0.2);
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            display: inline-block;
            margin-top: 1rem;
        }
        a:hover { background: rgba(255,255,255,0.3); }
    </style>
</head>
<body>
    <div class="container">
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <a href="/">← Back to Home</a>
    </div>
</body>
</html>
EOF

# Upload initial 404 page
print_status "Uploading 404 error page..."
gsutil cp 404.html gs://$BUCKET_NAME/
rm 404.html

print_header "✅ Setup Complete!"
print_status "Your GCP environment is ready for deployment."
echo ""
print_header "📋 Next Steps:"
echo "1. Add these secrets to your GitHub repository:"
echo "   - GCP_PROJECT_ID: $PROJECT_ID"
echo "   - GCS_BUCKET_NAME: $BUCKET_NAME"
echo "   - GCP_SA_KEY: $(cat key.json | tr -d '\n')"
echo ""
echo "2. Commit and push your code to trigger deployment"
echo ""
print_header "🔗 Useful Links:"
echo "📊 GCP Console: https://console.cloud.google.com/storage/browser/$BUCKET_NAME"
echo "🌐 App URL: https://storage.googleapis.com/$BUCKET_NAME/index.html"
if [ ! -z "$CUSTOM_DOMAIN" ]; then
    echo "🎯 Custom Domain: https://$CUSTOM_DOMAIN"
fi
echo ""
print_warning "Remember to keep your service account key (key.json) secure!"
print_warning "Add key.json to .gitignore to avoid committing it."

# Clean up
echo "key.json" >> .gitignore
