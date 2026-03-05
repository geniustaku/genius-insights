import type { Metadata } from 'next';
import SouthAfricaInflationCalculator from '@/components/SouthAfricaInflationCalculator';
import StructuredData from '@/components/StructuredData';
import AdSenseAd from '@/components/AdSenseAd';
import RelatedCalculators from '@/components/RelatedCalculators';

export const metadata: Metadata = {
  title: 'Inflation Calculator SA 2026 | CPI & Cost of Living',
  description: 'What is the inflation rate in South Africa? Free CPI inflation calculator with historical rates from Stats SA. See how the cost of living affects your money.',
  keywords: [
    'inflation rate south africa 2026',
    'inflation calculator south africa',
    'CPI calculator south africa',
    'what is the inflation rate in south africa',
    'cost of living calculator south africa',
    'south africa CPI rate 2026',
    'purchasing power calculator rand',
    'Stats SA inflation rate',
    'SARB inflation target 3 to 6 percent',
    'rand value over time calculator',
    'inflation impact on salary south africa',
    'food inflation south africa 2026',
    'historical inflation rate south africa',
    'real value of money calculator SA'
  ],
  alternates: {
    canonical: '/south-africa-inflation-calculator',
  },
  openGraph: {
    title: 'Inflation Calculator SA 2026 | CPI & Cost of Living',
    description: 'What is the inflation rate in South Africa? Calculate how CPI and cost of living changes affect your purchasing power.',
    url: 'https://genius-insights.co.za/south-africa-inflation-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inflation Calculator SA 2026 | CPI & Cost of Living',
    description: 'What is the inflation rate in South Africa? Calculate how inflation erodes your purchasing power with historical CPI data.',
  },
};

export default function SouthAfricaInflationCalculatorPage() {
  return (
    <>
      <StructuredData
        type="investment-calculator"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.genius-insights.co.za' },
          { name: 'Calculators', url: 'https://www.genius-insights.co.za/calculators' },
          { name: 'Inflation Calculator', url: 'https://www.genius-insights.co.za/south-africa-inflation-calculator' },
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-b-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="text-center">
              <div className="inline-block bg-white/20 rounded-2xl px-6 py-3 mb-6">
                <span className="text-white/90 font-medium text-sm tracking-wide">📈 CPI & Purchasing Power</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                What Is the Inflation Rate <br/>
                <span className="bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">in South Africa? (2026)</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Calculate how inflation and the cost of living erode your purchasing power.
                Uses official Stats SA CPI data and SARB's 3-6% inflation target band.
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">4.4%</div>
                  <div className="text-white/80 text-sm">2024 Inflation</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">3-6%</div>
                  <div className="text-white/80 text-sm">SARB Target</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">5.1%</div>
                  <div className="text-white/80 text-sm">10yr Average</div>
                </div>
                <div className="bg-white/20 rounded-2xl px-6 py-4 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">Free</div>
                  <div className="text-white/80 text-sm">Calculator</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ad Before Calculator */}
        <div className="max-w-6xl mx-auto px-8 py-8">
          <AdSenseAd
            adSlot="5341658648"
            adFormat="auto"
            style={{ display: 'block', minHeight: '90px' }}
            className="border border-gray-200 rounded-lg"
          />
        </div>

        {/* Main Calculator Section */}
        <div className="max-w-6xl mx-auto px-8 py-16">
          <SouthAfricaInflationCalculator />
        </div>

        {/* Ad After Calculator */}
        <div className="max-w-6xl mx-auto px-8 py-8">
          <AdSenseAd
            adSlot="2386701555"
            adFormat="auto"
            style={{ display: 'block', minHeight: '90px' }}
            className="border border-gray-200 rounded-lg"
          />
        </div>

        {/* Information Section */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                  How CPI Inflation Affects Your Money in SA
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Stats SA measures the Consumer Price Index (CPI) monthly. The SARB targets 3-6% inflation.
                  If your salary increase is below CPI, you are effectively earning less each year.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: '📊', title: 'CPI Measurement', desc: 'Stats SA measures Consumer Price Index monthly' },
                    { icon: '🎯', title: '3-6% Target', desc: 'SARB aims to keep inflation within this band' },
                    { icon: '📉', title: 'Purchasing Power', desc: 'Your money buys less each year' },
                    { icon: '💰', title: 'Investment Returns', desc: 'Must beat inflation to grow real wealth' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-xl">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  SA Inflation History
                </h3>

                <div className="overflow-x-auto mb-8">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold text-gray-900">Year</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-900">Rate</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-900">Year</th>
                        <th className="px-3 py-2 text-left font-semibold text-gray-900">Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-3 py-2 text-gray-700">2024</td>
                        <td className="px-3 py-2 text-gray-700">4.4%</td>
                        <td className="px-3 py-2 text-gray-700">2019</td>
                        <td className="px-3 py-2 text-gray-700">4.1%</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-gray-700">2023</td>
                        <td className="px-3 py-2 text-gray-700">5.9%</td>
                        <td className="px-3 py-2 text-gray-700">2018</td>
                        <td className="px-3 py-2 text-gray-700">4.7%</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-gray-700">2022</td>
                        <td className="px-3 py-2 text-red-600 font-semibold">6.9%</td>
                        <td className="px-3 py-2 text-gray-700">2017</td>
                        <td className="px-3 py-2 text-gray-700">5.3%</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-gray-700">2021</td>
                        <td className="px-3 py-2 text-gray-700">4.5%</td>
                        <td className="px-3 py-2 text-gray-700">2016</td>
                        <td className="px-3 py-2 text-gray-700">6.3%</td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2 text-gray-700">2020</td>
                        <td className="px-3 py-2 text-green-600 font-semibold">3.3%</td>
                        <td className="px-3 py-2 text-gray-700">2015</td>
                        <td className="px-3 py-2 text-gray-700">4.6%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200">
                  <h4 className="font-semibold text-indigo-900 mb-2">Real Returns Matter</h4>
                  <p className="text-indigo-800 text-sm leading-relaxed">
                    If your investment returns 8% but inflation is 5%, your real return is only 3%.
                    To grow wealth, you need returns that beat inflation after tax.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Calculators */}
        <div className="max-w-6xl mx-auto px-8 pb-16">
          <RelatedCalculators currentSlug="south-africa-inflation-calculator" />
        </div>
      </div>
    </>
  );
}
