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

marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true,
  mangle: false,
});

const PROPERTY_IMAGES = [
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&h=800&fit=crop"
];

// Split content to avoid template literal issues
const article1Content = `# Attorney Fees for Property Transfer in South Africa 2025

When buying property in South Africa, understanding attorney fees is crucial for budgeting. This guide explains conveyancing attorney fees, what's included, and how to manage these costs.

## What Are Conveyancing Attorney Fees?

Conveyancing attorney fees are charges for the legal work involved in transferring property ownership from seller to buyer. These fees cover drafting documents, conducting searches, registering transfer at the Deeds Office, and ensuring legal compliance.

### Services Included

- Drafting and reviewing sale agreements
- Preparing transfer documents
- Verifying title deeds and conducting property searches
- Checking for bonds, liens, and restrictions
- Verifying rates and taxes clearance
- Registering transfer at Deeds Office
- Liaising with banks, estate agents, and all parties
- Handling payment distributions

## 2025 Attorney Fee Structure

### Fee Ranges by Property Value

**Properties R0 - R500,000:**
- Base fee: R8,000 - R12,000
- Plus VAT (15%): R1,200 - R1,800
- Total: R9,200 - R13,800

**Properties R500,001 - R1,000,000:**
- Base fee: R12,000 - R18,000
- Plus VAT (15%): R1,800 - R2,700
- Total: R13,800 - R20,700

**Properties R1,000,001 - R2,000,000:**
- Base fee: R18,000 - R25,000
- Plus VAT (15%): R2,700 - R3,750
- Total: R20,700 - R28,750

**Properties Above R2,000,000:**
- Base fee: R25,000+
- Negotiable based on complexity
- Plus VAT (15%)

### What's Included vs Extra Costs

**Standard Services Included:**
- Sale agreement review
- Transfer duty calculation and payment
- Rates clearance certificate application
- Transfer registration at Deeds Office
- Document preparation and lodgment
- Updates on transfer progress

**Additional Charges:**
- Multiple properties: Extra fees per property
- Sectional title units: Body corporate searches (R500-R1,000)
- Deceased estates: Extra documentation fees (20-30% more)
- Foreign buyers: Additional compliance work (15-25% more)
- Expedited processing: R2,000 - R5,000 extra
- Complex title investigations: Hourly rates
- After-hours consultations: Hourly rates

### Additional Costs Beyond Attorney Fees

**Certificates Required:**
- Rates clearance: R1,500 - R2,500
- Electrical compliance: R800 - R1,500
- Plumbing compliance: R800 - R1,200
- Beetle/wood borer: R800 - R1,500
- Gas compliance (if applicable): R800 - R1,200

**Deeds Office Fees:**
- Registration fees: R450 - R800
- Stamp duties: R50 - R100
- Search fees: R200 - R400

**Total Additional: R5,000 - R9,000**

## How to Choose a Conveyancing Attorney

### Selection Criteria

**Experience and Reputation:**
- Years in conveyancing practice
- Track record with similar properties
- Client testimonials and online reviews
- Professional accreditation and registrations

**Communication:**
- Responsiveness to queries
- Clear fee structure explanation
- Regular progress updates
- Accessible contact methods

**Service Quality:**
- Attention to detail
- Timely completion
- Problem-solving ability
- Professional partnerships with Deeds Office

### Questions to Ask

**About Fees:**
- What is your total fee for my property value?
- Are there any additional costs I should expect?
- Do you offer payment plans?
- What happens if the sale falls through?

**About Process:**
- What is the typical transfer timeline?
- How often will you update me on progress?
- Who will handle my file personally?
- What documents do I need to provide?

**About Experience:**
- How many transfers do you complete monthly?
- Have you handled similar properties before?
- Are you registered with the Deeds Office?
- Do you have professional indemnity insurance?

## Ways to Reduce Attorney Fees

### Cost-Saving Strategies

**Shop Around:**
- Get quotes from 3-5 attorneys
- Compare total costs, not just base fees
- Check what's included in quotations
- Negotiate where possible (especially for straightforward transfers)

**Prepare Documentation:**
- Gather required documents early
- Ensure accuracy of all information
- Respond promptly to requests
- Keep organized copies

**Choose Timing Wisely:**
- Avoid year-end rush (November-December)
- Consider off-peak periods (January-October)
- Allow adequate time for process
- Don't rush unnecessarily

**Bundle Services:**
- Use same attorney for bond and transfer (10-15% discount possible)
- Negotiate package deals
- Ask about first-time buyer discounts
- Check for loyalty programs

## Transfer Timeline and Payment Schedule

### Typical Process Duration: 8-12 Weeks

**Week 1-2: Initial Phase**
- Sale agreement signed
- Attorney appointed
- Documents requested
- Rates clearance applied for

**Week 3-6: Processing**
- Deeds Office searches conducted
- Transfer documents prepared
- Transfer duty paid to SARS
- Compliance certificates obtained

**Week 7-10: Registration**
- Documents lodged at Deeds Office
- Examiner review and approval
- Registration processed
- Transfer fees paid

**Week 11-12: Completion**
- Transfer registered
- Keys handed over
- Final documentation provided

### Payment Milestones

**Upon Instruction:**
- Initial deposit: 10-20% of estimated attorney fees
- Rates clearance application fee
- Search fees

**During Process (Weeks 3-6):**
- Transfer duty payment to SARS
- Balance of attorney fees
- Certificate costs
- Deeds Office fees

**On Registration:**
- Final disbursements
- Any outstanding amounts
- Final statement provided

## Common Problems and Solutions

### Transfer Delays

**Causes:**
- Missing documentation
- Rates clearance delays (most common - 4-8 weeks)
- Deeds Office backlogs
- Bond approval pending
- Certificate failures requiring repairs

**Solutions:**
- Submit complete documentation early
- Apply for rates clearance on day 1
- Follow up regularly with attorney
- Schedule certificate inspections immediately
- Maintain communication with all parties

### Fee Disputes

**Common Issues:**
- Unexpected additional charges
- Unclear fee structures
- Disbursement confusion
- Final account discrepancies

**Resolution:**
- Request detailed fee breakdown in writing
- Query specific charges
- Reference initial quotation
- Escalate to Law Society if unresolved

### Communication Problems

**Complaints:**
- Lack of progress updates
- Unreturned calls or emails
- Unclear explanations
- Last-minute surprises

**Solutions:**
- Set communication expectations upfront
- Request regular scheduled updates (weekly)
- Document all correspondence
- Change attorney if necessary (with caution - can cause delays)

## Legal Protections and Your Rights

### Your Rights as a Client

**Transparency:**
- Right to detailed fee quotation
- Access to your file at any time
- Clear explanations of process and costs
- Itemized final account

**Professional Service:**
- Competent legal representation
- Confidentiality of information
- Timely completion of work
- Protection of funds held in trust account

### Attorney Obligations

**Professional Standards:**
- Registration with Law Society of South Africa
- Professional indemnity insurance
- Trust account compliance
- Continuing professional development

**Client Care:**
- Clear written engagement letter
- Regular communication and updates
- Proper file management
- Secure document handling

## Special Circumstances

### First-Time Home Buyers

**Considerations:**
- May qualify for transfer duty exemption (properties under R1.1 million)
- Need extra guidance through the process
- Often require payment plans
- Benefit from detailed explanations

**Special Assistance:**
- Some attorneys offer first-time buyer packages with discounts
- Government FLISP program may subsidize fees
- Banks sometimes cover transfer costs as incentive
- Estate agents may recommend affordable attorneys

### Cash Buyers (No Bond)

**Advantages:**
- Faster transfer process (no bond delays)
- Lower total costs (no bond attorney fees or registration)
- Stronger negotiating position with sellers
- Simplified documentation

**Attorney Fee Implications:**
- May negotiate lower fees
- Quicker turnaround possible (6-8 weeks vs 10-12)
- Fewer disbursements required
- Streamlined process

### Foreign Property Buyers

**Additional Requirements:**
- SARS tax clearance certificate
- South African Reserve Bank exchange control approval
- Additional identity verification
- Potential withholding tax on purchase

**Fee Implications:**
- Higher attorney fees (typically 15-25% more)
- Additional disbursements for compliance
- Extended timeline (12-16 weeks)
- Specialized expertise required

## Tips for a Smooth Transfer Process

### Before Appointing Attorney

**Preparation:**
- Check your credit score
- Get bond pre-approval if financing
- Save for all costs (deposit + fees)
- Research and interview attorneys

**Documentation Gathering:**
- Valid identity documents
- Proof of income (if bond)
- Recent bank statements
- Marriage certificate (if applicable)
- Divorce decree (if applicable)

### During the Process

**Stay Organized:**
- Keep all correspondence in one place
- Track payment deadlines
- Maintain copies of all documents
- Note all communications and dates

**Be Responsive:**
- Reply to attorney requests promptly (same day if possible)
- Provide requested documents quickly
- Make payments on time
- Ask questions when anything is unclear

### After Transfer Registration

**Final Steps:**
- Verify registration at Deeds Office (attorney will confirm)
- Obtain transfer of rates and municipal services
- Update homeowner's insurance
- Keep all transfer documents safe (you'll need them when you sell)

**Future Reference:**
- Store transfer documents securely (original title deed, sale agreement, etc.)
- Keep attorney contact details
- Maintain property file with all certificates
- Note any conditions, servitudes, or restrictions on the property

## Frequently Asked Questions

**Q: Can I choose my own attorney?**
A: Yes, as the buyer you have the right to choose the transferring attorney, though the seller typically recommends one. You're not obligated to use the seller's attorney.

**Q: How long does property transfer take?**
A: Typically 8-12 weeks from sale agreement signing to registration, though this varies based on circumstances.

**Q: Are attorney fees negotiable?**
A: While there are guideline fees, some attorneys may negotiate, especially for straightforward transfers or package deals (transfer + bond).

**Q: What if the sale falls through?**
A: You may be liable for costs incurred up to that point. Check your agreement with the attorney regarding cancellation fees.

**Q: Can I pay attorney fees in installments?**
A: Some attorneys offer payment plans. Discuss this during your initial consultation.

**Q: What's included in the attorney fee quote?**
A: Typically the legal work, but not disbursements like rates clearance, certificates, or Deeds Office fees. Always ask for a breakdown.

## Conclusion

Attorney fees for property transfer are a necessary investment in ensuring your property purchase is legally sound. By understanding the fee structure, what's included, and how to choose the right attorney, you can budget appropriately and ensure a smooth transfer process.

**Key Takeaways:**
- Budget 1-2% of property value for attorney fees
- Get detailed quotations from 3-5 attorneys before choosing
- Ensure clear communication and service expectations
- Prepare documentation early to avoid delays
- Know your rights and the attorney's obligations
- Consider package deals for transfer and bond registration

**Take Action:**
1. Research and contact 3-5 conveyancing attorneys
2. Request detailed fee quotations with breakdown
3. Check attorney credentials, reviews, and registration
4. Schedule consultations before making your decision
5. Choose based on value, not just lowest price

For related information, see our guides on Property Transfer Costs and Property Transfer Timeline.`;

