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
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=800&fit=crop"
];

const PROPERTY_IMAGES = [
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&h=800&fit=crop"
];

// Generate comprehensive article content programmatically
function generateFullArticleContent(config) {
  const { title, sections, calculator, relatedLinks, examples, faq } = config;
  
  let content = `# ${title}\n\n`;
  content += config.intro + "\n\n";
  
  sections.forEach(section => {
    content += `## ${section.title}\n\n${section.content}\n\n`;
  });
  
  if (examples && examples.length > 0) {
    content += "## Real-Life Examples\n\n";
    examples.forEach((ex, idx) => {
      content += `### Example ${idx + 1}: ${ex.title}\n\n${ex.content}\n\n`;
    });
  }
  
  if (faq && faq.length > 0) {
    content += "## Frequently Asked Questions\n\n";
    faq.forEach(q => {
      content += `**Q: ${q.question}**\n`;
      content += `A: ${q.answer}\n\n`;
    });
  }
  
  content += "## Conclusion\n\n" + config.conclusion + "\n\n";
  content += "**Key Takeaways:**\n";
  config.keyTakeaways.forEach(t => content += `- ${t}\n`);
  content += "\n";
  
  if (calculator) {
    content += `**Use our calculator:** [${calculator.name}](${calculator.url})\n\n`;
  }
  
  if (relatedLinks && relatedLinks.length > 0) {
    content += "**Related Resources:**\n";
    relatedLinks.forEach(link => content += `- [${link.name}](${link.url})\n`);
  }
  
  return content;
}

const articles = [];

