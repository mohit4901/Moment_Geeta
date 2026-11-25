import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  Baby,
  CheckCircle2,
  Clock,
  Droplet,
  HeartPulse,
  Info,
  Printer,
  ShieldCheck,
  Sparkles,
  Utensils,
  XCircle
} from 'lucide-react';
import LanguagePickerTrigger from './LanguagePickerTrigger';
import { translateText } from '../services/googleTranslationService';
import {
  dt,
  resolveDietLang,
  PREGNANCY_MONTHS_HI
} from '../i18n/dietPlanTranslations';

const PREGNANCY_MONTHS_EN = [
  {
    month: 1,
    trimesterKey: 'trimester1',
    title: 'Month 1 — The Folic Acid Window You Will Probably Miss',
    topPriority:
      'Top nutrient priority: Folic acid, 400-600 micrograms per day. This is the single most important nutrient in early pregnancy because it prevents neural tube defects like spina bifida. Indian dietary intake of folate is usually 200-300 micrograms — inadequate.',
    calories: '1,900 – 2,000 kcal/day',
    iron: '27 mg/day',
    folate: '400–600 mcg/day',
    calcium: '1,000 mg/day',
    hydration: '2.5 – 3.0 L/day',
    addTitle: 'Food to Add',
    foodsToAdd: [
      '1 katori cooked palak, methi, or sarson saag daily — 150-180 mcg folate per serving',
      '2 katoris of dal (moong, masoor, toor) — 130-160 mcg folate per katori',
      '1 chana or rajma serving 3 times a week — 170 mcg folate per katori',
      '1 orange, mosambi, or guava daily — vitamin C improves folate retention',
      '1 prenatal vitamin (Folvite, Fol-9, Becosules with folic acid) — non-negotiable',
    ],
    dropTitle: 'Food to Drop',
    foodsToDrop: [
      'Alcohol — fully off, no exceptions, no “one glass at the wedding”',
      'Smoking and second-hand smoke',
      'Raw or unripe papaya — papain in latex acts as a uterine stimulant',
      'Sesame seeds (til) in large quantities — same mechanism, Ayurvedic warning has fragments of clinical truth',
      'Unpasteurised milk from the local doodhwala — listeria risk',
      'Soft cheeses (brie, camembert, soft paneer from unverified source) — same',
      'Raw sprouts — salmonella and listeria risk',
    ],
    meals: [
      { time: '07:30 AM', title: 'Morning Folate & Prenatal Start', items: ['Prenatal vitamin (Folvite / Fol-9 / Becosules with folic acid) as advised by doctor', 'Warm water + soaked almonds + 1 orange, mosambi, or guava'] },
      { time: '09:00 AM', title: 'Cooked Greens & Dal Breakfast', items: ['1 katori cooked methi/palak cheela or moong dal chilla (no raw sprouts)'] },
      { time: '01:30 PM', title: 'Folate-Rich Lunch', items: ['2 katoris moong/masoor/toor dal or chana/rajma + 1 katori cooked palak, methi, or sarson saag', '2 whole-wheat rotis + fresh pasteurised curd'] },
      { time: '05:00 PM', title: 'Evening Snack', items: ['1 orange, mosambi, or guava + roasted chana or makhana'] },
      { time: '08:00 PM', title: 'Light Cooked Dinner', items: ['Cooked vegetable khichdi with toor/moong dal + steamed greens'] },
    ],
  },
  {
    month: 2,
    trimesterKey: 'trimester1',
    title: 'Month 2 — The Nausea Survival Month',
    topPriority:
      'Continue 400-600 mcg folic acid daily while prioritizing hydration, Vitamin B6, and small, bland, frequent meals to keep nutrition steady through morning sickness.',
    calories: '1,900 – 2,050 kcal/day',
    iron: '27 mg/day',
    folate: '400–600 mcg/day',
    calcium: '1,000 mg/day',
    hydration: '2.8 – 3.0 L/day',
    addTitle: 'Food to Add',
    foodsToAdd: [
      'Small dry snacks before getting out of bed — whole-wheat crackers, dry toast, or murmura',
      'Vitamin B6 sources — bananas, oats, roasted chana, and cooked potatoes',
      'Ginger-lemon warm sips or fresh nimbu pani in small sips throughout the day',
      '1 katori cooked palak or dal khichdi in gentle, low-oil portions',
      'Daily prenatal folic acid supplement taken at the time nausea is lowest',
    ],
    dropTitle: 'Food to Drop',
    foodsToDrop: [
      'Large, heavy, or deep-fried meals that trigger nausea and reflux',
      'Strong cooking odors, unpasteurised milk, raw sprouts, and raw/unripe papaya',
      'Long fasting gaps exceeding 3 hours between small snacks',
    ],
    meals: [
      { time: '07:00 AM', title: 'Bedside Nausea Buffer', items: ['2 dry whole-wheat crackers or toast before rising', 'Small sips of warm ginger-lemon water'] },
      { time: '09:00 AM', title: 'B6 Gentle Breakfast', items: ['Soft oats or banana porridge OR light vegetable poha', 'Herbal/lemon water sips'] },
      { time: '12:30 PM', title: 'Small Midday Meal', items: ['1 katori soft moong dal + steamed rice + fresh curd'] },
      { time: '04:00 PM', title: 'Afternoon Stabilization', items: ['1 banana or guava + roasted makhana'] },
      { time: '07:30 PM', title: 'Calm Evening Dinner', items: ['Light vegetable dalia or cooked palak-moong khichdi'] },
    ],
  },
  {
    month: 3,
    trimesterKey: 'trimester1',
    title: 'Month 3 — End of First Trimester and the Punsavanam Question',
    topPriority:
      'Top nutrient priority: Continue folic acid through week 12 (neural tube closes earlier but folate supports neural development through pregnancy). Start to build iron stores in anticipation of plasma volume expansion in month 4.',
    calories: '2,000 – 2,150 kcal/day',
    iron: '30 mg/day',
    folate: '600 mcg/day',
    calcium: '1,000 mg/day',
    hydration: '3.0 L/day',
    addTitle: 'Food to Add',
    foodsToAdd: [
      'Iron-rich foods stepped up: jaggery (gur) over white sugar, bajra roti once a day, pomegranate seeds, dates (2-3 only), raisins',
      'Vitamin C with every iron-containing meal — amla candy, lemon water, guava',
      'One fistful of soaked almonds and 2 walnut halves daily — DHA, vitamin E, protein',
    ],
    dropTitle: 'Food to Avoid',
    foodsToDrop: [
      'Street food gets riskier — pani puri, golgappa, raw chaat, kairi from the road.',
      'Continue avoiding raw/unripe papaya, unpasteurised dairy, and raw sprouts',
    ],
    meals: [
      { time: '07:30 AM', title: 'Brain & Iron Morning Start', items: ['1 fistful soaked almonds + 2 walnut halves + soaked raisins', 'Warm lemon water or amla candy'] },
      { time: '09:00 AM', title: 'Whole-Grain Breakfast', items: ['Cooked methi/palak paratha with curd OR vegetable dalia with jaggery (gur)'] },
      { time: '01:30 PM', title: 'Iron-Paired Lunch', items: ['1 bajra roti + 1 wheat roti + 2 katoris dal with lemon squeeze', '1 bowl pomegranate seeds or guava post-meal'] },
      { time: '05:00 PM', title: 'Evening Energy', items: ['2–3 dates + roasted chana + lemon water'] },
      { time: '08:00 PM', title: 'Home-Cooked Dinner', items: ['Paneer/dal curry + rotis + cooked green vegetables (zero street food)'] },
    ],
  },
  {
    month: 4,
    trimesterKey: 'trimester2',
    title: 'Month 4 — The Anabolic Gear Shift',
    topPriority:
      'Plasma volume and fetal growth accelerate—protein target rises to 65-78 grams per day alongside 1,000 mg calcium and daily DHA.',
    calories: '2,250 – 2,350 kcal/day',
    iron: '35 mg/day',
    folate: '600 mcg/day',
    calcium: '1,000 mg/day',
    hydration: '3.0 – 3.2 L/day',
    addTitle: 'Food to Add',
    foodsToAdd: [
      'Protein from every meal — 2 katoris of dal at lunch and dinner, 1 glass milk or curd, 1 paneer or egg or chicken or fish serving daily. Total target: 65-78 grams per day.',
      'Calcium target rises to 1,000 mg per day — 2 glasses of milk plus curd plus paneer plus ragi roti covers it',
      'Whole grains over polished — ragi, bajra, jowar, hand-pounded rice',
      'Fish 1-2 times per week if non-vegetarian — rohu, hilsa, pomfret for DHA',
      'Algal DHA supplement if vegetarian — 200-300 mg per day',
    ],
    dropTitle: 'Food to Drop',
    foodsToDrop: [
      'Street food gets riskier — pani puri, golgappa, raw chaat, kairi from the road. The 4th-6th month is when gut immunity is most suppressed and the first hepatitis A and typhoid flares appear in pregnancy clinic data.',
      'Excess fruit juice — fibre is removed, sugar concentrated',
    ],
    meals: [
      { time: '07:30 AM', title: 'High-Protein Start', items: ['1 glass pasteurised milk + soaked almonds & walnuts', 'Algal DHA supplement (200-300 mg if vegetarian)'] },
      { time: '09:00 AM', title: 'Protein & Whole-Grain Breakfast', items: ['Paneer bhurji or 2 eggs or moong chilla + 1 ragi/jowar roti'] },
      { time: '01:30 PM', title: 'Anabolic Lunch', items: ['2 katoris dal + bajra/ragi roti + hand-pounded rice + paneer/chicken/rohu fish + curd'] },
      { time: '05:00 PM', title: 'Whole-Fruit & Milk Break', items: ['Whole seasonal fruit (never juice) + 1 glass milk or buttermilk'] },
      { time: '08:00 PM', title: 'Protein Dinner', items: ['2 katoris dal + whole-grain roti + cooked greens + paneer/egg/fish'] },
    ],
  },
  {
    month: 5,
    trimesterKey: 'trimester2',
    title: 'Month 5 — Calcium Spike and the Quickening',
    topPriority:
      'Top nutrient priority: Calcium — 1,000 to 1,200 mg per day. Iron continues. Vitamin D becomes critical because 70-90 percent of urban Indian women are deficient.',
    calories: '2,300 – 2,400 kcal/day',
    iron: '35 mg/day',
    folate: '600 mcg/day',
    calcium: '1,000–1,200 mg/day',
    hydration: '3.2 L/day',
    addTitle: 'Food to Add',
    foodsToAdd: [
      'Ragi (nachni) — 344 mg calcium per 100 grams. One ragi dosa or 2 ragi rotis a day handle a chunk of the calcium quota.',
      'Til (sesame seeds) — 1 tablespoon roasted, in chutney or laddoo form (small portion). One of the few Indian foods cleared from month 4 onwards even though month 1-3 restricts it.',
      'Curd, paneer, chaas — at least 2 servings daily',
      'Drumstick leaves (moringa, munaga aaku, sahjan ka patta) — 440 mg calcium per 100 grams',
      'Sunlight — 20 minutes of morning exposure on forearms',
    ],
    dropTitle: 'Food to Limit',
    foodsToDrop: [
      'Raw spinach with curd — oxalates block calcium. Either cook the spinach or do not pair them.',
      'Heavy phytate sources (raw rajma, raw chickpea flour without soaking) — block both iron and calcium',
    ],
    meals: [
      { time: '07:30 AM', title: 'Morning Sunlight & Calcium', items: ['20 minutes of morning sunlight on forearms', '1 glass warm milk + soaked nuts'] },
      { time: '09:00 AM', title: 'Ragi Calcium Breakfast', items: ['1 ragi dosa or ragi porridge + paneer or egg'] },
      { time: '01:30 PM', title: 'Moringa & Calcium Thali', items: ['2 ragi rotis + cooked drumstick leaves (sahjan ka patta) + dal + curd/chaas'] },
      { time: '05:00 PM', title: 'Roasted Til Snack', items: ['1 tablespoon roasted til in chutney or small laddoo + seasonal fruit'] },
      { time: '08:00 PM', title: 'Balanced Dinner', items: ['Soaked & well-cooked rajma/dal + rotis + paneer + chaas (keep iron tablet 2h apart from dairy)'] },
    ],
  },
  {
    month: 6,
    trimesterKey: 'trimester2',
    title: 'Month 6 — The Gestational Diabetes Crossroads',
    topPriority:
      'Prevent post-meal blood glucose spikes using low-GI millets, higher breakfast protein, and the vegetables → protein → carbs eating order.',
    calories: '2,350 – 2,450 kcal/day',
    iron: '35 mg/day',
    folate: '600 mcg/day',
    calcium: '1,200 mg/day',
    hydration: '3.2 – 3.5 L/day',
    addTitle: 'Food to Add',
    foodsToAdd: [
      'Millets — bajra, jowar, ragi — replace 50 percent of your atta and rice',
      'Eating order shift — vegetables first, then protein, then carbs. The eating-order glucose hack reduces post-meal spikes by up to 40 percent and works in pregnancy too.',
      'Fenugreek leaves (methi) — leaves are fine and improve glucose handling. Methi seeds in large quantities are not (uterine stimulant).',
      'More protein at breakfast — Indian breakfasts are usually carb-heavy (idli, dosa, poha, paratha). Add an egg, paneer, or sprouts.',
    ],
    dropTitle: 'Food to Drop',
    foodsToDrop: [
      'White rice in large portions — 1 small katori at most per meal',
      'Sweets, mithai, jalebi, gulab jamun — even one piece spikes glucose for 2 hours',
      'Fruit juice — even fresh — concentrated sugar without fiber',
      'Energy drinks, packaged buttermilk with added sugar',
    ],
    meals: [
      { time: '07:30 AM', title: 'Steady-Glucose Start', items: ['Soaked almonds & walnuts + plain water'] },
      { time: '09:00 AM', title: 'High-Protein Breakfast', items: ['Egg / paneer / cooked sprouts paired with bajra or ragi chilla'] },
      { time: '01:30 PM', title: 'Sequenced Millet Lunch', items: ['1) Cooked methi & non-starchy vegetables first → 2) Dal & paneer/chicken → 3) Bajra/jowar roti + at most 1 small katori rice'] },
      { time: '05:00 PM', title: 'Low-GI Snack', items: ['Unsweetened homemade chaas + roasted chana + whole guava/apple'] },
      { time: '08:00 PM', title: 'Sequenced Dinner', items: ['Vegetable bowl first → dal/paneer → 2 millet rotis'] },
    ],
  },
  {
    month: 7,
    trimesterKey: 'trimester3',
    title: 'Month 7 — The Godh Bharai Reality Check',
    topPriority:
      'Support third-trimester blood pressure, digestion, and sleep while managing heartburn, constipation, and leg cramps.',
    calories: '2,450 – 2,550 kcal/day',
    iron: '38 – 40 mg/day',
    folate: '600 mcg/day',
    calcium: '1,200 mg/day',
    hydration: '3.0+ L/day',
    addTitle: 'Food to Add',
    foodsToAdd: [
      'Fiber-heavy breakfasts — oats with milk and seeds, daliya with vegetables, ragi dosa with sambar',
      '2 tablespoons isabgol (psyllium husk) at bedtime if constipated',
      'Pumpkin seeds and chia seeds — magnesium for muscle cramps and sleep',
      'Cooked beets — natural nitrate, helps blood pressure',
    ],
    dropTitle: 'Symptom Management',
    foodsToDrop: [
      'Heartburn — small frequent meals, no lying down for 2 hours after eating, avoid tomato-heavy curries, cold milk relieves',
      'Constipation — water 3 litres a day, isabgol, papaya is safe at this stage (ripe), walk 30 minutes',
      'Leg cramps — magnesium-rich foods, calcium check, hydration',
    ],
    meals: [
      { time: '07:30 AM', title: 'Seed & Hydration Start', items: ['Warm water + pumpkin seeds & soaked chia seeds'] },
      { time: '09:00 AM', title: 'Fiber-Heavy Breakfast', items: ['Oats with milk & seeds OR vegetable daliya OR ragi dosa with sambar'] },
      { time: '01:30 PM', title: 'BP & Gut-Friendly Lunch', items: ['Cooked beets sabzi + mild non-tomato dal + 2 millet/wheat rotis + curd'] },
      { time: '05:00 PM', title: 'Afternoon Relief', items: ['Ripe papaya bowl or cold milk (helps soothe heartburn)'] },
      { time: '07:30 PM', title: 'Early Dinner & Bedtime', items: ['Light moong khichdi (stay upright 2h after eating)', '2 tbsp isabgol with water at bedtime if constipated'] },
    ],
  },
  {
    month: 8,
    trimesterKey: 'trimester3',
    title: 'Month 8 — Postpartum Pantry Begins',
    topPriority:
      'Build pre-delivery iron stores and tissue-repair protein with light, frequent meals—while keeping Sutika postpartum herbs/gums out of the pre-delivery plate.',
    calories: '2,500 – 2,600 kcal/day',
    iron: '40 mg/day',
    folate: '600 mcg/day',
    calcium: '1,200 mg/day',
    hydration: '3.5 L/day',
    addTitle: 'What to Actually Eat in Month 8',
    foodsToAdd: [
      'Continue the month 7 plate',
      'Add iron deliberately — your stores need to be high before delivery. Bajra-jowar roti, chana, palak daily.',
      'Pre-delivery protein — body is preparing for tissue repair after birth',
      'Light, frequent meals — your stomach has minimal room as the baby pushes the diaphragm up',
    ],
    dropTitle: 'Why Postpartum Prep Food Is Not Pregnancy Food',
    foodsToDrop: [
      'Methi (fenugreek) seeds in large doses have uterine stimulant action in animal studies — wanted after delivery, not before',
      'Gond (edible gum) is calorie-dense (~450 kcal per 100 grams) — needed during recovery, not before',
      'Ajwain in large doses can stimulate uterine contractions — useful postpartum for involution, risky in late pregnancy',
      'The 40-day “Sutika” diet of new mothers is designed for milk supply, joint pain recovery, and uterine involution — different physiological context',
    ],
    meals: [
      { time: '07:30 AM', title: 'Light Morning Start', items: ['Soaked almonds, pumpkin seeds + warm water'] },
      { time: '09:00 AM', title: 'Compact Protein Breakfast', items: ['Oats/daliya with seeds + paneer or 1–2 eggs'] },
      { time: '01:00 PM', title: 'Iron & Millet Lunch', items: ['Bajra-jowar roti + chana + cooked palak with lemon squeeze'] },
      { time: '04:30 PM', title: 'Small Frequent Mini-Meal', items: ['Curd / buttermilk + fruit + roasted chana'] },
      { time: '07:30 PM', title: 'Easy-Room Dinner', items: ['Small bowl dal + 1–2 soft phulkas + cooked veggies (no gond/ajwain/methi-seed laddoos yet)'] },
    ],
  },
  {
    month: 9,
    trimesterKey: 'trimester3',
    title: 'Month 9 — The Dates Protocol and the Final Lap',
    topPriority:
      'Support amniotic fluid, easy digestion, and labor readiness with dates, coconut water, and light frequent protein meals.',
    calories: '2,500 – 2,600 kcal/day',
    iron: '40 mg/day',
    folate: '600 mcg/day',
    calcium: '1,200 mg/day',
    hydration: '3.5 – 4.0 L/day',
    addTitle: 'Food to Add',
    foodsToAdd: [
      '6 dates per day (or modified for GDM)',
      'Coconut water — supports amniotic fluid volume; if oligohydramnios is detected on the 36-week scan, doctors increasingly recommend 2 glasses per day',
      'Easy-digestion proteins — eggs, paneer, dal, curd',
      'Small frequent meals — heartburn and stomach compression peak',
    ],
    dropTitle: 'Food to Limit',
    foodsToDrop: [
      'Heavy ghee laddoos — already covered above',
      'Caffeine, including chai — limit to 1 cup per day in late pregnancy because metabolism slows',
      'Tulsi tea in large amounts — eugenol stimulates uterine activity (mild, but a measurable factor)',
    ],
    meals: [
      { time: '07:30 AM', title: 'Dates & Fluid Start', items: ['3 dates (modified if GDM) + 1 glass fresh coconut water'] },
      { time: '09:30 AM', title: 'Easy-Digestion Breakfast', items: ['Soft eggs or paneer + oats/daliya (max 1 cup chai if desired)'] },
      { time: '01:00 PM', title: 'Light Midday Meal', items: ['Moong/masoor dal + curd + 1–2 soft rotis + cooked greens'] },
      { time: '04:30 PM', title: 'Amniotic Hydration Break', items: ['2nd glass coconut water + remaining 3 dates (or nuts if GDM)'] },
      { time: '07:30 PM', title: 'Final-Lap Light Dinner', items: ['Warm moong khichdi with paneer/curd — avoid heavy ghee laddoos and large tulsi tea'] },
    ],
  },
];

