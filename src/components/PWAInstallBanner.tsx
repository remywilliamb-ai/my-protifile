import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePortfolio } from "../data_context";
import { Download, X, Smartphone, WifiOff, Zap, CheckCircle2 } from "lucide-react";

export default function PWAInstallBanner() {
  const { t, language, deferredPrompt, isStandalone, isIOS, triggerInstallPrompt } = usePortfolio();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user dismissed this warning recently
    const isDismissed = localStorage.getItem("pwa-dismissed") === "true";

    // Show PWA banner automatically if not standalone and not previously manually dismissed
    if (!isStandalone && !isDismissed) {
      const pwaTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 5000); // Elegantly show after 5 seconds
      return () => clearTimeout(pwaTimeout);
    }
  }, [isStandalone]);

  useEffect(() => {
    // Listen to custom window trigger to display the detailed install modal manually
    const handleTriggerBanner = () => {
      setIsVisible(true);
    };
    window.addEventListener("pwa-trigger-banner", handleTriggerBanner);
    return () => {
      window.removeEventListener("pwa-trigger-banner", handleTriggerBanner);
    };
  }, []);

  const handleFloatingClick = async () => {
    if (deferredPrompt) {
      await triggerInstallPrompt();
    } else {
      setIsVisible(true);
    }
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await triggerInstallPrompt();
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Persist dismiss token so it is not intrusive
    localStorage.setItem("pwa-dismissed", "true");
  };

  // If already standalone (acting fully as a native app), do not show anything
  if (isStandalone) return null;

  return (
    <>
      {/* Floating Install Trigger Button (glowing icon at bottom-right) */}
      <AnimatePresence>
        {!isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={handleFloatingClick}
            className="fixed bottom-22 right-6 sm:bottom-6 sm:right-6 z-[998] cursor-pointer group flex items-center space-x-2 bg-slate-900/95 via-slate-900/95 to-slate-950/95 dark:bg-slate-950/95 backdrop-blur-xl text-white rounded-full p-2.5 sm:p-3 border border-amber-500/35 hover:border-amber-400 shadow-2xl transition-all"
            id="pwa-floating-install-icon"
            title={t("pwa.install_title")}
            aria-label={t("pwa.install_title")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Pulsing indicator light */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>

            {/* Glowing inner shadow */}
            <div className="absolute inset-0 rounded-full bg-amber-500/5 group-hover:bg-amber-500/10 transition-colors pointer-events-none" />

            {/* The main download / smart device icon */}
            <div className="relative z-10 bg-amber-500 p-1.5 rounded-full text-slate-950 transition-colors group-hover:bg-amber-400">
              <Smartphone className="w-4 h-4 stroke-[2.5]" />
            </div>

            {/* Expands on hover with text to describe action perfectly! */}
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out font-mono font-bold text-[10px] sm:text-xs tracking-wider uppercase text-amber-400 whitespace-nowrap pl-0 group-hover:pl-1">
              {language === "rw" ? "Yishyire kuri telefone" : language === "fr" ? "Installer l'appli" : "Install App"}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.95 }}
            className="fixed bottom-22 xs:bottom-24 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-[999] max-w-sm"
            id="pwa-mobile-install-card"
          >
        <div className="bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-xl border border-amber-500/30 dark:border-amber-500/20 text-white rounded-2xl p-4 shadow-2xl relative overflow-hidden">
          {/* Glowing backlights */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-full hover:bg-white/10"
            aria-label={t("pwa.close")}
            id="pwa-dismiss-btn"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Card Header Info */}
          <div className="flex items-start space-x-3">
            <div className="bg-gradient-to-tr from-amber-400 to-amber-600 p-2.5 rounded-xl shadow-lg shadow-amber-500/20 shrink-0 self-center border border-white/10">
              <Smartphone className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-sm font-black tracking-wide text-amber-400 uppercase font-sans">
                {t("pwa.install_title")}
              </h3>
              <p className="text-[11px] text-slate-200 mt-1 leading-relaxed">
                {t("pwa.install_desc")}
              </p>
            </div>
          </div>

          {/* Core Mobile/PWA Capabilities highlights */}
          <div className="grid grid-cols-2 gap-2 my-3.5 pt-3 border-t border-slate-800/80">
            <div className="flex items-center space-x-1.5 text-[10px] text-slate-300">
              <WifiOff className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Offline Ready</span>
            </div>
            <div className="flex items-center space-x-1.5 text-[10px] text-slate-300">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Instant Launch</span>
            </div>
            <div className="flex items-center space-x-1.5 text-[10px] text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Safe & Secure</span>
            </div>
            <div className="flex items-center space-x-1.5 text-[10px] text-slate-300">
              <svg className="w-3.5 h-3.5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Zero MB Required</span>
            </div>
          </div>

          {/* Action trigger button */}
          {isIOS ? (
            <div className="bg-slate-950/65 border border-slate-800 rounded-xl p-2.5 text-[10px] text-slate-300 leading-normal flex items-start gap-2.5">
              <span className="text-lg leading-none shrink-0 mt-0.5">ℹ️</span>
              <span>{t("pwa.ios_instructions")}</span>
            </div>
          ) : deferredPrompt ? (
            <button
              onClick={handleInstallClick}
              className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black tracking-widest text-[11px] py-2 px-3 rounded-xl transition-all font-mono shadow-md hover:shadow-amber-500/25 active:scale-98 cursor-pointer flex items-center justify-center space-x-2 border border-amber-300"
              id="pwa-install-trigger-btn"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{t("pwa.install_btn")}</span>
            </button>
          ) : (
            // Fallback instruction helper banner for desktop/general install
            <div className="bg-slate-950/65 border border-slate-800 rounded-xl p-2.5 text-[10px] text-zinc-300 leading-normal flex items-start gap-2">
              <span className="text-blue-400 font-bold shrink-0">✔</span>
              <span>
                {language === "rw"
                  ? "Kanda ku kimenyetso cyo kubika (+) imbere ku murongo wo hejuru (URL) ngo ugire porogaramu kuri mudasobwa cyangwa terefone!"
                  : language === "fr"
                  ? "Cliquez sur l'icône de téléchargement (+) dans la barre d'adresse pour installer cette application de bureau !"
                  : "Click on the installation/plus (+) icon directly from your browser's address/URL bar to save it!"}
              </span>
            </div>
          )}
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  </>
  );
}
