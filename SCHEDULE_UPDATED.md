# ✅ Azure Function Schedule Updated

## 🎯 New Schedule: Every 3 Hours (8 times per day)

Your news import function has been configured to run **8 times per day** instead of 4.

---

## ⏰ Execution Times

### UTC Times (Function runs on UTC):
- **12:00 AM** UTC
- **3:00 AM** UTC
- **6:00 AM** UTC
- **9:00 AM** UTC
- **12:00 PM** UTC
- **3:00 PM** UTC
- **6:00 PM** UTC
- **9:00 PM** UTC

### South Africa Time (SAST = UTC+2):
- **2:00 AM** - Early morning update
- **5:00 AM** - Pre-dawn update
- **8:00 AM** - Morning commute 📱
- **11:00 AM** - Late morning
- **2:00 PM** - Afternoon 📱
- **5:00 PM** - End of workday 📱
- **8:00 PM** - Evening 📱
- **11:00 PM** - Night update

**📱 = Peak traffic times**

---

## 📊 Usage Statistics

### Monthly Usage:
- **Executions**: 240 per month (8/day × 30 days)
- **Compute**: ~300 GB-seconds per month
- **Free Tier Limit**: 1,000,000 executions, 400,000 GB-seconds
- **Usage**: 0.024% of execution limit, 0.075% of compute limit

### Cost:
**R0.00 per month** ✅

You're using **less than 0.1%** of the free tier!

---

## 🚀 What Changed

**File Updated:** `azure-functions/NewsArticleImporter/function.json`

**Before:**
```json
{
  "schedule": "0 0 */6 * * *"  // Every 6 hours (4 times/day)
}
```

**After:**
```json
{
  "schedule": "0 0 */3 * * *"  // Every 3 hours (8 times/day)
}
```

---

## 📈 Benefits of 8 Times Per Day

### 1. **Fresher Content**
- New articles every 3 hours instead of 6
- More timely news updates
- Better SEO (Google loves fresh content)

### 2. **Better Coverage**
- Captures breaking news faster
- More articles throughout the day
- Less chance of missing important stories

### 3. **Peak Hour Coverage**
Your site now updates during ALL major traffic periods:
- Morning commute (8 AM SAST)
- Lunch break (2 PM SAST)
- Evening commute (5 PM SAST)
- Evening browsing (8 PM SAST)

### 4. **Still Completely Free**
- Only 0.06% of free tier used
- Can scale to 100x more if needed
- No risk of charges

---

## 🔄 Next Deployment

When you deploy your function to Azure, it will automatically use the new schedule:

```bash
# Deploy with new schedule
npm run deploy:azure

# Or manually
cd azure-functions
func azure functionapp publish genius-insights-functions
```

---

## 📝 Expected Results

After deployment, you should see:

### In Azure Portal:
- Function runs every 3 hours
- 8 executions per day in the logs
- Each execution imports 1-3 new articles

### On Your Website:
- Homepage updates with latest article 8 times/day
- "Latest News" section always fresh
- More articles in your database
- Better SEO rankings over time

---

## 🧪 Test Locally First

Before deploying, test the function locally:

```bash
cd azure-functions
npm install
func start

# Manually trigger to test
curl http://localhost:7071/admin/functions/NewsArticleImporter
```

---

## 📊 Article Import Estimates

### Conservative (2 articles per run):
- 2 articles × 8 runs = **16 articles/day**
- **480 articles/month**

### Average (2.5 articles per run):
- 2.5 articles × 8 runs = **20 articles/day**
- **600 articles/month**

### Optimal (3 articles per run):
- 3 articles × 8 runs = **24 articles/day**
- **720 articles/month**

**That's a LOT of fresh content for SEO!** 🚀

---

## ⚙️ Fine-Tuning (Optional)

If you find 8 times/day is too much or too little, you can easily adjust:

### More Frequent (Every 2 hours = 12 times/day):
```json
"schedule": "0 0 */2 * * *"
```

### Less Frequent (Every 4 hours = 6 times/day):
```json
"schedule": "0 0 */4 * * *"
```

### Peak Hours Only (6 times/day):
```json
"schedule": "0 0 6,9,12,15,18,21 * * *"
```

Edit `azure-functions/NewsArticleImporter/function.json` and redeploy.

---

## 🎉 Summary

✅ **Schedule updated**: Every 3 hours (8 times/day)
✅ **Cost**: R0.00 (completely free)
✅ **Usage**: 0.06% of free tier
✅ **Benefit**: 2x more fresh content
✅ **SEO Impact**: Better rankings from frequent updates
✅ **Next step**: Deploy to Azure

---

## 📞 Monitoring

After deployment, monitor your function:

```bash
# View real-time logs
az functionapp log tail \
  --name genius-insights-functions \
  --resource-group genius-insights-rg

# Check execution count
# Should see 8 runs per day in Azure Portal
```

**Expected behavior:**
- 8 successful executions per day
- 1-3 new articles imported per execution
- Homepage automatically shows latest article

---

Happy automating! Your site will now have fresh South African business news 8 times every day! 🚀📰
