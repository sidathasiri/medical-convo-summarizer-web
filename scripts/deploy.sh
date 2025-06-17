#!/bin/bash

# Exit on any error
set -e

# Configuration
S3_BUCKET="medical-convo-summarizer-web"  # Replace with your S3 bucket name
CLOUDFRONT_DISTRIBUTION_ID="E2EXAMPLE"    # Replace with your CloudFront distribution ID
REGION="us-east-1"                        # Replace with your AWS region

# Build the React application
echo "🚀 Building React application..."
npm run build

# Upload to S3
echo "📦 Uploading to S3..."

# Upload all files except index.html with long cache duration
aws s3 sync build/ "s3://${S3_BUCKET}" \
    --delete \
    --exclude "index.html" \
    --cache-control "public, max-age=31536000" \
    --region "${REGION}"

# Upload index.html with no-cache headers
aws s3 cp build/index.html "s3://${S3_BUCKET}/index.html" \
    --cache-control "no-cache, no-store, must-revalidate" \
    --region "${REGION}"

# Create CloudFront invalidation
echo "🔄 Creating CloudFront invalidation..."
aws cloudfront create-invalidation \
    --distribution-id "${CLOUDFRONT_DISTRIBUTION_ID}" \
    --paths "/*" \
    --region "${REGION}"

echo "✅ Deployment complete!"
echo "Please wait a few minutes for the CloudFront invalidation to complete."
