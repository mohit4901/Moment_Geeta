import React, { useState, useEffect } from 'react';
import {
  Heart,
  HeartPulse,
  Sparkles,
  Ambulance,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
  Check,
  AlertTriangle,
  Activity,
  Users,
  Building2,
  BellRing,
  PhoneCall,
  Clock,
  CheckCircle2,
  UserCheck,
  Menu,
  X,
  MapPin,
  Compass,
  Navigation,
  Phone,
  ChevronRight
} from 'lucide-react';
import { fetchPatients, fetchNearbyFacilities } from '../api/client';
import ReferralHospitalsModal from './ReferralHospitalsModal';
import LanguagePickerTrigger from './LanguagePickerTrigger';
import HeroSection from './HeroSection';
import DietaryPlansSection from './DietaryPlansSection';
import { t as translate } from '../i18n/languages';

export default function LandingPage({
  onOpenDashboard,
  onStartAssessment,
  onOpenRegistry,
  onOpenAuthModal,
  onOpenAlertsModal,
  onOpenPregnancyDiet,
  onOpenWomenDiet,
  currentUser,
  userRole = 'anm',
  setUserRole,
  lang,
  setLang,
  backendStatus = 'healthy'
}) {
  const [activeNav, setActiveNav] = useState('home');
  const [showPatientsModal, setShowPatientsModal] = useState(false);
  const [showHospitalsModal, setShowHospitalsModal] = useState(false);
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [dbPatients, setDbPatients] = useState([]);
  const [dbFacilities, setDbFacilities] = useState([]);

  useEffect(() => {
    fetchPatients()
      .then(pts => { if (pts && pts.length > 0) setDbPatients(pts); })
      .catch(() => {});
    fetchNearbyFacilities(28.8520, 76.6850)
      .then(facs => { if (facs && facs.length > 0) setDbFacilities(facs); })
      .catch(() => {});
  }, []);

  // Multilingual resolution for all 23 Indic Languages + English
  const str = {
    brand: translate('brand', lang),
    home: translate('home', lang),
    patients: translate('patients', lang),
    assessments: translate('assessments', lang),
    hospitals: translate('hospitals', lang),
    alerts: translate('alerts', lang),
    dashboard: translate('dashboard', lang),
    heroTitle1: translate('heroTitle1', lang),
    heroTitle2: translate('heroTitle2', lang),
    heroSubtitle: translate('heroSubtitle', lang),
    startAssessment: translate('startAssessment', lang),
    viewDashboard: translate('viewDashboard', lang),
    anmBadge: translate('anmBadge', lang),
    staffName: translate('staffName', lang),
    subCentre: translate('subCentre', lang),
    openDashboardBtn: translate('openDashboardBtn', lang),
    switchStaff: translate('switchStaff', lang),
    feature1Title: translate('feature1Title', lang),
    feature1Sub: translate('feature1Sub', lang),
    feature2Title: translate('feature2Title', lang),
    feature2Sub: translate('feature2Sub', lang),
    feature3Title: translate('feature3Title', lang),
    feature3Sub: translate('feature3Sub', lang),
    feature4Title: translate('feature4Title', lang),
    feature4Sub: translate('feature4Sub', lang),
    phoneTitle: translate('phoneTitle', lang),
    phoneWeeks: translate('phoneWeeks', lang),
    phoneHighRisk: translate('phoneHighRisk', lang),
    phoneScore: translate('phoneScore', lang),
    phoneFactor1: translate('phoneFactor1', lang),
    phoneFactor2: translate('phoneFactor2', lang),
    phoneChecklist: translate('phoneChecklist', lang),
    phoneCheck1: translate('phoneCheck1', lang),
    phoneCheck2: translate('phoneCheck2', lang),
    phoneCheck3: translate('phoneCheck3', lang),
    btnHospitalsMap: translate('btnHospitalsMap', lang),
    btnMotherRegistry: translate('btnMotherRegistry', lang),
    staffAuthReq: translate('staffAuthReq', lang),
    staffAuthSub: translate('staffAuthSub', lang),
    staffLoginBtn: translate('staffLoginBtn', lang),
    ocrBadge: translate('ocrBadge', lang),
  };

  const samplePatientsList = [
    { id: 'MOMENT-PT-2916', name: 'Priya Sharma', age: 26, weeks: 38, risk: 'High Risk (18.5%)', riskColor: 'text-rose-600 bg-rose-50 border-rose-200' },
    { id: 'MOMENT-PT-2917', name: 'Ananya Verma', age: 24, weeks: 39, risk: 'Low Risk (3.2%)', riskColor: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { id: 'MOMENT-PT-2918', name: 'Sunita Devi', age: 31, weeks: 37, risk: 'Moderate Risk (9.8%)', riskColor: 'text-amber-600 bg-amber-50 border-amber-200' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-rose-100 selection:text-rose-900">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveNav('home')}>
              <div className="w-10 h-10 rounded-2xl bg-red-700 flex items-center justify-center shadow-md shadow-red-700/20">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="font-black text-2xl tracking-tight text-slate-900">
                MOMENT
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <button
                onClick={() => setActiveNav('home')}
                className={`transition-colors ${
                  activeNav === 'home'
                    ? 'text-slate-900 font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {str.home}
              </button>
              <button
                onClick={() => (onOpenRegistry ? onOpenRegistry() : setShowPatientsModal(true))}
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                {str.patients}
              </button>
              <button
                onClick={onStartAssessment}
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                {str.assessments}
              </button>
              <button
                onClick={() => setShowHospitalsModal(true)}
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                {str.hospitals}
              </button>
              <button
                onClick={() => (onOpenAlertsModal ? onOpenAlertsModal() : setShowAlertsModal(true))}
                className="text-slate-600 hover:text-slate-900 transition-colors flex items-center space-x-1"
              >
                <span>{str.alerts}</span>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              </button>
              <button
                onClick={() => onOpenDashboard()}
                className="text-slate-600 hover:text-slate-900 transition-colors font-semibold"
              >
                {str.dashboard}
              </button>
            </nav>

            {/* Right Controls: Staff Login/Profile & Bilingual Language Switcher */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Staff Profile / Login Button */}
              {currentUser ? (
                <button
                  onClick={() => (onOpenAuthModal ? onOpenAuthModal() : setShowStaffModal(true))}
                  className="flex items-center space-x-1.5 p-1 rounded-full hover:bg-slate-100 transition-all border border-slate-200"
                  title="Staff Profile & Authentication"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
                    {currentUser.full_name ? currentUser.full_name[0].toUpperCase() : 'U'}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 pr-0.5" />
                </button>
              ) : (
                <button
                  onClick={onOpenAuthModal}
                  className="hidden sm:flex px-3.5 py-1.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-black text-xs shadow-xs transition items-center space-x-1.5 cursor-pointer"
                >
                  <span>🔐 {lang === 'hi' ? 'लॉगिन' : 'Login'}</span>
                </button>
              )}

              {/* 22+ Regional Languages Selector */}
              <div className="flex items-center flex-shrink-0">
                <LanguagePickerTrigger lang={lang} setLang={setLang} />
              </div>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition cursor-pointer border border-slate-200 shadow-2xs"
                aria-label="Open Mobile Menu"
              >
                <Menu className="w-5 h-5 text-slate-800" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── MOBILE SLIDE-OUT DRAWER / SIDEBAR ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-200">
            {/* Top Branding & Close */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-2xl bg-red-700 flex items-center justify-center text-white shadow-xs">
                  <Heart className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-black text-lg tracking-tight text-slate-900">MOMENT</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-rose-100 text-red-700">CLINICAL</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold">Maternal Health Corridor</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {/* PROMINENT HOSPITALS & ROUTE BUTTON */}
              <button
                type="button"
                onClick={() => {
                  setShowHospitalsModal(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-indigo-50 to-rose-50 border-2 border-indigo-500 text-left transition flex items-center justify-between shadow-xs cursor-pointer group active:scale-98"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs flex-shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-slate-900 block group-hover:text-indigo-700">
                      🏥 {str.btnHospitalsMap}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-black block">
                      ✓ 11.1km PGIMS (17m ETA)
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              </button>

              <div className="pt-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
                {str.home} • {str.dashboard}
              </div>

              <button
                type="button"
                onClick={() => {
                  onOpenDashboard();
                  setMobileMenuOpen(false);
                }}
                className="w-full p-3 rounded-xl hover:bg-slate-100 text-left transition flex items-center space-x-3 text-xs font-black text-slate-800 cursor-pointer"
              >
                <Activity className="w-4 h-4 text-red-600" />
                <span>{str.dashboard}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onOpenRegistry) onOpenRegistry();
                  else setShowPatientsModal(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full p-3 rounded-xl hover:bg-slate-100 text-left transition flex items-center space-x-3 text-xs font-black text-slate-800 cursor-pointer"
              >
                <Users className="w-4 h-4 text-slate-600" />
                <span>{str.patients}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onStartAssessment();
                  setMobileMenuOpen(false);
                }}
                className="w-full p-3 rounded-xl hover:bg-slate-100 text-left transition flex items-center space-x-3 text-xs font-black text-slate-800 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{str.assessments}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onOpenAlertsModal) onOpenAlertsModal();
                  else setShowAlertsModal(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full p-3 rounded-xl hover:bg-slate-100 text-left transition flex items-center space-x-3 text-xs font-black text-slate-800 cursor-pointer"
              >
                <BellRing className="w-4 h-4 text-rose-600" />
                <div className="flex items-center space-x-1.5">
                  <span>{str.alerts}</span>
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                </div>
              </button>

              {/* Health Worker Profile & Login */}
              <div className="pt-3 border-t border-slate-100">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
                  {translate('staffName', lang)}
                </div>
                {currentUser ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenAuthModal) onOpenAuthModal();
                      else setShowStaffModal(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-left flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-black text-xs flex items-center justify-center">
                        {currentUser.full_name ? currentUser.full_name[0].toUpperCase() : 'U'}
                      </div>
                      <div>
                        <span className="text-xs font-black text-slate-900 block">{currentUser.full_name || str.staffName}</span>
                        <span className="text-[10px] font-bold text-emerald-700">{currentUser.role || 'ANM'}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenAuthModal) onOpenAuthModal();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 bg-red-700 hover:bg-red-800 text-white font-black text-xs rounded-xl shadow-xs text-center cursor-pointer"
                  >
                    🔐 {str.staffLoginBtn}
                  </button>
                )}
              </div>

              {/* Language Switcher in Mobile Drawer */}
              <div className="pt-3">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
                  {translate('select_language', lang)}
                </div>
                <LanguagePickerTrigger lang={lang} setLang={setLang} />
              </div>
            </div>

            {/* Bottom 108 Emergency Dial Action */}
            <div className="p-4 border-t border-slate-100 bg-slate-50">
              <a
                href="tel:108"
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl flex items-center justify-center space-x-1.5 shadow-sm"
              >
                <Ambulance className="w-4 h-4" />
                <span>📞 {translate('call_108', lang)}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-start pb-2 sm:pb-4">
        <HeroSection
          str={str}
          currentUser={currentUser}
          lang={lang}
          onStartAssessment={onStartAssessment}
          onOpenDashboard={onOpenDashboard}
          onOpenAuthModal={onOpenAuthModal}
          onOpenStaffModal={() => (onOpenAuthModal ? onOpenAuthModal() : setShowStaffModal(true))}
          onOpenAlerts={() => (onOpenAlertsModal ? onOpenAlertsModal() : setShowAlertsModal(true))}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6 md:mt-0">

          {/* ── MOBILE QUICK ACTION CARDS (DIRECTLY VISIBLE ON PHONES!) ── */}
          <div className="md:hidden mb-6 grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setShowHospitalsModal(true)}
              className="p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 flex flex-col items-center text-center shadow-xs active:scale-95 transition cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-1 shadow-2xs">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-black leading-tight">{str.btnHospitalsMap}</span>
              <span className="text-[9px] text-emerald-700 font-black mt-0.5">17m PGIMS</span>
            </button>

            <button
              type="button"
              onClick={() => (onOpenRegistry ? onOpenRegistry() : setShowPatientsModal(true))}
              className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 flex flex-col items-center text-center shadow-xs active:scale-95 transition cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center mb-1 shadow-2xs">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-black leading-tight">{str.btnMotherRegistry}</span>
              <span className="text-[9px] text-slate-500 font-bold mt-0.5">24</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenDashboard()}
              className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-[#981228] flex flex-col items-center text-center shadow-xs active:scale-95 transition cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-[#981228] text-white flex items-center justify-center mb-1 shadow-2xs">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-black leading-tight">{str.dashboard}</span>
              <span className="text-[9px] text-rose-700 font-black mt-0.5">Live AI</span>
            </button>
          </div>
        </div>

        {/* New Dietary Plans Section (After Hero, Before Footer) */}
        <DietaryPlansSection
          onOpenPregnancyDiet={onOpenPregnancyDiet}
          onOpenWomenDiet={onOpenWomenDiet}
          lang={lang}
        />
      </main>

      {/* MODAL: Patients Directory (DATABASE-DRIVEN) */}
      {showPatientsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 flex-shrink-0">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-red-700" />
                <h3 className="font-extrabold text-base text-slate-900">
                  {lang === 'hi' ? 'सक्रिय माताएँ (डेटाबेस रिकॉर्ड्स)' : 'Active Mothers Directory (Live DB)'}
                </h3>
              </div>
              <button
                onClick={() => setShowPatientsModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 overflow-y-auto flex-1 pr-1">
              {(dbPatients.length > 0 ? dbPatients : samplePatientsList).map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setShowPatientsModal(false);
                    onOpenDashboard(p.id);
                  }}
                  className="p-3.5 rounded-2xl border border-slate-200 hover:border-red-300 hover:bg-rose-50/30 flex items-center justify-between cursor-pointer transition-all"
                >
                  <div>
                    <div className="font-bold text-sm text-slate-900 flex items-center space-x-1.5">
                      <span>{p.name}</span>
                      {p.hindi_name && <span className="text-xs text-slate-500">({p.hindi_name})</span>}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {p.age} yrs • G{p.gravidity || 2}P{p.parity || 1} • {p.gestational_age || 38} wks • {p.id}
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${p.riskColor || 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                    {p.current_risk_tier ? `${p.current_risk_tier} (${p.current_risk_percent}%)` : (p.risk || 'High Risk')}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-2 flex-shrink-0">
              <button
                onClick={() => {
                  setShowPatientsModal(false);
                  onOpenDashboard('MOMENT-PT-2916');
                }}
                className="w-full py-2.5 rounded-xl bg-red-700 text-white font-bold text-xs shadow-xs hover:bg-red-800 transition-all"
              >
                {lang === 'hi' ? 'प्रिया शर्मा का क्लिनिकल चार्ट खोलें' : 'Open Priya Sharma Clinical Chart'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Emergency Referral Hospitals & Live GPS Map */}
      <ReferralHospitalsModal
        isOpen={showHospitalsModal}
        onClose={() => setShowHospitalsModal(false)}
        lang={lang}
        facilitiesData={dbFacilities}
      />

      {/* MODAL: Active Clinical Alerts */}
      {showAlertsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <BellRing className="w-5 h-5 text-rose-600" />
                <h3 className="font-extrabold text-base text-slate-900">
                  {lang === 'hi' ? 'सक्रिय आपातकालीन अलर्ट' : 'Active Emergency Alerts'}
                </h3>
              </div>
              <button
                onClick={() => setShowAlertsModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-4 rounded-2xl border border-rose-300 bg-rose-50/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-rose-700 uppercase tracking-wider">MOMENT-PT-2916 (Priya Sharma)</span>
                <span className="text-[10px] font-bold bg-rose-600 text-white px-2 py-0.5 rounded-full">HIGH RISK PPH</span>
              </div>
              <p className="text-xs text-rose-950 font-medium">
                PPH Probability 18.5% with Shock Index 1.05. Prior Cesarean scar detected. Immediate two 16G IV line preparation active.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => {
                  setShowAlertsModal(false);
                  onOpenDashboard('MOMENT-PT-2916');
                }}
                className="w-full py-2.5 rounded-xl bg-red-700 text-white font-bold text-xs hover:bg-red-800 transition-all"
              >
                {lang === 'hi' ? 'सीधे आपातकालीन प्रोटोकॉल खोलें' : 'Open Emergency Protocol Now'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Switch Staff / 6 Clinical Roles */}
      {showStaffModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  {lang === 'hi' ? 'क्लिनिकल भूमिका चुनें (Switch Role)' : 'Select Clinical Role & Access'}
                </h3>
                <p className="text-xs text-slate-500">6 अनुकूली क्लिनिकल वर्कफ्लो</p>
              </div>
              <button
                onClick={() => setShowStaffModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-xs">
              {[
                { role: 'anm', name: 'सुमन देवी (ANM / ASHA)', desc: 'उप-स्वास्थ्य केंद्र खेड़ी साध • ग्रामीण स्पर्श स्क्रीन मोड', icon: '👩‍⚕️' },
                { role: 'nurse', name: 'कविता शर्मा (Labor Room Staff Nurse)', desc: '15-मिनट निगरानी, आईवी ड्रिप व दवा चेकलिस्ट', icon: '🩺' },
                { role: 'doctor', name: 'डॉ. राजेश मेहरा (MO / Obstetrician FRU)', desc: 'पूर्ण क्लिनिकल मूल्यांकन, FT-Transformer AI व ब्लड रिजर्वेशन', icon: '👨‍⚕️' },
                { role: 'hospital', name: 'पीजीआईएमएस रोहतक (Triage Emergency Bay)', desc: 'लाइव आने वाली एम्बुलेंस, SBAR हैंडओवर व ओटी तैयारी', icon: '🏥' },
                { role: 'district', name: 'जिला स्वास्थ्य अधिकारी (Admin / CMO)', desc: 'रोहतक जिला पीपीएच एनालिटिक्स, रेफरल ऑडिट व रक्त उपलब्धता', icon: '📊' },
                { role: 'ambulance', name: '108 एम्बुलेंस ऑपरेटर (CAD Rohtak)', desc: 'वाहन HR-12-G-1081 लाइव जीपीएस रूट व टेलीमेट्री', icon: '🚑' },
              ].map((item) => (
                <div
                  key={item.role}
                  onClick={() => {
                    if (setUserRole) setUserRole(item.role);
                    setShowStaffModal(false);
                    onOpenDashboard('MOMENT-PT-2916', item.role);
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    userRole === item.role
                      ? 'border-red-400 bg-red-50/50 text-red-900 shadow-2xs font-bold'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <div className="font-bold text-xs">{item.name}</div>
                      <div className="text-[10px] text-slate-500">{item.desc}</div>
                    </div>
                  </div>
                  {userRole === item.role && (
                    <span className="text-[10px] font-bold bg-red-700 text-white px-2 py-0.5 rounded-full">
                      सक्रिय
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="pt-1">
              <button
                onClick={() => setShowStaffModal(false)}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
