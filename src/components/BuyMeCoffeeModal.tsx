import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Heart } from 'lucide-react';
import { FaCoffee } from 'react-icons/fa';

interface BuyMeCoffeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BuyMeCoffeeModal({ isOpen, onClose }: BuyMeCoffeeModalProps) {
  const [copied, setCopied] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
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

  const handleClose = () => {
    setIsClicked(false);
    onClose();
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
            onClick={handleClose}
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
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer outline-none border-0"
              id="coffee-close-btn"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <AnimatePresence mode="wait">
              {!isClicked ? (
                /* STEP 1: Cup Icon with "Please Click" */
                <motion.div
                  key="step-click"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center py-4"
                >
                  <button
                    type="button"
                    onClick={() => setIsClicked(true)}
                    className="p-5 bg-amber-50 hover:bg-amber-100/70 border border-amber-250 text-amber-500 rounded-3xl shrink-0 group hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm relative duration-300"
                    title="Click to support"
                  >
                    <span className="text-amber-500 block group-hover:rotate-12 transition-transform duration-300">
                      <FaCoffee size={48} />
                    </span>
                  </button>

                  <h3 className="text-xl font-extrabold text-slate-900 font-sans leading-snug mt-6 mb-2">
                    Buy Remy A Coffee
                  </h3>
                  
                  <p className="text-sm text-slate-500 leading-relaxed max-w-xs mb-6">
                    Would you like to support a Level 5 software developer in Rwanda? Please click below to show details!
                  </p>

                  <button
                    type="button"
                    onClick={() => setIsClicked(true)}
                    className="px-8 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs uppercase tracking-widest hover:shadow-md hover:shadow-amber-400/20 active:scale-95 animate-pulse cursor-pointer outline-none transition-all"
                  >
                    Please click ☕
                  </button>
                </motion.div>
              ) : (
                /* STEP 2: Simplest Form with Code, "Form Way", and Thanks Message */
                <motion.div
                  key="step-support-details"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-5"
                >
                  {/* Miniature Cup Icon Header */}
                  <div className="flex justify-center pt-2">
                    <div className="p-2.5 bg-amber-50 text-amber-500 rounded-xl border border-amber-100">
                      <span className="text-amber-500 block">
                        <FaCoffee size={24} />
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 font-sans leading-snug">
                    Thanks for support! 🎉
                  </h3>

                  <p className="text-sm text-slate-500 leading-relaxed">
                    Thank you so much for your kind support and encouragement! It helps me stay motivated and energized in Rwanda 🇷🇼
                  </p>

                  {/* MoMo "Way" USSD Code Box */}
                  <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 text-center space-y-2.5">
                    <span className="block text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                      Mobile Money Transfer Way
                    </span>

                    <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 shadow-inner">
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
                            <Check className="w-3 h-3" />
                            <span>COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>COPY</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[10px] text-slate-400 font-mono italic">
                      MTN MoMo: dial code or send payment to 0786557980
                    </p>
                  </div>

                  <div className="flex items-center justify-center space-x-1 text-xs text-slate-450 font-mono pt-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
                    <span>Deeply grateful for your kindness!</span>
                  </div>

                  <button
                    onClick={handleClose}
                    className="w-full mt-2 py-3 px-5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs tracking-wider uppercase transition-all cursor-pointer shadow-sm border-0 select-none outline-none"
                    id="coffee-dismiss-btn"
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
