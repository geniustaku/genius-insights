import Link from 'next/link';

interface CalculatorLink {
  name: string;
  href: string;
  description: string;
  icon: string;
  category: string;
}

const ALL_CALCULATORS: CalculatorLink[] = [
  { name: 'SARS Tax Calculator', href: '/south-africa-tax-calculator', description: 'Calculate PAYE income tax with 2026 brackets', icon: '🧮', category: 'Tax' },
  { name: 'Income Tax Calculator', href: '/south-africa-income-tax-calculator', description: 'Personal income tax with rebates', icon: '📊', category: 'Tax' },
  { name: 'Tax Refund Calculator', href: '/south-africa-tax-refund-calculator', description: 'Estimate your SARS tax refund', icon: '💵', category: 'Tax' },
  { name: 'Payroll & PAYE Calculator', href: '/south-africa-payroll-calculator', description: 'Gross to net salary with all deductions', icon: '💰', category: 'Tax' },
  { name: 'VAT Calculator', href: '/south-africa-vat-calculator', description: 'Add or remove 15% VAT', icon: '🏷️', category: 'Tax' },
  { name: 'Capital Gains Tax Calculator', href: '/south-africa-capital-gains-tax-calculator', description: 'CGT on property, shares and crypto', icon: '📉', category: 'Tax' },
  { name: 'Crypto Tax Calculator', href: '/south-africa-crypto-tax-calculator', description: 'SARS crypto asset tax calculations', icon: '₿', category: 'Tax' },
  { name: 'Freelancer Tax Calculator', href: '/south-africa-freelancer-provisional-tax-calculator', description: 'Provisional tax for freelancers', icon: '💻', category: 'Tax' },
  { name: 'Estate Duty Calculator', href: '/south-africa-estate-duty-calculator', description: 'Estate duty on deceased estates', icon: '📜', category: 'Tax' },
  { name: 'UIF Calculator', href: '/south-africa-uif-calculator', description: 'Calculate unemployment benefit payouts', icon: '🛡️', category: 'Employment' },
  { name: 'Leave Days Calculator', href: '/south-africa-leave-calculator', description: 'Annual and sick leave per BCEA', icon: '📅', category: 'Employment' },
  { name: 'Overtime Calculator', href: '/south-africa-overtime-calculator', description: 'BCEA overtime rates for weekdays and Sundays', icon: '⏰', category: 'Employment' },
  { name: 'Retrenchment Calculator', href: '/south-africa-gratuity-calculator', description: 'Severance pay and retrenchment packages', icon: '📋', category: 'Employment' },
  { name: 'Salary Calculator', href: '/salary-calculator', description: 'Take-home pay for 18 African countries', icon: '💼', category: 'Employment' },
  { name: 'Pension Calculator', href: '/south-africa-pension-calculator', description: 'Pension fund and RA projections', icon: '🏦', category: 'Investment' },
  { name: 'Retirement Calculator', href: '/south-africa-retirement-calculator', description: 'Plan your retirement savings', icon: '🎯', category: 'Investment' },
  { name: 'TFSA Calculator', href: '/south-africa-tfsa-calculator', description: 'Tax-free savings account growth', icon: '💎', category: 'Investment' },
  { name: 'Investment Calculator', href: '/south-africa-investment-calculator', description: 'Compound interest and portfolio growth', icon: '💹', category: 'Investment' },
  { name: 'Deposit Calculator', href: '/south-africa-deposit-calculator', description: 'Fixed deposit and savings returns', icon: '🏦', category: 'Investment' },
  { name: 'Inflation Calculator', href: '/south-africa-inflation-calculator', description: 'CPI and purchasing power calculator', icon: '📊', category: 'Economic' },
  { name: 'Bond Calculator', href: '/south-africa-bond-calculator', description: 'Home loan monthly repayments', icon: '🏠', category: 'Property' },
  { name: 'Property Transfer Calculator', href: '/south-africa-property-transfer-calculator', description: 'Transfer duty and buying costs', icon: '🔑', category: 'Property' },
  { name: 'Rental Yield Calculator', href: '/south-africa-rental-yield-calculator', description: 'Buy-to-let property returns', icon: '📈', category: 'Property' },
  { name: 'Loan Calculator', href: '/south-africa-loan-calculator', description: 'Home loan affordability and bond payments', icon: '🏡', category: 'Loans' },
  { name: 'Personal Loan Calculator', href: '/south-africa-personal-loan-calculator', description: 'Personal loan repayments and interest', icon: '💳', category: 'Loans' },
  { name: 'Car Finance Calculator', href: '/south-africa-car-finance-calculator', description: 'Vehicle finance with balloon payments', icon: '🚗', category: 'Loans' },
  { name: 'Debt Consolidation Calculator', href: '/south-africa-debt-consolidation-calculator', description: 'Combine debts for lower payments', icon: '🔀', category: 'Loans' },
  { name: 'Credit Card Calculator', href: '/south-africa-credit-card-calculator', description: 'Credit card payoff and interest cost', icon: '💳', category: 'Loans' },
  { name: 'Capitec Calculator', href: '/south-africa-capitec-calculator', description: 'Capitec personal loan calculator', icon: '🏧', category: 'Banking' },
  { name: 'FNB Calculator', href: '/south-africa-fnb-calculator', description: 'FNB bond and loan calculator', icon: '🏧', category: 'Banking' },
  { name: 'Standard Bank Calculator', href: '/south-africa-standard-bank-calculator', description: 'Standard Bank loan calculator', icon: '🏧', category: 'Banking' },
  { name: 'Insurance Calculator', href: '/south-africa-insurance-calculator', description: 'Insurance premium estimates', icon: '🔒', category: 'Insurance' },
  { name: 'Business Registration Calculator', href: '/south-africa-business-registration-calculator', description: 'CIPC registration costs', icon: '🏢', category: 'Business' },
  { name: 'Fuel Cost Calculator', href: '/south-africa-fuel-cost-calculator', description: 'Petrol and diesel trip costs', icon: '⛽', category: 'Lifestyle' },
  { name: 'Solar Calculator', href: '/south-africa-solar-loadshedding-calculator', description: 'Solar panel savings and ROI', icon: '☀️', category: 'Lifestyle' },
];

