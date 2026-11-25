import React, { useEffect, useRef, useState } from 'react';
import {
  Ambulance,
  ArrowRight,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import RbcStreamCanvas from './RbcStreamCanvas';
import './HeroSection.css';

export default function HeroSection({
  str,
  currentUser,
  lang,
  onStartAssessment,
  onOpenDashboard,
  onOpenAuthModal,
  onOpenStaffModal,
  onOpenAlerts,
}) {
  const stripRef = useRef(null);
  const [stripVisible, setStripVisible] = useState(
    () => typeof window === 'undefined' || typeof IntersectionObserver === 'undefined'
  );

  useEffect(() => {
    if (stripVisible || !stripRef.current || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStripVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(stripRef.current);
    return () => observer.disconnect();
  }, [stripVisible]);

  const featureCards = [
    {
      id: 'ai-risk-scoring',
      title: str.feature1Title || 'AI Risk Scoring',
      subtitle: str.feature1Sub || '(Admission)',
      Icon: Sparkles,
      accentClass: 'hero-feature-card--purple',
      onClick: onStartAssessment,
    },
    {
      id: 'realtime-monitoring',
      title: str.feature2Title || 'Real-time Monitoring',
      subtitle: str.feature2Sub || '(Postpartum)',
      Icon: HeartPulse,
      accentClass: 'hero-feature-card--rose',
      onClick: () => onOpenDashboard(),
    },
    {
      id: 'automated-escalation',
      title: str.feature3Title || 'Automated Escalation',
      subtitle: str.feature3Sub || '(108 / SBAR)',
      Icon: Ambulance,
      accentClass: 'hero-feature-card--orange',
      onClick: onOpenAlerts,
    },
    {
      id: 'stronger-outcomes',
      title: str.feature4Title || 'Stronger Outcomes',
      subtitle: str.feature4Sub || '(for Every Mother)',
      Icon: ShieldCheck,
      accentClass: 'hero-feature-card--teal',
      onClick: () => onOpenDashboard(),
    },
  ];

  return (
    <section
      aria-label="Hero"
      className="hero-rbc-section"
    >
      {/* Continuous 3D Bloodstream Simulation (extracted photorealistic RBCs from video) */}
      <RbcStreamCanvas className="hero-rbc-video" />

      {/* Directional readability scrim & seamless bottom transition */}
      <div className="hero-rbc-overlay" aria-hidden="true" />
      <div className="hero-rbc-bottom-fade" aria-hidden="true" />

      {/* Foreground Clinical Typography, Primary Actions & Bottom Feature Strip */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 sm:pt-10 lg:pt-12 pb-6 sm:pb-8">
        <div className="max-w-xl lg:max-w-2xl space-y-4 sm:space-y-5">
          {/* Clinical Eyebrow Indicator */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-rose-200/80 shadow-2xs">
            <HeartPulse className="w-3.5 h-3.5 text-red-700 flex-shrink-0" />
            <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-red-800">
              {lang === 'hi'
                ? 'WHO E-MOTIVE • प्रसवोत्तर रक्तस्राव (PPH) क्लिनिकल AI'
                : 'WHO E-MOTIVE • Maternal Hemorrhage Intelligence'}
            </span>
          </div>

          {/* Primary Headline & Subtitle */}
          <div className="space-y-3.5">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-slate-950 tracking-tight leading-[1.08]">
              <span>{str.heroTitle1}</span>
              <br />
              <span className="text-red-700">{str.heroTitle2}</span>
            </h1>
            <p className="text-slate-700 text-base sm:text-lg font-normal max-w-xl leading-relaxed">
              {str.heroSubtitle}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
            <button
              type="button"
              onClick={() => {
                if (!currentUser && onOpenAuthModal) onOpenAuthModal();
                else onStartAssessment();
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-red-700 hover:bg-red-800 text-white font-bold text-sm shadow-lg shadow-red-900/20 transition-all hover:scale-102 active:scale-98 cursor-pointer inline-flex items-center justify-center space-x-2"
            >
              <span>{str.startAssessment}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                if (!currentUser && onOpenAuthModal) onOpenAuthModal();
                else onOpenDashboard();
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/95 hover:bg-white text-slate-900 border border-slate-300/90 font-bold text-sm shadow-xs transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              {str.viewDashboard}
            </button>
          </div>

          {/* Compact Staff Session / Authentication Strip */}
          <div className="pt-2">
            {currentUser ? (
              <div className="inline-flex flex-wrap items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {currentUser.full_name ? currentUser.full_name[0].toUpperCase() : 'U'}
                </div>
                <div className="min-w-0 pr-1">
                  <div className="text-xs font-extrabold text-slate-900 truncate">
                    {currentUser.full_name || str.staffName}
                  </div>
                  <div className="text-[11px] text-slate-600 truncate">
                    {currentUser.role || 'ANM'} • {currentUser.facility_name || str.subCentre}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => onOpenDashboard()}
                    className="px-3 py-1.5 rounded-xl bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    {str.openDashboardBtn}
                  </button>
                  <button
                    type="button"
                    onClick={onOpenStaffModal}
                    className="px-2.5 py-1.5 rounded-xl text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 font-medium transition-colors cursor-pointer"
                  >
                    {str.switchStaff}
                  </button>
                </div>
              </div>
            ) : (
              <div className="inline-flex flex-wrap items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-red-700 flex-shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div className="text-left pr-1">
                  <div className="text-xs font-bold text-slate-900">
                    {str.staffAuthReq}
                  </div>
                  <div className="text-[11px] text-slate-600">
                    {str.ocrBadge}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onOpenAuthModal}
                  className="px-3.5 py-1.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                >
                  {str.staffLoginBtn}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom 4-Card Horizontal Feature Strip */}
        <div
          ref={stripRef}
          className={`hero-feature-strip mt-7 sm:mt-8 lg:mt-10 ${stripVisible ? 'is-visible' : ''}`}
        >
          {featureCards.map((card) => {
            const Icon = card.Icon;
            return (
              <button
                key={card.id}
                type="button"
                onClick={card.onClick}
                className={`hero-feature-card ${card.accentClass}`}
              >
                <div className="hero-feature-icon">
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>
                <div className="hero-feature-body">
                  <div className="hero-feature-title">{card.title}</div>
                  <div className="hero-feature-subtitle">{card.subtitle}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
