import React from 'react';
import { ArrowRight, Baby, Heart, Sparkles, Utensils } from 'lucide-react';
import { t as translate } from '../i18n/languages';

export default function DietaryPlansSection({
  onOpenPregnancyDiet,
  onOpenWomenDiet,
  lang = 'hi',
}) {
  return (
    <section
      aria-labelledby="dietary-plans-heading"
      className="bg-white pt-10 sm:pt-12 pb-5 sm:pb-6 border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Left-Aligned) */}
        <div className="max-w-2xl space-y-2.5 mb-7 sm:mb-8 text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-[#981228] text-[11px] font-bold tracking-wider uppercase">
            <Utensils className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{translate('dietSectionBadge', lang)}</span>
          </div>
          <h2
            id="dietary-plans-heading"
            className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight"
          >
            {translate('dietSectionTitle', lang)}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {translate('dietSectionSubtitle', lang)}
          </p>
        </div>

        {/* Two Compact Clickable Dietary Plan Cards (Left-Aligned with Increased Spacing Between Boxes) */}
        <div className="max-w-[760px] grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-14 lg:gap-20">
          {/* Card 1: Pregnant Woman */}
          <button
            type="button"
            onClick={onOpenPregnancyDiet}
            className="group text-left rounded-2xl border border-rose-200/85 bg-gradient-to-br from-[#fff8f8] via-white to-rose-50/60 p-4 sm:p-5 shadow-xs hover:shadow-lg hover:shadow-rose-950/10 hover:border-[#981228]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex flex-col justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-[#981228] focus-visible:outline-offset-2"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="w-10 h-10 rounded-xl bg-rose-100/85 border border-rose-200 text-[#981228] flex items-center justify-center shadow-2xs group-hover:bg-[#981228] group-hover:text-white group-hover:scale-105 transition-all duration-300 flex-shrink-0">
                  <Baby className="w-5 h-5" strokeWidth={1.9} />
                </div>
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-white border border-rose-200 text-[#981228] text-[10px] font-bold">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>{translate('dietPregBadge', lang)}</span>
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-base sm:text-[17px] font-extrabold text-slate-950 tracking-tight leading-snug group-hover:text-[#981228] transition-colors">
                  {translate('dietPregTitle', lang)}
                </h3>
                <p className="text-xs text-slate-600 leading-snug">
                  {translate('dietPregDesc', lang)}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-rose-100 flex items-center justify-between">
              <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-[#981228] group-hover:bg-[#7d0f21] text-white text-xs font-bold shadow-2xs transition-colors">
                <span>{translate('dietPregCta', lang)}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </div>
          </button>

          {/* Card 2: Normal Woman */}
          <button
            type="button"
            onClick={onOpenWomenDiet}
            className="group text-left rounded-2xl border border-slate-200/90 bg-gradient-to-br from-teal-50/50 via-white to-emerald-50/40 p-4 sm:p-5 shadow-xs hover:shadow-lg hover:shadow-teal-950/10 hover:border-teal-500/45 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex flex-col justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-teal-700 focus-visible:outline-offset-2"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shadow-2xs group-hover:bg-teal-700 group-hover:text-white group-hover:scale-105 transition-all duration-300 flex-shrink-0">
                  <Heart className="w-5 h-5" strokeWidth={1.9} />
                </div>
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-white border border-teal-200 text-teal-800 text-[10px] font-bold">
                  <Utensils className="w-2.5 h-2.5" />
                  <span>{translate('dietWomenBadge', lang)}</span>
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-base sm:text-[17px] font-extrabold text-slate-950 tracking-tight leading-snug group-hover:text-teal-800 transition-colors">
                  {translate('dietWomenTitle', lang)}
                </h3>
                <p className="text-xs text-slate-600 leading-snug">
                  {translate('dietWomenDesc', lang)}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-slate-900 group-hover:bg-teal-700 text-white text-xs font-bold shadow-2xs transition-colors">
                <span>{translate('dietWomenCta', lang)}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
