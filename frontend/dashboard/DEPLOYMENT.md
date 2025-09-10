# MnemoPhi Dashboard Deployment Guide

## Overview
This guide covers the deployment of the MnemoPhi Dashboard frontend application to production environments.

## Prerequisites

### System Requirements
- Node.js 18+ 
- npm 9+
- Modern web server (Nginx, Apache, or CDN)
- SSL certificate for HTTPS

### Environment Setup
- Production API endpoint configured
- Environment variables set
- Build tools available

## Build Process

### 1. Install Dependencies
```bash
npm ci --only=production
```

### 2. Build for Production
```bash
npm run build
```

This creates an optimized build in the `dist/` directory with:
- Minified JavaScript and CSS
- Code splitting for optimal loading
- Tree-shaken dependencies
- Optimized assets

### 3. Verify Build
```bash
npm run preview
```

## Deployment Options

### Option 1: Static Hosting (Recommended)

#### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify Deployment
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### AWS S3 + CloudFront
```bash
# Install AWS CLI
aws configure

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### Option 2: Traditional Web Server

#### Nginx Configuration
```nginx
server {
    listen 80;
    listen 443 ssl;
    server_name your-domain.com;
    
    # SSL Configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.mnemophi.com;" always;
    
    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Root directory
    root /var/www/mnemophi-dashboard;
    index index.html;
    
    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # API proxy (if needed)
    location /api/ {
        proxy_pass https://api.mnemophi.com/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### Apache Configuration
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    Redirect permanent / https://your-domain.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName your-domain.com
    DocumentRoot /var/www/mnemophi-dashboard
    
    # SSL Configuration
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
    
    # Security Headers
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    
    # Handle client-side routing
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
    
    # Cache static assets
    <LocationMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
        Header set Cache-Control "public, immutable"
    </LocationMatch>
</VirtualHost>
```

## Environment Configuration

### Production Environment Variables
```bash
# .env.production
VITE_API_BASE_URL=https://api.mnemophi.com
VITE_APP_ENV=production
VITE_ENABLE_ANALYTICS=true
VITE_APP_VERSION=1.0.0
```

### Build-time Configuration
```bash
# Set environment variables before build
export VITE_API_BASE_URL=https://api.mnemophi.com
export VITE_APP_ENV=production
npm run build
```

## CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy Dashboard

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build application
      run: npm run build
      env:
        VITE_API_BASE_URL: https://api.mnemophi.com
        VITE_APP_ENV: production
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        working-directory: ./
```

## Monitoring & Analytics

### Performance Monitoring
- **Core Web Vitals**: LCP, FID, CLS
- **Bundle Analysis**: Webpack Bundle Analyzer
- **Error Tracking**: Sentry or similar
- **Uptime Monitoring**: Pingdom or UptimeRobot

### Analytics Setup
```javascript
// Google Analytics 4
gtag('config', 'GA_MEASUREMENT_ID', {
  page_title: document.title,
  page_location: window.location.href
});
```

## Security Considerations

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https:; 
               connect-src 'self' https://api.mnemophi.com;">
```

### Security Headers
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Strict-Transport-Security: max-age=31536000

## Rollback Strategy

### Quick Rollback
```bash
# Revert to previous deployment
git checkout previous-commit-hash
npm run build
# Deploy previous build
```

### Blue-Green Deployment
1. Deploy to staging environment
2. Run smoke tests
3. Switch traffic to new version
4. Monitor for issues
5. Rollback if necessary

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Routing Issues
- Ensure server is configured for client-side routing
- Check that all routes return index.html
- Verify base URL configuration

#### API Connection Issues
- Check CORS configuration
- Verify API endpoint URLs
- Check network connectivity

### Performance Issues
- Enable gzip compression
- Implement CDN caching
- Optimize images and assets
- Use service workers for caching

## Maintenance

### Regular Tasks
- [ ] Update dependencies monthly
- [ ] Monitor security vulnerabilities
- [ ] Review performance metrics
- [ ] Update SSL certificates
- [ ] Backup configurations

### Health Checks
```bash
# Check application health
curl -f https://your-domain.com/health || exit 1

# Check API connectivity
curl -f https://api.mnemophi.com/health || exit 1
```

---

**Last Updated**: 2024-01-15
**Version**: 1.0.0
**Maintained By**: Development Team