# Deployment Guide for PrimeTrade

This guide covers deploying the PrimeTrade application to various platforms.

## 🌐 GitHub Pages (Frontend Only)

The frontend is automatically deployed to GitHub Pages via GitHub Actions.

### Setup Steps:

1. **Enable GitHub Pages in your repository:**
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Click Save

2. **The deployment happens automatically when you push to main branch**

3. **Your site will be available at:**
   ```
   https://vaibhavsainii.github.io/prime-trade
   ```

### Custom Domain (Optional):
If you have a custom domain, update the `cname` field in `.github/workflows/deploy.yml`

## 🚀 Backend Deployment Options

Since GitHub Pages only supports static files, you need to deploy the backend separately:

### Option 1: Render (Recommended - Free Tier Available)

1. **Go to [Render.com](https://render.com)**
2. **Connect your GitHub repository**
3. **Create a new Web Service:**
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     ```
     NODE_ENV=production
     PORT=10000
     MONGODB_URI=your-mongodb-atlas-connection-string
     JWT_SECRET=your-production-jwt-secret
     FRONTEND_URL=https://vaibhavsainii.github.io/prime-trade
     ```

### Option 2: Railway

1. **Go to [Railway.app](https://railway.app)**
2. **Connect GitHub and select your repository**
3. **Deploy the backend folder**
4. **Set environment variables**

### Option 3: Vercel

1. **Go to [Vercel.com](https://vercel.com)**
2. **Import your GitHub repository**
3. **Configure for backend deployment**

### Option 4: Heroku

1. **Install Heroku CLI**
2. **Create new Heroku app**
3. **Deploy backend subfolder**

## 🔧 Environment Configuration

### Frontend Environment Variables:
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

### Backend Environment Variables:
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/primetrade
JWT_SECRET=your-super-secret-production-key
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
FRONTEND_URL=https://vaibhavsainii.github.io/prime-trade
```

## 📝 Deployment Checklist

### Before Deploying:

- [ ] Update API URLs in frontend
- [ ] Set up MongoDB Atlas (production database)
- [ ] Generate secure JWT secret for production
- [ ] Configure CORS for production frontend URL
- [ ] Test the application locally
- [ ] Commit and push all changes

### After Deploying:

- [ ] Verify frontend loads correctly
- [ ] Test user registration
- [ ] Test user login
- [ ] Test dashboard functionality
- [ ] Check API connectivity
- [ ] Monitor for errors

## 🔒 Security Considerations

1. **Use environment variables for all secrets**
2. **Enable HTTPS (most platforms do this automatically)**
3. **Set secure CORS policies**
4. **Use production MongoDB cluster**
5. **Generate strong JWT secrets**
6. **Enable rate limiting in production**

## 📊 Monitoring

Consider adding:
- Error tracking (Sentry)
- Analytics (Google Analytics)
- Performance monitoring
- Uptime monitoring

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors**: Update FRONTEND_URL in backend environment
2. **API Not Found**: Check REACT_APP_API_URL in frontend
3. **Database Connection**: Verify MongoDB Atlas connection string
4. **Build Failures**: Check Node.js version compatibility

### Logs:
- **Frontend**: Check browser console
- **Backend**: Check platform-specific logs (Render, Vercel, etc.)

## 🔄 Continuous Deployment

The GitHub Actions workflow automatically:
1. Builds the React app
2. Deploys to GitHub Pages
3. Runs on every push to main branch

For backend auto-deployment, most platforms support GitHub integration for automatic deployments.