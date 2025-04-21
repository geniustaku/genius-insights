// components/Header.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-indigo-700">CareerGuide</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-indigo-700 font-medium">
              Home
            </Link>
            <Link href="/articles" className="text-gray-700 hover:text-indigo-700 font-medium">
              Articles
            </Link>
            <Link href="/categories/software-development" className="text-gray-700 hover:text-indigo-700 font-medium">
              Software
            </Link>
            <Link href="/categories/data-science" className="text-gray-700 hover:text-indigo-700 font-medium">
              Data Science
            </Link>
            <Link href="/categories/cloud-computing" className="text-gray-700 hover:text-indigo-700 font-medium">
              Cloud
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-indigo-700 font-medium">
              About
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 12h16M4 6h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-indigo-700 font-medium">
                Home
              </Link>
              <Link href="/articles" className="text-gray-700 hover:text-indigo-700 font-medium">
                Articles
              </Link>
              <Link href="/categories/software-development" className="text-gray-700 hover:text-indigo-700 font-medium">
                Software
              </Link>
              <Link href="/categories/data-science" className="text-gray-700 hover:text-indigo-700 font-medium">
                Data Science
              </Link>
              <Link href="/categories/cloud-computing" className="text-gray-700 hover:text-indigo-700 font-medium">
                Cloud
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-indigo-700 font-medium">
                About
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}