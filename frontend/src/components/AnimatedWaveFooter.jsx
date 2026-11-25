import React, { useState } from 'react';
import {
  HeartPulse,
  Mail,
  Phone,
  CheckCircle2,
  Shield,
  Activity,
  Ambulance,
  Sparkles,
  FileText,
  ArrowRight,
  Send
} from 'lucide-react';

export default function AnimatedWaveFooter({
  onOpenDashboard,
  onOpenRegistry,
  onOpenAuditModal,
  lang = 'hi'
}) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer
      data-lang={lang}
      className="relative bg-white border-t border-slate-200/80 pt-14 sm:pt-16 pb-8 overflow-hidden text-slate-900 selection:bg-rose-100 selection:text-rose-900"
    >
      {/* ── Subtle Bottom Wave Accent ── */}
      <div className="absolute bottom-0 inset-x-0 h-52 overflow-hidden pointer-events-none opacity-80 z-0">
        <div className="absolute bottom-0 h-52 w-[2400px] animate-wave">
          <svg
            className="h-full w-full"
            viewBox="0 0 2400 320"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,180 C320,100 640,240 960,160 C1280,90 1600,230 1920,150 C2120,90 2280,130 2400,160 L2400,320 L0,320 Z"
              fill="rgba(152, 18, 40, 0.025)"
            />
            <path
              d="M0,220 C360,140 720,270 1080,180 C1440,100 1800,250 2160,170 L2400,210 L2400,320 L0,320 Z"
              fill="rgba(152, 18, 40, 0.045)"
            />
          </svg>
        </div>

        <div className="absolute bottom-0 h-52 w-[2400px] animate-wave-slow opacity-60">
          <svg
            className="h-full w-full"
            viewBox="0 0 2400 320"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,240 C400,160 800,280 1200,200 C1600,130 2000,270 2400,190 L2400,320 L0,320 Z"
              fill="rgba(225, 29, 72, 0.025)"
            />
          </svg>
        </div>
      </div>

      {/* ── Footer Content Container ── */}
      <div className="max-w-7xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Brand & Pilot Summary Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-10 border-b border-slate-200/80 gap-5">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#981228] text-white flex items-center justify-center shadow-sm shadow-rose-900/15 flex-shrink-0">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-lg font-extrabold text-slate-900 tracking-tight">MOMENT</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-[#981228] border border-rose-200/80">
                  CLINICAL AI
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                  NHM Haryana
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Maternal Obstetric Monitoring &amp; Emergency Notification Technology
              </p>
            </div>
          </div>

          <div className="inline-flex flex-wrap items-center gap-3 text-xs bg-slate-50/80 border border-slate-200/80 rounded-2xl py-2.5 px-4">
            <div className="flex items-center gap-2 pr-3 border-r border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
              <span className="font-semibold text-slate-800">12 सब-सेंटर सक्रिय</span>
            </div>
            <span className="text-slate-600 font-medium">
              रोहतक जिला पायलट • PGIMS लिंक्ड
            </span>
          </div>
        </div>

        {/* ── 4 Balanced Columns ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 py-12">

          {/* Column 1: Clinical Updates / Stay Connected */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-100 text-[#981228] flex items-center justify-center flex-shrink-0">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-[13px] font-semibold text-slate-900 tracking-tight">
                क्लिनिकल अपडेट्स (Stay Connected)
              </h2>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              WHO, FIGO और MoHFW के नए PPH दिशा-निर्देश व AI मॉडल अपडेट सीधे ईमेल पर प्राप्त करें।
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="डॉक्टर / एएनएम ईमेल आईडी"
                aria-label="डॉक्टर या एएनएम ईमेल आईडी"
                className="w-full bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#981228]/25 focus:border-[#981228] transition"
              />
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#981228] hover:bg-[#7d0f21] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
              >
                {subscribed ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                    <span>सदस्यता पूर्ण (Subscribed!)</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>अपडेट्स पाएं (Subscribe)</span>
                  </>
                )}
              </button>
            </form>

            <p className="text-[11px] text-slate-400 leading-snug">
              * केवल प्रमाणित स्वास्थ्य कर्मियों व चिकित्सकों के लिए।
            </p>
          </div>

          {/* Column 2: Quick Tools */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-100 text-[#981228] flex items-center justify-center flex-shrink-0">
                <Activity className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-[13px] font-semibold text-slate-900 tracking-tight">
                क्विक टूल्स (Quick Tools)
              </h3>
            </div>

            <nav aria-label="Quick Clinical Tools" className="space-y-2 text-xs font-medium text-slate-600">
              <button
                type="button"
                onClick={() => onOpenDashboard && onOpenDashboard()}
                className="w-full py-1 flex items-center gap-2 hover:text-[#981228] transition-colors text-left cursor-pointer group"
              >
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#981228] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                <span>Antepartum PPH Risk Predictor</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenDashboard && onOpenDashboard()}
                className="w-full py-1 flex items-center gap-2 hover:text-[#981228] transition-colors text-left cursor-pointer group"
              >
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#981228] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                <span>15-Minute Dakshata Monitoring</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenDashboard && onOpenDashboard()}
                className="w-full py-1 flex items-center gap-2 hover:text-[#981228] transition-colors text-left cursor-pointer group"
              >
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#981228] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                <span>Computer Vision Pad Saturation</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenRegistry && onOpenRegistry()}
                className="w-full py-1 flex items-center gap-2 hover:text-[#981228] transition-colors text-left cursor-pointer group"
              >
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#981228] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                <span>गर्भवती महिला रजिस्टर (Registry)</span>
              </button>
              {onOpenAuditModal && (
                <button
                  type="button"
                  onClick={onOpenAuditModal}
                  className="w-full pt-1.5 flex items-center gap-2 text-[#981228] font-semibold hover:underline transition-colors text-left cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Clinical Audit Trail &amp; Security Logs</span>
                </button>
              )}
            </nav>
          </div>

          {/* Column 3: Emergency Assistance */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
                <Ambulance className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-[13px] font-semibold text-slate-900 tracking-tight">
                आपातकालीन हॉटलाइन (Emergency)
              </h3>
            </div>

            <address className="space-y-3.5 text-xs not-italic text-slate-600">
              <a
                href="tel:108"
                className="block p-3.5 bg-rose-50/85 hover:bg-rose-50 border border-rose-200/80 rounded-2xl transition-colors space-y-1"
              >
                <span className="text-[10px] font-semibold text-rose-700 uppercase tracking-wider block">
                  108 एम्बुलेंस आपातकाल
                </span>
                <span className="flex items-center gap-1.5 text-base font-bold text-[#981228] tracking-tight">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>डायल करें: 108</span>
                </span>
                <span className="text-[11px] text-rose-700/90 font-medium block">
                  24x7 जीपीएस ट्रैक्ड रेफरल डिस्पैच
                </span>
              </a>

              <div className="space-y-0.5">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  रेफरल मेडिकल कॉलेज
                </span>
                <span className="font-semibold text-slate-900 leading-relaxed block">
                  पं. भगवत दयाल शर्मा पीजीआईएमएस, रोहतक
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  ब्लड बैंक डायरेक्ट लाइन
                </span>
                <a
                  href="tel:01262281300"
                  className="font-semibold text-slate-800 hover:text-[#981228] transition-colors inline-block"
                >
                  01262-281300 (पीजीआईएमएस ब्लड बैंक)
                </a>
              </div>
            </address>
          </div>

          {/* Column 4: AI & Clinical Models */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-[13px] font-semibold text-slate-900 tracking-tight">
                AI व क्लिनिकल मॉडल
              </h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              56,014 भारतीय व अंतरराष्ट्रीय प्रसव डेटासेट पर प्रशिक्षित 4-मॉडल क्लिनिकल सहमति इंजन:
            </p>

            <div className="rounded-2xl border border-slate-200/80 bg-white/95 divide-y divide-slate-100 overflow-hidden text-[11px]">
              <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                <span className="font-medium text-slate-700">XGBoost High-Recall</span>
                <span className="font-semibold text-[#981228] tabular-nums whitespace-nowrap">81% Precision</span>
              </div>
              <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                <span className="font-medium text-slate-700">LightGBM Screening</span>
                <span className="font-semibold text-[#981228] tabular-nums whitespace-nowrap">&lt;2ms Latency</span>
              </div>
              <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                <span className="font-medium text-slate-700">FT-Transformer Deep Attention</span>
                <span className="font-semibold text-[#981228] whitespace-nowrap">Self-Attention</span>
              </div>
              <div className="flex items-center justify-between gap-2 px-3 py-2.5 bg-emerald-50/75 text-emerald-900">
                <span className="font-semibold">NFHS-5 भारत मान्य (N=6,88,803)</span>
                <span className="font-bold tabular-nums whitespace-nowrap">ECE 0.0023</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── Bottom Copyright, Quick Navigation & Accreditation Bar ── */}
        <div className="border-t border-slate-200/80 pt-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>
                © 2026 <strong className="font-semibold text-slate-800">MOMENT</strong>. सर्वाधिकार सुरक्षित (All Rights Reserved).
              </span>
            </div>

            <nav aria-label="Footer Navigation" className="flex items-center gap-3 text-[11px] font-medium text-slate-500">
              <button
                type="button"
                onClick={() => onOpenDashboard && onOpenDashboard()}
                className="hover:text-[#981228] transition-colors cursor-pointer"
              >
                Dashboard
              </button>
              <span aria-hidden="true" className="text-slate-300">•</span>
              <button
                type="button"
                onClick={() => onOpenRegistry && onOpenRegistry()}
                className="hover:text-[#981228] transition-colors cursor-pointer"
              >
                Registry
              </button>
              {onOpenAuditModal && (
                <>
                  <span aria-hidden="true" className="text-slate-300">•</span>
                  <button
                    type="button"
                    onClick={onOpenAuditModal}
                    className="hover:text-[#981228] transition-colors cursor-pointer"
                  >
                    Audit Logs
                  </button>
                </>
              )}
            </nav>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 text-[11px]">
            <span className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 font-medium border border-slate-200/80">
              WHO &amp; FIGO 2023 Guidelines
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 font-medium border border-slate-200/80">
              Dakshata MoHFW Protocol
            </span>
            <span className="text-[#981228] font-semibold">
              Target: Zero Preventable Maternal PPH Deaths
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
