#!/bin/bash
set -e

# Build the Next.js app
npm run build

# Sync _next/* with immutable caching (content-hashed files)
aws s3 sync ./out/_next "s3://$S3_BUCKET/_next" \
  --size-only \
  --cache-control "public,max-age=31536000,immutable"

# Sync everything else (HTML, images, etc.)
aws s3 sync ./out "s3://$S3_BUCKET" \
  --exclude "_next/*"
