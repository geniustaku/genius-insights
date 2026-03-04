import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-lg mx-auto px-4">
        <h1 className="text-7xl font-bold text-gray-900">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mt-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mt-3 mb-8">
          The page you are looking for does not exist or has moved. Try one of our popular financial tools below.
        </p>
        <div className="space-y-3">
          <Link href="/" className="block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium">
            Go to Homepage
          </Link>
          <Link href="/calculators" className="block border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 font-medium">
            Browse SA Financial Calculators
          </Link>
          <Link href="/vat-calculator" className="block border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 font-medium">
            SA VAT Calculator
          </Link>
        </div>
      </div>
    </div>
  )
}
