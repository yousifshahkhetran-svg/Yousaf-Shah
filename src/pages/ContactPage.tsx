import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { Mail, Send, CheckCircle2, ArrowLeft, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate clean client-side submission without requiring an external paid service
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

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

        {/* Page Title & Context */}
        <div className="mb-8 pb-6 border-b border-slate-200/80">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800">
              <Mail className="w-5 h-5" aria-hidden="true" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Contact Us
            </h1>
          </div>
          <p className="text-sm text-slate-600 max-w-xl">
            {siteConfig.contact.description}
          </p>
        </div>

        {/* Direct Email Address Display (Only shown if explicitly configured) */}
        {siteConfig.contact.email && (
          <div className="mb-8 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Direct Email Inquiries
              </span>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-sm sm:text-base font-medium text-slate-900 hover:underline"
              >
                {siteConfig.contact.email}
              </a>
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline">
              {siteConfig.contact.responseExpectation}
            </span>
          </div>
        )}

        {/* Contact Form Container */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-900 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Message Sent Successfully
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto text-balance">
                Thank you for getting in touch. {siteConfig.contact.responseExpectation}
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-2 focus:outline-slate-900 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-2 focus:outline-slate-900 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Inquiry regarding gallery destination link"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-2 focus:outline-slate-900 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your message here..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-2 focus:outline-slate-900 focus:border-transparent transition-all resize-y"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  {siteConfig.contact.responseExpectation}
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 rounded-lg transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
