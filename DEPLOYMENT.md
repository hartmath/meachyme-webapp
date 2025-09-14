# 🚀 Chyme App Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ Database Setup
1. **Run the SQL Script**:
   - Go to your Supabase Dashboard → SQL Editor
   - Copy and paste the contents of `supabase_setup.sql`
   - Execute the script to create all tables and policies

2. **Configure CORS**:
   - Go to Authentication → URL Configuration
   - Add your production domain to "Site URL" and "Additional Redirect URLs"

### ✅ Environment Variables
Create a `.env.local` file with:
```env
VITE_SUPABASE_URL=https://behddityjbiumdcgattw.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect Repository**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect the Vite configuration

2. **Environment Variables**:
   - Add your environment variables in Vercel dashboard
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

3. **Deploy**:
   - Click "Deploy" - it will build and deploy automatically
   - Your app will be available at `https://your-app.vercel.app`

### Option 2: Netlify

1. **Connect Repository**:
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub repository

2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Environment Variables**:
   - Add in Site settings → Environment variables
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Option 3: Manual Deployment

1. **Build the App**:
   ```bash
   npm run build
   ```

2. **Upload Files**:
   - Upload the `dist` folder contents to your web server
   - Ensure your server supports SPA routing (redirect all routes to index.html)

## 🔧 Post-Deployment Configuration

### 1. Update Supabase CORS
Add your production URL to Supabase:
- Authentication → URL Configuration
- Site URL: `https://your-domain.com`
- Additional Redirect URLs: `https://your-domain.com/**`

### 2. Test Core Features
- [ ] User registration/login
- [ ] Real-time messaging
- [ ] Event creation
- [ ] Profile management
- [ ] Mobile responsiveness

### 3. Performance Optimization
- [ ] Enable gzip compression on your server
- [ ] Set up CDN for static assets
- [ ] Configure caching headers

## 📱 PWA Installation

Your app is configured as a Progressive Web App:
- Users can install it on mobile devices
- Works offline (with cached data)
- Appears in app stores (when published)

## 🔍 Monitoring & Analytics

Consider adding:
- **Error Tracking**: Sentry or similar
- **Analytics**: Google Analytics or Plausible
- **Performance**: Vercel Analytics or similar

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Ensure your domain is added to Supabase CORS settings
   - Check that environment variables are set correctly

2. **Build Failures**:
   - Run `npm install` to ensure all dependencies are installed
   - Check for TypeScript errors with `npm run build`

3. **Real-time Features Not Working**:
   - Verify Supabase project is active
   - Check that RLS policies are properly configured

4. **Authentication Issues**:
   - Ensure Supabase Auth is enabled
   - Check email templates in Supabase dashboard

## 📞 Support

For deployment issues:
1. Check the browser console for errors
2. Verify all environment variables are set
3. Ensure Supabase project is properly configured
4. Check the deployment platform logs

## 🎉 Success!

Once deployed, your Chyme app will be live and ready for users to:
- Create accounts and profiles
- Send real-time messages
- Create and manage events
- Connect with other event professionals
- Use all the advanced messaging features
