import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Coffee, Copy, Check, Heart } from 'lucide-react';

interface BuyMeCoffeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BuyMeCoffeeModal({ isOpen, onClose }: BuyMeCoffeeModalProps) {
  const [copied, setCopied] = useState(false);
  const code = '*182*1*1*0786557980#';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            id="coffee-modal-overlay"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative bg-white rounded-3xl border border-slate-100 shadow-2xl max-w-sm w-full overflow-hidden text-center z-10 font-sans p-6 sm:p-8"
            id="coffee-modal-card"
          >
            {/* Elegant Amber Top Accent Accent Line */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 to-amber-500" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer outline-none border-0"
              id="coffee-close-btn"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Coffee Icon Visual Header */}
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl border border-amber-100 shrink-0">
                <Coffee className="w-8 h-8 fill-amber-500 animate-bounce" />
              </div>
            </div>

            {/* Simple Heading */}
            <h3 className="text-xl font-extrabold text-slate-900 font-sans leading-snug mb-2">
              Buy Remy A Coffee ☕
            </h3>

            {/* Heartfelt Thanks Message */}
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Thank you so much for your kind support and encouragement! It helps me stay energized and continue crafting premium, high-fidelity software in Rwanda 🇷🇼
            </p>

            {/* USSD Container Form Display */}
            <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 text-center space-y-3 mb-6">
              <span className="block text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                Dial MoMo USSD Code Below
              </span>

              {/* Code Visual Bar */}
              <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-inner">
                <code className="text-sm sm:text-base font-mono font-black text-amber-600 tracking-wide">
                  {code}
                </code>
                
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border outline-none cursor-pointer select-none ${
                    copied
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                  id="ussd-copy-button"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-slate-400 font-mono leading-relaxed">
                MTN Mobile Money Rwanda (Send Money transfer way)
              </p>
            </div>

            {/* Sincere final Thanks sign, clean & compact */}
            <div className="flex items-center justify-center space-x-1 text-xs text-slate-450 font-mono mb-2">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
              <span>With deep gratitude, thank you!</span>
            </div>

            {/* Return Button */}
            <button
              onClick={onClose}
              className="w-full mt-2 py-3 px-5 rounded-xl bg-slate-950 text-white font-bold text-xs tracking-wider uppercase hover:bg-slate-800 transition-all cursor-pointer shadow-sm border-0 select-none outline-none"
              id="coffee-dismiss-btn"
            >
              Continue back to Portfolio
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
