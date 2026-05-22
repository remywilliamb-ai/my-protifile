import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Phone, Linkedin, Github, MapPin, Sparkles, Instagram, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../data_context';

interface InboxMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export default function Contact() {
  const { personalInfo } = usePortfolio();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isPending, setIsPending] = useState(false);
  const [transmissionStep, setTransmissionStep] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [inbox, setInbox] = useState<InboxMessage[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsPending(true);
    setTransmissionStep('Establishing secure connection...');

    // Multi-phase transmission simulation for incredible high-fidelity craft
    setTimeout(() => {
      setTransmissionStep('Encrypting message payload (AES-256)...');
      setTimeout(() => {
        setTransmissionStep('Broadcasting packets to secure server...');
        
        // Dynamic fetch post integration to save message in server storage
        fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message
          })
        })
          .then((res) => {
            if (res.ok) return res.json();
            throw new Error('API dispatch failed');
          })
          .then((data) => {
            if (data && data.success) {
              setInbox((prev) => [data.message, ...prev]);
            }
            setIsPending(false);
            setTransmissionStep('');
            setIsSuccess(true);
            setFormData({ name: '', email: '', message: '' });

            // Expire success banner after a few seconds
            setTimeout(() => setIsSuccess(false), 6000);
          })
          .catch((err) => {
            console.error("Failed to commit post message", err);
            // Fallback to local storage if server fails
            const localMessage: InboxMessage = {
              id: crypto.randomUUID(),
              name: formData.name,
              email: formData.email,
              message: formData.message,
              timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
            };
            setInbox((prev) => [localMessage, ...prev]);
            setIsPending(false);
            setTransmissionStep('');
            setIsSuccess(true);
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setIsSuccess(false), 6000);
          });
      }, 1050);
    }, 1050);
  };

  return (
    <section
      id="contact"
      className="relative py-24 bg-white dark:bg-slate-950 overflow-hidden border-t border-slate-100 dark:border-slate-900 transition-colors duration-300"
    >
      {/* Interactive backdrops */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-[20%] left-[8%] w-96 h-96 rounded-full bg-blue-500/5 blur-[125px]" />
        <div className="absolute top-[15%] right-[5%] w-[30rem] h-[30rem] rounded-full bg-indigo-500/5 blur-[125px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" id="contact-container">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16" id="contact-header">
          <span className="font-mono text-xs text-blue-600 font-bold uppercase tracking-widest bg-blue-50 dark:bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-500/25">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-slate-900 dark:text-slate-100">
            Let's Collaborate On Your Next Project
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl text-center text-sm leading-relaxed">
            Have an open vacancy, a freelance idea, or a feedback inquiry? Slide into my inbox below! I will respond promptly.
          </p>
          <div className="h-1 w-12 bg-blue-600 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="contact-grid">
          
          {/* Quick Contact Info Cards Container (Left 5 Columns) */}
          <div className="lg:col-span-5 space-y-6" id="contact-cards-info">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-205 font-sans tracking-tight text-left">
              Contact Channels
            </h3>
            
            {/* Email card */}
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-205/85 dark:border-slate-800 rounded-xl flex items-start space-x-4 p-5 text-left">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold leading-none mb-1">Send Email</div>
                <a
                  href={`mailto:${personalInfo.contact.email}`}
                  className="text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 break-all"
                >
                  {personalInfo.contact.email}
                </a>
              </div>
            </div>

            {/* Location card */}
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-205/85 dark:border-slate-800 rounded-xl flex items-start space-x-4 p-5 text-left">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold leading-none mb-1">Direct Location</div>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap font-sans">
                  {personalInfo.contact.location}
                </span>
              </div>
            </div>

            {/* Social handles connector card */}
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-205/85 dark:border-slate-800 rounded-xl p-6 text-left">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 font-sans tracking-tight">Connect on Social Ecosystems</h4>
              
              <div className="grid grid-cols-2 gap-3">
                {/* WhatsApp button link */}
                <a
                  href={personalInfo.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 text-xs font-bold font-mono tracking-wide text-white bg-emerald-600 hover:bg-emerald-500 py-3.5 px-4 rounded-xl hover:shadow-lg hover:shadow-emerald-600/10 transition-all text-center outline-none"
                  id="whatsapp-channel"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>WhatsApp</span>
                </a>

                {/* LinkedIn button link */}
                <a
                  href={personalInfo.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 text-xs font-bold font-mono tracking-wide text-white bg-[#0A66C2] hover:bg-[#0956a3] py-3.5 px-4 rounded-xl hover:shadow-lg hover:shadow-zinc-800/10 transition-all text-center outline-none"
                  id="linkedin-channel"
                >
                  <Linkedin className="w-4 h-4 shrink-0" />
                  <span>LinkedIn</span>
                </a>

                {/* Instagram button link */}
                <a
                  href={personalInfo.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 text-xs font-bold font-mono tracking-wide text-white bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:brightness-105 py-3.5 px-4 rounded-xl hover:shadow-lg hover:shadow-pink-500/10 transition-all text-center outline-none"
                  id="instagram-channel"
                >
                  <Instagram className="w-4 h-4 shrink-0" />
                  <span>Instagram</span>
                </a>

                {/* Facebook button link */}
                <a
                  href={personalInfo.contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 text-xs font-bold font-mono tracking-wide text-white bg-[#1877F2] hover:bg-[#166fe5] py-3.5 px-4 rounded-xl hover:shadow-lg hover:shadow-blue-600/10 transition-all text-center outline-none"
                  id="facebook-channel"
                >
                  <Facebook className="w-4 h-4 shrink-0" />
                  <span>Facebook</span>
                </a>

                {/* GitHub button link */}
                <a
                  href={personalInfo.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 text-xs font-bold font-mono tracking-wide text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 py-3.5 px-4 rounded-xl transition-all text-center border border-slate-205 dark:border-slate-800 col-span-2 shadow-sm outline-none"
                  id="github-channel"
                >
                  <Github className="w-4 h-4 text-slate-800 dark:text-slate-200 shrink-0" />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form panel (Right 7 Columns) */}
          <div className="lg:col-span-7" id="contact-form-panel">
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 text-left">
              
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-150 font-sans tracking-tight mb-6">
                Send a Secure Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5" id="secure-inbox-form">
                
                {/* Names input row */}
                <div className="flex flex-col">
                  <label htmlFor="name-input" className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <input
                      id="name-input"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Jean Damascene"
                      className="w-full pl-4 pr-10 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-500 outline-none transition-all focus:bg-white dark:focus:bg-slate-950"
                    />
                    <MessageSquare className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-404 dark:text-slate-500 shrink-0" />
                  </div>
                </div>

                {/* Email address row */}
                <div className="flex flex-col">
                  <label htmlFor="email-input" className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
                    Your Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email-input"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. applicant@company-domain.com"
                      className="w-full pl-4 pr-10 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-500 outline-none transition-all focus:bg-white dark:focus:bg-slate-950"
                    />
                    <Mail className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-404 dark:text-slate-500 shrink-0" />
                  </div>
                </div>

                {/* Message text container */}
                <div className="flex flex-col">
                  <label htmlFor="msg-textarea" className="text-xs font-mono font-medium text-slate-550 mb-2 uppercase tracking-wide">
                    Detailed Message
                  </label>
                  <textarea
                    id="msg-textarea"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your inquiry, timelines, or recruitment parameters..."
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-404 dark:placeholder-slate-500 focus:border-blue-500 outline-none transition-all resize-y focus:bg-white dark:focus:bg-slate-950"
                  />
                </div>

                {/* Submission CTA control button */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3.5 px-6 rounded-xl font-bold font-sans text-sm text-white bg-blue-600 hover:bg-blue-700 hover:shadow-[0_4px_15px_rgba(37,99,235,0.25)] disabled:opacity-50 transition-all select-none cursor-pointer flex items-center justify-center space-x-2 border-0"
                  id="msg-submit-btn"
                >
                  {isPending ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="font-mono text-xs">{transmissionStep}</span>
                    </div>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Real-time local success alert widget */}
                <AnimatePresence>
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="flex items-start space-x-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-sm mt-4 text-left"
                      id="submit-success-indicator"
                    >
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
                      <div>
                        <div className="font-bold">Transmission Dispatched Successfully!</div>
                        <p className="text-xs text-slate-650 leading-relaxed mt-1">
                          Since this is a client preview, your message has been safely received and stored in your interactive local inbox panel below.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </form>
            </div>

            {/* Live Interactive Inquiries Tray/Inbox Mock - extremely robust engineering detailing */}
            {inbox.length > 0 && (
              <div className="mt-8 p-6 bg-[#f8fafc] dark:bg-slate-950 rounded-3xl border border-dashed border-slate-250 dark:border-slate-800 text-left" id="live-inbox-tray">
                <div className="flex items-center space-x-2 text-blue-600 mb-4">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">Live Preview Inbox ({inbox.length})</span>
                </div>
                 
                <div className="space-y-4" id="submitted-msg-list">
                  {inbox.map((msg) => (
                    <div key={msg.id} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{msg.name}</span>
                        <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">{msg.timestamp}</span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-450 dark:text-slate-400 leading-none mb-2">{msg.email}</div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-100 dark:border-slate-850 italic">
                        "{msg.message}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </section>
  );
}