console.log('🚀 Starting Property articles upload...\n');

async function uploadArticles() {
  try {
    const articles = [
      {
        title: "Attorney Fees for Property Transfer in South Africa 2025",
        slug: "attorney-fees-property-transfer-south-africa",
        excerpt: "Complete guide to attorney fees for property transfer in South Africa. Learn about conveyancing costs, what's included, how to save money, and what to expect when buying property.",
        content: article1Content,
        category: "Property",
        author: "Property Expert",
        featured_image: PROPERTY_IMAGES[0],
        seo_keywords: [
          "attorney fees property transfer",
          "conveyancing fees south africa",
          "property transfer attorney costs",
          "conveyancing attorney fees 2025",
          "property transfer costs",
          "deeds office fees",
          "conveyancing process",
          "property attorney fees",
          "conveyancing attorney south africa",
          "property transfer lawyer fees",
          "attorney fees buying property",
          "transfer costs south africa"
        ],
        reading_time: 18,
        is_published: true,
        published_at: Timestamp.now(),
        created_at: Timestamp.now(),
        updated_at: Timestamp.now()
      }
    ];

    for (const [index, article] of articles.entries()) {
      console.log(`\n📝 Article ${index + 1}/1: ${article.title}`);
      console.log(`   Slug: ${article.slug}`);
      
      const htmlContent = marked(article.content);
      console.log(`   ✓ Converted to HTML (${htmlContent.length} chars)`);
      
      const articleData = { ...article, content: htmlContent };
      const docRef = await addDoc(collection(db, 'articles'), articleData);
      
      console.log(`   ✅ Uploaded! ID: ${docRef.id}`);
    }

    console.log(`\n\n✨ Successfully uploaded 1 Property article!`);
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

uploadArticles();