// Article 2: PAYE Calculator Guide
articles.push({
  title: "PAYE Calculator Guide: How to Calculate Your Salary Tax in South Africa",
  slug: "paye-calculator-guide-south-africa",
  excerpt: "Complete guide to calculating PAYE (Pay As You Earn) tax in South Africa. Understand your monthly salary deductions, tax calculations, and how to use PAYE calculators effectively.",
  content: generateFullArticleContent({
    title: "PAYE Calculator Guide: How to Calculate Your Salary Tax in South Africa",
    intro: "Understanding your monthly PAYE deductions is essential for financial planning. This guide explains everything about PAYE calculations, how it works, and how to calculate your take-home salary using PAYE calculators.",
    sections: [
      { title: "What Is PAYE (Pay As You Earn)?", content: "PAYE is the tax you pay on your employment income throughout the year. Your employer deducts it monthly from your salary and pays it directly to SARS on your behalf.\n\n**How PAYE Works:**\n- Employer calculates gross salary\n- Applies tax tables to annual equivalent\n- Deducts monthly PAYE amount\n- Pays PAYE to SARS monthly\n- Issues payslip showing deductions\n- Provides IRP5 annually\n\nPAYE is prepayment of your annual income tax, spread across 12 months." },
      { title: "2025 PAYE Tax Tables", content: "**Tax Brackets 2024/2025:**\n\n| Annual Taxable Income | Rate | Calculation |\n|----------------------|------|-------------|\n| R0 – R237,100 | 18% | 18% of income |\n| R237,101 – R370,500 | 26% | R42,678 + 26% above R237,100 |\n| R370,501 – R512,800 | 31% | R77,362 + 31% above R370,500 |\n| R512,801 – R673,000 | 36% | R121,475 + 36% above R512,800 |\n| R673,001 – R857,900 | 39% | R179,147 + 39% above R673,000 |\n| R857,901 – R1,817,000 | 41% | R251,258 + 41% above R857,900 |\n| R1,817,001+ | 45% | R644,489 + 45% above R1,817,000 |\n\n**Monthly PAYE Rebates:**\n- Primary: R1,436.25/month (R17,235/year)\n- Secondary (65+): R787/month\n- Tertiary (75+): R262.08/month" },
      { title: "How to Calculate Monthly PAYE", content: "**Step 1: Calculate Annual Equivalent**\nMonthly salary × 12 = Annual salary\nExample: R35,000/month × 12 = R420,000/year\n\n**Step 2: Subtract Annual Deductions**\n- Retirement contributions\n- Medical aid (employer portion)\n- Travel allowance (portion)\nExample: R420,000 - R75,600 = R344,400 taxable\n\n**Step 3: Apply Tax Tables**\nFor R344,400: R70,308 before rebate\n\n**Step 4: Subtract Annual Rebate**\nR70,308 - R17,235 = R53,073 annual tax\n\n**Step 5: Divide by 12**\nR53,073 ÷ 12 = **R4,423 monthly PAYE**" },
      { title: "Using the Online PAYE Calculator", content: "Visit [SA Tax Calculator](https://www.genius-insights.co.za/south-africa-tax-calculator)\n\n**Enter:**\n- Monthly or annual salary\n- Retirement contributions\n- Medical aid contributions\n- Age bracket\n\n**Get instant results:**\n- Monthly PAYE\n- Annual tax\n- Take-home pay\n- Effective tax rate" },
      { title: "Understanding Your Payslip", content: "**Income Section:**\n- Basic salary\n- Allowances (housing, travel)\n- Overtime\n- Bonuses/commissions\n- Gross income total\n\n**Deductions Section:**\n- PAYE (income tax)\n- UIF (1% capped at R177.12)\n- Pension/provident fund\n- Medical aid\n- Other deductions\n\n**Net Pay:** Gross - Deductions = Take-home" },
      { title: "Factors Affecting Your PAYE", content: "**1. Salary Level:** Higher salary = higher bracket\n**2. Retirement Contributions:** Reduces taxable income\n**3. Medical Aid:** Tax credits applied\n**4. Age:** Additional rebates for 65+ and 75+\n**5. Bonuses:** Taxed at marginal rate\n\n**Example: Retirement Impact**\n- Salary: R600,000\n- 15% contribution: R90,000\n- Tax bracket: 39%\n- Annual tax saving: R35,100 (R2,925/month)" },
      { title: "Maximizing Your Take-Home Pay", content: "**1. Optimize Retirement:** Contribute up to 27.5% for maximum tax benefit\n**2. Structure Packages:** Pre-tax benefits better than cash\n**3. Claim Deductions:** RA contributions, travel, home office\n**4. Time Bonuses:** Consider spreading large bonuses" }
    ],
    examples: [
      { title: "Entry-Level (R15,000/month)", content: "Annual: R180,000\nDeductions: R18,000\nTaxable: R162,000\nPAYE: R994/month\nTake-home: R14,006" },
      { title: "Mid-Career (R40,000/month)", content: "Annual: R480,000\nDeductions: R93,600\nTaxable: R386,400\nPAYE: R5,312/month\nTake-home: R34,688" },
      { title: "Senior (R80,000/month)", content: "Annual: R960,000\nDeductions: R192,000\nTaxable: R768,000\nPAYE: R21,274/month\nTake-home: R58,726" }
    ],
    faq: [
      { question: "Why is my PAYE so high on my bonus?", answer: "Bonuses are taxed at your marginal rate (highest bracket), which can be 31-45% for higher earners." },
      { question: "Can I reduce my monthly PAYE?", answer: "Yes, by increasing retirement contributions or other pre-tax deductions through your employer." },
      { question: "What if I have two jobs?", answer: "Combine income from both. May need provisional tax or adjustment filing." },
      { question: "Is PAYE my final tax?", answer: "No, PAYE is prepayment. Final tax determined when you file annual return." }
    ],
    conclusion: "Understanding PAYE empowers you to optimize take-home pay and plan finances effectively. By maximizing deductions and structuring remuneration efficiently, you can legally reduce monthly tax burden.",
    keyTakeaways: [
      "PAYE is monthly prepayment of annual tax",
      "Primary rebate R1,436/month reduces tax",
      "Retirement contributions most effective reducer",
      "Bonuses taxed at marginal rate",
      "File annual return even with only PAYE income"
    ],
    calculator: { name: "SA Tax Calculator", url: "https://www.genius-insights.co.za/south-africa-tax-calculator" },
    relatedLinks: [
      { name: "Income Tax Calculator Guide", url: "https://www.genius-insights.co.za/guides/how-to-use-sars-income-tax-calculator" },
      { name: "SARS eFiling Registration", url: "https://www.genius-insights.co.za/guides/sars-efiling-registration-guide" }
    ]
  }),
  category: "Tax & Finance",
  author: "Tax Expert",
  featured_image: TAX_IMAGES[1],
  seo_keywords: ["paye calculator south africa", "sars paye calculator", "calculate monthly paye", "paye tax calculator", "salary tax calculator", "take home pay calculator", "paye calculation guide", "monthly tax deduction", "paye rates 2025", "how to calculate paye", "south africa payroll tax", "paye deductions"],
  reading_time: 13,
  is_published: true,
  published_at: Timestamp.now(),
  created_at: Timestamp.now(),
  updated_at: Timestamp.now()
});

// Continue with articles 3-10...
// (Script continues but truncated for display)

async function uploadArticles() {
  console.log(`🚀 Uploading ${articles.length} additional SEO-optimized articles...\n`);
  const uploadedIds = [];
  let successCount = 0;
  
  try {
    const existingSnapshot = await getDocs(collection(db, 'articles'));
    const existingCount = existingSnapshot.size;
    console.log(`📊 Current articles: ${existingCount}\n`);
    
    for (const [index, article] of articles.entries()) {
      console.log(`\n📝 Article ${index + 1}/${articles.length}: ${article.title}`);
      console.log(`   Slug: ${article.slug}`);
      
      try {
        const htmlContent = marked(article.content);
        const articleData = { ...article, content: htmlContent };
        const docRef = await addDoc(collection(db, 'articles'), articleData);
        uploadedIds.push({ id: docRef.id, title: article.title, slug: article.slug });
        successCount++;
        console.log(`   ✅ Uploaded! ID: ${docRef.id}`);
      } catch (error) {
        console.error(`   ❌ Error:`, error.message);
      }
    }
    
    const finalSnapshot = await getDocs(collection(db, 'articles'));
    console.log(`\n\n✨ SUCCESS! Uploaded ${successCount}/${articles.length}`);
    console.log(`📊 Total articles now: ${finalSnapshot.size}`);
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  }
}

uploadArticles();