const RELATED_MAP: Record<string, string[]> = {
  'south-africa-tax-calculator': ['/south-africa-income-tax-calculator', '/south-africa-payroll-calculator', '/south-africa-tax-refund-calculator', '/south-africa-vat-calculator'],
  'south-africa-income-tax-calculator': ['/south-africa-payroll-calculator', '/south-africa-tax-calculator', '/south-africa-tax-refund-calculator', '/south-africa-vat-calculator'],
  'south-africa-tax-refund-calculator': ['/south-africa-payroll-calculator', '/south-africa-tax-calculator', '/south-africa-income-tax-calculator', '/south-africa-vat-calculator'],
  'south-africa-payroll-calculator': ['/south-africa-tax-calculator', '/south-africa-uif-calculator', '/south-africa-leave-calculator', '/south-africa-overtime-calculator'],
  'south-africa-vat-calculator': ['/south-africa-tax-calculator', '/south-africa-freelancer-provisional-tax-calculator', '/south-africa-business-registration-calculator', '/south-africa-income-tax-calculator'],
  'south-africa-capital-gains-tax-calculator': ['/south-africa-investment-calculator', '/south-africa-crypto-tax-calculator', '/south-africa-estate-duty-calculator', '/south-africa-tax-calculator'],
  'south-africa-crypto-tax-calculator': ['/south-africa-capital-gains-tax-calculator', '/south-africa-tax-calculator', '/south-africa-freelancer-provisional-tax-calculator', '/south-africa-investment-calculator'],
  'south-africa-freelancer-provisional-tax-calculator': ['/south-africa-tax-calculator', '/south-africa-vat-calculator', '/south-africa-payroll-calculator', '/south-africa-tax-refund-calculator'],
  'south-africa-estate-duty-calculator': ['/south-africa-capital-gains-tax-calculator', '/south-africa-investment-calculator', '/south-africa-retirement-calculator', '/south-africa-property-transfer-calculator'],
  'south-africa-uif-calculator': ['/south-africa-payroll-calculator', '/south-africa-leave-calculator', '/south-africa-overtime-calculator', '/south-africa-gratuity-calculator'],
  'south-africa-leave-calculator': ['/south-africa-payroll-calculator', '/south-africa-uif-calculator', '/south-africa-overtime-calculator', '/south-africa-gratuity-calculator'],
  'south-africa-overtime-calculator': ['/south-africa-payroll-calculator', '/south-africa-uif-calculator', '/south-africa-leave-calculator', '/south-africa-tax-calculator'],
  'south-africa-gratuity-calculator': ['/south-africa-uif-calculator', '/south-africa-leave-calculator', '/south-africa-tax-refund-calculator', '/south-africa-payroll-calculator'],
  'salary-calculator': ['/south-africa-payroll-calculator', '/south-africa-tax-calculator', '/south-africa-uif-calculator', '/south-africa-overtime-calculator'],
  'south-africa-pension-calculator': ['/south-africa-retirement-calculator', '/south-africa-tfsa-calculator', '/south-africa-investment-calculator', '/south-africa-payroll-calculator'],
  'south-africa-retirement-calculator': ['/south-africa-pension-calculator', '/south-africa-tfsa-calculator', '/south-africa-investment-calculator', '/south-africa-inflation-calculator'],
  'south-africa-tfsa-calculator': ['/south-africa-investment-calculator', '/south-africa-retirement-calculator', '/south-africa-pension-calculator', '/south-africa-deposit-calculator'],
  'south-africa-investment-calculator': ['/south-africa-retirement-calculator', '/south-africa-tfsa-calculator', '/south-africa-pension-calculator', '/south-africa-inflation-calculator'],
  'south-africa-deposit-calculator': ['/south-africa-investment-calculator', '/south-africa-tfsa-calculator', '/south-africa-retirement-calculator', '/south-africa-inflation-calculator'],
  'south-africa-inflation-calculator': ['/south-africa-investment-calculator', '/south-africa-retirement-calculator', '/south-africa-deposit-calculator', '/south-africa-tfsa-calculator'],
  'south-africa-bond-calculator': ['/south-africa-property-transfer-calculator', '/south-africa-loan-calculator', '/south-africa-rental-yield-calculator', '/south-africa-investment-calculator'],
  'south-africa-property-transfer-calculator': ['/south-africa-bond-calculator', '/south-africa-loan-calculator', '/south-africa-rental-yield-calculator', '/south-africa-capital-gains-tax-calculator'],
  'south-africa-rental-yield-calculator': ['/south-africa-bond-calculator', '/south-africa-property-transfer-calculator', '/south-africa-investment-calculator', '/south-africa-loan-calculator'],
  'south-africa-loan-calculator': ['/south-africa-bond-calculator', '/south-africa-personal-loan-calculator', '/south-africa-car-finance-calculator', '/south-africa-property-transfer-calculator'],
  'south-africa-personal-loan-calculator': ['/south-africa-credit-card-calculator', '/south-africa-debt-consolidation-calculator', '/south-africa-car-finance-calculator', '/south-africa-capitec-calculator'],
  'south-africa-car-finance-calculator': ['/south-africa-personal-loan-calculator', '/south-africa-loan-calculator', '/south-africa-fuel-cost-calculator', '/south-africa-debt-consolidation-calculator'],
  'south-africa-debt-consolidation-calculator': ['/south-africa-credit-card-calculator', '/south-africa-personal-loan-calculator', '/south-africa-car-finance-calculator', '/south-africa-loan-calculator'],
  'south-africa-credit-card-calculator': ['/south-africa-debt-consolidation-calculator', '/south-africa-personal-loan-calculator', '/south-africa-loan-calculator', '/south-africa-capitec-calculator'],
  'south-africa-capitec-calculator': ['/south-africa-personal-loan-calculator', '/south-africa-fnb-calculator', '/south-africa-standard-bank-calculator', '/south-africa-credit-card-calculator'],
  'south-africa-fnb-calculator': ['/south-africa-capitec-calculator', '/south-africa-standard-bank-calculator', '/south-africa-personal-loan-calculator', '/south-africa-bond-calculator'],
  'south-africa-standard-bank-calculator': ['/south-africa-fnb-calculator', '/south-africa-capitec-calculator', '/south-africa-personal-loan-calculator', '/south-africa-bond-calculator'],
  'south-africa-insurance-calculator': ['/south-africa-car-finance-calculator', '/south-africa-loan-calculator', '/south-africa-investment-calculator', '/south-africa-retirement-calculator'],
  'south-africa-insurance-comparison': ['/south-africa-insurance-calculator', '/south-africa-car-finance-calculator', '/south-africa-personal-loan-calculator', '/south-africa-investment-calculator'],
  'south-africa-business-registration-calculator': ['/south-africa-vat-calculator', '/south-africa-tax-calculator', '/south-africa-freelancer-provisional-tax-calculator', '/south-africa-payroll-calculator'],
  'south-africa-fuel-cost-calculator': ['/south-africa-car-finance-calculator', '/south-africa-inflation-calculator', '/south-africa-solar-loadshedding-calculator', '/south-africa-loan-calculator'],
  'south-africa-solar-loadshedding-calculator': ['/south-africa-fuel-cost-calculator', '/south-africa-investment-calculator', '/south-africa-loan-calculator', '/south-africa-deposit-calculator'],
};

export default function RelatedCalculators({ currentSlug }: { currentSlug: string }) {
  const relatedHrefs = RELATED_MAP[currentSlug];
  if (!relatedHrefs) return null;

  const relatedCalcs = relatedHrefs
    .map(href => ALL_CALCULATORS.find(c => c.href === href))
    .filter((c): c is CalculatorLink => c !== undefined)
    .slice(0, 4);

  if (relatedCalcs.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Related Calculators</h2>
      <p className="text-gray-500 mb-6">More free South African financial tools</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedCalcs.map((calc) => (
          <Link key={calc.href} href={calc.href}>
            <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-emerald-300 transition-all group h-full">
              <div className="flex items-start gap-3">
                <span className="text-3xl flex-shrink-0">{calc.icon}</span>
                <div>
                  <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">{calc.category}</span>
                  <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mt-0.5 text-sm">{calc.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{calc.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
