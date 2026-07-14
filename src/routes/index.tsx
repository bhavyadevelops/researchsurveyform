import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  component: SurveyPage,
});

// ---------- Survey model ----------

type Question =
  | { id: string; type: "radio"; label: string; help?: string; options: string[] }
  | { id: string; type: "checkbox"; label: string; help?: string; options: string[]; max?: number }
  | { id: string; type: "select"; label: string; help?: string; options: string[] }
  | { id: string; type: "rating"; label: string; help?: string; scale?: number; leftLabel?: string; rightLabel?: string }
  | { id: string; type: "text"; label: string; help?: string; placeholder?: string }
  | { id: string; type: "textarea"; label: string; help?: string; placeholder?: string };

type Section = {
  id: string;
  title: string;
  kicker: string;
  emoji: string;
  accent: "grape" | "tangerine" | "lime" | "sky" | "rose";
  questions: Question[];
};

const SECTIONS: Section[] = [
  {
    id: "about-you",
    title: "A little about you",
    kicker: "Chapter 01",
    emoji: "🎟️",
    accent: "grape",
    questions: [
      { id: "age", type: "radio", label: "Which age group do you belong to?", options: ["Under 18", "18 – 24", "25 – 34", "35 – 44", "45 – 54", "55+"] },
      { id: "life_stage", type: "radio", label: "How would you describe your current life stage?", options: ["Student", "Young professional", "Couple / Partnered", "Parent with kids", "Empty nester"] },
      { id: "city", type: "text", label: "Which city do you mostly hang out in?", placeholder: "e.g. Bengaluru, Mumbai, Delhi…" },
      { id: "companions", type: "checkbox", label: "Who do you usually go out with?", help: "Pick all that apply", options: ["Solo", "Partner", "Close friends", "Larger friend group", "Family", "Kids", "Colleagues"] },
    ],
  },
  {
    id: "habits",
    title: "Your weekend rhythm",
    kicker: "Chapter 02",
    emoji: "🌇",
    accent: "tangerine",
    questions: [
      { id: "frequency", type: "radio", label: "How often do you go out for leisure or entertainment?", options: ["Almost every day", "A few times a week", "Once a week", "A few times a month", "Rarely"] },
      { id: "budget", type: "select", label: "What's your typical spend per outing (per person)?", options: ["Under ₹500", "₹500 – ₹1,500", "₹1,500 – ₹3,000", "₹3,000 – ₹6,000", "₹6,000+"] },
      { id: "planning", type: "radio", label: "How far in advance do you usually plan?", options: ["Same day / spontaneous", "1 – 2 days ahead", "About a week ahead", "Weeks in advance"] },
      { id: "day_part", type: "checkbox", label: "When do you most often go out?", options: ["Weekday evenings", "Friday nights", "Saturday afternoons", "Saturday nights", "Sunday brunch", "Sunday evenings"] },
    ],
  },
  {
    id: "preferences",
    title: "What you love doing",
    kicker: "Chapter 03",
    emoji: "🎨",
    accent: "lime",
    questions: [
      {
        id: "activities",
        type: "checkbox",
        label: "Which experiences excite you the most?",
        help: "Pick up to 5",
        max: 5,
        options: ["Food & dining", "Cafés & coffee", "Movies & cinema", "Live music", "Comedy & theatre", "Museums & art", "Parks & outdoors", "Adventure sports", "Gaming & arcades", "Shopping", "Nightlife & bars", "Weekend travel"],
      },
      { id: "discovery", type: "radio", label: "How do you usually discover new places?", options: ["Instagram / Social media", "Friends & word of mouth", "Google Maps / reviews", "Curated blogs & guides", "Local events apps", "Just walking around"] },
      { id: "vibe", type: "radio", label: "Which vibe do you gravitate toward?", options: ["Cozy & intimate", "Trendy & upscale", "Lively & social", "Quirky & offbeat", "Family-friendly", "Nature & outdoors"] },
    ],
  },
  {
    id: "opinions",
    title: "How you rate the scene",
    kicker: "Chapter 04",
    emoji: "⭐",
    accent: "sky",
    questions: [
      { id: "rate_variety", type: "rating", label: "How would you rate the variety of options in your city?", leftLabel: "Very limited", rightLabel: "Excellent" },
      { id: "rate_value", type: "rating", label: "How satisfied are you with the value for money?", leftLabel: "Not at all", rightLabel: "Very satisfied" },
      { id: "rate_discovery", type: "rating", label: "How easy is it to discover new experiences?", leftLabel: "Very hard", rightLabel: "Effortless" },
      { id: "important", type: "checkbox", label: "What matters most when choosing a place?", help: "Pick up to 3", max: 3, options: ["Ambience", "Price", "Distance", "Reviews", "Menu / offering", "Crowd", "Safety", "Instagrammability"] },
    ],
  },
  {
    id: "wishes",
    title: "One last thing",
    kicker: "Chapter 05",
    emoji: "💭",
    accent: "rose",
    questions: [
      { id: "missing", type: "textarea", label: "What's missing from your city's entertainment scene?", placeholder: "Tell us anything — a type of venue, an event, a service…" },
      { id: "dream", type: "text", label: "Describe your dream weekend in one line.", placeholder: "e.g. rooftop jazz, ramen, and a late-night bookstore" },
      { id: "email", type: "text", label: "Email (optional) — if you'd like early access to what we build.", placeholder: "you@example.com" },
    ],
  },
];

