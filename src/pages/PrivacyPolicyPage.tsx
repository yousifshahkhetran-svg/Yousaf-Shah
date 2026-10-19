import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteConfig } from '../context/ConfigContext';
import { Shield, ExternalLink, ArrowLeft } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { config: siteConfig } = useSiteConfig();
  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Title */}
        <div className="mb-8 pb-6 border-b border-slate-200/80">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800">
              <Shield className="w-5 h-5" aria-hidden="true" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Privacy Policy
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Last Updated: {siteConfig.privacy.lastUpdated}
          </p>
        </div>

        {/* Policy Content */}
        <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base space-y-6">
          
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">1. Overview</h2>
            <p className="leading-relaxed">
              Welcome to {siteConfig.title}. This Privacy Policy explains our practices regarding visitor information when you access and navigate our website. We believe in transparency and visitor autonomy.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">2. Information Collection</h2>
            <p className="leading-relaxed">
              This website is a lightweight, static image showcase and destination directory. We do not require visitors to register an account, log in, or provide personal payment details.
            </p>
            <p className="leading-relaxed">
              When you submit an inquiry through our Contact page, the information you provide (such as your name, email address, and message) is used solely to respond to your inquiry and is never sold or shared with commercial marketing lists.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">3. Cookies and Tracking</h2>
            <p className="leading-relaxed">
              We do not utilize third-party cross-site behavioral tracking cookies, spyware, popunders, or deceptive tracking pixels. Standard technical session memory may be used by your browser to render images and navigate between pages smoothly.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">4. External Links & Destination URLs</h2>
            <p className="leading-relaxed">
              Our image gallery features direct links to external websites and destination pages. When you click an image, your browser navigates to that destination directly in the same tab.
            </p>
            <p className="leading-relaxed">
              Please note that external destination websites operate independently and have their own distinct privacy policies and terms of service. We recommend reviewing the policies of any third-party website you visit.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">5. Hosting & Infrastructure</h2>
            <p className="leading-relaxed">
              This website is hosted via global static content delivery infrastructure (such as Cloudflare Pages). Like all web hosting providers, the hosting network may record standard HTTP server logs (such as IP addresses, browser user agent strings, and requested asset paths) strictly for security, DDoS prevention, and performance monitoring.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">6. Contact Information</h2>
            <p className="leading-relaxed">
              {siteConfig.privacy.contactNotice} You can reach out directly via our{' '}
              <Link to="/contact" className="text-slate-900 font-medium underline underline-offset-2 hover:text-slate-700">
                Contact page
              </Link>.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};
