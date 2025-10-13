import type { Metadata } from "next";
import DocumentConverter from '@/components/DocumentConverter';
import Link from 'next/link';
import AdSenseAd from '@/components/AdSenseAd';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: "Free Online Document Converter | Convert PDF to Word, Excel to PDF, PowerPoint Converter 2025",
  description: "Convert PDF to Word, Word to PDF, Excel to PDF, PowerPoint to PDF online free. No software download required. Secure document conversion tool supports DOC, DOCX, XLS, XLSX, PPT, PPTX files. Fast & reliable document converter.",
  keywords: "PDF to Word converter, Word to PDF converter, Excel to PDF converter, PowerPoint to PDF, convert PDF to Word online free, convert Word to PDF online, convert Excel to PDF, convert PPT to PDF, document converter online free, PDF converter, DOCX to PDF, XLS to PDF converter, PPTX to PDF converter, online file converter, free document conversion tool, convert documents online, PDF to DOCX converter, Word document converter, Excel file converter, PowerPoint file converter, convert PDF to editable Word, PDF to Word converter free download, convert PDF to Word without software, best PDF to Word converter, convert scanned PDF to Word, PDF to Word converter online, convert PDF to Word document, PDF to Microsoft Word converter, convert PDF file to Word document, online PDF to Word conversion, free PDF to Word converter online, convert PDF to Word format, PDF to DOC converter, PDF to DOCX online, convert PDF to editable text, PDF text converter, document format converter, file format converter, convert office documents, Microsoft Office converter, LibreOffice converter, online document conversion, secure document converter, fast document conversion, bulk document converter, batch file converter",
  alternates: {
    canonical: "https://www.genius-insights.co.za/document-converter",
  },
  openGraph: {
    title: "Free PDF to Word & Document Converter | Convert Files Online 2025",
    description: "Convert PDF to Word, Excel to PDF, PowerPoint files online free. No registration required. Secure, fast document conversion tool supports all major file formats.",
    type: "website",
    url: "https://www.genius-insights.co.za/document-converter",
    siteName: "Genius Insights Document Converter",
    images: [
      {
        url: '/images/document-converter-tool.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Online Document Converter - Convert PDF, Word, Excel, PowerPoint',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Document Converter | PDF to Word, Excel to PDF Online",
    description: "🔄 Convert PDF to Word, Word to PDF, Excel to PDF online FREE! No software needed. Fast, secure document conversion tool. ⚡",
    images: ['/images/document-converter-twitter.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function DocumentConverterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <StructuredData type="homepage" />
      
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <span className="text-white font-bold text-lg">G</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-gray-900 group-hover:text-green-600 transition-colors">Genius Insights</span>
                  <span className="text-xs text-gray-500 -mt-1">Document Converter</span>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="text-gray-600 hover:text-green-600 font-medium transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-8">
        {/* SEO-Optimized Hero Section */}
        <div className="max-w-4xl mx-auto px-6 text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Free Online <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Document Converter</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-8 font-medium">
            Convert PDF to Word, Word to PDF, Excel to PDF, PowerPoint Files Online - No Software Required
          </h2>
          
          {/* Popular Conversion Types Showcase */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200/50 shadow-lg mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-red-500 rounded-xl flex items-center justify-center mb-3 shadow-md">
                  <span className="text-white font-bold text-lg">PDF</span>
                </div>
                <span className="text-sm font-semibold text-gray-700">PDF to Word</span>
                <span className="text-xs text-gray-500">Most Popular</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-3 shadow-md">
                  <span className="text-white font-bold text-sm">DOC</span>
                </div>
                <span className="text-sm font-semibold text-gray-700">Word to PDF</span>
                <span className="text-xs text-gray-500">Business Use</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mb-3 shadow-md">
                  <span className="text-white font-bold text-sm">XLS</span>
                </div>
                <span className="text-sm font-semibold text-gray-700">Excel to PDF</span>
                <span className="text-xs text-gray-500">Reports</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mb-3 shadow-md">
                  <span className="text-white font-bold text-sm">PPT</span>
                </div>
                <span className="text-sm font-semibold text-gray-700">PowerPoint</span>
                <span className="text-xs text-gray-500">Presentations</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
              <div className="flex items-center justify-center space-x-1">
                <span className="text-green-500">✓</span>
                <span className="font-medium text-gray-700">100% Free</span>
              </div>
              <div className="flex items-center justify-center space-x-1">
                <span className="text-green-500">✓</span>
                <span className="font-medium text-gray-700">No Registration</span>
              </div>
              <div className="flex items-center justify-center space-x-1">
                <span className="text-green-500">✓</span>
                <span className="font-medium text-gray-700">Secure & Private</span>
              </div>
              <div className="flex items-center justify-center space-x-1">
                <span className="text-green-500">✓</span>
                <span className="font-medium text-gray-700">All Devices</span>
              </div>
            </div>
          </div>
        </div>

        {/* Document Converter Tool */}
        <div className="max-w-4xl mx-auto px-6">
          <DocumentConverter />
        </div>

        {/* High-Value Ad Placement - Document Software */}
        <div className="max-w-4xl mx-auto mt-16 px-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50 shadow-lg">
            <div className="text-center mb-4">
              <span className="text-xs text-blue-600 font-medium bg-white px-3 py-1.5 rounded-full border border-blue-200 shadow-sm">Document Software & Tools</span>
            </div>
            <AdSenseAd 
              adSlot="4969876131"
              adFormat="fluid"
              adLayout="in-article"
              style={{ display: 'block', textAlign: 'center' }}
            />
          </div>
        </div>

        {/* Popular Conversion Methods - SEO Content */}
        <div className="max-w-4xl mx-auto mt-16 px-6">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Most Popular Document Conversions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl border border-red-200/50">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold">PDF</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">PDF to Word</h3>
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">Most Popular</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Convert PDF to editable Word documents (DOC, DOCX). Perfect for editing PDF files, extracting text, and creating editable documents from scanned PDFs.
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">PDF to DOC</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">PDF to DOCX</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200/50">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">DOC</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Word to PDF</h3>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Business</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Convert Word documents to PDF format. Preserve formatting, create professional documents, and ensure universal compatibility across all devices and platforms.
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">DOC to PDF</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">DOCX to PDF</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200/50">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">XLS</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Excel to PDF</h3>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Reports</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Convert Excel spreadsheets to PDF. Share data tables, charts, and financial reports professionally while maintaining formatting and print quality.
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">XLS to PDF</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">XLSX to PDF</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-200/50">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">PPT</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">PowerPoint to PDF</h3>
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">Presentations</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Convert PowerPoint presentations to PDF. Share slides without requiring PowerPoint software, perfect for handouts, portfolios, and presentations.
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">PPT to PDF</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">PPTX to PDF</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200/50">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">ODT</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">LibreOffice Files</h3>
                    <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">Open Source</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Convert OpenDocument formats (ODT) to PDF or Word. Full LibreOffice compatibility for users who prefer open-source office software.
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">ODT to PDF</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">ODT to DOC</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-xl border border-gray-200/50">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">RTF</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Universal Formats</h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Compatible</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Convert RTF (Rich Text Format) and TXT files to PDF or Word. Universal document sharing across all word processors and operating systems.
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">RTF to PDF</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">TXT to PDF</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Microsoft Office & PDF Tools Ad */}
        <div className="max-w-4xl mx-auto mt-16 px-6">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200/50 shadow-lg">
            <div className="text-center mb-4">
              <span className="text-xs text-indigo-600 font-medium bg-white px-3 py-1.5 rounded-full border border-indigo-200 shadow-sm">Microsoft Office & PDF Software</span>
            </div>
            <AdSenseAd 
              adSlot="3043670508"
              className="text-center"
            />
          </div>
        </div>

        {/* SEO Content - Why Choose Our Converter */}
        <div className="max-w-4xl mx-auto mt-16 px-6">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Free Document Converter?</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <span className="text-2xl mr-3">✨</span>
                  Best PDF to Word Converter Features
                </h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1 text-lg">✓</span>
                    <div>
                      <strong className="text-gray-900">No Software Download Required:</strong>
                      <p className="text-sm mt-1">Convert PDF to Word online without installing Adobe Acrobat, Microsoft Office, or any other programs. Works entirely in your web browser.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1 text-lg">✓</span>
                    <div>
                      <strong className="text-gray-900">Preserve Original Formatting:</strong>
                      <p className="text-sm mt-1">Advanced OCR technology maintains original layout, fonts, images, tables, and formatting in converted documents.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1 text-lg">✓</span>
                    <div>
                      <strong className="text-gray-900">Lightning-Fast Conversion:</strong>
                      <p className="text-sm mt-1">Powered by LibreOffice engine and Python pdf2docx for accurate conversions in seconds, not minutes.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1 text-lg">✓</span>
                    <div>
                      <strong className="text-gray-900">Bank-Level Security:</strong>
                      <p className="text-sm mt-1">Files are automatically deleted after conversion. SSL encryption protects your documents during upload and processing.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1 text-lg">✓</span>
                    <div>
                      <strong className="text-gray-900">Handle Large Files:</strong>
                      <p className="text-sm mt-1">Convert files up to 50MB including complex PDFs with images, multi-page documents, and detailed spreadsheets.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <span className="text-2xl mr-3">🎯</span>
                  Popular Use Cases & Industries
                </h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200/50">
                    <h4 className="font-semibold text-blue-900 mb-2">👨‍🎓 Students & Academics</h4>
                    <p className="text-sm text-gray-700">Convert PDF research papers, assignments, and textbooks to editable Word documents for citations, notes, and collaboration.</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200/50">
                    <h4 className="font-semibold text-green-900 mb-2">💼 Business Professionals</h4>
                    <p className="text-sm text-gray-700">Convert contracts, reports, presentations to PDF for secure sharing. Convert received PDFs to Word for editing and feedback.</p>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200/50">
                    <h4 className="font-semibold text-orange-900 mb-2">🏢 Legal & Finance</h4>
                    <p className="text-sm text-gray-700">Convert legal documents, financial statements, and contracts between PDF and editable formats while maintaining formatting integrity.</p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200/50">
                    <h4 className="font-semibold text-purple-900 mb-2">🏥 Healthcare & Research</h4>
                    <p className="text-sm text-gray-700">Convert medical reports, research documents, and forms between PDF and Word for compliance and collaboration.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200/50">
                    <h4 className="font-semibold text-gray-900 mb-2">🏠 Personal Use</h4>
                    <p className="text-sm text-gray-700">Convert resumes, invoices, forms, and personal documents for editing, printing, or sharing across different devices and platforms.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works - Step by Step */}
        <div className="max-w-4xl mx-auto mt-16 px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Convert Documents Online - Step by Step</h2>
            <p className="text-gray-600 text-lg">Convert PDF to Word, Excel to PDF, and more in 3 simple steps - completely free with no registration</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-4">Upload Your Document</h3>
              <p className="text-gray-600 leading-relaxed">
                Drag and drop your PDF, Word, Excel, or PowerPoint file into the converter. Or click to browse and select from your computer. We support all major document formats including DOC, DOCX, PDF, XLS, XLSX, PPT, PPTX, ODT, RTF, and TXT files.
              </p>
              <div className="mt-4 text-sm text-blue-600 font-medium">
                Supports files up to 50MB
              </div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-4">Choose Output Format</h3>
              <p className="text-gray-600 leading-relaxed">
                Select your desired output format from PDF, Word (DOCX), OpenDocument (ODT), or Rich Text Format (RTF). Our intelligent converter automatically optimizes settings for the best quality conversion based on your file type.
              </p>
              <div className="mt-4 text-sm text-green-600 font-medium">
                Multiple format options available
              </div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-4">Download Instantly</h3>
              <p className="text-gray-600 leading-relaxed">
                Click "Convert Document" and watch the progress bar as our advanced engine processes your file. Your converted document will automatically download when complete, usually within seconds for most file sizes.
              </p>
              <div className="mt-4 text-sm text-purple-600 font-medium">
                Automatic download & file cleanup
              </div>
            </div>
          </div>
        </div>

        {/* Document Software & Tools Ad */}
        <div className="max-w-4xl mx-auto mt-16 px-6">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200/50 shadow-lg">
            <div className="text-center mb-4">
              <span className="text-xs text-orange-600 font-medium bg-white px-3 py-1.5 rounded-full border border-orange-200 shadow-sm">Professional Document Software</span>
            </div>
            <AdSenseAd 
              adSlot="5662611907"
              adFormat="autorelaxed"
              className="text-center"
            />
          </div>
        </div>

        {/* Complete File Format Support */}
        <div className="max-w-4xl mx-auto mt-16 px-6">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Complete List of Supported File Formats for Conversion</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-6 flex items-center">
                  <span className="text-green-500 mr-3 text-2xl">📥</span>
                  Input Formats We Accept
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl">📄</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">PDF Documents (.pdf)</div>
                      <div className="text-sm text-gray-600">Convert PDF to Word, Excel, PowerPoint - including scanned PDFs</div>
                      <div className="text-xs text-blue-600 font-medium mt-1">Most Popular: PDF to Word conversion</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl">📝</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Microsoft Word Documents (.doc, .docx)</div>
                      <div className="text-sm text-gray-600">Convert Word to PDF online - preserve formatting and fonts</div>
                      <div className="text-xs text-blue-600 font-medium mt-1">Business Standard: DOCX to PDF conversion</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl">📊</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Microsoft Excel Spreadsheets (.xls, .xlsx)</div>
                      <div className="text-sm text-gray-600">Convert Excel to PDF format - perfect for reports and data sharing</div>
                      <div className="text-xs text-blue-600 font-medium mt-1">Reports: XLS/XLSX to PDF conversion</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl">📊</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Microsoft PowerPoint Presentations (.ppt, .pptx)</div>
                      <div className="text-sm text-gray-600">Convert PPT to PDF online - share presentations universally</div>
                      <div className="text-xs text-blue-600 font-medium mt-1">Presentations: PPTX to PDF conversion</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl">📋</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">OpenDocument & Text Files (.odt, .rtf, .txt)</div>
                      <div className="text-sm text-gray-600">LibreOffice compatibility - convert ODT, RTF, TXT files</div>
                      <div className="text-xs text-blue-600 font-medium mt-1">Open Source: ODT/RTF to PDF conversion</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-6 flex items-center">
                  <span className="text-blue-500 mr-3 text-2xl">📤</span>
                  Convert To These Formats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200/30">
                    <span className="text-2xl">📄</span>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">PDF Document (.pdf)</div>
                      <div className="text-sm text-gray-700 leading-relaxed">Universal format perfect for sharing, printing, and archiving. Maintains formatting across all devices and operating systems.</div>
                      <div className="text-xs text-red-600 font-medium mt-2 bg-red-100 px-2 py-1 rounded">Most Popular Output Format</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200/30">
                    <span className="text-2xl">📝</span>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Microsoft Word (.docx, .doc)</div>
                      <div className="text-sm text-gray-700 leading-relaxed">Editable Word documents for Microsoft Office. Perfect for editing, collaboration, and document creation.</div>
                      <div className="text-xs text-blue-600 font-medium mt-2 bg-blue-100 px-2 py-1 rounded">Editable Format</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200/30">
                    <span className="text-2xl">📋</span>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">OpenDocument Text (.odt)</div>
                      <div className="text-sm text-gray-700 leading-relaxed">Open standard format for LibreOffice Writer and other open-source office software.</div>
                      <div className="text-xs text-green-600 font-medium mt-2 bg-green-100 px-2 py-1 rounded">Open Source Compatible</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200/30">
                    <span className="text-2xl">📄</span>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Rich Text Format (.rtf)</div>
                      <div className="text-sm text-gray-700 leading-relaxed">Compatible with all word processors including Microsoft Word, LibreOffice, and Google Docs.</div>
                      <div className="text-xs text-purple-600 font-medium mt-2 bg-purple-100 px-2 py-1 rounded">Universal Compatibility</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section for SEO */}
        <div className="max-w-4xl mx-auto mt-16 px-6">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions About Document Conversion</h2>
            <div className="space-y-8">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="font-bold text-xl text-gray-900 mb-3">How do I convert PDF to Word for free?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Simply upload your PDF file using our converter above, select Word (DOCX) as the output format, and click convert. Your PDF will be converted to an editable Word document that you can download immediately - completely free with no registration required. Our advanced OCR technology preserves formatting, images, and text layout.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="font-bold text-xl text-gray-900 mb-3">Can I convert Word to PDF online without losing formatting?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Absolutely! Our converter uses LibreOffice engine to preserve all formatting, fonts, images, tables, headers, footers, and layout when converting Word documents to PDF. The resulting PDF will look exactly like your original Word document and maintain professional quality for printing and sharing.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="font-bold text-xl text-gray-900 mb-3">Is it safe to convert documents online? What about privacy?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes, it's completely safe. We use bank-level SSL encryption (HTTPS) for all uploads and downloads. Your files are automatically and permanently deleted from our servers immediately after conversion - typically within 15 minutes. We never store, share, or access your document content. No registration or email required.
                </p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="font-bold text-xl text-gray-900 mb-3">What's the maximum file size I can convert?</h3>
                <p className="text-gray-700 leading-relaxed">
                  You can convert files up to 50MB in size. This accommodates most documents including large PDFs with images, complex multi-page Word documents, Excel spreadsheets with multiple sheets and charts, and PowerPoint presentations with media content. For larger files, try compressing images or splitting into smaller sections.
                </p>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="font-bold text-xl text-gray-900 mb-3">Do I need to install any software like Adobe Acrobat or Microsoft Office?</h3>
                <p className="text-gray-700 leading-relaxed">
                  No software installation required! Our online document converter works entirely in your web browser using cloud-based processing. It's compatible with Windows, Mac, Linux, Android, iOS, and Chromebook. No need for Adobe Acrobat, Microsoft Office, LibreOffice, or any other programs.
                </p>
              </div>
              
              <div className="border-l-4 border-indigo-500 pl-6">
                <h3 className="font-bold text-xl text-gray-900 mb-3">Can your converter handle scanned PDFs and images?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our PDF to Word converter uses advanced OCR (Optical Character Recognition) technology to extract text from scanned PDFs and image-based documents. While results depend on the quality of the original scan, we can typically convert most scanned documents to editable Word format with good accuracy.
                </p>
              </div>
              
              <div className="border-l-4 border-cyan-500 pl-6">
                <h3 className="font-bold text-xl text-gray-900 mb-3">How long does document conversion take?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Most conversions complete within 10-30 seconds, depending on file size and complexity. Small documents (under 5MB) typically convert in under 10 seconds, while larger files with many images or complex formatting may take up to 2 minutes. Our system processes files efficiently to minimize wait times.
                </p>
              </div>
              
              <div className="border-l-4 border-pink-500 pl-6">
                <h3 className="font-bold text-xl text-gray-900 mb-3">What browsers and devices are supported?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our converter works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. It's fully responsive and works on desktop computers, laptops, tablets, and smartphones. No special plugins, Java, or Flash required - just a standard web browser with internet connection.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Premium Ad - Document Conversion Software */}
        <div className="max-w-4xl mx-auto mt-16 px-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50 shadow-lg">
            <div className="text-center mb-4">
              <span className="text-xs text-green-600 font-medium bg-white px-3 py-1.5 rounded-full border border-green-200 shadow-sm">Premium Document Conversion Tools</span>
            </div>
            <AdSenseAd 
              adSlot="5279468522"
              className="text-center"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 mt-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div className="text-left">
                <div className="font-bold text-xl">Genius Insights</div>
                <div className="text-sm text-gray-400">Document Converter</div>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Free online document conversion powered by advanced LibreOffice technology. Convert PDF to Word, Excel to PDF, PowerPoint files and more - securely and instantly.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div>
              <h4 className="font-semibold text-white mb-3">Popular Conversions</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/document-converter" className="text-gray-400 hover:text-white transition-colors">PDF to Word</Link></li>
                <li><Link href="/document-converter" className="text-gray-400 hover:text-white transition-colors">Word to PDF</Link></li>
                <li><Link href="/document-converter" className="text-gray-400 hover:text-white transition-colors">Excel to PDF</Link></li>
                <li><Link href="/document-converter" className="text-gray-400 hover:text-white transition-colors">PowerPoint to PDF</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">File Formats</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="text-gray-400">PDF Documents</span></li>
                <li><span className="text-gray-400">Word (DOC/DOCX)</span></li>
                <li><span className="text-gray-400">Excel (XLS/XLSX)</span></li>
                <li><span className="text-gray-400">PowerPoint (PPT/PPTX)</span></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Tools</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Financial Calculators</Link></li>
                <li><Link href="/tools" className="text-gray-400 hover:text-white transition-colors">All Tools</Link></li>
                <li><Link href="/articles" className="text-gray-400 hover:text-white transition-colors">Guides</Link></li>
                <li><Link href="/market" className="text-gray-400 hover:text-white transition-colors">Market Data</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Genius Insights. Free document conversion tool - PDF to Word, Excel to PDF, and more.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}