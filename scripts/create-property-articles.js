// scripts/create-property-articles.js
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, Timestamp } = require('firebase/firestore');

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

const articles = [
  {
    title: "Complete Guide to Property Transfer in South Africa 2025",
    slug: "complete-property-transfer-guide-south-africa-2025",
    category: "Property",
    excerpt: "Everything you need to know about property transfer in South Africa. Step-by-step guide covering the entire process, costs, timeline, and requirements for 2025.",
    content: `<div class="article-content">
      <div class="article-image mb-6">
        <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200" alt="Property Transfer South Africa" class="w-full rounded-lg shadow-lg" />
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Understanding Property Transfer in South Africa</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">Property transfer in South Africa is a legal process that transfers ownership of immovable property from the seller to the buyer. This comprehensive guide will walk you through every step of the property transfer process in 2025, ensuring you understand all requirements, costs, and timelines involved.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Step-by-Step Property Transfer Process</h2>

      <h3 class="text-xl font-semibold mt-6 mb-3">1. Offer to Purchase</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">The property transfer process begins when a buyer makes an offer to purchase. This legally binding document should include the purchase price, deposit amount, conditions of sale, and a specific date for transfer of ownership. Both parties must sign this document.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">2. Appointing a Transfer Attorney</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">The seller typically appoints a conveyancing attorney to handle the transfer. The buyer has the right to nominate an attorney, but the seller pays the conveyancing fees. Choose an experienced property transfer attorney registered with the Law Society of South Africa.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">3. Bond Application (If Applicable)</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">If you're financing the purchase through a home loan, apply for bond approval as soon as possible. Banks typically take 7-14 days to approve bonds. The bond registration happens simultaneously with the property transfer.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">4. Transfer Duty Payment</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Transfer duty is a tax paid to SARS on property purchases above R1,100,000. Your attorney will calculate this amount and ensure payment before transfer can proceed. First-time buyers may qualify for exemptions on properties under R1,100,000.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">5. Deed Office Registration</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Once all documents are in order and payments made, your attorney lodges the transfer documents at the Deeds Office. This is where the official transfer of ownership occurs and new title deeds are issued.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Property Transfer Costs Breakdown</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800"><strong>Transfer Duty:</strong> 0-13% depending on property value (see calculator)</li>
        <li class="text-gray-800"><strong>Conveyancing Fees:</strong> R8,000 - R25,000+ (depends on property value)</li>
        <li class="text-gray-800"><strong>Bond Registration Fees:</strong> R5,000 - R20,000 (if financing)</li>
        <li class="text-gray-800"><strong>Deeds Office Fees:</strong> R500 - R1,500</li>
        <li class="text-gray-800"><strong>FICA Compliance:</strong> R500 - R1,000</li>
        <li class="text-gray-800"><strong>Rates Clearance Certificate:</strong> R300 - R800</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Property Transfer Timeline</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">The typical property transfer process in South Africa takes 8-12 weeks from offer acceptance to registration. However, this can vary based on:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800">Bond approval speed (1-2 weeks)</li>
        <li class="text-gray-800">Document collection (2-3 weeks)</li>
        <li class="text-gray-800">SARS approval (1-2 weeks)</li>
        <li class="text-gray-800">Deeds Office processing (2-4 weeks)</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Required Documents for Property Transfer</h2>
      <p class="mb-4 text-gray-800 leading-relaxed"><strong>Seller Must Provide:</strong></p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800">Original title deed or certified copy</li>
        <li class="text-gray-800">ID document (certified copy)</li>
        <li class="text-gray-800">Rates clearance certificate</li>
        <li class="text-gray-800">Electric fence certificate (if applicable)</li>
        <li class="text-gray-800">Beetle certificate (if property is older than 20 years)</li>
      </ul>

      <p class="mb-4 text-gray-800 leading-relaxed"><strong>Buyer Must Provide:</strong></p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800">ID document (certified copy)</li>
        <li class="text-gray-800">Proof of residence</li>
        <li class="text-gray-800">Bank statements (last 3 months)</li>
        <li class="text-gray-800">Bond approval letter (if financing)</li>
        <li class="text-gray-800">FICA documents</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Common Delays and How to Avoid Them</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">Property transfers can be delayed by several factors. Here's how to avoid the most common issues:</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Missing Documents</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Ensure all documents are collected early. Missing title deeds are a major cause of delays. If the original is lost, apply for a replacement immediately.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Municipal Arrears</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Property transfers cannot proceed if there are outstanding municipal rates or services charges. Sellers should obtain a rates clearance certificate early and clear any arrears.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Bond Delays</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Submit complete and accurate bank applications. Any missing information will delay approval. Consider getting pre-approved before making an offer.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Regional Considerations</h2>

      <h3 class="text-xl font-semibold mt-6 mb-3">Johannesburg Property Transfer</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Johannesburg has specific requirements for rates clearances and may have longer processing times due to volume. The City of Johannesburg requires additional compliance certificates for certain areas.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Cape Town Property Transfer</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Cape Town property transfers often involve additional heritage and environmental compliance for certain areas. Budget extra time if your property is in a heritage area.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Durban Property Transfer</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">eThekwini Municipality has streamlined their rates clearance process, but ensure you apply early as it can still take 2-3 weeks during busy periods.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Tips for a Smooth Property Transfer</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800"><strong>Start early:</strong> Begin collecting documents as soon as your offer is accepted</li>
        <li class="text-gray-800"><strong>Communicate:</strong> Stay in regular contact with your attorney</li>
        <li class="text-gray-800"><strong>Budget correctly:</strong> Account for all costs including hidden fees</li>
        <li class="text-gray-800"><strong>Get pre-approved:</strong> Secure bond approval before making offers</li>
        <li class="text-gray-800"><strong>Choose wisely:</strong> Select an experienced transfer attorney</li>
        <li class="text-gray-800"><strong>Read everything:</strong> Understand all documents before signing</li>
        <li class="text-gray-800"><strong>Keep copies:</strong> Maintain copies of all documents and correspondence</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">After Transfer: What Happens Next?</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">Once transfer is registered at the Deeds Office, you officially become the property owner. Your attorney will provide you with the new title deed. Ensure you:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800">Register utilities in your name (electricity, water)</li>
        <li class="text-gray-800">Update your address with banks and institutions</li>
        <li class="text-gray-800">Arrange home insurance immediately</li>
        <li class="text-gray-800">Keep all transfer documents in a safe place</li>
        <li class="text-gray-800">Inform the municipality of ownership change</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Frequently Asked Questions</h2>

      <h3 class="text-xl font-semibold mt-6 mb-3">How much does property transfer cost in South Africa?</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Total property transfer costs typically range from R15,000 to R50,000+, including transfer duty, conveyancing fees, bond registration (if applicable), and various certificates. The exact amount depends on the property value.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Can I speed up the property transfer process?</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">While you cannot rush the Deeds Office, you can speed up your part by: getting pre-approved for finance, collecting documents early, responding quickly to attorney requests, and ensuring no municipal arrears.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Who pays for property transfer costs?</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">The seller typically pays conveyancing fees, while the buyer pays transfer duty and bond registration costs. However, this can be negotiated in the offer to purchase.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">What is a rates clearance certificate?</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">A rates clearance certificate confirms that all municipal rates, taxes, and service charges are paid up to date. This certificate is mandatory for property transfers and is valid for 60-90 days.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">Property transfer in South Africa is a detailed process requiring careful attention and proper documentation. By understanding each step, preparing documents early, and working with an experienced attorney, you can ensure a smooth transfer. Remember to budget for all costs and allow sufficient time for the process to complete.</p>

      <p class="mb-4 text-gray-800 leading-relaxed">Need help calculating your transfer costs? Use our <a href="/south-africa-property-transfer-calculator" class="text-blue-600 hover:text-blue-800 font-semibold">Property Transfer Calculator</a> to get an accurate estimate of all fees involved.</p>

      <hr class="my-8 border-gray-300" />

      <div class="bg-blue-50 p-6 rounded-lg mt-8">
        <h3 class="text-xl font-bold mb-3">💡 Expert Tip</h3>
        <p class="text-gray-800">Start your property search with pre-approved finance. This not only speeds up the transfer process but also gives you a clear budget and makes your offer more attractive to sellers.</p>
      </div>
    </div>`,
    author: "Genius Insights Property Team",
    is_published: true,
    reading_time: 12,
    featured_image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop",
    seo_title: "Complete Property Transfer Guide South Africa 2025 | Step-by-Step Process",
    seo_description: "Complete guide to property transfer in South Africa 2025. Learn the step-by-step process, costs, timeline, required documents, and tips for smooth transfer.",
    seo_keywords: [
      "property transfer south africa",
      "property transfer process",
      "property registration",
      "transfer attorney",
      "conveyancing",
      "transfer duty",
      "property transfer costs",
      "deed of transfer",
      "property ownership transfer",
      "buy property south africa",
      "Johannesburg property transfer",
      "Cape Town property transfer",
      "Durban property transfer",
      "property transfer timeline",
      "rates clearance certificate",
      "bond registration",
      "deeds office",
      "property transfer documents",
      "first time home buyer SA",
      "property transfer guide 2025"
    ]
  },

  {
    title: "Property Transfer Costs South Africa: Complete 2025 Breakdown",
    slug: "property-transfer-costs-south-africa-2025-breakdown",
    category: "Property",
    excerpt: "Detailed breakdown of all property transfer costs in South Africa for 2025. Understand transfer duty, conveyancing fees, bond costs, and hidden expenses.",
    content: `<div class="article-content">
      <div class="article-image mb-6">
        <img src="https://images.unsplash.com/photo-1554224311-beee460c201f?w=1200" alt="Property Transfer Costs South Africa" class="w-full rounded-lg shadow-lg" />
      </div>

      <p class="text-lg font-semibold text-gray-700 mb-6 leading-relaxed">Understanding property transfer costs is crucial when buying property in South Africa. This comprehensive guide breaks down every cost involved in 2025, helping you budget accurately and avoid surprises.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Overview of Property Transfer Costs</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">Property transfer costs in South Africa can range from R15,000 to R50,000 or more, depending on the property value and whether you're taking out a bond. Let's break down each component.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">1. Transfer Duty (Paid by Buyer)</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">Transfer duty is a tax payable to SARS when purchasing property. The rates for 2025 are:</p>

      <div class="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 class="text-xl font-semibold mb-4">2025 Transfer Duty Rates</h3>
        <ul class="space-y-2">
          <li class="text-gray-800"><strong>R0 - R1,100,000:</strong> 0% (No transfer duty)</li>
          <li class="text-gray-800"><strong>R1,100,001 - R1,512,500:</strong> 3% on amount above R1,100,000</li>
          <li class="text-gray-800"><strong>R1,512,501 - R2,117,500:</strong> R12,375 + 6% on amount above R1,512,500</li>
          <li class="text-gray-800"><strong>R2,117,501 - R2,722,500:</strong> R48,675 + 8% on amount above R2,117,500</li>
          <li class="text-gray-800"><strong>R2,722,501 - R12,100,000:</strong> R97,075 + 11% on amount above R2,722,500</li>
          <li class="text-gray-800"><strong>Above R12,100,000:</strong> R1,128,625 + 13% on amount above R12,100,000</li>
        </ul>
      </div>

      <h3 class="text-xl font-semibold mt-6 mb-3">Transfer Duty Examples</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800">Property value R1,000,000: Transfer duty = R0</li>
        <li class="text-gray-800">Property value R1,500,000: Transfer duty = R12,000</li>
        <li class="text-gray-800">Property value R2,000,000: Transfer duty = R41,625</li>
        <li class="text-gray-800">Property value R3,000,000: Transfer duty = R127,625</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">2. Conveyancing Fees (Paid by Seller)</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">Transfer attorneys charge conveyancing fees to handle the legal transfer. While the seller traditionally pays this, it's negotiable. Fees are regulated and based on a sliding scale:</p>

      <div class="bg-blue-50 p-6 rounded-lg mb-6">
        <h3 class="text-xl font-semibold mb-4">Estimated Conveyancing Fees 2025</h3>
        <ul class="space-y-2">
          <li class="text-gray-800">Property under R500,000: R8,000 - R12,000</li>
          <li class="text-gray-800">R500,000 - R1,000,000: R12,000 - R18,000</li>
          <li class="text-gray-800">R1,000,000 - R2,000,000: R18,000 - R25,000</li>
          <li class="text-gray-800">R2,000,000 - R5,000,000: R25,000 - R40,000</li>
          <li class="text-gray-800">Above R5,000,000: R40,000+</li>
        </ul>
        <p class="text-sm text-gray-600 mt-4">*Plus VAT (15%)</p>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">3. Bond Registration Costs (Paid by Buyer)</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">If you're financing your purchase with a home loan, you'll need to pay bond registration costs. These are similar to conveyancing fees and are based on the loan amount, not property value:</p>

      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800">Bond of R500,000: R5,000 - R8,000 + VAT</li>
        <li class="text-gray-800">Bond of R1,000,000: R10,000 - R15,000 + VAT</li>
        <li class="text-gray-800">Bond of R2,000,000: R15,000 - R22,000 + VAT</li>
        <li class="text-gray-800">Bond of R3,000,000: R20,000 - R30,000 + VAT</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">4. Deeds Office Fees</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">The Deeds Office charges fees for registering transfers. These are relatively small compared to other costs:</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800">Transfer examination fee: R400 - R600</li>
        <li class="text-gray-800">Registration fee: R300 - R500</li>
        <li class="text-gray-800">Transfer duty receipt fee: R50 - R100</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">5. Bond Costs (If Applicable)</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">Banks charge various fees when granting home loans:</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Bank Fees</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800"><strong>Initiation fee:</strong> R5,000 - R6,000 (capped by law)</li>
        <li class="text-gray-800"><strong>Valuation fee:</strong> R2,000 - R4,000</li>
        <li class="text-gray-800"><strong>Admin fee:</strong> R100 - R200 per month</li>
        <li class="text-gray-800"><strong>Bond origination fee:</strong> Sometimes waived as a special</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">6. Additional Certificates and Compliance</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">Various certificates are required for property transfer:</p>

      <div class="bg-yellow-50 p-6 rounded-lg mb-6">
        <h3 class="text-xl font-semibold mb-4">Certificates Required</h3>
        <ul class="space-y-2">
          <li class="text-gray-800"><strong>Rates Clearance Certificate:</strong> R300 - R800</li>
          <li class="text-gray-800"><strong>Electrical Compliance Certificate:</strong> R500 - R1,500</li>
          <li class="text-gray-800"><strong>Gas Compliance Certificate:</strong> R350 - R800 (if applicable)</li>
          <li class="text-gray-800"><strong>Electric Fence Certificate:</strong> R200 - R500 (if applicable)</li>
          <li class="text-gray-800"><strong>Beetle/Wood Borer Certificate:</strong> R500 - R1,000 (if property over 20 years)</li>
          <li class="text-gray-800"><strong>Water Installation Certificate:</strong> R300 - R600 (some areas)</li>
        </ul>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">7. FICA and Admin Costs</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800"><strong>FICA compliance:</strong> R500 - R1,000</li>
        <li class="text-gray-800"><strong>Document preparation:</strong> R200 - R500</li>
        <li class="text-gray-800"><strong>Postage and petties:</strong> R300 - R600</li>
        <li class="text-gray-800"><strong>Sundry expenses:</strong> R500 - R1,000</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Complete Cost Example</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">Let's calculate total costs for a R2,000,000 property purchase with a R1,800,000 bond (90% LTV):</p>

      <div class="bg-green-50 p-6 rounded-lg mb-6">
        <h3 class="text-xl font-semibold mb-4">Cost Breakdown for R2,000,000 Property</h3>
        <ul class="space-y-2 mb-4">
          <li class="text-gray-800">Transfer Duty: R41,625</li>
          <li class="text-gray-800">Conveyancing Fees: R23,000 + VAT (R26,450)</li>
          <li class="text-gray-800">Bond Registration: R18,000 + VAT (R20,700)</li>
          <li class="text-gray-800">Bank Initiation Fee: R5,940</li>
          <li class="text-gray-800">Valuation Fee: R3,000</li>
          <li class="text-gray-800">Deeds Office Fees: R1,000</li>
          <li class="text-gray-800">Certificates: R3,000</li>
          <li class="text-gray-800">FICA & Admin: R1,500</li>
        </ul>
        <p class="text-xl font-bold text-green-800 border-t-2 border-green-300 pt-3">Total Estimated Costs: R121,215</p>
        <p class="text-sm text-gray-600 mt-2">*Plus 10% deposit (R200,000) = R321,215 total needed to purchase</p>
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Hidden Costs to Consider</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">Beyond official fees, budget for these additional costs:</p>

      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800"><strong>Moving costs:</strong> R5,000 - R20,000</li>
        <li class="text-gray-800"><strong>Home insurance:</strong> R1,000 - R3,000 per month</li>
        <li class="text-gray-800"><strong>Home inspection:</strong> R2,000 - R5,000 (recommended)</li>
        <li class="text-gray-800"><strong>Immediate repairs:</strong> Budget 1-3% of property value</li>
        <li class="text-gray-800"><strong>Furniture and appliances:</strong> Variable</li>
        <li class="text-gray-800"><strong>Connection fees:</strong> Utilities (R500 - R2,000)</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Ways to Reduce Transfer Costs</h2>

      <h3 class="text-xl font-semibold mt-6 mb-3">1. Buy Below R1.1 Million</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Properties under R1,100,000 attract no transfer duty, saving you thousands. This is especially beneficial for first-time buyers.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">2. Negotiate Who Pays What</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">While there are conventions, all costs are negotiable. Sometimes sellers agree to cover certain buyer costs to close the deal faster.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">3. Shop Around for Attorneys</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">While the seller usually appoints the transfer attorney, buyers can negotiate. Get quotes from multiple attorneys and compare services and fees.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">4. Bundle Services</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Some law firms offer package deals when handling both transfer and bond registration, potentially saving R2,000 - R5,000.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">5. Get Pre-Existing Certificates</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">If the seller has recent compliance certificates (less than 2 years old), you might be able to use those instead of getting new ones.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Payment Timeline</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">Understanding when payments are due helps with cash flow planning:</p>

      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800"><strong>Deposit:</strong> Within 7 days of offer acceptance (typically 10%)</li>
        <li class="text-gray-800"><strong>Transfer duty:</strong> Before transfer registration</li>
        <li class="text-gray-800"><strong>Conveyancing fees:</strong> Before transfer registration</li>
        <li class="text-gray-800"><strong>Bond costs:</strong> Deducted from loan amount at registration</li>
        <li class="text-gray-800"><strong>Certificates:</strong> Before transfer (attorney arranges)</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Regional Cost Variations</h2>

      <h3 class="text-xl font-semibold mt-6 mb-3">Johannesburg</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Rates clearance certificates in Johannesburg can take longer and may cost slightly more (R500-R800). Attorney fees are competitive due to high market activity.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Cape Town</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Cape Town often requires additional heritage compliance for older properties (R1,000-R3,000). Conveyancing fees are typically at the higher end due to property values.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Durban</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">eThekwini Municipality charges R350-R600 for rates clearances. Overall costs are often lower than major metros due to lower property values.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Tax Implications and Deductions</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">Unfortunately, most property transfer costs are not tax-deductible for private individuals. However:</p>

      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li class="text-gray-800">Transfer costs increase your property's cost base for CGT purposes</li>
        <li class="text-gray-800">If buying as investment property, costs may be deductible</li>
        <li class="text-gray-800">Bond interest is deductible for investment properties</li>
        <li class="text-gray-800">Keep all receipts for future CGT calculations</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">Frequently Asked Questions</h2>

      <h3 class="text-xl font-semibold mt-6 mb-3">Do I pay VAT on transfer costs?</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Yes, VAT (15%) applies to conveyancing fees, bond registration fees, and most professional services. Transfer duty itself is not subject to VAT.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">Can I add transfer costs to my bond?</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Most banks will not finance transfer costs separately. However, some allow you to borrow up to 110% of purchase price to cover costs if you qualify.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">What if I can't afford transfer costs?</h3>
      <p class="mb-4 text-gray-800 leading-relaxed">Options include: negotiating with seller to cover costs, buying a cheaper property, saving longer before purchase, or looking into first-time buyer programs.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      <p class="mb-4 text-gray-800 leading-relaxed">Property transfer costs in South Africa can total 5-8% of the purchase price when including all fees, deposits, and associated costs. Proper budgeting and understanding these costs upfront prevents financial stress during the transfer process.</p>

      <p class="mb-4 text-gray-800 leading-relaxed">Use our <a href="/south-africa-property-transfer-calculator" class="text-blue-600 hover:text-blue-800 font-semibold">Property Transfer Calculator</a> to get an accurate estimate of your specific transfer costs based on property value and location.</p>

      <hr class="my-8 border-gray-300" />

      <div class="bg-blue-50 p-6 rounded-lg mt-8">
        <h3 class="text-xl font-bold mb-3">💰 Money-Saving Tip</h3>
        <p class="text-gray-800">Always request a detailed fee estimate from your attorney upfront. This should include all anticipated costs with no hidden surprises. Compare quotes from at least 3 attorneys before making your choice.</p>
      </div>
    </div>`,
    author: "Genius Insights Property Team",
    is_published: true,
    reading_time: 11,
    featured_image: "https://images.unsplash.com/photo-1554224311-beee460c201f?w=1200",
    seo_title: "Property Transfer Costs South Africa 2025 | Complete Fee Breakdown",
    seo_description: "Complete breakdown of property transfer costs in South Africa for 2025. Calculate transfer duty, conveyancing fees, bond costs, and all hidden expenses.",
    seo_keywords: [
      "property transfer costs south africa",
      "transfer duty calculator",
      "conveyancing fees",
      "bond registration costs",
      "property transfer fees",
      "transfer costs breakdown",
      "deeds office fees",
      "property transfer expenses",
      "transfer duty rates 2025",
      "attorney fees property transfer",
      "rates clearance certificate cost",
      "compliance certificate costs",
      "home buying costs SA",
      "property purchase costs",
      "transfer duty exemption",
      "first time buyer costs",
      "bond costs south africa",
      "property registration fees",
      "SARS transfer duty",
      "property transfer budget"
    ]
  }
];

async function importArticles() {
  try {
    console.log('Starting article import...\n');

    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      console.log(`Importing article ${i + 1}/${articles.length}: ${article.title}`);

      const articleData = {
        ...article,
        published_at: Timestamp.now(),
        created_at: Timestamp.now(),
        updated_at: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, 'articles'), articleData);
      console.log(`✅ Successfully imported with ID: ${docRef.id}\n`);
    }

    console.log('🎉 All articles imported successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing articles:', error);
    process.exit(1);
  }
}

importArticles();
