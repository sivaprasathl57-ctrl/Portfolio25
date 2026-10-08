import React, { useState } from 'react';
import { personalData } from '../data/portfolio';

export default function Contact() {
  const { contact, location } = personalData;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-[#06070a] text-white border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[#00dfd8] font-semibold text-sm tracking-widest uppercase">
            Let's Collaborate
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full" />
          <p className="text-gray-400 text-sm sm:text-base font-light pt-2">
            Interested in penetration testing, security automation, VAPT collaborations, or recruiting opportunities? Drop a line.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Left Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Direct Email Card */}
            <a
              href={`mailto:${contact.email}`}
              className="cyber-card p-6 rounded-2xl block group"
            >
              <span className="cyber-corner cyber-corner-tl" />
              <span className="cyber-corner cyber-corner-br" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-xl text-purple-400 group-hover:scale-110 transition-transform">
                  ✉️
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">Email Address</div>
                  <div className="text-white font-semibold text-sm group-hover:text-purple-300 transition-colors">
                    {contact.email}
                  </div>
                </div>
              </div>
            </a>

            {/* Direct Phone / WhatsApp Card */}
            <a
              href="https://wa.me/918667845880"
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-card p-6 rounded-2xl block group"
            >
              <span className="cyber-corner cyber-corner-tl" />
              <span className="cyber-corner cyber-corner-br" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-xl text-emerald-400 group-hover:scale-110 transition-transform">
                  💬
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">Phone & WhatsApp</div>
                  <div className="text-white font-semibold text-sm group-hover:text-emerald-300 transition-colors">
                    {contact.phone}
                  </div>
                </div>
              </div>
            </a>

            {/* Location Card */}
            <div className="cyber-card p-6 rounded-2xl group">
              <span className="cyber-corner cyber-corner-tl" />
              <span className="cyber-corner cyber-corner-br" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-xl text-cyan-400 group-hover:scale-110 transition-transform">
                  📍
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">Location</div>
                  <div className="text-white font-semibold text-sm group-hover:text-cyan-300 transition-colors">
                    {location}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Message Box */}
          <div className="cyber-card lg:col-span-7 p-8 rounded-3xl relative">
            <span className="cyber-corner cyber-corner-tl" />
            <span className="cyber-corner cyber-corner-tr" />
            <span className="cyber-corner cyber-corner-bl" />
            <span className="cyber-corner cyber-corner-br" />
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00dfd8] shadow-[0_0_8px_#00dfd8]" />
              Send an Inquiry
            </h3>
            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-center space-y-2">
                <div className="text-3xl">✓</div>
                <div className="font-bold">Message Transmitted!</div>
                <div className="text-xs text-gray-300">Thank you for reaching out. I will get back to you shortly.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl bg-[#141624] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#141624] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Project inquiry, VAPT engagement, security audit..."
                    className="w-full px-4 py-3 rounded-xl bg-[#141624] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/30 hover:scale-[1.01] transition-all"
                >
                  Send Transmission →
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
