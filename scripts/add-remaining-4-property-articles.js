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
  property: [
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&h=800&fit=crop"
  ]
};

const articles = [
  {
    title: "Bond Costs vs Transfer Costs: Complete Comparison Guide 2025",
    slug: "bond-costs-vs-transfer-costs-south-africa",
    excerpt: "Understand the difference between bond costs and transfer costs when buying property. Complete breakdown of all fees, who pays what, and how to budget for your property purchase.",
    content: `# Bond Costs vs Transfer Costs: Complete Comparison 2025

Understanding the difference between bond costs and transfer costs is essential for accurate property budgeting in South Africa.

## The Key Difference

**Transfer Costs:** Expenses to legally transfer property ownership from seller to buyer. Always paid by buyer.

**Bond Costs:** Expenses to register a mortgage bond when financing your purchase. Only if taking a home loan.

## Transfer Costs Breakdown

### 1. Transfer Duty (Tax to SARS)

**2025 Rates:**
- R0 - R1,100,000: 0% (exempt)
- R1,100,001 - R1,512,500: 3% on amount above R1.1m
- R1,512,501 - R2,117,500: 3-6% progressive
- R2,117,501 - R2,722,500: 3-8% progressive
- Above R2,722,501: Up to 13% on highest bracket

**Examples:**
- R900,000 property: R0 transfer duty
- R1,300,000 property: R6,000 transfer duty
- R2,000,000 property: R41,625 transfer duty
- R3,000,000 property: R119,275 transfer duty

### 2. Conveyancing Attorney Fees

**2025 Guide:**
- R500,000 property: R9,000 - R13,000 (incl VAT)
- R1,000,000 property: R14,000 - R20,000 (incl VAT)
- R2,000,000 property: R21,000 - R28,000 (incl VAT)
- R3,000,000+: R28,000+ (incl VAT)

### 3. Additional Transfer Costs

- Rates clearance: R1,500 - R2,500
- Electrical compliance: R800 - R1,500
- Plumbing compliance: R800 - R1,200
- Beetle certificate: R800 - R1,500
- Deeds Office fees: R450 - R800
**Total additional: R5,000 - R9,000**

## Bond Costs Breakdown

### 1. Bond Registration Fees

Based on loan amount:
- R500,000 bond: R5,000 - R8,000 (incl VAT)
- R1,000,000 bond: R8,000 - R11,500 (incl VAT)
- R2,000,000 bond: R12,000 - R17,000 (incl VAT)

### 2. Bank Initiation Fees

- Standard fee: R5,000 - R6,500
- Fixed regardless of bond amount
- Once-off payment

### 3. Valuation Fees

- Standard properties: R3,000 - R5,000
- Sectional title: R3,500 - R5,500
- Larger properties: R6,000+

**Total Bond Costs: R15,000 - R35,000 depending on bond amount**

## Cost Comparison Examples

### Example 1: R1,000,000 Property (100% Bond)

**Transfer Costs:**
- Transfer duty: R0 (exempt)
- Attorney: R15,000
- Certificates: R6,000
- Deeds Office: R600
**Total Transfer: R21,600**

**Bond Costs:**
- Registration: R9,500
- Initiation: R5,750
- Valuation: R4,000
**Total Bond: R19,250**

**GRAND TOTAL: R40,850**

### Example 2: R2,000,000 Property (80% Bond)

**Transfer Costs:**
- Transfer duty: R41,625
- Attorney: R23,000
- Certificates: R7,000
- Deeds Office: R700
**Total Transfer: R72,325**

**Bond Costs (R1.6m):**
- Registration: R13,500
- Initiation: R6,000
- Valuation: R4,500
**Total Bond: R24,000**

**Deposit Required: R400,000**
**GRAND TOTAL: R496,325**

### Example 3: R1,000,000 Cash Purchase

**Transfer Costs Only:**
- Transfer duty: R0
- Attorney: R15,000
- Certificates: R6,000
- Deeds Office: R600
**Total: R21,600**

**Bond Costs: R0**
**SAVES: R19,250 vs financed purchase**

## Who Pays What?

**Buyer Pays:**
- ALL transfer costs
- ALL bond costs (if financing)
- All certificates
- Transfer duty

**Seller Pays:**
- Estate agent commission (5-7% + VAT)
- Bond cancellation (if applicable)
- Rates shortfall (if any)

## Ways to Reduce Costs

**Transfer Costs:**
- Buy under R1.1m (zero transfer duty)
- Shop around for attorneys (get 3-5 quotes)
- Use same attorney for transfer and bond (10-15% discount)
- Provide documents promptly

**Bond Costs:**
- Larger deposit = lower bond = lower costs
- Negotiate initiation fees
- Shop multiple banks
- Good credit score helps

## Frequently Asked Questions

**Q: Can I include these costs in my bond?**
A: Usually no. Most banks require separate payment, though 105% bonds exist in special cases.

**Q: Do I pay VAT on everything?**
A: VAT applies to attorney fees, not transfer duty or most Deeds Office fees.

**Q: Can the seller pay some costs?**
A: Negotiable but uncommon. Buyers typically pay all.

**Q: How much should I budget?**
A: Budget 4-6% of property value for total costs.

## Conclusion

Transfer costs are unavoidable for all buyers. Bond costs only apply when financing. Cash buyers save significantly.

**Key Takeaways:**
- Transfer costs: Always apply (R15k - R150k+)
- Bond costs: Only if financing (R15k - R35k)
- Budget 10-15% extra as contingency
- Shop around for best rates
- Start process early

For calculators, see our Property Transfer Cost Calculator and Bond Cost Calculator tools.`,
    category: "Property",
    author: "Property Expert",
    featured_image: IMAGES.property[0],
    seo_keywords: ["bond costs vs transfer costs", "property transfer costs", "bond registration fees", "transfer duty", "conveyancing fees", "property buying costs", "transfer costs calculator", "bond costs calculator", "property purchase costs south africa", "transfer vs bond fees", "home loan costs", "property transfer fees 2025"],
    reading_time: 15,
    is_published: true,
    published_at: Timestamp.now(),
    created_at: Timestamp.now(),
    updated_at: Timestamp.now()
  },
  {
    title: "How to Avoid Property Transfer Delays in South Africa",
    slug: "avoid-property-transfer-delays-south-africa",
    excerpt: "Essential guide to avoiding property transfer delays. Learn what causes delays, how to prevent them, and what to do when transfers take too long.",
    content: `# How to Avoid Property Transfer Delays in South Africa

Property transfer delays are frustrating and costly. This guide shows you how to avoid them.

## Normal Transfer Timeline

**Standard Process: 8-12 Weeks**

- Weeks 1-2: Initial setup, document collection
- Weeks 3-6: Processing, certificates, bond approval
- Weeks 7-10: Deeds Office registration
- Weeks 11-12: Completion and key handover

**Reality:** Many transfers take 12-16 weeks due to complications.

## Top 10 Causes of Delays

### 1. Rates Clearance Delays (Biggest Problem)

**Timeline:** 4-8 weeks, sometimes longer

**Causes:**
- Municipality backlogs
- Outstanding municipal debt
- Incorrect account information
- Lost applications

**Prevention:**
- Apply on day 1 (don't wait)
- Ensure all rates paid up to date
- Follow up weekly
- Use attorney's contacts to expedite

### 2. Missing Documentation

**Common Issues:**
- Outdated ID documents
- Missing marriage certificates
- Unsigned forms
- Incomplete FICA documents

**Prevention:**
- Submit ALL documents immediately when requested
- Ensure certified copies are current
- Double-check accuracy
- Keep backup copies ready

### 3. Compliance Certificate Failures

**Problems:**
- Electrical non-compliance
- Plumbing issues
- Beetle infestation found
- Delayed inspector bookings

**Prevention:**
- Schedule inspections in week 1
- Address known issues before selling
- Book follow-up inspections immediately if failures occur
- Use reputable inspectors

### 4. Bond Approval Delays

**Causes:**
- Incomplete applications
- Credit problems
- Missing financial documents
- Bank processing delays

**Prevention:**
- Get bond pre-approval BEFORE making offer
- Submit complete application day 1
- Respond to bank queries same day
- Maintain good credit

### 5. Deeds Office Backlogs

**Peak Periods:**
- November-December (year-end rush)
- Mid-year (June-July)

**Prevention:**
- Avoid buying during peak periods
- Ensure perfect documentation
- Lodge early in week, early in day
- Use experienced attorneys

### 6. Title Deed Complications

**Issues:**
- Existing bonds not cancelled
- Servitudes not registered
- Deceased estate complications
- Sectional title problems

**Prevention:**
- Check title deed BEFORE making offer
- Ensure seller starts bond cancellation early
- Conduct thorough due diligence
- Verify all documentation

### 7. Attorney Delays

**Problems:**
- Overworked attorneys
- Poor communication
- Administrative errors
- Inexperience

**Prevention:**
- Choose experienced conveyancing specialists
- Check attorney workload capacity
- Establish weekly update schedule
- Change attorney if necessary (last resort)

### 8. Seller Issues

**Typical Problems:**
- Slow document provision
- Unpaid bills
- Delayed bond cancellation
- Unrealistic expectations

**Prevention:**
- Include penalty clauses in sale agreement
- Request documentation upfront
- Verify seller's readiness to proceed
- Set clear deadlines

### 9. Body Corporate Delays (Sectional Title)

**Issues:**
- Unpaid levies
- Missing clearance certificates
- Management company delays
- Pending litigation

**Prevention:**
- Request clearance early (week 1)
- Verify levy payments current
- Check for special levies
- Communicate with trustees directly if needed

### 10. FICA Compliance Issues

**Problems:**
- Incomplete documentation
- Foreign buyer complications
- Source of funds verification
- Company/trust purchases

**Prevention:**
- Complete FICA comprehensively
- Provide source of funds evidence early
- Foreign buyers: start documentation 8-12 weeks early
- Be transparent

## Your Action Plan

### Week 1: Immediate Actions

**Day 1-2:**
- Appoint attorney
- Submit ALL documents
- Apply for rates clearance
- Submit bond application
- Schedule compliance inspections

**Day 3-7:**
- Pay attorney deposit
- Follow up on rates clearance
- Confirm bond application received
- Verify inspections booked
- Review sale agreement conditions

### Week 2-4: Active Monitoring

**Weekly Tasks:**
- Follow up with attorney (set specific day)
- Check rates clearance progress
- Monitor bond application status
- Track certificate progress
- Respond to requests same day

### Week 5-8: Pre-Registration

**Critical Actions:**
- Confirm rates clearance received
- Verify all certificates approved
- Ensure bond approval finalized
- Check transfer duty paid
- Confirm documents ready for Deeds Office

### Week 9-12: Registration

**Final Steps:**
- Confirm documents lodged
- Track examiner progress
- Be available for queries
- Prepare final payments
- Coordinate key handover

## Red Flags

**Warning Signs:**
- No response from attorney for 3+ days
- Missing agreed deadlines repeatedly
- Vague or evasive answers
- Rates clearance taking 6+ weeks
- No progress updates

**Action:** Escalate immediately. Don't wait.

## What to Do When Delayed

### Step 1: Identify Exact Cause

Get specifics:
- Which party is causing delay?
- What document/requirement is outstanding?
- What timeline to resolve?
- Who must take action?

### Step 2: Create Action Plan

**For Document Issues:**
- Obtain correct documents same day
- Use courier for speed
- Get certified copies in advance

**For Rates Clearance:**
- Pay outstanding amounts immediately
- Follow up daily with municipality
- Escalate to municipal manager
- Contact ward councillor if excessive

**For Bond Delays:**
- Provide additional documents immediately
- Consider alternative lenders
- Escalate to bank manager

**For Compliance Failures:**
- Get repairs done immediately
- Use registered contractors
- Schedule re-inspection ASAP

### Step 3: Escalate Appropriately

**Level 1:** Direct contact (attorney, bank, municipality)
**Level 2:** Supervisors (Law Society, bank manager, municipal manager)
**Level 3:** Formal complaints (ombudsman, legal action)

## Cost of Delays

**Financial Impact:**

2-month delay on R2m property:
- Extra rent: R16,000
- Lost rental income: R20,000
- Stress and time: Priceless

**TOTAL COST: R36,000+**

## Special Circumstances

### Foreign Buyers

**Extra time needed:** 16-20 weeks
**Start early:** Tax clearance takes 4-8 weeks

### Estate Sales

**Extra time needed:** 16-24 weeks
**Verify:** Executor has authority, Letters of Executorship received

### Company/Trust Purchases

**Extra time needed:** 12-16 weeks
**Prepare:** All entity documents, resolutions, authorized signatories

## Frequently Asked Questions

**Q: Can I speed up my transfer?**
A: You can't force institutions, but you can ensure YOU don't cause delays by submitting everything perfectly and promptly.

**Q: What's the quickest possible transfer?**
A: In ideal circumstances, 6-8 weeks, but 8-12 weeks is realistic.

**Q: Can I move in before registration?**
A: Not recommended unless formal occupational rent agreement signed. No legal rights until registration.

**Q: What if transfer takes 6 months?**
A: Check sale agreement for cancellation clauses. Escalate to Law Society. Consider legal advice.

## Conclusion

Avoiding delays requires proactive management, perfect documentation, and persistent follow-up.

**Key Success Factors:**
- Submit all documentation immediately and perfectly
- Apply for rates clearance on day 1
- Follow up weekly with all parties
- Respond to requests same day
- Use experienced professionals
- Avoid peak periods

**Take Action:**
- Create document checklist
- Set up tracking system
- Establish communication schedule
- Start rates clearance immediately
- Schedule inspections week 1

For related guides, see Property Transfer Costs and Property Transfer Timeline.`,
    category: "Property",
    author: "Property Expert",
    featured_image: IMAGES.property[1],
    seo_keywords: ["property transfer delays", "avoid transfer delays", "property registration delays", "rates clearance delays", "deeds office delays", "property transfer timeline", "speed up property transfer", "transfer taking too long", "property transfer problems", "conveyancing delays", "property purchase delays", "transfer delays south africa"],
    reading_time: 14,
    is_published: true,
    published_at: Timestamp.now(),
    created_at: Timestamp.now(),
    updated_at: Timestamp.now()
  },
  {
    title: "Property Transfer Cost Calculator Guide South Africa 2025",
    slug: "property-transfer-cost-calculator-guide",
    excerpt: "Complete guide to calculating property transfer costs. Understand transfer duty, attorney fees, bond costs, and all additional expenses with detailed examples.",
    content: `# Property Transfer Cost Calculator Guide 2025

Accurately calculating property transfer costs is essential for budgeting your property purchase.

## Total Cost Overview

**Main Categories:**
1. Transfer costs (unavoidable)
2. Bond costs (if financing)
3. Additional costs

**Typical Ranges:**
- R500,000 property: R25,000 - R45,000
- R1,000,000 property: R35,000 - R65,000
- R2,000,000 property: R80,000 - R130,000
- R3,000,000 property: R140,000 - R195,000

## Transfer Duty Calculator

### 2025 Rate Structure

**Progressive Tax Scale:**

R0 - R1,100,000: 0% (exempt)
R1,100,001 - R1,512,500: 3% on excess over R1.1m
R1,512,501 - R2,117,500: R12,375 + 6% on excess
R2,117,501 - R2,722,500: R48,675 + 8% on excess
R2,722,501 - R12,500,000: R97,075 + 11% on excess
Above R12,500,000: 13% on excess

### Calculation Examples

**R900,000 Property:**
Under R1.1m threshold
Transfer duty = R0

**R1,300,000 Property:**
First R1,100,000: R0
Balance R200,000 at 3%: R6,000
Transfer duty = R6,000

**R2,000,000 Property:**
First R1,100,000: R0
Next R412,500 at 3%: R12,375
Balance R487,500 at 6%: R29,250
Transfer duty = R41,625

**R3,000,000 Property:**
First R1,100,000: R0
Next R412,500 at 3%: R12,375
Next R605,000 at 6%: R36,300
Balance R882,500 at 8%: R70,600
Transfer duty = R119,275

**R5,000,000 Property:**
Progressive calculation
Transfer duty = R347,600

## Attorney Fees Calculator

### Fee Structure by Property Value

**R0 - R500,000:**
Base: R8,000 - R12,000
Plus VAT (15%)
Total: R9,200 - R13,800

**R500,001 - R1,000,000:**
Base: R12,000 - R18,000
Plus VAT (15%)
Total: R13,800 - R20,700

**R1,000,001 - R2,000,000:**
Base: R18,000 - R25,000
Plus VAT (15%)
Total: R20,700 - R28,750

**R2,000,001+:**
Base: R25,000+
Negotiable
Plus VAT (15%)

### Examples with VAT

**R800,000 Property:**
Base: R14,000 (1.75%)
VAT: R2,100
Total: R16,100

**R1,500,000 Property:**
Base: R21,000 (1.4%)
VAT: R3,150
Total: R24,150

**R3,000,000 Property:**
Base: R33,000 (1.1%)
VAT: R4,950
Total: R37,950

## Bond Registration Calculator

### Fee Structure by Bond Amount

**R0 - R500,000:**
Base: R4,500 - R7,000
Average: R5,750

**R500,001 - R1,000,000:**
Base: R7,000 - R10,000
Average: R8,500

**R1,000,001 - R2,000,000:**
Base: R10,000 - R15,000
Average: R12,500

**R2,000,001 - R5,000,000:**
Base: R15,000 - R25,000
Average: R20,000

### Bond Cost Examples

**R750,000 Bond:**
Registration: R8,000 + VAT
Initiation: R5,750
Valuation: R3,500
Total: R18,450

**R1,600,000 Bond:**
Registration: R13,000 + VAT
Initiation: R6,000
Valuation: R4,000
Total: R24,950

**R2,500,000 Bond:**
Registration: R18,000 + VAT
Initiation: R6,500
Valuation: R4,500
Total: R31,700

## Complete Cost Examples

### Scenario 1: R1,000,000 with 100% Bond

**Transfer Costs:**
Transfer duty: R0
Attorney: R15,000
VAT: R2,250
Certificates: R5,000
Deeds Office: R600
**Subtotal: R22,850**

**Bond Costs:**
Registration: R8,500 + R1,275 VAT
Initiation: R5,750
Valuation: R3,500
**Subtotal: R19,025**

**Additional:**
Insurance: R1,200
Moving: R3,000
**Subtotal: R4,200**

**GRAND TOTAL: R46,075**

### Scenario 2: R2,000,000 with 80% Bond

**Property:** R2,000,000
**Deposit:** R400,000 (20%)
**Bond:** R1,600,000

**Transfer Costs:**
Transfer duty: R41,625
Attorney: R23,000 + R3,450 VAT
Certificates: R6,000
Deeds Office: R700
**Subtotal: R74,775**

**Bond Costs:**
Registration: R13,000 + R1,950 VAT
Initiation: R6,000
Valuation: R4,000
**Subtotal: R24,950**

**Additional:**
Insurance: R2,000
Moving: R5,000
**Subtotal: R7,000**

**UPFRONT COSTS:**
Deposit: R400,000
Transfer: R74,775
Bond: R24,950
Additional: R7,000
**TOTAL: R506,725**

### Scenario 3: R1,000,000 Cash Purchase

**Transfer Costs:**
Transfer duty: R0
Attorney: R15,000 + R2,250 VAT
Certificates: R5,000
Deeds Office: R600
**Subtotal: R22,850**

**Bond Costs:** R0 (cash purchase)

**Additional:**
Insurance: R1,200
Moving: R3,000
**Subtotal: R4,200**

**Purchase price: R1,000,000**
**TOTAL: R1,027,050**

**SAVINGS vs Financed:** R19,025 (no bond costs)

## Additional Costs Breakdown

### Compliance Certificates

- Electrical: R800 - R1,500
- Plumbing: R800 - R1,200
- Beetle: R800 - R1,500
- Gas (if applicable): R800 - R1,200

**Total: R3,200 - R6,700**

### Municipal and Administrative

- Rates clearance: R1,500 - R2,500
- Deeds Office registration: R450 - R800
- Searches: R200 - R400

**Total: R2,150 - R3,700**

### Insurance

- Homeowner's (buildings): Mandatory for bonds
- Monthly: R800 - R3,000
- Initial payment: 1-2 months upfront

### Moving and Setup

- Moving services: R2,000 - R15,000
- Connection fees: R200 - R1,000
- Initial repairs: R1,000 - R10,000

## Cost-Saving Strategies

### Reduce Transfer Duty

- Buy under R1.1m (zero duty)
- First-time buyer incentives
- Check for exemptions

### Reduce Attorney Fees

- Get 3-5 quotes
- Package deal (transfer + bond): 10-15% discount
- Negotiate straightforward transfers
- Provide documents early

### Reduce Bond Costs

- Larger deposit = lower bond = lower fees
- Shop multiple banks
- Negotiate initiation fees
- Good credit score

### Reduce Additional Costs

- Shop for certificate providers
- Bundle certificates
- DIY moving (if practical)
- Time purchase during off-peak

## Budget Template

**Create Spreadsheet with:**

1. Transfer duty (calculated)
2. Attorney fees + VAT
3. Rates clearance
4. Electrical certificate
5. Plumbing certificate
6. Beetle certificate
7. Gas certificate (if needed)
8. Deeds Office fees
9. Bond registration + VAT (if applicable)
10. Bank initiation (if applicable)
11. Valuation (if applicable)
12. Insurance (first payment)
13. Moving costs
14. Connection fees
15. Contingency (10-15%)

**TOTAL BUDGET**

## Frequently Asked Questions

**Q: Can I include costs in my bond?**
A: Usually no. Banks require separate payment, though 105-110% bonds exist in special cases.

**Q: Do I pay VAT on everything?**
A: VAT on attorney fees and services, NOT on transfer duty or Deeds Office fees.

**Q: When do I pay?**
A: Throughout the process - deposits early, transfer duty mid-process, balance on registration.

**Q: Can seller pay any costs?**
A: While negotiable, it's uncommon. Buyers typically pay all transfer and bond costs.

**Q: How accurate are online calculators?**
A: They provide estimates. Get formal quotations for your specific situation.

## Conclusion

Accurate cost calculation requires understanding all components and getting formal quotations.

**Key Takeaways:**
- Budget 4-6% of property value for total costs
- Transfer duty is largest single cost (if over R1.1m)
- Bond costs add R15k-R35k if financing
- Add 10-15% contingency buffer
- Get quotes from multiple providers

**Next Steps:**
1. Use this guide to estimate costs
2. Create detailed budget spreadsheet
3. Get quotes from 3-5 attorneys
4. Compare bank offers if financing
5. Add contingency buffer

For detailed calculators, use our Property Transfer Cost Calculator and Bond Cost Calculator tools.`,
    category: "Property",
    author: "Property Expert",
    featured_image: IMAGES.property[2],
    seo_keywords: ["property transfer cost calculator", "transfer costs calculator", "calculate property costs", "transfer duty calculator", "bond costs calculator", "property transfer fees", "conveyancing costs calculator", "transfer costs 2025", "property buying costs", "attorney fees calculator", "bond registration calculator", "property cost estimator"],
    reading_time: 16,
    is_published: true,
    published_at: Timestamp.now(),
    created_at: Timestamp.now(),
    updated_at: Timestamp.now()
  },
  {
    title: "Property Transfer After Death: Complete Estate Guide South Africa",
    slug: "property-transfer-after-death-estate-guide",
    excerpt: "Complete guide to transferring property from deceased estates. Understand executor duties, estate processes, timelines, costs, and requirements.",
    content: `# Property Transfer After Death: Estate Guide South Africa

Transferring property from a deceased estate involves specific legal processes. This guide explains everything executors, heirs, and beneficiaries need to know.

## How Estate Property Transfer Differs

### Normal Transfer vs Estate Transfer

**Normal Transfer:**
- Between living parties
- 8-12 week timeline
- Seller signs documents
- Straightforward

**Estate Transfer:**
- From estate to heir/beneficiary
- 6-18 month timeline
- Executor signs (not deceased or heirs)
- Master of High Court involved
- More complex documentation
- Possible estate duty

### Who Can Transfer

**Only the Executor** with:
- Letters of Executorship from Master of High Court
- Legal authority to act for estate
- Duty to protect heirs' interests

**Not Permitted:**
- Heirs cannot transfer
- Family members cannot sign
- Spouses cannot transfer (unless also executor)

## Property Scenarios

### 1. Property in Deceased's Name Only

**Most Common:**
- Property solely in deceased's name
- Forms part of estate
- Goes through full estate administration
- Transferred by executor to heir

### 2. Property in Joint Names

**Tenants in Common (Most Common in SA):**
- Each owns specific share (usually 50/50)
- Deceased's share goes through estate
- Surviving owner keeps their share

**Example:** 
Husband and wife own 50/50. Husband dies. His 50% goes through estate to beneficiaries. Wife keeps her 50%.

### 3. Property with Bond

**Complications:**
- Outstanding bond must be settled or assumed
- Bank must consent
- Options:
  1. Pay off from estate
  2. Heir takes over (credit approval needed)
  3. Sell property to settle

### 4. Will vs Intestate

**With Valid Will:**
- Property to specified beneficiary
- Executor follows will
- Clear, straightforward
- Faster

**Died Intestate (No Will):**
- Intestate Succession Act applies
- Legal formula for distribution
- Typically to spouse and children
- More complex, takes longer

## Estate Administration Process

### Phase 1: Death and Initial Steps (Weeks 1-4)

**Immediate Actions:**

- Register death, obtain certificate
- Secure property (change locks, notify insurance)
- Continue bond payments
- Notify banks, bond holder, municipality
- Locate title deeds and will
- Identify all estate assets

### Phase 2: Executor Appointment (Weeks 2-8)

**With Will:**
- Named executor applies to Master
- Submit will, death certificate, inventory
- Letters of Executorship issued (4-8 weeks)

**Without Will:**
- Interested party applies
- Master appoints suitable person
- Letters issued (6-10 weeks)

**Executor Duties Begin:**
- Control estate assets
- Prepare inventory
- Advertise for creditors
- Pay estate debts
- Prepare liquidation account

### Phase 3: Estate Administration (Months 2-12)

**Asset Management:**
- Value all assets including property
- Obtain professional valuations
- Maintain property
- Pay rates, taxes, bond
- Keep property insured

**Creditor Process:**
- Advertise for creditors (legal requirement)
- Wait 30+ days for claims
- Verify and settle valid claims
- Dispute invalid claims

**Account Preparation:**
- Prepare liquidation and distribution account
- Detail all assets and liabilities
- Show proposed distribution
- Calculate estate duty (if applicable)

**Master Approval:**
- Submit account to Master
- Address queries
- Obtain approval
- Advertise account (14-21 days)

### Phase 4: Property Transfer (Months 6-18)

**Once Master Approves:**
- Executor instructs conveyancing attorney
- Property transferred to beneficiary
- Executor signs (not deceased or heir)
- New title deed issued

**Required Documents:**
- Letters of Executorship
- Death certificate
- Master's approval of account
- Will (if applicable)
- Beneficiary ID documents
- Tax clearance

## Timeline

### Simple Estate (Will, No Disputes)

- Months 1-2: Death registration, executor appointment
- Months 2-6: Estate administration, creditors
- Months 6-9: Account preparation, Master approval
- Months 9-12: Property transfer registration

**Total: 12-15 months**

### Complex Estate (No Will, Disputes)

- Months 1-3: Death registration, executor appointment
- Months 3-9: Administration, dispute resolution
- Months 9-15: Account, Master approval
- Months 15-18: Transfer registration

**Total: 18-24 months**

**Delay Factors:**
- No will
- Heir disputes
- Creditor claims
- Estate duty calculations
- Master's office backlogs
- Outstanding bonds
- Missing heirs

## Costs

### Executor Fees

**Regulated Rates:**
- 3.5% + VAT on first R250,000
- 6% + VAT on balance
- Based on total estate value

**Example - R2,000,000 Estate:**
First R250,000 at 3.5%: R8,750
Balance R1,750,000 at 6%: R105,000
Subtotal: R113,750
VAT (15%): R17,063
**Total: R130,813**

Note: Sole heir executors may waive fees.

### Property Transfer Costs

**Transfer Duty:** Same rates as normal transfers

**Attorney Fees:** 20-30% higher than normal due to complexity

**Example - R1,500,000 Property:**
Normal: R21,000
Estate: R27,000 - R30,000
Plus VAT

**Additional:**
- Rates clearance: R1,500 - R2,500
- Certificates: R3,000 - R6,000
- Deeds Office: R600 - R1,000
- Master's fees: R600

### Estate Duty

**2025 Rates:**
- First R3,500,000: Exempt
- Balance: 20%
- Above R30,000,000: Additional 5% (25% total)

**Example - R5,000,000 Estate:**
Exempt: R3,500,000
Taxable: R1,500,000
Duty at 20%: R300,000

**Surviving Spouse:**
- Unlimited spousal deduction
- No estate duty on assets to spouse
- Rolls to spouse's estate

### Total Cost Example

**R2,000,000 Estate Property:**
- Executor fees: R130,813
- Estate duty: R100,000 (if applicable)
- Transfer duty: R41,625
- Attorney: R34,500
- Certificates: R5,000
- Additional: R3,000

**TOTAL: R314,938**

Costs paid from estate before distribution.

## Special Scenarios

### Surviving Spouse Inherits

**Advantages:**
- No estate duty (spousal exemption)
- Reduced/no transfer duty
- Simplified process
- Faster timeline

### Minor Children Inherit

**Complications:**
- Minors can't own property directly
- Guardian appointed
- Trust or guardian holds property
- Transfer when child turns 18, or
- Property sold, proceeds held in trust

### Multiple Heirs

**Options:**

1. **Transfer to All:** Property registered in all names (e.g., 3 children = 33.33% each). All must agree on decisions.

2. **One Buys Out Others:** Property to one heir, they pay others their share. Valuation required.

3. **Sell Property:** Executor sells, proceeds distributed. Often preferred.

### Property with Tenants

**Considerations:**
- Rental income to estate
- Tenants' rights continue
- Leases remain valid
- New owner assumes landlord duties

## How Heirs Can Help

### Speed Up Process

**Provide Quickly:**
- ID documents
- Marriage certificates
- Proof of residence
- Banking details

**Cooperate:**
- Respond to communications promptly
- Attend meetings
- Sign documents without delay
- Don't create disputes

**Pay Costs (If Needed):**
- If costs exceed estate funds
- Particularly bond payments
- Or transfer costs

**Maintain Property:**
If living in estate property:
- Pay utilities
- Maintain insurance
- Don't make major changes
- Respect other heirs

### Protect Your Rights

**Understand Entitlement:**
- Read will carefully
- Know intestate succession rules
- Understand your share

**Monitor Executor:**
- Request estate information
- See liquidation account
- Query transactions
- Complain to Master if misconduct

**Object If Necessary:**
- Object to incorrect account
- Dispute unfair distribution
- Report misconduct
- Seek legal advice

## Common Problems

### Problem 1: Executor Delays

**Signs:** Months passing, no progress, unreturned calls

**Solutions:**
- Formal letter requesting timeline
- Request status report
- Complain to Master
- Apply to remove executor (extreme)

### Problem 2: Property Deterioration

**Risk:** Empty property falling into disrepair

**Solutions:**
- Heirs maintain temporarily
- Executor arranges maintenance from estate
- Rent property temporarily
- Ensure adequate insurance

### Problem 3: Heir Disputes

**Issues:** Who gets property, valuation disagreements, cost sharing

**Solutions:**
- Mediation
- Independent valuation
- Legal advice
- Master's intervention

### Problem 4: Outstanding Bond

**Challenge:** Property worth less than bond

**Solutions:**
- Negotiate with bank
- Sell property (even at loss)
- Heirs top up shortfall
- Bank may write off (rare)

## Tax Considerations

### Income Tax

- Executor files deceased's final return
- Rental income taxable to estate until transfer

### Capital Gains Tax

**On Estate Property:**
- Primary residence: Usually no CGT
- Investment property: CGT may apply
- Calculated from acquisition to death
- Payable from estate

**On Heir Receiving:**
- No CGT when inheriting
- New base cost = market value at death
- CGT only when heir eventually sells

### Estate Duty

- 20% on estates over R3.5m
- Spousal exemption available
- Payable before transfer

## Frequently Asked Questions

**Q: Can we sell before transfer complete?**
A: Yes, executor can sell estate property. Proceeds distributed per will/law.

**Q: What if heirs can't afford costs?**
A: Pay from estate, heirs contribute proportionally, sell property, or bank may finance.

**Q: How long do we have?**
A: No specific deadline, but aim for 12-18 months. Delays cause complications.

**Q: Can we rent it out?**
A: Yes, executor can rent estate property. Income forms part of estate.

**Q: What if will is disputed?**
A: Estate pauses until resolved. Can take months to years. Transfer delayed.

**Q: Do we need attorney?**
A: Yes, attorney must handle property transfer from estate. Executor cannot do this themselves.

## Conclusion

Estate property transfer is complex but follows clear legal process. Understanding steps, timelines, and costs helps everyone navigate smoothly.

**Key Takeaways:**
- Only appointed executor can transfer
- Process takes 12-18 months average
- Costs include executor fees, estate duty, transfer costs
- Master of High Court oversees
- Heirs help by cooperating and providing documents

**Executor Action Steps:**
1. Register death, obtain certificate
2. Secure property
3. Locate will and title deeds
4. Apply for Letters of Executorship
5. Appoint conveyancing attorney early

**Heir Action Steps:**
1. Cooperate fully
2. Provide all documents
3. Understand your entitlement
4. Be patient - takes time
5. Seek legal advice if needed

For related guides, see Property Transfer Costs and Estate Planning Guide.`,
    category: "Property",
    author: "Property Expert",
    featured_image: IMAGES.property[3],
    seo_keywords: ["property transfer after death", "deceased estate property", "transfer property from estate", "executor property transfer", "estate property transfer south africa", "property inheritance", "deceased estate administration", "letters of executorship property", "estate property costs", "property transfer deceased", "inherited property transfer", "estate duty on property"],
    reading_time: 18,
    is_published: true,
    published_at: Timestamp.now(),
    created_at: Timestamp.now(),
    updated_at: Timestamp.now()
  }
];

async function uploadArticles() {
  console.log('🚀 Uploading 4 Property articles...\n');
  
  try {
    for (const [index, article] of articles.entries()) {
      console.log(`\n📝 Article ${index + 1}/4: ${article.title}`);
      console.log(`   Slug: ${article.slug}`);
      
      const htmlContent = marked(article.content);
      console.log(`   ✓ Converted to HTML (${htmlContent.length} chars)`);
      
      const articleData = { ...article, content: htmlContent };
      const docRef = await addDoc(collection(db, 'articles'), articleData);
      
      console.log(`   ✅ Uploaded! ID: ${docRef.id}`);
    }
    
    console.log(`\n\n✨ Successfully uploaded 4 Property articles!`);
    console.log('\n📊 Articles uploaded:');
    console.log('   1. Bond Costs vs Transfer Costs (15 min)');
    console.log('   2. Avoid Property Transfer Delays (14 min)');
    console.log('   3. Property Transfer Cost Calculator (16 min)');
    console.log('   4. Property Transfer After Death (18 min)');
    
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

uploadArticles();
