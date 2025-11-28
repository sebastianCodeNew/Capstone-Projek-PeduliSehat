# Quick Start - Deployment Commands

## Prerequisites Check
- [ ] Git repository up to date
- [ ] All changes committed
- [ ] Large ML model files committed to Git

## Step 1: Commit All Changes

```bash
# Navigate to project root
cd c:\Sebastian\Project\Capstone-Projek_PeduliSehat

# Check status
git status

# Add all changes
git add .

# Commit with message
git commit -m "Prepare for production deployment - Railway & Vercel"

# Push to GitHub
git push origin main
```

## Step 2: Verify Files in Repository

Make sure these files are committed:
- `BackEnd/Database/supabase_schema.sql`
- `ML/nixpacks.toml`
- `ML/requirements.txt`
- `ML/train1_model_v2.joblib` (36MB)
- `ML/randomforest_model.joblib` (27MB)
- `ML/label_train_v2.joblib`
- `ML/selected_gejala_v2.json`
- `DEPLOYMENT_GUIDE.md`

## Step 3: Follow Deployment Guide

Open and follow: `DEPLOYMENT_GUIDE.md`

### Quick Links:
1. **Supabase**: https://supabase.com
2. **Railway**: https://railway.app
3. **Vercel**: https://vercel.com

## Important Notes

### Railway Free Tier Limits:
- 500 hours/month (enough for 24/7 if only 1 service)
- $5 credit/month
- If you deploy 2 services (BackEnd + ML), you get ~250 hours each
- Apps will sleep after 15 minutes of inactivity (free tier)

### Environment Variables Checklist:

**BackEnd (Railway):**
- `DATABASE_URL` - from Supabase
- `JWT_SECRET` - random string
- `NODE_ENV=production`
- `FRONTEND_URL` - from Vercel (add after Vercel deployment)
- `PORT=8081`

**ML Server (Railway):**
- `NODE_ENV=production`
- `FRONTEND_URL` - from Vercel (add after Vercel deployment)
- `PORT=3000`

**FrontEnd (Vercel):**
- `VITE_BACKEND_URL` - from Railway BackEnd
- `VITE_ML_SERVER_URL` - from Railway ML
- `VITE_API_BASE_URL` - same as VITE_BACKEND_URL

## Troubleshooting

### If Railway build fails:
1. Check logs in Railway dashboard
2. Verify `nixpacks.toml` exists in ML folder
3. Ensure `requirements.txt` is valid
4. Check Node.js version in `package.json` engines field

### If Vercel build fails:
1. Verify root directory is set to `FrontEnd`
2. Check environment variables are set
3. Ensure build command is `npm run build`

### If CORS errors:
1. Make sure `FRONTEND_URL` is set in Railway services
2. Verify URLs don't have trailing slashes
3. Check Railway services redeployed after adding FRONTEND_URL

## Next Steps After Deployment

1. Test all functionality
2. Monitor Railway usage (500 hours/month limit)
3. Consider upgrading Railway to $5/month for unlimited hours if needed
4. Setup custom domain on Vercel (optional)
5. Enable auto-deploy on git push (already enabled by default)

---

**Ready to deploy?** Start with `DEPLOYMENT_GUIDE.md` Phase 1! 🚀
