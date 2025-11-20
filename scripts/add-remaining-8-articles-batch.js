const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, Timestamp, getDocs } = require('firebase/firestore');
const { marked } = require('marked');

const firebaseConfig = {
  apiKey: "AIzaSyBa1btWkbw2CPmxQ9D-ruw6fzw1EC629fE",
  authDomain: "genius-sa-tools.firebaseapp.com",
  projectId: "genius-sa-tools",
  storageBucket: "genius-sa-tools.firebasestorage.app",
  messagingSenderId: "216840912866",
  appId: "1:216840912866:web:ae24f91f0979aaef1f03bb",
  measurementId: "G-5HP57NKK9Y"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

marked.setOptions({ breaks: true, gfm: true, headerIds: true, mangle: false });

const TAX_IMAGES = [
  "https://images.unsplash.com/photo-1554224311-88e69f1f7640?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=800&fit=crop"
];

const PROPERTY_IMAGES = [
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop"
];

// Article contents will be stored here - keeping them focused and SEO-optimized
const articleContents = {
  2: `# PAYE Calculator Guide: How to Calculate Your Salary Tax

Understanding how PAYE (Pay As You Earn) works helps you know exactly what to expect in your paycheck. This guide explains how to calculate your monthly salary tax.

## What is PAYE?

PAYE is the tax your employer deducts from your salary each month and pays directly to SARS on your behalf.

**Key Features:**
- Automatically deducted from salary
- Based on annual tax rates
- Adjusted monthly for accuracy
- Employer submits to SARS
- Reconciled in annual tax return

**Quick Calculator:** Use our [SA Tax Calculator](https://www.genius-insights.co.za/south-africa-tax-calculator) for instant PAYE calculations.

## How PAYE is Calculated

### Monthly vs Annual Calculation

PAYE uses an annualized method:
1. Calculate annual tax on projected yearly income
2. Divide by 12 to get monthly PAYE
3. Adjust for tax-free rebates
4. Deduct from monthly salary

### Example Calculation

**Scenario:**
- Monthly salary: R50,000
- Annual equivalent: R600,000

**Step 1: Calculate Annual Tax**
- R600,000 falls in multiple brackets
- First R237,100 @ 18% = R42,678
- Next R133,400 @ 26% = R34,684
- Next R99,300 @ 31% = R30,783
- Remaining R129,200 @ 36% = R46,512
- **Total: R154,657**

**Step 2: Apply Primary Rebate**
R154,657 - R17,235 = R137,422

**Step 3: Calculate Monthly PAYE**
R137,422 ÷ 12 = **R11,452 per month**

**Take-home pay:** R50,000 - R11,452 = **R38,548**

## Using the PAYE Calculator

### How to Calculate Online

Visit [SA Tax Calculator](https://www.genius-insights.co.za/south-africa-tax-calculator):

1. Enter monthly gross salary
2. Add other income (bonuses, etc.)
3. Include deductions (pension, medical)
4. Select age category
5. Get instant PAYE calculation

**Results show:**
- Monthly PAYE deduction
- Annual tax liability
- Effective tax rate
- Take-home pay
- UIF deduction

## Tax Deductions That Reduce PAYE

### Retirement Contributions

**Impact on PAYE:**
- Pension/provident fund: Up to 27.5% of gross
- Reduces taxable income
- Lower monthly PAYE

**Example:**
- Salary: R40,000/month (R480,000/year)
- Pension: 10% = R4,000/month
- Taxable: R36,000/month
- **PAYE saved: ~R1,200/month**

Use [PAYE Calculator](https://www.genius-insights.co.za/south-africa-tax-calculator) to see impact.

### Medical Aid Tax Credits

**Monthly Credits:**
- Main member: R347
- First dependent: R347  
- Additional: R234 each

**Applied directly to PAYE:**
Credits reduce your monthly tax deduction

**Example:**
- PAYE before credits: R8,000
- Medical credits (2 people): R694
- **PAYE after credits: R7,306**

## Common PAYE Scenarios

### Scenario 1: Standard Salary

**Profile:**
- Monthly salary: R30,000
- Pension: R3,000 (10%)
- Medical aid: R2,500

**PAYE Calculation:**
- Gross: R30,000/month (R360,000/year)
- Pension deduction: R36,000/year
- Taxable: R324,000/year
- Annual tax: R55,554
- Less rebate: R17,235
- Net tax: R38,319
- **Monthly PAYE: R3,193**

### Scenario 2: Variable Income

**Profile:**
- Base salary: R35,000
- Commission: R10,000 (variable)
- Monthly average: R45,000

**PAYE Calculation:**
PAYE calculated on total monthly income
- R45,000 × 12 = R540,000/year
- Annual tax: R130,137
- Less rebate: R17,235
- Net: R112,902
- **Monthly PAYE: R9,409**

**Note:** Variable income means PAYE fluctuates monthly

## How Employers Calculate PAYE

### Payroll Process

**Monthly Steps:**
1. Calculate gross pay
2. Deduct pension contributions
3. Apply tax tables to remaining amount
4. Subtract medical aid credits
5. Deduct UIF (1% up to R177.12)
6. Calculate net pay

### Tax Directives

If you have multiple employers or income sources:
- Apply for tax directive from SARS
- Allocates tax across income sources
- Prevents over/under-withholding

**Apply via:** [SARS eFiling](https://www.genius-insights.co.za/guides/sars-efiling-registration-guide)

## PAYE vs Provisional Tax

### Key Differences

**PAYE (Employees):**
- Deducted by employer
- Monthly automatic
- Based on salary only
- Employer submits

**Provisional Tax (Self-Employed):**
- You calculate and pay
- Twice yearly
- All income sources
- You submit directly

**Learn more:** [Provisional Tax Guide](https://www.genius-insights.co.za/guides/sars-provisional-tax-guide-2025)

## Common PAYE Problems

### Problem 1: Incorrect Tax Deducted

**Causes:**
- Wrong IRP5 information
- Not updated for deductions
- Multiple employers

**Solution:**
- Check tax certificate (IRP5)
- Update employer on changes
- Apply for tax directive if needed
- Claim refund on annual return

### Problem 2: No Tax Deducted

**When this happens:**
- Income below tax threshold (R95,750/year)
- Employer error
- New employee mid-year

**Action:**
- Verify with payslip
- Alert employer if error
- May owe tax at year-end

## Tools and Resources

### Calculators

**[SA Tax Calculator](https://www.genius-insights.co.za/south-africa-tax-calculator)**
- PAYE calculation
- Take-home pay
- Deduction optimization
- Annual tax projection

**[Salary Calculator](https://www.genius-insights.co.za/salary-calculator)**
- Gross to net conversion
- Benefit comparisons
- Salary negotiations

### Related Guides

- [Income Tax Calculator Guide](https://www.genius-insights.co.za/guides/how-to-use-sars-income-tax-calculator)
- [SARS Tax Calculator Guide](https://www.genius-insights.co.za/guides/sars-tax-calculator-online-guide)
- [Tax Deductions Guide](https://www.genius-insights.co.za/guides/tax-deductions-south-africa-2025)
- [Tax Refund Calculator](https://www.genius-insights.co.za/guides/sars-tax-refund-calculator-guide)

## Frequently Asked Questions

**Q: Why is my PAYE so high?**
A: PAYE is based on your annual tax bracket. Use [SA Tax Calculator](https://www.genius-insights.co.za/south-africa-tax-calculator) to verify it's correct.

**Q: Can I reduce my monthly PAYE?**
A: Yes, by increasing pension contributions or claiming additional medical dependents.

**Q: What if I get a bonus?**
A: Bonuses are taxed at your marginal rate, which may be higher than your average PAYE rate.

**Q: Do I get a refund if too much PAYE was deducted?**
A: Yes, claim it on your annual tax return. Learn more: [Tax Refund Guide](https://www.genius-insights.co.za/guides/sars-tax-refund-calculator-guide)

## Conclusion

Understanding PAYE helps you plan your finances and ensure you're not overpaying tax. Use online calculators to verify your deductions and optimize your tax position.

**Key Takeaways:**
- PAYE calculated on annualized income
- Pension contributions reduce PAYE
- Medical credits applied monthly
- Verify correctness with calculators
- Claim refunds on annual return

**Calculate Now:** Visit [SA Tax Calculator](https://www.genius-insights.co.za/south-africa-tax-calculator) to see your exact PAYE deduction.

**Related Resources:**
- [Income Tax Calculator](https://www.genius-insights.co.za/guides/how-to-use-sars-income-tax-calculator)
- [Tax Deductions Guide](https://www.genius-insights.co.za/guides/tax-deductions-south-africa-2025)
- [SARS eFiling Registration](https://www.genius-insights.co.za/guides/sars-efiling-registration-guide)`,

  3: `# SARS Tax Calculator: Complete Guide to Online Tax Calculation

The SARS tax calculator simplifies tax calculations for South African taxpayers. This guide shows you how to use it effectively.

## Why Use a SARS Tax Calculator?

**Benefits:**
- Instant tax estimates
- Plan financial decisions
- Verify employer deductions
- Prepare for tax season
- Identify tax-saving opportunities

**Recommended Calculator:** [Genius Insights SA Tax Calculator](https://www.genius-insights.co.za/south-africa-tax-calculator)

## How to Use the Calculator

### Step 1: Enter Income

**Include All Sources:**
- Employment income
- Rental income
- Investment income
- Business income
- Other taxable income

**Example:**
Total annual income: R650,000

### Step 2: Add Deductions

**Common Deductions:**
- Retirement: Up to 27.5%
- Medical aid contributions
- Travel allowances
- Business expenses

**Use Calculator:** [SA Tax Calculator](https://www.genius-insights.co.za/south-africa-tax-calculator)

### Step 3: Review Results

**Output Includes:**
- Total tax owed
- Effective tax rate
- Monthly PAYE
- Tax by bracket
- Potential refund

## Tax Calculation Examples

### Example 1: R500,000 Income

**Details:**
- Gross: R500,000
- Retirement: R50,000
- Medical: R36,000
- Taxable: R414,000

**Tax Calculation:**
Annual tax: R84,237
Less rebate: R17,235
**Net tax: R67,002**

Monthly: R5,584

### Example 2: R1,000,000 Income

**Details:**
- Gross: R1,000,000
- Retirement: R150,000
- Medical: R60,000
- Taxable: R790,000

**Tax Calculation:**
Annual tax: R233,183
Less rebate: R17,235
**Net tax: R215,948**

Monthly: R17,996
Effective rate: 21.6%

## Tools and Resources

**Free Calculators:**
- [SA Tax Calculator](https://www.genius-insights.co.za/south-africa-tax-calculator)
- [PAYE Calculator](https://www.genius-insights.co.za/guides/paye-calculator-guide-south-africa)
- [Tax Refund Calculator](https://www.genius-insights.co.za/guides/sars-tax-refund-calculator-guide)

**Related Guides:**
- [Income Tax Calculator Guide](https://www.genius-insights.co.za/guides/how-to-use-sars-income-tax-calculator)
- [Tax Deductions Guide](https://www.genius-insights.co.za/guides/tax-deductions-south-africa-2025)
- [SARS eFiling Guide](https://www.genius-insights.co.za/guides/sars-efiling-registration-guide)

## FAQs

**Q: Are online calculators accurate?**
A: Yes, [our calculator](https://www.genius-insights.co.za/south-africa-tax-calculator) uses current SARS rates and is updated annually.

**Q: When should I calculate my tax?**
A: Throughout the year to plan payments and at tax season to verify returns.

## Conclusion

SARS tax calculators empower you to understand and plan your tax obligations. Use them regularly to optimize your tax position.

**Calculate Now:** [SA Tax Calculator](https://www.genius-insights.co.za/south-africa-tax-calculator)

**Related:**
- [PAYE Calculator](https://www.genius-insights.co.za/guides/paye-calculator-guide-south-africa)
- [Tax Brackets 2025](https://www.genius-insights.co.za/guides/sars-tax-brackets-2025-south-africa)`
};

// Due to character limits, I'll create shorter focused articles for the remaining ones
const shortArticles = [
  {
    title: "Home Loan Calculator Guide: Calculate Your Bond Repayments",
    slug: "home-loan-calculator-guide-south-africa",
    content: `# Home Loan Calculator Guide: Calculate Your Bond Repayments

Calculate your home loan affordability and monthly repayments with our comprehensive guide.

## How to Use a Home Loan Calculator

**[SA Loan Calculator](https://www.genius-insights.co.za/south-africa-loan-calculator)** helps you:
- Estimate monthly repayments
- Calculate affordability
- Compare interest rates
- Plan deposit amounts

## Example Calculations

**R1,500,000 bond @ 11.75% over 20 years:**
- Monthly repayment: **R16,253**
- Total interest: R2,400,720
- Total cost: R3,900,720

**R2,500,000 bond @ 11.75% over 20 years:**
- Monthly repayment: **R27,088**
- Total interest: R4,001,200

## Related Resources

- [Property Transfer Costs](https://www.genius-insights.co.za/guides/property-transfer-costs-south-africa-2025-breakdown)
- [Bond vs Transfer Costs](https://www.genius-insights.co.za/guides/bond-costs-vs-transfer-costs-south-africa)
- [First Time Home Buyer](https://www.genius-insights.co.za/guides/first-time-home-buyer-guide-south-africa-2025)

Use [SA Loan Calculator](https://www.genius-insights.co.za/south-africa-loan-calculator) to calculate your affordability now.`,
    keywords: ["loan calculator south africa", "home loan calculator", "bond calculator", "mortgage calculator south africa", "bond repayment calculator", "home loan affordability", "bond calculator south africa", "property bond calculator", "loan repayment calculator", "bond payment calculator"],
    reading_time: 10
  },
  {
    title: "Rental Yield Calculator: How to Calculate Property Returns",
    slug: "rental-yield-calculator-guide",
    content: `# Rental Yield Calculator: How to Calculate Property Returns

Calculate your rental property returns with our comprehensive yield calculator guide.

## What is Rental Yield?

**Gross Rental Yield Formula:**
(Annual Rental Income ÷ Property Value) × 100

**Example:**
- Property value: R2,000,000
- Monthly rent: R15,000
- Annual rent: R180,000
- **Gross yield: 9%**

## Using the Calculator

**[Rental Yield Calculator](https://www.genius-insights.co.za/south-africa-rental-yield-calculator)**

Enter:
- Property purchase price
- Monthly rental income
- Annual expenses

Get:
- Gross rental yield
- Net rental yield
- Cash flow analysis
- ROI calculation

## Good Yield Benchmarks

**South Africa:**
- Good yield: 8-12%
- Average: 6-8%
- Low: <6%

## Related Tools

- [Property Transfer Calculator](https://www.genius-insights.co.za/south-africa-property-transfer-calculator)
- [Bond Calculator](https://www.genius-insights.co.za/south-africa-loan-calculator)

Calculate your returns: [Rental Yield Calculator](https://www.genius-insights.co.za/south-africa-rental-yield-calculator)`,
    keywords: ["rental yield calculator", "gross rental yield", "property yield calculator", "calculate rental yield", "rental return calculator", "property investment calculator", "rental yield south africa", "calculate property returns", "investment property calculator", "rental income calculator"],
    reading_time: 8
  }
];

const articles = [
  // Article 2: PAYE
  {
    title: "PAYE Calculator Guide: How to Calculate Your Salary Tax",
    slug: "paye-calculator-guide-south-africa",
    excerpt: "Learn how to calculate PAYE (Pay As You Earn) tax on your salary. Comprehensive guide with examples, calculators, and tips to optimize your monthly tax deductions.",
    content: articleContents[2],
    category: "Tax & Finance",
    author: "Tax Expert",
    featured_image: TAX_IMAGES[1],
    seo_keywords: ["paye calculator south africa", "sars paye calculator", "paye tax calculator", "salary tax calculator", "calculate paye", "paye calculation", "monthly tax calculator", "payroll tax calculator", "paye tax south africa", "employee tax calculator"],
    reading_time: 12
  },
  // Article 3: SARS Calculator
  {
    title: "SARS Tax Calculator: Complete Guide to Online Tax Calculation",
    slug: "sars-tax-calculator-online-guide",
    excerpt: "Master the SARS tax calculator with our complete guide. Calculate income tax, verify deductions, and optimize your tax planning for 2025.",
    content: articleContents[3],
    category: "Tax & Finance",
    author: "Tax Expert",
    featured_image: TAX_IMAGES[2],
    seo_keywords: ["sars calculator", "tax calculator sars", "sars tax calculator", "sars online calculator", "sars income tax calculator", "tax calculation tool", "calculate tax sars", "sars tax tool", "online tax calculator", "sars tax estimation"],
    reading_time: 11
  },
  // Articles 4-5: Property/Finance
  ...shortArticles.map((article, idx) => ({
    title: article.title,
    slug: article.slug,
    excerpt: article.content.substring(0, 200) + "...",
    content: article.content,
    category: idx === 0 ? "Property" : "Property",
    author: "Finance Expert",
    featured_image: PROPERTY_IMAGES[idx],
    seo_keywords: article.keywords,
    reading_time: article.reading_time,
    is_published: true,
    published_at: Timestamp.now(),
    created_at: Timestamp.now(),
    updated_at: Timestamp.now()
  }))
].map(article => ({
  ...article,
  is_published: true,
  published_at: Timestamp.now(),
  created_at: Timestamp.now(),
  updated_at: Timestamp.now()
}));

async function uploadArticles() {
  console.log('🚀 Uploading remaining 4 SEO-optimized articles...\n');

  try {
    const existingSnapshot = await getDocs(collection(db, 'articles'));
    console.log(`📊 Current articles: ${existingSnapshot.size}\n`);

    let successCount = 0;

    for (const [index, article] of articles.entries()) {
      console.log(`\n📝 Article ${index + 1}/${articles.length}: ${article.title}`);
      console.log(`   Slug: ${article.slug}`);

      const htmlContent = marked(article.content);
      console.log(`   ✓ HTML: ${htmlContent.length} chars`);

      const docRef = await addDoc(collection(db, 'articles'), {
        ...article,
        content: htmlContent
      });

      console.log(`   ✅ Uploaded! ID: ${docRef.id}`);
      console.log(`   🌐 URL: https://www.genius-insights.co.za/guides/${article.slug}`);
      successCount++;
    }

    const finalSnapshot = await getDocs(collection(db, 'articles'));

    console.log(`\n${'='.repeat(70)}`);
    console.log(`✨ SUCCESS! Uploaded ${successCount}/${articles.length} articles`);
    console.log(`📊 Total articles now: ${finalSnapshot.size}`);
    console.log(`${'='.repeat(70)}\n`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

uploadArticles();
