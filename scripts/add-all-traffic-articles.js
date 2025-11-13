const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, Timestamp } = require('firebase/firestore');
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

const IMAGES = {
  sars: [
    "https://images.unsplash.com/photo-1554224311-88e69f1f7640?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=800&fit=crop"
  ],
  property: [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop"
  ],
  business: [
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=800&fit=crop"
  ]
};

const articles = [
  // Remaining 3 SARS Articles
  {
    title: "SARS Audit Process: What to Expect & How to Prepare 2025",
    slug: "sars-audit-process-south-africa",
    excerpt: "Complete guide to SARS audit process in South Africa 2025. Learn what triggers audits, documentation required, audit steps, rights & obligations, and how to prepare successfully.",
    content: `# SARS Audit Process: What to Expect & How to Prepare 2025

Being selected for a SARS audit can be stressful. This guide explains the entire audit process, what triggers audits, required documentation, your rights, and how to prepare effectively to ensure successful completion.

## What is a SARS Audit?

A SARS audit is a detailed examination of your tax affairs to verify accuracy and compliance with tax laws.

### Types of SARS Audits

**1. Desk Audit** - Conducted remotely via documents
**2. Field Audit** - SARS officials visit your premises  
**3. Lifestyle Audit** - Examines assets vs declared income
**4. Industry-Specific Audit** - Targets specific sectors
**5. Random Audit** - Computer-selected verification

## What Triggers a SARS Audit?

### Common Red Flags

- Large refund claims
- Significant income fluctuations
- High deductions relative to income
- Cash-intensive businesses
- Multiple years of losses
- Discrepancies in third-party data
- Late or amended returns
- Industry non-compliance patterns

## The Audit Process: Step-by-Step

### Step 1: Audit Notification (Day 0)

You'll receive:
- Letter of Authority
- Audit commencement date
- Information requirements
- SARS official contact details
- 21-day response deadline

### Step 2: Document Preparation (Days 1-21)

Gather:
- Bank statements (3+ years)
- Invoices and receipts
- Financial statements
- Tax returns filed
- Asset registers
- Contracts and agreements
- Supporting schedules

### Step 3: Initial Meeting (Week 4)

SARS will:
- Explain audit scope
- Review documents provided
- Ask clarifying questions
- Identify areas of concern
- Request additional information

### Step 4: Examination Period (Weeks 5-12)

SARS auditors:
- Analyze financial records
- Verify income sources
- Review expense claims
- Check compliance
- Conduct interviews if needed

### Step 5: Findings Report (Week 13)

You receive:
- Preliminary findings
- Proposed adjustments
- Tax implications
- 21 days to respond

### Step 6: Final Assessment (Week 15)

SARS issues:
- Final audit report
- Adjusted assessment
- Tax owing/refund
- Penalty calculation (if applicable)

### Step 7: Resolution

Options:
- Accept assessment and pay
- Request payment arrangement
- Lodge objection
- Apply for penalty remission

## Your Rights During Audit

### Taxpayer Rights

✅ Right to professional representation
✅ Right to understand audit process  
✅ Right to reasonable timeframes
✅ Right to confidentiality
✅ Right to fair treatment
✅ Right to request supervisor review
✅ Right to object to findings

### SARS Obligations

SARS must:
- Provide written notification
- Explain audit scope
- Allow reasonable time for responses
- Consider your submissions
- Issue written findings
- Follow fair procedures

## How to Prepare for Audit

### Before Audit Notification

**Preventive measures:**
1. Keep immaculate records
2. File returns on time
3. Claim only legitimate deductions
4. Reconcile bank statements monthly
5. Maintain asset registers
6. Document business decisions
7. Use professional tax preparer

### After Notification

**Immediate actions:**
1. Don't panic - audits are routine
2. Read notification carefully
3. Note all deadlines
4. Engage tax professional immediately
5. Begin gathering documents
6. Review past returns for accuracy
7. Identify potential issues

### Document Organization

**Essential files:**

**Income documentation:**
- Payslips/IRP5 certificates
- Bank statements showing deposits
- Investment income statements
- Rental income records
- Business income invoices

**Expense documentation:**
- Receipts for claimed expenses
- Travel logbooks
- Home office calculations
- Donation receipts (Section 18A)
- Medical expense receipts

**Business records:**
- General ledger
- Cash book
- Petty cash vouchers
- Asset acquisition records
- Depreciation schedules

## Common Audit Issues & Solutions

### Issue 1: Insufficient Documentation

**Problem:** Cannot substantiate expense claims

**Solution:**
- Provide alternative proof (bank statements, contracts)
- Obtain duplicate invoices from suppliers
- Prepare detailed written explanations
- Accept adjustment if no proof available

### Issue 2: Personal vs Business Expenses

**Problem:** Mixed personal and business expenses

**Solution:**
- Provide usage logs (vehicle, phone)
- Calculate business-use percentage
- Accept partial disallowance
- Implement better systems going forward

### Issue 3: Cash Sales Not Declared

**Problem:** Bank deposits exceed declared income

**Solution:**
- Explain legitimate non-taxable deposits
- Provide loan agreements
- Show capital transactions
- Gift documentation
- May need to accept adjustment

### Issue 4: Lifestyle vs Income Mismatch

**Problem:** Assets don't match declared income

**Solution:**
- Provide inheritance documentation
- Show loan/finance agreements
- Explain spouse's income contribution
- Document prior savings
- Gift documentation

## Penalties and Interest

### Types of Penalties

**Understatement Penalty:**
- Standard: 10% of shortfall
- Substantial: 50% if significant omission
- Intentional: 100-200% if deliberate evasion

**Administrative Penalties:**
- Late filing: R250/month (max R16,000)
- Non-submission: Percentage-based

**Interest:**
- Currently 10.25% per annum
- Charged on late payments

### Penalty Remission

You can request remission if:
- First offense
- Genuine mistake (not negligence)
- Voluntary disclosure
- Reasonable excuse exists
- Financial hardship

**Process:**
1. Complete ADR-2 form
2. Explain circumstances
3. Provide supporting evidence
4. Submit within 30 days of assessment

## Professional Representation

### When to Hire Tax Professional

Consider if audit involves:
- Business tax matters
- Multiple tax years
- Complex transactions
- Significant tax exposure (>R50k)
- Penalty disputes
- Potential criminal investigation

### What Tax Professionals Do

**Services:**
- Review audit notification
- Organize documentation
- Represent you to SARS
- Negotiate adjustments
- Draft technical submissions
- Handle objections/appeals
- Reduce penalties
- Minimize tax liability legally

### Costs

**Typical fees:**
- Simple audit: R5,000 - R15,000
- Complex audit: R20,000 - R50,000+
- Hourly rates: R800 - R2,500/hour
- Contingency fees: Sometimes available

## Objecting to Audit Findings

### Grounds for Objection

Valid reasons:
- Incorrect application of law
- Factual errors in findings
- New evidence available
- Procedural unfairness
- Excessive penalties

### Objection Process

**Step 1:** Submit within 30 days (or 80 with valid reason)

**Step 2:** Use Form NOO (Notice of Objection)

**Step 3:** Provide detailed grounds

**Step 4:** Include supporting documents

**Step 5:** Request suspension of payment (if applicable)

**SARS response:** 60-90 days

**Outcomes:**
- Objection upheld (assessment reduced)
- Partial success (some adjustments accepted)
- Objection dismissed (original assessment stands)

### Appeals

If objection rejected:
- Request Alternative Dispute Resolution (ADR)
- Appeal to Tax Court
- Seek legal advice

## After the Audit

### Compliance Going Forward

**Lessons learned:**
- Improve record-keeping
- Address identified weaknesses
- Implement better systems
- Regular tax compliance reviews
- Professional tax advice annually

### Future Audit Risk

**Previous audit increases risk of:**
- Follow-up audits
- Enhanced scrutiny  
- Industry-wide audits
- Cross-checking with other taxes

**Reduce risk by:**
- Maintaining excellent records
- Filing accurately and timely
- Claiming only valid deductions
- Staying updated on tax law changes

## Frequently Asked Questions

**Q: How long does audit take?**
A: Typically 3-6 months, complex cases up to 12+ months.

**Q: Can I refuse a SARS audit?**
A: No. SARS has legal authority to audit. Refusal can result in penalties and prosecution.

**Q: What if I can't find documents?**
A: Request duplicates from banks/suppliers. SARS may accept alternative evidence or make estimates.

**Q: Will I go to jail for audit findings?**
A: Only if intentional tax evasion (criminal). Genuine mistakes result in tax/penalties, not jail.

**Q: Can SARS audit closed tax years?**
A: Yes, up to 5 years back (10 years for fraud/evasion).

**Q: Should I hire help for small audit?**
A: Recommended if tax exposure >R10k or complex issues involved.

## Related Resources

- [SARS eFiling Guide](/articles/sars-efiling-registration-guide)
- [Tax Return Guide](/articles/how-to-submit-tax-returns-sars-efiling)
- [Pay SARS Debt Guide](/articles/how-to-pay-sars-debt-south-africa)
- [Tax Brackets 2025](/articles/sars-tax-brackets-2025-south-africa)

## Conclusion

SARS audits are manageable with proper preparation, organization, and professional help when needed. Key success factors:

- Respond promptly to all requests
- Provide complete documentation
- Be honest and cooperative
- Seek professional help for complex matters
- Learn from the experience

Most audits conclude satisfactorily when taxpayers engage constructively with the process.`,
    category: "Finance",
    author: "Tax Expert",
    featured_image: IMAGES.sars[2],
    seo_keywords: ["sars audit process", "sars audit south africa", "tax audit", "sars audit preparation", "what triggers sars audit", "sars audit rights", "how to prepare for sars audit", "sars field audit", "sars desk audit", "audit documentation", "sars audit penalties", "object to sars audit"],
    reading_time: 16,
    is_published: true,
    published_at: Timestamp.now()
  }
];

async function uploadArticles() {
  console.log('🚀 Starting article uploads...\n');
  let successCount = 0;

  for (const article of articles) {
    try {
      const htmlContent = marked(article.content);
      const articleData = {
        ...article,
        content: htmlContent,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, 'articles'), articleData);
      console.log(`✅ ${article.title.substring(0, 50)}...`);
      console.log(`   ID: ${docRef.id} | Slug: ${article.slug}\n`);
      successCount++;
    } catch (error) {
      console.error(`❌ Error: ${article.title.substring(0, 50)}...`, error.message);
    }
  }

  console.log(`\n✨ Upload complete! ${successCount}/${articles.length} articles uploaded.`);
  process.exit(0);
}

uploadArticles();
