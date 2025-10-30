// scripts/update-and-add-property-articles.js
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, query, where, getDocs, updateDoc, doc, addDoc, Timestamp } = require('firebase/firestore');

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

const PROPERTY_IMAGE = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop";

// Update existing articles
async function updateExistingArticles() {
  console.log('Updating existing property articles with correct image...\n');

  const articlesRef = collection(db, 'articles');
  const q = query(articlesRef, where('category', '==', 'Property'));
  const querySnapshot = await getDocs(q);

  let updated = 0;
  for (const docSnapshot of querySnapshot.docs) {
    const articleRef = doc(db, 'articles', docSnapshot.id);
    await updateDoc(articleRef, {
      featured_image: PROPERTY_IMAGE,
      updated_at: Timestamp.now()
    });
    console.log(`✅ Updated: ${docSnapshot.data().title}`);
    updated++;
  }

  console.log(`\n${updated} articles updated with property image\n`);
}

// New articles to add (Articles 3 & 4)
const newArticles = [
  {
    title: "First-Time Home Buyer's Guide South Africa 2025",
    slug: "first-time-home-buyer-guide-south-africa-2025",
    category: "Property",
    excerpt: "Complete guide for first-time home buyers in South Africa. Learn about financing, FLISP grants, affordability, the buying process, and tips for 2025.",
    content: `<div class="article-content">
      <div class="article-image mb-6">
        <img src="${PROPERTY_IMAGE}" alt="First Time Home Buyer South Africa" class="w-full rounded-lg shadow-lg" />
      </div>

      <p class="text-lg font-semibold text-gray-700 mb-6 leading-relaxed">Buying your first home in South Africa is an exciting milestone. This comprehensive 2025 guide covers everything first-time buyers need to know about financing, affordability, the buying process, and government assistance programs.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Are You Ready to Buy Your First Home?</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">Before starting your property search, assess your readiness:</p>

      <div class="bg-blue-50 p-6 rounded-lg mb-6">
        <h3 class="text-xl font-semibold mb-4">First-Time Buyer Readiness Checklist</h3>
        <ul class="space-y-3">
          <li class="flex items-start">
            <span class="text-blue-600 mr-3">✓</span>
            <span class="text-gray-800"><strong>Stable income:</strong> Permanent employment for at least 3 months (6+ months preferred)</span>
          </li>
          <li class="flex items-start">
            <span class="text-blue-600 mr-3">✓</span>
            <span class="text-gray-800"><strong>Clean credit record:</strong> Credit score above 650 (check with TransUnion or Experian)</span>
          </li>
          <li class="flex items-start">
            <span class="text-blue-600 mr-3">✓</span>
            <span class="text-gray-800"><strong>Deposit saved:</strong> 5-20% of purchase price (though 100% bonds exist)</span>
          </li>
          <li class="flex items-start">
            <span class="text-blue-600 mr-3">✓</span>
            <span class="text-gray-800"><strong>Affordability:</strong> Bond repayment under 30% of gross income</span>
          </li>
          <li class="flex items-start">
            <span class="text-blue-600 mr-3">✓</span>
            <span class="text-gray-800"><strong>Transfer costs saved:</strong> 5-8% of purchase price for additional costs</span>
          </li>
        </ul>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">How Much Can You Afford?</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">Banks use debt-to-income ratio and affordability calculations to determine your bond amount:</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Affordability Formula 2025</h3>
      <div class="bg-gray-50 p-6 rounded-lg mb-6">
        <p class="mb-3 text-gray-800"><strong>Maximum Bond Repayment = (Gross Income × 30%) - Existing Debt</strong></p>
        <p class="text-sm text-gray-600 mb-4">Banks won't approve bonds where total debt exceeds 30-36% of gross income</p>

        <div class="border-t pt-4">
          <p class="font-semibold mb-2">Example Calculation:</p>
          <ul class="space-y-2 text-gray-800">
            <li>Gross monthly income: R25,000</li>
            <li>Maximum for housing: R7,500 (30%)</li>
            <li>Existing car loan: R2,500</li>
            <li>Available for bond: R5,000/month</li>
            <li><strong class="text-blue-600">≈ R600,000 bond at 11.75% over 20 years</strong></li>
          </ul>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Government Assistance: FLISP Grant 2025</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">The Finance Linked Individual Subsidy Programme (FLISP) helps first-time buyers earning R3,501 - R22,000 per month:</p>

      <div class="bg-green-50 p-6 rounded-lg mb-6">
        <h3 class="text-xl font-semibold mb-4">FLISP Subsidy Amounts 2025</h3>
        <ul class="space-y-2">
          <li class="text-gray-800"><strong>R3,501 - R7,000:</strong> Up to R130,000 subsidy</li>
          <li class="text-gray-800"><strong>R7,001 - R10,500:</strong> Up to R120,000 subsidy</li>
          <li class="text-gray-800"><strong>R10,501 - R15,000:</strong> Up to R100,000 subsidy</li>
          <li class="text-gray-800"><strong>R15,001 - R22,000:</strong> Up to R87,000 subsidy</li>
        </ul>

        <div class="mt-4 pt-4 border-t border-green-200">
          <p class="font-semibold mb-2">FLISP Requirements:</p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li>✓ First-time buyer (never owned property before)</li>
            <li>✓ South African citizen or permanent resident</li>
            <li>✓ Married or cohabitating, or single with dependents</li>
            <li>✓ Bank-approved home loan</li>
            <li>✓ Property value under R600,000</li>
          </ul>
        </div>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Step-by-Step First Home Buying Process</h2>

      <h3 class="text-xl font-semibold mt-6 mb-3">Step 1: Get Pre-Approved (2-4 Weeks)</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Before house hunting, get bond pre-approval from banks:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800">Apply to multiple banks (no cost to apply)</li>
        <li class="text-gray-800">Pre-approval valid for 3-6 months</li>
        <li class="text-gray-800">Shows sellers you're a serious buyer</li>
        <li class="text-gray-800">Gives you clear budget parameters</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">Step 2: Find Your Property (1-6 Months)</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Search for properties within your budget:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800">Use Property24, Private Property, and Gumtree</li>
        <li class="text-gray-800">Attend open houses and viewings</li>
        <li class="text-gray-800">Research neighborhood crime stats and amenities</li>
        <li class="text-gray-800">Check school districts if you have children</li>
        <li class="text-gray-800">Consider future resale value</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">Step 3: Make an Offer (1 Week)</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">When you find the right property:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800">Research recent comparable sales in the area</li>
        <li class="text-gray-800">Offer 5-10% below asking price (unless hot market)</li>
        <li class="text-gray-800">Include conditions (bond approval, property inspection)</li>
        <li class="text-gray-800">Specify deposit amount (usually 10%)</li>
        <li class="text-gray-800">Set transfer date (typically 90 days)</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">Step 4: Bond Application (2-3 Weeks)</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Once offer accepted, formal bond application begins:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800">Submit complete documentation immediately</li>
        <li class="text-gray-800">Bank does property valuation (R2,000-R4,000)</li>
        <li class="text-gray-800">Underwriters assess your application</li>
        <li class="text-gray-800">Bond approval or decline (or counter-offer)</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">Step 5: Transfer Process (8-12 Weeks)</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Attorney handles legal transfer:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800">Transfer attorney appointed (seller's choice)</li>
        <li class="text-gray-800">Documents prepared and signed</li>
        <li class="text-gray-800">Transfer duty paid to SARS</li>
        <li class="text-gray-800">Deeds Office registration</li>
        <li class="text-gray-800">Keys handed over at registration</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">First-Time Buyer Costs Breakdown</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">Budget for these upfront costs on a R1,000,000 property:</p>

      <div class="bg-yellow-50 p-6 rounded-lg mb-6">
        <h3 class="text-xl font-semibold mb-4">Total Costs: R1,000,000 Property</h3>
        <ul class="space-y-2 mb-4">
          <li class="flex justify-between text-gray-800">
            <span>Deposit (10%):</span>
            <strong>R100,000</strong>
          </li>
          <li class="flex justify-between text-gray-800">
            <span>Transfer Duty:</span>
            <strong>R0 (exempt)</strong>
          </li>
          <li class="flex justify-between text-gray-800">
            <span>Conveyancing Fees:</span>
            <strong>R15,000</strong>
          </li>
          <li class="flex justify-between text-gray-800">
            <span>Bond Registration:</span>
            <strong>R12,000</strong>
          </li>
          <li class="flex justify-between text-gray-800">
            <span>Bank Initiation Fee:</span>
            <strong>R5,940</strong>
          </li>
          <li class="flex justify-between text-gray-800">
            <span>Certificates & Compliance:</span>
            <strong>R3,000</strong>
          </li>
          <li class="flex justify-between text-gray-800">
            <span>Moving Costs:</span>
            <strong>R5,000</strong>
          </li>
          <li class="flex justify-between text-gray-800 border-t-2 border-yellow-300 pt-2">
            <span><strong>Total Needed:</strong></span>
            <strong class="text-green-700">R140,940</strong>
          </li>
        </ul>
        <p class="text-sm text-gray-600">*Plus emergency fund for immediate repairs</p>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Top Banks for First-Time Buyers 2025</h2>

      <h3 class="text-xl font-semibold mt-6 mb-3">Standard Bank</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800">100% bond options available</li>
        <li class="text-gray-800">First-time buyer rates from 11.5%</li>
        <li class="text-gray-800">FLISP partner</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">FNB</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800">Smart Home Loan with digital approval</li>
        <li class="text-gray-800">105% bond options (includes costs)</li>
        <li class="text-gray-800">Quick pre-approval process</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">Nedbank</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800">Affordable Housing Programme</li>
        <li class="text-gray-800">Properties under R1.5 million</li>
        <li class="text-gray-800">Greenbacks rewards on bond</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">ABSA</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800">Flexi-option home loans</li>
        <li class="text-gray-800">Early settlement options</li>
        <li class="text-gray-800">Competitive first-buyer rates</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Common First-Time Buyer Mistakes to Avoid</h2>

      <h3 class="text-xl font-semibold mt-6 mb-3">1. Buying at Maximum Affordability</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Banks approve more than you should spend. Keep bond repayments under 25% of income to allow for:</p>
      <ul class="list-disc pl-6 mb-4 space-y-1">
        <li class="text-gray-800">Rate increases (prime can go up)</li>
        <li class="text-gray-800">Property maintenance and repairs</li>
        <li class="text-gray-800">Unexpected emergencies</li>
        <li class="text-gray-800">Future life changes (children, job loss)</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">2. Skipping Property Inspection</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Always get a professional inspection (R2,000-R5,000). It can save you from:</p>
      <ul class="list-disc pl-6 mb-4 space-y-1">
        <li class="text-gray-800">Structural problems (cracks, foundation issues)</li>
        <li class="text-gray-800">Electrical and plumbing defects</li>
        <li class="text-gray-800">Damp and waterproofing issues</li>
        <li class="text-gray-800">Roof damage</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">3. Not Shopping Around for Bonds</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Apply to multiple banks. A 0.5% rate difference on R1,000,000 over 20 years = R60,000+ savings.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">4. Ignoring Additional Monthly Costs</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Budget for ongoing costs beyond bond repayment:</p>
      <ul class="list-disc pl-6 mb-4 space-y-1">
        <li class="text-gray-800">Rates and taxes: R500-R2,000/month</li>
        <li class="text-gray-800">Home insurance: R1,000-R2,500/month</li>
        <li class="text-gray-800">HOA/levy (complex/estate): R500-R3,000/month</li>
        <li class="text-gray-800">Maintenance fund: 1% property value yearly</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">5. Buying in Wrong Area</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Research thoroughly:</p>
      <ul class="list-disc pl-6 mb-4 space-y-1">
        <li class="text-gray-800">Crime statistics (SAPS Crime Stats website)</li>
        <li class="text-gray-800">School quality and proximity</li>
        <li class="text-gray-800">Property value trends</li>
        <li class="text-gray-800">Future developments planned</li>
        <li class="text-gray-800">Commute time to work</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Tips for Getting Your Bond Approved</h2>

      <div class="bg-blue-50 p-6 rounded-lg mb-6">
        <h3 class="text-xl font-semibold mb-4">Improve Your Approval Chances</h3>
        <ul class="space-y-3">
          <li class="text-gray-800"><strong>Check credit report:</strong> Get free report from TransUnion, fix errors</li>
          <li class="text-gray-800"><strong>Pay down debt:</strong> Reduce credit cards and personal loans before applying</li>
          <li class="text-gray-800"><strong>Increase deposit:</strong> Larger deposit = better rates and approval odds</li>
          <li class="text-gray-800"><strong>Show stable income:</strong> Avoid job changes during application</li>
          <li class="text-gray-800"><strong>Joint application:</strong> Apply with spouse/partner for combined income</li>
          <li class="text-gray-800"><strong>Use bond originator:</strong> Ooba, BetterBond apply to multiple banks for you</li>
          <li class="text-gray-800"><strong>Clean bank statements:</strong> Avoid gambling, excessive lifestyle spending</li>
        </ul>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Property Types for First-Time Buyers</h2>

      <h3 class="text-xl font-semibold mt-6 mb-3">Apartments/Flats (Best for Singles)</h3>
      <p class="mb-2 text-gray-800"><strong>Pros:</strong> Affordable, low maintenance, security, amenities</p>
      <p class="mb-4 text-gray-800"><strong>Cons:</strong> Levies, limited space, noise, pet restrictions</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Townhouses (Best for Small Families)</h3>
      <p class="mb-2 text-gray-800"><strong>Pros:</strong> More space than flats, security estates, some garden</p>
      <p class="mb-4 text-gray-800"><strong>Cons:</strong> HOA fees, shared walls, complex rules</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Freestanding Houses</h3>
      <p class="mb-2 text-gray-800"><strong>Pros:</strong> Full ownership, privacy, unlimited alterations</p>
      <p class="mb-4 text-gray-800"><strong>Cons:</strong> Higher maintenance, security costs, expensive</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Regional First-Time Buyer Markets 2025</h2>

      <h3 class="text-xl font-semibold mt-6 mb-3">Johannesburg</h3>
      <p class="mb-4 text-gray-800 leading-relaxed"><strong>Best areas:</strong> Roodepoort, Soweto, Johannesburg South. Entry-level properties from R600,000. Good for investors.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Cape Town</h3>
      <p class="mb-4 text-gray-800 leading-relaxed"><strong>Best areas:</strong> Parow, Bellville, Mitchell's Plain. Entry-level from R900,000. High appreciation potential.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Durban</h3>
      <p class="mb-4 text-gray-800 leading-relaxed"><strong>Best areas:</strong> Phoenix, Chatsworth, Durban North. Most affordable major city, from R500,000.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Pretoria</h3>
      <p class="mb-4 text-gray-800 leading-relaxed"><strong>Best areas:</strong> Soshanguve, Mamelodi, Centurion. Good value, from R550,000.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Frequently Asked Questions</h2>

      <h3 class="text-xl font-semibold mt-6 mb-3">Can I get 100% bond with no deposit?</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Yes, but you need excellent credit (score 700+), stable income, and low existing debt. Younger properties (under 10 years) have better 100% approval odds. Most banks reserve this for properties under R1.5 million.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">How long does bond approval take?</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Pre-approval: 24-48 hours. Formal approval: 1-3 weeks. Delays happen with missing documents, credit issues, or property valuation problems. Submit complete applications to speed up the process.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Should I use a bond originator?</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Yes, bond originators like Ooba and BetterBond apply to multiple banks simultaneously at no cost to you. They often secure better rates through volume relationships with banks. Highly recommended for first-timers.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">Buying your first home in South Africa requires careful planning, realistic budgeting, and patience. Start by getting pre-approved, save for a deposit and additional costs, and don't rush into buying beyond your means. With proper preparation and the right property, homeownership is an achievable and rewarding goal.</p>

      <p class="mb-4 text-gray-800 leading-relaxed">Ready to calculate your costs? Use our <a href="/south-africa-property-transfer-calculator" class="text-blue-600 hover:text-blue-800 font-semibold">Property Transfer Calculator</a> to budget accurately for your first home purchase.</p>

      <hr class="my-8 border-gray-300" />

      <div class="bg-green-50 p-6 rounded-lg mt-8">
        <h3 class="text-xl font-bold mb-3">🏡 Success Tip</h3>
        <p class="text-gray-800">Start saving early and aggressively. Aim for 20% deposit plus 10% for additional costs. This gives you negotiating power, better rates, and financial cushion for unexpected expenses. Consider delaying purchase by 6-12 months to save properly rather than rushing in underprepared.</p>
      </div>
    </div>`,
    author: "Genius Insights Property Team",
    is_published: true,
    reading_time: 14,
    featured_image: PROPERTY_IMAGE,
    seo_title: "First-Time Home Buyer's Guide South Africa 2025 | Complete Step-by-Step",
    seo_description: "Complete first-time home buyer guide for South Africa 2025. Learn about FLISP grants, affordability, financing, the buying process, costs, and tips for success.",
    seo_keywords: [
      "first time home buyer south africa",
      "FLISP grant 2025",
      "buying first home SA",
      "home loan first time buyer",
      "property finance south africa",
      "first home buyer tips",
      "bond approval first time",
      "first time buyer costs",
      "affordable housing SA",
      "home buying process",
      "first property purchase",
      "bond pre-approval",
      "home loan affordability",
      "first time buyer banks",
      "property deposit saving",
      "100% bond south africa",
      "first home mistakes",
      "bond originator",
      "FNB first time buyer",
      "Standard Bank home loans",
      "property inspection SA"
    ]
  },

  {
    title: "How to Choose a Property Transfer Attorney in South Africa",
    slug: "how-to-choose-property-transfer-attorney-south-africa",
    category: "Property",
    excerpt: "Essential guide to choosing the right transfer attorney (conveyancer) in South Africa. Learn what to look for, questions to ask, costs, and red flags to avoid.",
    content: `<div class="article-content">
      <div class="article-image mb-6">
        <img src="${PROPERTY_IMAGE}" alt="Property Transfer Attorney South Africa" class="w-full rounded-lg shadow-lg" />
      </div>

      <p class="text-lg font-semibold text-gray-700 mb-6 leading-relaxed">Choosing the right transfer attorney (conveyancer) is crucial for a smooth property transfer in South Africa. This guide helps you select an experienced attorney who will protect your interests and ensure efficient transfer.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What is a Transfer Attorney?</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">A transfer attorney (also called a conveyancer or conveyancing attorney) is a specialized lawyer who handles the legal transfer of property ownership from seller to buyer. They are registered with the Law Society and the Deeds Office.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Key Responsibilities</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800">Prepare and lodge transfer documents at Deeds Office</li>
        <li class="text-gray-800">Calculate and pay transfer duty to SARS</li>
        <li class="text-gray-800">Obtain compliance certificates and rates clearances</li>
        <li class="text-gray-800">Register bond if buyer is financing</li>
        <li class="text-gray-800">Handle funds transfer on registration day</li>
        <li class="text-gray-800">Issue new title deed to buyer</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Who Appoints the Transfer Attorney?</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">Traditionally, the <strong>seller</strong> appoints the transfer attorney, even though they're acting on behalf of both parties. However:</p>

      <div class="bg-blue-50 p-6 rounded-lg mb-6">
        <h3 class="text-xl font-semibold mb-4">Important Rights</h3>
        <ul class="space-y-2">
          <li class="text-gray-800"><strong>Buyer's right:</strong> You can nominate your preferred attorney in the offer to purchase</li>
          <li class="text-gray-800"><strong>Seller's right:</strong> Final say on attorney selection (they pay conveyancing fees)</li>
          <li class="text-gray-800"><strong>Compromise:</strong> Often parties agree on a mutually acceptable attorney</li>
          <li class="text-gray-800"><strong>Bond attorney:</strong> Buyer chooses bond registration attorney (separate from transfer)</li>
        </ul>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Essential Qualifications to Check</h2>

      <h3 class="text-xl font-semibold mt-6 mb-3">1. Proper Registration</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Verify the attorney is registered with:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800"><strong>Law Society of South Africa</strong> - Check membership status</li>
        <li class="text-gray-800"><strong>Provincial Law Society</strong> - Regional registration required</li>
        <li class="text-gray-800"><strong>Deeds Office</strong> - Must have lodging rights</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">2. Specialization in Conveyancing</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Choose attorneys who specialize in property transfers, not general practitioners. Ask:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800">How many transfers do you complete per month?</li>
        <li class="text-gray-800">What percentage of your practice is conveyancing? (Should be 70%+)</li>
        <li class="text-gray-800">Do you have dedicated conveyancing team?</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">3. Professional Indemnity Insurance</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">All attorneys must have professional indemnity insurance covering errors and negligence. Ask for proof of cover and confirm limits are adequate (minimum R5 million).</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">10 Questions to Ask Before Hiring</h2>

      <div class="bg-yellow-50 p-6 rounded-lg mb-6">
        <h3 class="text-xl font-semibold mb-4">Critical Questions Checklist</h3>
        <ol class="space-y-3">
          <li class="text-gray-800"><strong>1. How long have you been practicing conveyancing?</strong>
            <p class="text-sm text-gray-600 ml-4">Look for 5+ years experience</p>
          </li>
          <li class="text-gray-800"><strong>2. How many transfers do you handle monthly?</strong>
            <p class="text-sm text-gray-600 ml-4">20+ indicates established practice</p>
          </li>
          <li class="text-gray-800"><strong>3. What is your average transfer timeline?</strong>
            <p class="text-sm text-gray-600 ml-4">Should be 8-12 weeks</p>
          </li>
          <li class="text-gray-800"><strong>4. What are your total fees including VAT and disbursements?</strong>
            <p class="text-sm text-gray-600 ml-4">Get detailed breakdown upfront</p>
          </li>
          <li class="text-gray-800"><strong>5. Who will handle my transfer personally?</strong>
            <p class="text-sm text-gray-600 ml-4">Partner, associate, or junior? Matters for experience</p>
          </li>
          <li class="text-gray-800"><strong>6. How do you communicate with clients?</strong>
            <p class="text-sm text-gray-600 ml-4">Email, phone, SMS, online portal?</p>
          </li>
          <li class="text-gray-800"><strong>7. Do you handle bond registration too?</strong>
            <p class="text-sm text-gray-600 ml-4">Package deals often save money</p>
          </li>
          <li class="text-gray-800"><strong>8. What happens if transfer is delayed?</strong>
            <p class="text-sm text-gray-600 ml-4">Understand their process for resolving issues</p>
          </li>
          <li class="text-gray-800"><strong>9. Can you provide client references?</strong>
            <p class="text-sm text-gray-600 ml-4">Speak to recent clients about their experience</p>
          </li>
          <li class="text-gray-800"><strong>10. Are you registered with Property24/Private Property?</strong>
            <p class="text-sm text-gray-600 ml-4">These platforms vet attorneys</p>
          </li>
        </ol>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Understanding Transfer Attorney Fees</h2>

      <h3 class="text-xl font-semibold mt-6 mb-3">Standard Fee Structure 2025</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Transfer attorney fees are regulated but attorneys can discount. Typical rates:</p>

      <div class="bg-gray-50 p-6 rounded-lg mb-6">
        <table class="w-full">
          <tr class="border-b">
            <th class="text-left py-2 text-gray-700">Property Value</th>
            <th class="text-right py-2 text-gray-700">Est. Fee (excl VAT)</th>
          </tr>
          <tr class="border-b">
            <td class="py-2 text-gray-800">R500,000</td>
            <td class="text-right text-gray-800">R10,000 - R12,000</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 text-gray-800">R1,000,000</td>
            <td class="text-right text-gray-800">R15,000 - R18,000</td>
          </tr>
          <tr class="border-b">
            <td class="py-2 text-gray-800">R2,000,000</td>
            <td class="text-right text-gray-800">R20,000 - R25,000</td>
          </tr>
          <tr>
            <td class="py-2 text-gray-800">R5,000,000</td>
            <td class="text-right text-gray-800">R35,000 - R45,000</td>
          </tr>
        </table>
        <p class="text-sm text-gray-600 mt-3">*Add 15% VAT. Fees negotiable.</p>
      </div>

      <h3 class="text-xl font-semibold mt-6 mb-3">What's Included vs Extra</h3>
      <p class="mb-4 text-gray-800 leading-relaxed"><strong>Typically Included:</strong></p>
      <ul class="list-disc pl-6 mb-4 space-y-1">
        <li class="text-gray-800">Document preparation and lodgment</li>
        <li class="text-gray-800">Deeds Office fees</li>
        <li class="text-gray-800">Transfer duty payment to SARS</li>
        <li class="text-gray-800">Basic communication and updates</li>
      </ul>

      <p class="mb-4 text-gray-800 leading-relaxed"><strong>Usually Extra:</strong></p>
      <ul class="list-disc pl-6 mb-4 space-y-1">
        <li class="text-gray-800">Rates clearance certificate (R300-R800)</li>
        <li class="text-gray-800">Compliance certificates (R500-R1,500 each)</li>
        <li class="text-gray-800">FICA compliance (R500-R1,000)</li>
        <li class="text-gray-800">Bond registration (separate fee structure)</li>
        <li class="text-gray-800">Postage and petties (R300-R600)</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Red Flags to Watch For</h2>

      <div class="bg-red-50 p-6 rounded-lg mb-6 border-l-4 border-red-500">
        <h3 class="text-xl font-semibold mb-4 text-red-900">Warning Signs - Avoid These Attorneys</h3>
        <ul class="space-y-3">
          <li class="text-gray-800"><strong>❌ Not registered with Law Society</strong> - Illegal to practice</li>
          <li class="text-gray-800"><strong>❌ Won't provide fee breakdown</strong> - Hidden costs likely</li>
          <li class="text-gray-800"><strong>❌ Promises very fast transfers</strong> - Unrealistic (8-12 weeks is normal)</li>
          <li class="text-gray-800"><strong>❌ No physical office</strong> - Operating from home is concerning</li>
          <li class="text-gray-800"><strong>❌ Poor communication</strong> - Doesn't return calls/emails promptly</li>
          <li class="text-gray-800"><strong>❌ Pressure to use specific bank</strong> - May have kickback arrangement</li>
          <li class="text-gray-800"><strong>❌ Unusually low fees</strong> - May cut corners or add hidden charges</li>
          <li class="text-gray-800"><strong>❌ Won't provide references</strong> - No satisfied clients to share</li>
          <li class="text-gray-800"><strong>❌ No online presence</strong> - Hard to verify reputation</li>
          <li class="text-gray-800"><strong>❌ Requests cash payments</strong> - Major red flag for fraud</li>
        </ul>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Top Conveyancing Firms by Region</h2>

      <h3 class="text-xl font-semibold mt-6 mb-3">Johannesburg</h3>
      <ul class="list-disc pl-6 mb-4 space-y-1">
        <li class="text-gray-800">BBM Attorneys - Large volume, established</li>
        <li class="text-gray-800">CDH Conveyancing - Fast turnaround</li>
        <li class="text-gray-800">Schindlers Attorneys - Trusted name</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">Cape Town</h3>
      <ul class="list-disc pl-6 mb-4 space-y-1">
        <li class="text-gray-800">BDK Attorneys - Well established</li>
        <li class="text-gray-800">Stbb Attorneys - Good communication</li>
        <li class="text-gray-800">Property Transfer Solutions - Digital focus</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">Durban</h3>
      <ul class="list-disc pl-6 mb-4 space-y-1">
        <li class="text-gray-800">LG Loots Attorneys - Large practice</li>
        <li class="text-gray-800">Shepstone & Wylie - Heritage firm</li>
        <li class="text-gray-800">Moodie & Robertson - Competitive rates</li>
      </ul>

      <p class="mb-4 text-gray-800 leading-relaxed text-sm italic">*Always do your own due diligence - these are examples only</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">What to Expect During the Process</h2>

      <h3 class="text-xl font-semibold mt-6 mb-3">Initial Contact (Week 1)</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800">Attorney sends engagement letter and fee quote</li>
        <li class="text-gray-800">You provide ID, proof of residence, bank details</li>
        <li class="text-gray-800">FICA documents requested and verified</li>
        <li class="text-gray-800">Transfer costs calculated and communicated</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">Document Collection (Weeks 2-4)</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800">Attorney obtains title deed from seller</li>
        <li class="text-gray-800">Rates clearance certificate applied for</li>
        <li class="text-gray-800">Compliance certificates arranged</li>
        <li class="text-gray-800">Bond documents from buyer's bank (if applicable)</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">Document Preparation (Weeks 5-6)</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800">Transfer documents drafted</li>
        <li class="text-gray-800">Transfer duty calculated and paid to SARS</li>
        <li class="text-gray-800">Documents sent for signing (buyer and seller)</li>
        <li class="text-gray-800">All fees paid by parties</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">Lodgment & Registration (Weeks 7-12)</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800">Documents lodged at Deeds Office</li>
        <li class="text-gray-800">Deeds Office examination (2-4 weeks)</li>
        <li class="text-gray-800">Registration date confirmed</li>
        <li class="text-gray-800">Funds transfer and key handover</li>
        <li class="text-gray-800">New title deed issued to buyer</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Communication is Key</h2>

      <h3 class="text-xl font-semibold mt-6 mb-3">What Good Communication Looks Like</h3>
      <div class="bg-green-50 p-6 rounded-lg mb-6">
        <ul class="space-y-2">
          <li class="text-gray-800">✓ Weekly email updates on progress</li>
          <li class="text-gray-800">✓ Responds to emails within 24-48 hours</li>
          <li class="text-gray-800">✓ Proactive about potential delays</li>
          <li class="text-gray-800">✓ Clear explanations of complex legal terms</li>
          <li class="text-gray-800">✓ Online portal to track transfer progress</li>
          <li class="text-gray-800">✓ Accessible by phone during business hours</li>
          <li class="text-gray-800">✓ Sends copies of all important documents</li>
        </ul>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">When Things Go Wrong</h2>

      <h3 class="text-xl font-semibold mt-6 mb-3">Complaint Procedure</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">If you're unhappy with your attorney:</p>
      <ol class="list-decimal pl-6 mb-4 space-y-2">
        <li class="text-gray-800"><strong>First:</strong> Raise issue with attorney in writing</li>
        <li class="text-gray-800"><strong>Second:</strong> Escalate to senior partner or practice manager</li>
        <li class="text-gray-800"><strong>Third:</strong> Complain to Provincial Law Society</li>
        <li class="text-gray-800"><strong>Last resort:</strong> Legal Ombudsman or court action</li>
      </ol>

      <h3 class="text-xl font-semibold mt-6 mb-3">Common Issues & Solutions</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800"><strong>Unreturned calls:</strong> Send formal email requesting update by specific date</li>
        <li class="text-gray-800"><strong>Unexpected fees:</strong> Reference original quote, request justification</li>
        <li class="text-gray-800"><strong>Missed deadlines:</strong> Ask for reasons and revised timeline in writing</li>
        <li class="text-gray-800"><strong>Lost documents:</strong> Serious issue - escalate immediately</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Technology & Modern Conveyancing</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">Modern conveyancing firms offer digital advantages:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800"><strong>Online portals:</strong> Track transfer progress 24/7</li>
        <li class="text-gray-800"><strong>E-signatures:</strong> Sign documents digitally from anywhere</li>
        <li class="text-gray-800"><strong>SMS updates:</strong> Instant notifications on important milestones</li>
        <li class="text-gray-800"><strong>Digital document storage:</strong> Access copies anytime</li>
        <li class="text-gray-800"><strong>Online payments:</strong> EFT payments tracked automatically</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Frequently Asked Questions</h2>

      <h3 class="text-xl font-semibold mt-6 mb-3">Can I change attorney mid-transfer?</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Yes, but it's complicated and expensive. The original attorney can charge for work done, and you'll lose time. Only change if there's serious misconduct. Better to choose carefully from the start.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Do I need separate attorneys for transfer and bond?</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">No - one attorney can handle both, often at a discounted "package" rate. This is more efficient and can save R2,000-R5,000. Ensure they're experienced in both.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Should I use the estate agent's recommended attorney?</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Estate agents often have preferred attorneys they work with regularly. This can be fine, but always do your own due diligence. Check reviews, compare fees, and ensure they meet your needs. Don't feel obligated to use their suggestion.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">Choosing the right transfer attorney is one of the most important decisions in your property transaction. Take time to research, compare options, ask questions, and check credentials. A good attorney makes the difference between a smooth transfer and months of stress.</p>

      <p class="mb-4 text-gray-800 leading-relaxed">Remember: cheapest isn't always best, but most expensive doesn't guarantee quality. Look for the right balance of experience, communication, and fair pricing.</p>

      <hr class="my-8 border-gray-300" />

      <div class="bg-blue-50 p-6 rounded-lg mt-8">
        <h3 class="text-xl font-bold mb-3">💡 Pro Tip</h3>
        <p class="text-gray-800">Interview at least 3 attorneys before deciding. Ask the same questions to each and compare responses, fees, and your gut feeling about their professionalism. The right attorney should make you feel confident and informed, not confused or pressured.</p>
      </div>
    </div>`,
    author: "Genius Insights Property Team",
    is_published: true,
    reading_time: 10,
    featured_image: PROPERTY_IMAGE,
    seo_title: "How to Choose a Property Transfer Attorney South Africa | Complete Guide",
    seo_description: "Essential guide to choosing the right transfer attorney (conveyancer) in South Africa. Questions to ask, costs, qualifications, red flags, and tips for 2025.",
    seo_keywords: [
      "property transfer attorney south africa",
      "conveyancing attorney",
      "transfer attorney fees",
      "how to choose conveyancer",
      "property lawyer SA",
      "conveyancing costs",
      "transfer attorney requirements",
      "deeds office attorney",
      "property transfer lawyer",
      "conveyancing process",
      "attorney registration law society",
      "bond registration attorney",
      "transfer attorney reviews",
      "conveyancing firms johannesburg",
      "cape town transfer attorney",
      "durban conveyancing",
      "property transfer fees",
      "attorney communication",
      "transfer delays",
      "conveyancing complaints",
      "property law SA"
    ]
  }
];

async function run() {
  try {
    // Step 1: Update existing articles
    await updateExistingArticles();

    // Step 2: Add new articles
    console.log('Adding 2 new property articles...\n');

    for (let i = 0; i < newArticles.length; i++) {
      const article = newArticles[i];
      console.log(`Importing article ${i + 1}/${newArticles.length}: ${article.title}`);

      const articleData = {
        ...article,
        published_at: Timestamp.now(),
        created_at: Timestamp.now(),
        updated_at: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, 'articles'), articleData);
      console.log(`✅ Successfully imported with ID: ${docRef.id}\n`);
    }

    console.log('🎉 All done! 2 existing articles updated, 2 new articles added!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

run();