// ---------- Page ----------

function SurveyPage() {
  const [started, setStarted] = useState(false);
  const [sectionIdx, setSectionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[] | number>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const totalSections = SECTIONS.length;
  const progress = useMemo(() => {
    if (submitted) return 100;
    if (!started) return 0;
    return Math.round(((sectionIdx + 1) / totalSections) * 100);
  }, [started, sectionIdx, submitted, totalSections]);

  const currentSection = SECTIONS[sectionIdx];

  function setAnswer(id: string, value: string | string[] | number) {
    setAnswers((a) => ({ ...a, [id]: value }));
    setErrors((e) => {
      if (!e[id]) return e;
      const next = { ...e };
      delete next[id];
      return next;
    });
  }

  function validateSection(section: Section) {
    const next: Record<string, string> = {};
    for (const q of section.questions) {
      if (q.id === "email" || q.id === "missing" || q.id === "dream") continue; // optional
      const v = answers[q.id];
      if (v === undefined || v === "" || (Array.isArray(v) && v.length === 0)) {
        next[q.id] = "Please answer this question.";
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (!validateSection(currentSection)) {
      // scroll to first error
      const firstErr = Object.keys(errors)[0];
      if (firstErr) document.getElementById(`q-${firstErr}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (sectionIdx < totalSections - 1) {
      setSectionIdx((i) => i + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      submitToGoogle();
    }
  }

  function goPrev() {
    if (sectionIdx > 0) {
      setSectionIdx((i) => i - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
    async function submitToGoogle() {
  const formData = new FormData();

  formData.append("entry.1267687962", answers.age as string);
  formData.append("entry.979001997", answers.life_stage as string);
  formData.append("entry.1460113588", answers.city as string);

  (answers.companions as string[] || []).forEach(v =>
    formData.append("entry.1214338796", v)
  );

  formData.append("entry.1483922260", answers.frequency as string);
  formData.append("entry.994825223", answers.budget as string);
  formData.append("entry.1050896763", answers.planning as string);

  (answers.day_part as string[] || []).forEach(v =>
    formData.append("entry.1286243172", v)
  );

  (answers.activities as string[] || []).forEach(v =>
    formData.append("entry.711178652", v)
  );

  formData.append("entry.1685139984", answers.discovery as string);

  formData.append("entry.595560342", answers.vibe as string);

  formData.append(
    "entry.2005960322",
    String(answers.rate_variety ?? "")
  );

  formData.append(
    "entry.1926955603",
    String(answers.rate_value ?? "")
  );

  formData.append(
    "entry.527405177",
    String(answers.rate_discovery ?? "")
  );

  (answers.important as string[] || []).forEach(v =>
    formData.append("entry.1268508034", v)
  );

  formData.append(
    "entry.1718695578",
    answers.missing as string || ""
  );

  formData.append(
    "entry.1867160528",
    answers.dream as string || ""
  );

  formData.append(
    "entry.159814234",
    answers.email as string || ""
  );

  await fetch(
    "https://docs.google.com/forms/d/e/1FAIpQLScaIvmrcx0G3ZmHcjYFAnrpU7RzjKzFcjstTn3U_HdIZzm1cg/formResponse",
    {
      method: "POST",
      mode: "no-cors",
      body: formData,
    }
  );

  setSubmitted(true);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
  
  return (
    <div className="min-h-screen bg-background bg-dots relative overflow-hidden">
      <BackgroundAccents />
      <TopBar progress={started && !submitted ? progress : null} />

      <main className="relative mx-auto max-w-3xl px-5 pb-24 pt-6 sm:pt-10">
        {!started && !submitted && <Hero onStart={() => setStarted(true)} />}

        {started && !submitted && (
          <SectionCard
            section={currentSection}
            index={sectionIdx}
            total={totalSections}
            answers={answers}
            errors={errors}
            setAnswer={setAnswer}
            onNext={goNext}
            onPrev={goPrev}
          />
        )}

        {submitted && <ThankYou answers={answers} />}
      </main>

      <Footer />
    </div>
  );
}

// ---------- Top bar & progress ----------

function TopBar({ progress }: { progress: number | null }) {
  return (
    <header className="relative z-10 mx-auto max-w-6xl px-5 pt-5">
      <div className="flex items-center justify-between rounded-full border-[1.5px] border-ink bg-cream/90 px-4 py-2 backdrop-blur">
        <div className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-primary border-[1.5px] border-ink">
            <span className="text-base">✦</span>
          </div>
          <span className="font-display text-sm font-bold tracking-wide">WEEKENDER</span>
          <span className="hidden sm:inline text-xs text-muted-foreground ml-2">Entertainment & Leisure Research</span>
        </div>
        <span className="pill hidden sm:inline-flex">Survey · 2026</span>
      </div>

      {progress !== null && (
        <div className="mt-4 px-1">
          <div className="flex items-center justify-between text-xs font-medium text-muted-foreground mb-1.5">
            <span className="font-display tracking-widest uppercase">Progress</span>
            <span className="font-mono">{progress}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full border-[1.5px] border-ink bg-cream overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, var(--tangerine), var(--primary), var(--lime))",
              }}
            />
          </div>
        </div>
      )}
    </header>
  );
}

// ---------- Hero ----------

function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="pt-10 sm:pt-16 text-center">
      <span className="pill">
        <span className="h-1.5 w-1.5 rounded-full bg-tangerine" />
        5 min survey · 100% anonymous
      </span>

      <h1 className="mt-6 font-display text-4xl sm:text-6xl font-bold leading-[1.02] tracking-tight">
        Help shape better{" "}
        <span className="relative inline-block">
          <span className="relative z-10">entertainment</span>
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-1 h-3 sm:h-4 -z-0 rounded-full"
            style={{ background: "var(--primary)" }}
          />
        </span>{" "}
        experiences.
      </h1>

      <p className="mt-6 mx-auto max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
        Your opinions help us understand how people explore, enjoy, and choose recreational
        destinations — from Friday nights to Sunday brunches. Takes only a few minutes.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button className="btn-primary" onClick={onStart}>
          Start Survey
          <span aria-hidden>→</span>
        </button>
        <span className="text-xs text-muted-foreground font-mono">no signup · no spam</span>
      </div>

      <IconStrip />

      <div className="mt-14 grid grid-cols-3 gap-3 sm:gap-5 text-left">
        {[
          { k: "5 min", l: "Average time" },
          { k: "5", l: "Short chapters" },
          { k: "100%", l: "Anonymous" },
        ].map((s) => (
          <div key={s.l} className="card-juno p-4 sm:p-5">
            <div className="font-display text-2xl sm:text-3xl font-bold">{s.k}</div>
            <div className="mt-1 text-xs sm:text-sm text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function IconStrip() {
  const items = [
    { e: "🍜", l: "Food" },
    { e: "🎬", l: "Movies" },
    { e: "☕", l: "Cafés" },
    { e: "🌳", l: "Parks" },
    { e: "🛍️", l: "Shopping" },
    { e: "🎤", l: "Live" },
    { e: "🎮", l: "Gaming" },
    { e: "🏔️", l: "Adventure" },
    { e: "🎧", l: "Music" },
    { e: "✈️", l: "Travel" },
  ];
  return (
    <div className="mt-12 -mx-5 overflow-hidden">
      <div className="marquee-track py-2">
        {[...items, ...items].map((it, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-full border-[1.5px] border-ink bg-card px-4 py-2 shadow-card-sm"
          >
            <span className="text-lg">{it.e}</span>
            <span className="font-display text-xs font-semibold tracking-wide uppercase">{it.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Section card ----------

const ACCENT: Record<Section["accent"], string> = {
  grape: "var(--grape)",
  tangerine: "var(--tangerine)",
  lime: "var(--lime)",
  sky: "var(--sky)",
  rose: "var(--rose)",
};

function SectionCard({
  section, index, total, answers, errors, setAnswer, onNext, onPrev,
}: {
  section: Section;
  index: number;
  total: number;
  answers: Record<string, string | string[] | number>;
  errors: Record<string, string>;
  setAnswer: (id: string, v: string | string[] | number) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <section className="pt-6 sm:pt-10">
      <div key={section.id} className="card-juno p-6 sm:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-display font-semibold tracking-widest uppercase text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT[section.accent] }} />
              {section.kicker} · {index + 1} of {total}
            </div>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight">
              {section.title}
            </h2>
          </div>
          <div
            className="hidden sm:grid h-14 w-14 shrink-0 place-items-center rounded-2xl border-[1.5px] border-ink text-2xl"
            style={{ background: ACCENT[section.accent] }}
          >
            {section.emoji}
          </div>
        </div>

        <div className="mt-8 space-y-8">
          {section.questions.map((q) => (
            <QuestionField
              key={q.id}
              q={q}
              value={answers[q.id]}
              error={errors[q.id]}
              onChange={(v) => setAnswer(q.id, v)}
            />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between gap-3">
          <button
            className="btn-ghost disabled:opacity-40"
            onClick={onPrev}
            disabled={index === 0}
          >
            ← Back
          </button>
          <button className="btn-primary" onClick={onNext}>
            {index === total - 1 ? "Submit Survey" : "Continue"}
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground font-mono">
        Your answers stay confidential. Aggregated insights only.
      </p>
    </section>
  );
}

// ---------- Fields ----------

function QuestionField({
  q, value, error, onChange,
}: {
  q: Question;
  value: string | string[] | number | undefined;
  error?: string;
  onChange: (v: string | string[] | number) => void;
}) {
  return (
    <div id={`q-${q.id}`} className="scroll-mt-24">
      <label className="block font-display text-lg sm:text-xl font-semibold leading-snug">
        {q.label}
      </label>
      {q.help && <p className="mt-1 text-sm text-muted-foreground">{q.help}</p>}

      <div className="mt-4">
        {q.type === "radio" && (
          <div className="grid gap-2.5 sm:grid-cols-2">
            {q.options.map((opt) => {
              const selected = value === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  className="chip-option"
                  data-selected={selected}
                  onClick={() => onChange(opt)}
                >
                  <span className={`grid h-5 w-5 place-items-center rounded-full border-[1.5px] border-ink ${selected ? "bg-ink" : "bg-card"}`}>
                    {selected && <span className="h-2 w-2 rounded-full bg-primary" />}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {q.type === "checkbox" && (
          <div className="grid gap-2.5 sm:grid-cols-2">
            {q.options.map((opt) => {
              const arr = (value as string[] | undefined) ?? [];
              const selected = arr.includes(opt);
              const atMax = q.max !== undefined && arr.length >= q.max && !selected;
              return (
                <button
                  key={opt}
                  type="button"
                  className="chip-option disabled:opacity-40"
                  data-selected={selected}
                  disabled={atMax}
                  onClick={() => {
                    onChange(selected ? arr.filter((x) => x !== opt) : [...arr, opt]);
                  }}
                >
                  <span className={`grid h-5 w-5 place-items-center rounded-md border-[1.5px] border-ink ${selected ? "bg-ink" : "bg-card"}`}>
                    {selected && <span className="text-primary text-xs leading-none">✓</span>}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {q.type === "select" && (
          <div className="relative">
            <select
              className="input-juno appearance-none pr-10 cursor-pointer"
              value={(value as string) ?? ""}
              onChange={(e) => onChange(e.target.value)}
            >
              <option value="" disabled>Choose one…</option>
              {q.options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm">▾</span>
          </div>
        )}

        {q.type === "rating" && (
          <RatingField
            value={value as number | undefined}
            scale={q.scale ?? 5}
            leftLabel={q.leftLabel}
            rightLabel={q.rightLabel}
            onChange={onChange}
          />
        )}

        {q.type === "text" && (
          <input
            type="text"
            className="input-juno"
            placeholder={q.placeholder}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
        )}

        {q.type === "textarea" && (
          <textarea
            className="input-juno min-h-[120px] resize-y"
            placeholder={q.placeholder}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm font-medium text-destructive flex items-center gap-1.5">
          <span aria-hidden>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

function RatingField({
  value, scale, leftLabel, rightLabel, onChange,
}: {
  value: number | undefined;
  scale: number;
  leftLabel?: string;
  rightLabel?: string;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: scale }, (_, i) => i + 1).map((n) => {
          const selected = value === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              data-selected={selected}
              className="chip-option !w-14 !justify-center !py-3.5 font-display text-lg font-bold"
              aria-label={`Rating ${n}`}
            >
              {n}
            </button>
          );
        })}
      </div>
      {(leftLabel || rightLabel) && (
        <div className="mt-2 flex justify-between text-xs text-muted-foreground font-medium">
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      )}
    </div>
  );
}

// ---------- Thank you ----------

function ThankYou({ answers }: { answers: Record<string, string | string[] | number> }) {
  const count = Object.values(answers).filter((v) =>
    Array.isArray(v) ? v.length > 0 : v !== "" && v !== undefined
  ).length;
  return (
    <section className="pt-16 text-center">
      <div className="card-juno p-8 sm:p-12">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border-[1.5px] border-ink bg-primary text-3xl">
          🎉
        </div>
        <h2 className="mt-6 font-display text-3xl sm:text-4xl font-bold tracking-tight">
          Thank you — genuinely.
        </h2>
        <p className="mt-4 text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
          You've helped shape a smarter, more delightful entertainment scene. Every answer moves the
          needle for how weekends get better.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink bg-cream px-4 py-2 font-mono text-xs">
          {count} responses recorded · confidential
        </div>
      </div>
    </section>
  );
}

// ---------- Footer ----------

function Footer() {
  return (
    <footer className="relative z-10 border-t-[1.5px] border-ink bg-cream/60 backdrop-blur mt-10">
      <div className="mx-auto max-w-6xl px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="grid h-7 w-7 place-items-center rounded-full bg-primary border-[1.5px] border-ink text-xs">✦</div>
          <span className="font-display text-sm font-bold tracking-wide">WEEKENDER</span>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Responses remain confidential and are used only for aggregated market research.
        </p>
        <span className="font-mono text-xs text-muted-foreground">© 2026 Weekender Research</span>
      </div>
    </footer>
  );
}

// ---------- Background flourishes ----------

function BackgroundAccents() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, var(--tangerine), transparent 70%)" }}
      />
      <div
        className="absolute top-1/3 -right-32 h-96 w-96 rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, var(--grape), transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, var(--lime), transparent 70%)" }}
      />
    </div>
  );
}
