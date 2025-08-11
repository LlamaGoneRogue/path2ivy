# TransMedX.AI Website Deployment Guide

This guide provides step-by-step instructions for deploying the TransMedX.AI website to various hosting platforms.

## 🚀 Quick Start

The website is ready to deploy immediately. All files are static and can be hosted on any web server.

### File Structure
```
transmedx-website/
├── index.html          # Main website file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── manifest.json       # PWA manifest
├── sw.js              # Service worker for PWA
├── README.md          # Project documentation
└── DEPLOYMENT.md      # This file
```

## 📋 Deployment Options

### 1. Netlify (Recommended - Free)

1. **Sign up** at [netlify.com](https://netlify.com)
2. **Drag and drop** the entire `transmedx-website` folder to Netlify's deploy area
3. **Wait** for automatic deployment (usually 30-60 seconds)
4. **Get** your live URL (e.g., `https://random-name.netlify.app`)
5. **Custom domain** (optional): Add your domain in Site Settings

### 2. Vercel (Free)

1. **Sign up** at [vercel.com](https://vercel.com)
2. **Install Vercel CLI**: `npm i -g vercel`
3. **Navigate** to the project directory: `cd transmedx-website`
4. **Deploy**: `vercel`
5. **Follow** the prompts to complete deployment

### 3. GitHub Pages (Free)

1. **Create** a new GitHub repository
2. **Upload** all files to the repository
3. **Go to** Settings > Pages
4. **Select** source: "Deploy from a branch"
5. **Choose** branch: `main` and folder: `/ (root)`
6. **Save** and wait for deployment

### 4. AWS S3 + CloudFront

1. **Create** an S3 bucket with public read access
2. **Upload** all files to the bucket
3. **Enable** static website hosting
4. **Create** CloudFront distribution
5. **Configure** custom domain (optional)

### 5. Cloudflare Pages (Free)

1. **Sign up** at [cloudflare.com](https://cloudflare.com)
2. **Go to** Pages section
3. **Create** new project
4. **Connect** your Git repository or upload files
5. **Deploy** automatically

## 🔧 Custom Domain Setup

### DNS Configuration

1. **Purchase** a domain (e.g., `transmedx.ai`)
2. **Add** these DNS records:

```
Type: A
Name: @
Value: [Your hosting provider's IP]

Type: CNAME
Name: www
Value: [Your hosting provider's domain]
```

### SSL Certificate

Most hosting providers automatically provide SSL certificates. If not:

1. **Let's Encrypt** (free)
2. **Cloudflare** (free with domain)
3. **Hosting provider** SSL

## 📱 PWA Configuration

The website includes Progressive Web App (PWA) features:

- **Manifest file**: `manifest.json`
- **Service worker**: `sw.js`
- **Icons**: Embedded SVG favicon

### PWA Testing

1. **Open** website in Chrome
2. **Open** DevTools (F12)
3. **Go to** Application tab
4. **Check** Manifest and Service Workers sections

## 🔍 SEO Optimization

### Meta Tags (Already included)

- Title: "TransMedX.AI - Ethical Translational Cancer Research"
- Description: Comprehensive meta description
- Viewport: Mobile-optimized
- Favicon: Custom SVG icon

### Additional SEO Steps

1. **Google Search Console**
   - Add your domain
   - Submit sitemap (if needed)
   - Monitor performance

2. **Google Analytics**
   - Add tracking code to `index.html`
   - Monitor user behavior

3. **Social Media Tags**
   - Add Open Graph tags
   - Add Twitter Card tags

## 🚀 Performance Optimization

### Current Optimizations

- ✅ Minified CSS and JS
- ✅ Optimized images (SVG icons)
- ✅ Lazy loading ready
- ✅ Service worker caching
- ✅ Gzip compression (hosting dependent)

### Additional Optimizations

1. **Image Optimization**
   - Use WebP format
   - Implement responsive images
   - Add lazy loading for images

2. **CDN Setup**
   - Cloudflare (free)
   - AWS CloudFront
   - Netlify CDN (automatic)

## 🔒 Security Considerations

### Current Security Features

- ✅ No external scripts (except CDN)
- ✅ HTTPS ready
- ✅ Form validation
- ✅ XSS protection

### Additional Security

1. **Security Headers**
   ```http
   X-Content-Type-Options: nosniff
   X-Frame-Options: DENY
   X-XSS-Protection: 1; mode=block
   Referrer-Policy: strict-origin-when-cross-origin
   ```

2. **Content Security Policy**
   ```http
   Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com;
   ```

## 📊 Monitoring & Analytics

### Recommended Tools

1. **Google Analytics 4**
   - Free website analytics
   - User behavior tracking

2. **Google Search Console**
   - SEO performance
   - Search appearance

3. **Uptime Monitoring**
   - UptimeRobot (free)
   - Pingdom
   - StatusCake

## 🔄 Updates & Maintenance

### Content Updates

1. **Edit** `index.html` for content changes
2. **Edit** `styles.css` for design changes
3. **Edit** `script.js` for functionality changes
4. **Redeploy** to your hosting platform

### Version Control

1. **Use Git** for version control
2. **Create** branches for updates
3. **Test** changes locally before deploying
4. **Document** changes in README.md

## 🆘 Troubleshooting

### Common Issues

1. **Website not loading**
   - Check DNS settings
   - Verify hosting provider status
   - Check file permissions

2. **Styles not loading**
   - Verify CSS file path
   - Check for typos in file names
   - Clear browser cache

3. **PWA not working**
   - Ensure HTTPS is enabled
   - Check service worker registration
   - Verify manifest file

### Support

For deployment issues:
- Check hosting provider documentation
- Review browser console for errors
- Test on different browsers/devices

## 📞 Contact

For website support or questions:
- **Email**: info@transmedx.ai
- **Documentation**: See README.md

---

**Happy Deploying! 🚀**