export default function PregnancyDietPlanPage({
  onBackToLanding,
  onOpenWomenDiet,
  lang = 'hi',
  setLang,
}) {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [dynamicMonth, setDynamicMonth] = useState(null);

  const resolved = resolveDietLang(lang);
  const baseMonths = resolved === 'en' ? PREGNANCY_MONTHS_EN : PREGNANCY_MONTHS_HI;
  const baseCurrent = baseMonths.find((m) => m.month === selectedMonth) || baseMonths[0];

  // For regional languages beyond English & Hindi, seamlessly translate month details if cloud API is active
  useEffect(() => {
    if (resolved === 'en' || resolved === 'hi') {
      setDynamicMonth(null);
      return;
    }
    let cancelled = false;
    const enMonth = PREGNANCY_MONTHS_EN.find((m) => m.month === selectedMonth) || PREGNANCY_MONTHS_EN[0];

    async function translateMonthFields() {
      try {
        const [titleT, priorityT, addTitleT, dropTitleT] = await Promise.all([
          translateText(enMonth.title, lang, 'en'),
          translateText(enMonth.topPriority, lang, 'en'),
          translateText(enMonth.addTitle, lang, 'en'),
          translateText(enMonth.dropTitle, lang, 'en'),
        ]);
        if (cancelled) return;
        // If backend echoed English unchanged (no cloud API key configured), fall back cleanly to Hindi base
        if (titleT === enMonth.title && priorityT === enMonth.topPriority) {
          setDynamicMonth(null);
          return;
        }
        const [addsT, dropsT] = await Promise.all([
          Promise.all(enMonth.foodsToAdd.map((s) => translateText(s, lang, 'en'))),
          Promise.all(enMonth.foodsToDrop.map((s) => translateText(s, lang, 'en'))),
        ]);
        if (!cancelled) {
          setDynamicMonth({
            ...enMonth,
            title: titleT,
            topPriority: priorityT,
            addTitle: addTitleT,
            dropTitle: dropTitleT,
            foodsToAdd: addsT,
            foodsToDrop: dropsT,
          });
        }
      } catch {
        if (!cancelled) setDynamicMonth(null);
      }
    }

    translateMonthFields();
    return () => {
      cancelled = true;
    };
  }, [lang, resolved, selectedMonth]);

  const current = dynamicMonth || baseCurrent;

  return (
    <div className="flex-1 bg-gradient-to-b from-[#fff8f8] via-white to-slate-50/60">
      {/* Top Page Bar */}
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

          <div className="flex items-center space-x-2">
            {setLang && <LanguagePickerTrigger lang={lang} setLang={setLang} />}
            <button
              type="button"
              onClick={onOpenWomenDiet}
              className="hidden sm:inline-flex px-3.5 py-2 rounded-xl border border-slate-200 hover:border-teal-400 text-slate-700 hover:text-teal-800 text-xs font-bold transition-colors cursor-pointer"
            >
              {dt('womensDailyPlanBtn', lang)}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#981228] hover:bg-[#7d0f21] text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{dt('printGuide', lang)}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#981228] text-xs font-bold">
            <Baby className="w-4 h-4" />
            <span>{dt('maternalGuideBadge', lang)}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            {dt('pregPageTitle', lang)}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {dt('pregPageSubtitle', lang)}
          </p>
        </div>

        {/* Month 1-9 Selector */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {dt('selectMonthLabel', lang)}
            </span>
            <span className="text-xs font-bold text-[#981228] bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
              {dt(current.trimesterKey, lang)}
            </span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
            {baseMonths.map((m) => {
              const active = m.month === selectedMonth;
              return (
                <button
                  key={m.month}
                  type="button"
                  onClick={() => setSelectedMonth(m.month)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    active
                      ? 'bg-[#981228] text-white border-[#981228] shadow-sm'
                      : 'bg-slate-50 hover:bg-rose-50 text-slate-700 border-slate-200 hover:border-rose-200'
                  }`}
                >
                  {dt('monthWord', lang)} {m.month}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Month Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Month Title, Top Priority & Daily Targets */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white rounded-3xl border border-rose-200/80 p-6 shadow-xs space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#981228]">
                  {dt('monthWord', lang)} {current.month} • {dt(current.trimesterKey, lang)}
                </span>
                <h2 className="text-xl font-extrabold text-slate-950 mt-1 leading-snug">
                  {current.title}
                </h2>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-1.5">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-900">
                  <Info className="w-4 h-4 text-amber-700 flex-shrink-0" />
                  <span>{dt('clinicalFocus', lang)}</span>
                </div>
                <p className="text-xs text-amber-950/90 leading-relaxed">
                  {current.topPriority}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-100">
                  <span className="text-[10px] font-semibold text-slate-500 block">{dt('dailyEnergy', lang)}</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{current.calories}</span>
                </div>
                <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-100">
                  <span className="text-[10px] font-semibold text-slate-500 block">{dt('ironTarget', lang)}</span>
                  <span className="font-bold text-[#981228] mt-0.5 block">{current.iron}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] font-semibold text-slate-500 block">{dt('folateCalcium', lang)}</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{current.folate} / {current.calcium}</span>
                </div>
                <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-100">
                  <span className="text-[10px] font-semibold text-slate-500 block">{dt('hydration', lang)}</span>
                  <span className="font-bold text-sky-900 mt-0.5 block">{current.hydration}</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-emerald-50/80 border border-emerald-200 p-5 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>{dt('clinicalNoteTitle', lang)}</span>
              </div>
              <p className="text-xs text-emerald-900/90 leading-relaxed">
                {dt('clinicalNoteBody', lang)}
              </p>
            </div>
          </div>

          {/* Right: Food to Add, Food to Drop/Avoid/Limit & Meal Schedule */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Food to Add */}
              <div className="bg-white rounded-3xl border border-emerald-200/90 p-5 sm:p-6 shadow-xs space-y-3.5">
                <div className="flex items-center space-x-2.5 pb-2.5 border-b border-emerald-100">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-extrabold text-emerald-950">{current.addTitle}</h3>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                  {current.foodsToAdd.map((item) => (
                    <li key={item} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Food to Drop / Avoid / Limit / Context */}
              <div className="bg-white rounded-3xl border border-rose-200/90 p-5 sm:p-6 shadow-xs space-y-3.5">
                <div className="flex items-center space-x-2.5 pb-2.5 border-b border-rose-100">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 text-[#981228] flex items-center justify-center flex-shrink-0">
                    {current.month === 7 ? (
                      <AlertTriangle className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                  </div>
                  <h3 className="text-sm font-extrabold text-rose-950">{current.dropTitle}</h3>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                  {current.foodsToDrop.map((item) => (
                    <li key={item} className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Daily Meal Schedule */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 text-[#981228] flex items-center justify-center">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-950">
                      {dt('monthWord', lang)} {current.month} — {dt('sampleMealSchedule', lang)}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {dt('mealScheduleSub', lang)}
                    </p>
                  </div>
                </div>
                <HeartPulse className="w-5 h-5 text-rose-400 hidden sm:block" />
              </div>

              <div className="space-y-3.5">
                {current.meals.map((meal) => (
                  <div
                    key={meal.time}
                    className="p-4 rounded-2xl bg-slate-50/75 border border-slate-200/80 space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-bold text-sm text-slate-900">{meal.title}</span>
                      <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-[#981228] bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200/80">
                        <Clock className="w-3 h-3" />
                        <span>{meal.time}</span>
                      </span>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {meal.items.map((item) => (
                        <li key={item} className="flex items-start space-x-2">
                          <Droplet className="w-3 h-3 text-rose-500 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
