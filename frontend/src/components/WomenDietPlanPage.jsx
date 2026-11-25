import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Droplet,
  Heart,
  ShieldCheck,
  Sparkles,
  Utensils
} from 'lucide-react';
import LanguagePickerTrigger from './LanguagePickerTrigger';
import { dt, getWomenPlanData } from '../i18n/dietPlanTranslations';

const PILLAR_ACCENTS = [
  'bg-rose-50 border-rose-200 text-[#981228]',
  'bg-teal-50 border-teal-200 text-teal-800',
  'bg-amber-50 border-amber-200 text-amber-800',
  'bg-sky-50 border-sky-200 text-sky-800',
];

export default function WomenDietPlanPage({
  onBackToLanding,
  onOpenPregnancyDiet,
  lang = 'hi',
  setLang,
}) {
  const { pillars, meals } = getWomenPlanData(lang);

  return (
    <div className="flex-1 bg-gradient-to-b from-teal-50/35 via-white to-slate-50/60">
      {/* Top Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackToLanding}
            className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{dt('backToHome', lang)}</span>
          </button>

          <div className="flex items-center space-x-2.5">
            {setLang && <LanguagePickerTrigger lang={lang} setLang={setLang} />}
            <button
              type="button"
              onClick={onOpenPregnancyDiet}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#981228] hover:bg-[#7d0f21] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <span>{dt('pregnancyPlanBtn', lang)}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
        {/* Page Heading */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
            <Heart className="w-4 h-4" />
            <span>{dt('womenBadge', lang)}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            {dt('womenTitle', lang)}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {dt('womenSubtitle', lang)}
          </p>
        </div>

        {/* Essential Nutrients Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-2xs space-y-3"
            >
              <div className={`inline-flex p-2.5 rounded-xl border ${PILLAR_ACCENTS[idx % PILLAR_ACCENTS.length]}`}>
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-extrabold text-slate-900">{pillar.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{pillar.detail}</p>
            </div>
          ))}
        </div>

        {/* Basic Daily Meal Structure */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center flex-shrink-0">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-950">{dt('dailyFrameworkTitle', lang)}</h2>
              <p className="text-xs text-slate-500">{dt('dailyFrameworkSub', lang)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {meals.map((slot) => (
              <div
                key={slot.time}
                className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-1.5"
              >
                <div className="flex items-center space-x-2 text-xs font-bold text-teal-800">
                  <Droplet className="w-3.5 h-3.5" />
                  <span>{slot.time}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{slot.summary}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center space-x-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-teal-700 flex-shrink-0" />
            <span>{dt('womenFooterNote', lang)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
