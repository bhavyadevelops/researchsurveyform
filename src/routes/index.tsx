import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import immersive from "@/assets/immersive.jpg";
import dome from "@/assets/dome.jpg";
import image from "@/assets/image.png";
import img3 from "@/assets/img3.png";
import img2 from "@/assets/img2.png";

export const Route = createFileRoute("/")({
  component: SurveyPage,
});

// ---------- Survey model ----------

type Question =
  | { id: string; type: "radio"; label: string; help?: string; options: string[]; optional?: boolean; allowOther?: boolean }
  | { id: string; type: "checkbox"; label: string; help?: string; options: string[]; max?: number; optional?: boolean; allowOther?: boolean }
  | { id: string; type: "select"; label: string; help?: string; options: string[]; optional?: boolean }
  | { id: string; type: "rating"; label: string; help?: string; scale?: number; leftLabel?: string; rightLabel?: string; optional?: boolean }
  | { id: string; type: "text"; label: string; help?: string; placeholder?: string; optional?: boolean }
  | { id: string; type: "textarea"; label: string; help?: string; placeholder?: string; optional?: boolean };

type Section = {
  id: string;
  title: string;
  kicker: string;
  emoji: string;
  accent: "grape" | "tangerine" | "lime" | "sky" | "rose";
  showImagineImages?: boolean;
  questions: Question[];
};

// Google Form entry IDs are used as question IDs so the form can be wired
// to the existing Google Form later without renaming anything.
const SECTIONS: Section[] = [
  {
    id: "about-you",
    title: "A little about you",
    kicker: "Chapter 01",
    emoji: "🎟️",
    accent: "grape",
    questions: [
      { id: "entry.41962019", type: "radio", label: "Your age group", options: ["Under 18", "18-24", "25-34", "35-44", "45-54", "55+"] },
      { id: "entry.297615991", type: "radio", label: "Your Gender", options: ["Male", "Female", "Prefer not to say", "Other"] },
      {
        id: "entry.1665325264",
        type: "radio",
        label: "Which best describes you?",
        help: "Select one",
        allowOther: true,
        options: [
          "School Student/Representative",
          "Young Adult Out For Fun",
          "Parent With Children At Home",
          "Working professional / decides team outings",
          "Artsy/ creative",
          "College students",
          "Government / tourism / institution representative",
          "Pet parents",
        ],
      },
      { id: "entry.40641649", type: "text", label: "Your occupation", placeholder: "e.g. designer, teacher, student…" },
      {
        id: "entry.1027552148",
        type: "radio",
        label: "Monthly household income (if applicable)",
        help: "Optional",
        optional: true,
        allowOther: true,
        options: ["Under 25,000", "25,000 - 50,000", "50,000 - 1 lakh", "1 lakh - 2 lakh"],
      },
      {
        id: "entry.735323549",
        type: "text",
        label: "Institutions / Corporates only — your organisation type and typical group size",
        help: "Optional",
        optional: true,
        placeholder: "e.g. college, 30 students",
      },
      {
        id: "entry.960967655",
        type: "radio",
        label: "Where do you live?",
        help: "If outside Vadodara, choose Other",
        allowOther: true,
        options: ["Vadodara"],
      },
      {
        id: "entry.2127098852",
        type: "checkbox",
        label: "In your free time, what do you usually do for fun or relaxation?",
        help: "Select all that apply",
        allowOther: true,
        options: [
          "Watching movies/OTT",
          "Hanging out with friends",
          "Shopping",
          "Outdoor activities/sports",
          "Social media/browsing",
          "Reading",
          "Visiting entertainment venues (cinema, gaming zone, etc.)",
          "Travel",
          "Family time",
        ],
      },
    ],
  },
  {
    id: "habits",
    title: "Your outing habits",
    kicker: "Chapter 02",
    emoji: "🌇",
    accent: "tangerine",
    questions: [
      {
        id: "entry.568559092",
        type: "radio",
        label: "Have you been to any paid entertainment or experience venue in the last 6 months?",
        help: "Cinema, gaming zone, theme park, exhibition, VR/AR, etc.",
        options: ["Yes", "No"],
      },
      {
        id: "entry.18470500",
        type: "radio",
        label: "How often do you go out for paid entertainment or experiences?",
        options: ["Weekly", "2-3 times a month", "Monthly", "A few Times A Year", "Rarely"],
      },
      {
        id: "entry.1101617653",
        type: "checkbox",
        label: "What do you usually do?",
        help: "Select all that apply",
        allowOther: true,
        options: [
          "Cinema",
          "Gaming / arcade",
          "Theme / amusement park",
          "Live events",
          "Museums / exhibitions",
          "VR / AR experiences",
          "Eating out as the outing",
        ],
      },
      {
        id: "entry.926958870",
        type: "radio",
        label: "Typically, how much do you spend per person, per outing on entertainment — excluding food?",
        options: ["Under ₹300", "₹300–600", "₹600–1,000", "₹1,000–1,500", "₹1,500–2,500", "₹2,500+"],
      },
      {
        id: "entry.986532273",
        type: "checkbox",
        label: "Who do you usually go with?",
        help: "Select all that apply",
        allowOther: true,
        options: ["Alone", "Partner", "Family with kids", "Friends", "Colleagues / team", "Pets", "Colleges", "School", "Family"],
      },
      {
        id: "entry.873875889",
        type: "radio",
        label: "How much do you usually spend on food & drinks during an outing, per person?",
        options: ["Under ₹150", "₹150–250", "₹250–500", "₹500+"],
      },
    ],
  },
  {
    id: "imagine",
    title: "Imagine the experience",
    kicker: "Chapter 03",
    emoji: "🎨",
    accent: "lime",
    showImagineImages: true,
    questions: [
      {
        id: "entry.788304985",
        type: "text",
        label: "Imagine you just walked out of this experience. What's the first thing you'd tell someone?",
        placeholder: "Short answer",
        optional: true,
      },
      {
        id: "entry.696342517",
        type: "checkbox",
        label: "Who would you most likely come with?",
        options: ["Partner", "Family", "Friends", "Colleagues / team", "Student group", "Alone", "Pets", "Your kids"],
      },
    ],
  },
  {
    id: "visit",
    title: "Would you visit?",
    kicker: "Chapter 04",
    emoji: "⭐",
    accent: "sky",
    questions: [
      {
        id: "entry.1058231380",
        type: "radio",
        label: "How likely are you to visit this venue in its first six months?",
        options: ["Very likely", "Likely", "Unlikely", "Very unlikely"],
      },
      {
        id: "entry.288898767",
        type: "radio",
        label: "How often might you visit in a year?",
        options: ["Once", "2–3 times", "4–6 times", "Monthly or more"],
      },
      {
        id: "entry.1927809211",
        type: "checkbox",
        label: "What would make you want to visit?",
        help: "Select all that apply",
        allowOther: true,
        options: [
          "A new kind of experience",
          "Good for kids / family",
          "Team / group activity",
          "Social-media worthy",
          "A special occasion",
          "A visitor / tourist attraction",
          "Pet Friendly",
        ],
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing & discovery",
    kicker: "Chapter 05",
    emoji: "💭",
    accent: "rose",
    questions: [
      {
        id: "entry.81434430",
        type: "radio",
        label: "What feels like a fair price for an Immersive Room experience?",
        options: ["Under ₹799", "₹800–999", "₹1,000–1,299", "₹1,300–1,499", "₹1,500 or above"],
      },
      {
        id: "entry.1639420917",
        type: "radio",
        label: "What feels like a fair price for a Dome Experience?",
        options: ["Under ₹500", "₹500–799", "₹800–999", "₹1,000 or above"],
      },
      {
        id: "entry.1948191618",
        type: "radio",
        label: "What feels like a fair price for ONE AR/VR game?",
        options: ["Under ₹200", "₹200–399", "₹400–599", "₹600-799", "₹799+"],
      },
      {
        id: "entry.229220687",
        type: "radio",
        label: "What feels like a fair price for an Immersive Room + Dome Experience bundle?",
        options: ["Under ₹1000", "₹1,000–1,299", "₹1,300–1,599", "₹1,600–1,899", "₹1,899+"],
      },
      {
        id: "entry.1092784356",
        type: "radio",
        label: "What feels like a fair price for an All-Access Bundle?",
        help: "Immersive Room + Dome + AR/VR",
        options: ["Under ₹1,500", "₹1,500–1,999", "₹2,000–2,499", "₹2,500–2,999", "₹3,000+"],
      },
      {
        id: "entry.2039847036",
        type: "radio",
        label: "How appealing is a bundle (immersive + dome + one AR/VR game) versus buying separately?",
        options: ["Much more appealing", "More appealing", "About the same", "Less appealing", "Much less appealing"],
      },
      {
        id: "entry.1989439892",
        type: "checkbox",
        label: "If you upgraded to a Premium Experience, what benefits would you expect?",
        help: "Select all that apply",
        allowOther: true,
        options: [
          "Priority access / Skip the queue",
          "Exclusive experiences or content",
          "Access to VIP or private areas",
          "Dedicated host or guide",
          "Extended access / More time",
        ],
      },
      {
        id: "entry.1273275245",
        type: "radio",
        label: "What feels like a fair price for a Premium Experience?",
        options: ["Under ₹2,000", "₹2,000–2,499", "₹2,500–2,999", "₹3,000–3,499", "₹3,500–3,999", "₹4,000 or above"],
      },
      {
        id: "entry.1154363758",
        type: "radio",
        label: "What feels like a fair price for food & drink per person at such a venue?",
        options: ["Under ₹150", "₹150", "₹250", "₹350", "₹350+"],
      },
      {
        id: "entry.1654400987",
        type: "radio",
        label: "Would a season pass or membership interest you?",
        options: ["Yes", "No"],
      },
      {
        id: "entry.332897866",
        type: "checkbox",
        label: "Where would you expect to come across a place like this?",
        help: "Select all that apply",
        options: [
          "Instagram",
          "YouTube",
          "WhatsApp",
          "Friends & family",
          "Google search",
          "Local press / radio",
          "School / college",
          "Office / HR",
          "Outdoor hoardings",
          "Influencers",
        ],
      },
      {
        id: "entry.728203652",
        type: "text",
        label: "If this popped up on your social media feed, what would make you stop scrolling?",
        placeholder: "Short answer",
        optional: true,
      },
      {
        id: "entry.115913297",
        type: "radio",
        label: "Whose recommendation would you trust most?",
        allowOther: true,
        options: ["Friends", "Family", "Influencers", "Online reviews", "School / office"],
      },
      {
        id: "entry.1877641893",
        type: "radio",
        label: "Would you be open to a short follow-up interview?",
        help: "If yes, please share your contact details below.",
        options: ["Yes", "No"],
      },
      {
        id: "entry.1210283293",
        type: "radio",
        label: "Would you like to receive an invitation/Information to the pre-launch/opening event?",
        options: ["No", "Yes"],
      },
      {
        id: "entry.1465259241",
        type: "text",
        label: "Anything else you'd like to share?",
        help: "Optional",
        placeholder: "Optional",
        optional: true,
      },
      {
        id: "entry.1931159729",
        type: "text",
        label: "Contact details (optional)",
        help: "Share your name, phone, or email so we can reach out.",
        placeholder: "e.g. Riya · riya@email.com · +91…",
        optional: true,
      },
    ],
  },
];

// ---------- Google Form submission ----------

const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSfUtOpgvlDQTq40OG4eVNGdVh5zqBvlA4V1IW09iLVmGQZABg/formResponse";
const GOOGLE_FORM_IFRAME = "weekender-gform-sink";

function appendField(form: HTMLFormElement, name: string, value: string) {
  const input = document.createElement("input");
  input.type = "hidden";
  input.name = name;
  input.value = value;
  form.appendChild(input);
}

function appendAnswer(form: HTMLFormElement, entryId: string, raw: string) {
  if (raw.startsWith(OTHER_PREFIX)) {
    appendField(form, entryId, "__other_option__");
    appendField(form, `${entryId}.other_option_response`, raw.slice(OTHER_PREFIX.length));
  } else if (raw === "__other__") {
    appendField(form, entryId, "__other_option__");
    appendField(form, `${entryId}.other_option_response`, "");
  } else {
    appendField(form, entryId, raw);
  }
}

function submitToGoogleForm(answers: Record<string, string | string[] | number>) {
  if (typeof document === "undefined") return;

  let iframe = document.getElementById(GOOGLE_FORM_IFRAME) as HTMLIFrameElement | null;
  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.name = GOOGLE_FORM_IFRAME;
    iframe.id = GOOGLE_FORM_IFRAME;
    iframe.style.display = "none";
    document.body.appendChild(iframe);
  }

  const form = document.createElement("form");
  form.action = GOOGLE_FORM_ACTION;
  form.method = "POST";
  form.target = GOOGLE_FORM_IFRAME;
  form.style.display = "none";

  // Preserve section order so fields post in the same order as the questions.
  for (const section of SECTIONS) {
    for (const q of section.questions) {
      const v = answers[q.id];
      if (v === undefined || v === "") continue;
      if (Array.isArray(v)) {
        if (v.length === 0) continue;
        for (const item of v) {
          if (item === "" || item === undefined) continue;
          appendAnswer(form, q.id, String(item));
        }
      } else {
        appendAnswer(form, q.id, String(v));
      }
    }
  }

  document.body.appendChild(form);
  form.submit();
  setTimeout(() => form.remove(), 1000);
}

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
      if (q.optional) continue;
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
      const firstErr = Object.keys(errors)[0];
      if (firstErr) document.getElementById(`q-${firstErr}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (sectionIdx < totalSections - 1) {
      setSectionIdx((i) => i + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      submitToGoogleForm(answers);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function goPrev() {
    if (sectionIdx > 0) {
      setSectionIdx((i) => i - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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

        {section.showImagineImages && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <img
              src={img2}
              alt="Immersive art and light installations"
              className="w-full h-48 sm:h-56 object-cover rounded-2xl border-[1.5px] border-ink"
            />
            <img
              src={img3}
              alt="VR and interactive entertainment experiences"
              className="w-full h-48 sm:h-56 object-cover rounded-2xl border-[1.5px] border-ink"
            />
          </div>
        )}

        
        {section.id === "pricing" && (
  <div className="grid gap-6 mb-8">

    <div>
      <img
        src={immersive}
        className="rounded-2xl w-full h-64 object-cover"
      />
      <p className="mt-2 font-display font-semibold">
        Immersive Room
      </p>
    </div>

    <div>
      <img
        src={dome}
        className="rounded-2xl w-full h-64 object-cover"
      />
      <p className="mt-2 font-display font-semibold">
        Dome Experience
      </p>
    </div>

    <div>
      <img
        src={image}
        className="rounded-2xl w-full h-64 object-cover"
      />
      <p className="mt-2 font-display font-semibold">
        AR / VR
      </p>
    </div>

  </div>
)}

        

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

const OTHER_PREFIX = "Other: ";

function splitOther(value: string | string[] | number | undefined, options: string[]): { selected: string | string[] | undefined; otherText: string; otherActive: boolean } {
  if (Array.isArray(value)) {
    const otherEntry = value.find((v) => typeof v === "string" && v.startsWith(OTHER_PREFIX));
    const cleaned = value.filter((v) => options.includes(v));
    return {
      selected: cleaned,
      otherText: otherEntry ? otherEntry.slice(OTHER_PREFIX.length) : "",
      otherActive: !!otherEntry || value.some((v) => v === "__other__"),
    };
  }
  if (typeof value === "string") {
    if (value.startsWith(OTHER_PREFIX)) {
      return { selected: undefined, otherText: value.slice(OTHER_PREFIX.length), otherActive: true };
    }
    if (options.includes(value)) return { selected: value, otherText: "", otherActive: false };
    if (value === "__other__") return { selected: undefined, otherText: "", otherActive: true };
  }
  return { selected: undefined, otherText: "", otherActive: false };
}

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
        {"optional" in q && q.optional && (
          <span className="ml-2 text-xs font-mono font-normal text-muted-foreground uppercase tracking-wider">optional</span>
        )}
      </label>
      {q.help && <p className="mt-1 text-sm text-muted-foreground">{q.help}</p>}

      <div className="mt-4">
        {q.type === "radio" && (() => {
          const { selected, otherText, otherActive } = splitOther(value, q.options);
          return (
            <>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {q.options.map((opt) => {
                  const isSelected = selected === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      className="chip-option"
                      data-selected={isSelected}
                      onClick={() => onChange(opt)}
                    >
                      <span className={`grid h-5 w-5 place-items-center rounded-full border-[1.5px] border-ink ${isSelected ? "bg-ink" : "bg-card"}`}>
                        {isSelected && <span className="h-2 w-2 rounded-full bg-primary" />}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
                {q.allowOther && (
                  <button
                    type="button"
                    className="chip-option"
                    data-selected={otherActive}
                    onClick={() => onChange(otherText ? `${OTHER_PREFIX}${otherText}` : "__other__")}
                  >
                    <span className={`grid h-5 w-5 place-items-center rounded-full border-[1.5px] border-ink ${otherActive ? "bg-ink" : "bg-card"}`}>
                      {otherActive && <span className="h-2 w-2 rounded-full bg-primary" />}
                    </span>
                    <span>Other…</span>
                  </button>
                )}
              </div>
              {q.allowOther && otherActive && (
                <input
                  type="text"
                  className="input-juno mt-3"
                  placeholder="Please specify"
                  value={otherText}
                  onChange={(e) => onChange(e.target.value ? `${OTHER_PREFIX}${e.target.value}` : "__other__")}
                />
              )}
            </>
          );
        })()}

        {q.type === "checkbox" && (() => {
          const { selected, otherText, otherActive } = splitOther(value, q.options);
          const arr = (selected as string[] | undefined) ?? [];
          const totalCount = arr.length + (otherActive ? 1 : 0);
          const buildValue = (nextArr: string[], nextOther: string | null) => {
            const out: string[] = [...nextArr];
            if (nextOther !== null) out.push(nextOther ? `${OTHER_PREFIX}${nextOther}` : "__other__");
            return out;
          };
          return (
            <>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {q.options.map((opt) => {
                  const isSelected = arr.includes(opt);
                  const atMax = q.max !== undefined && totalCount >= q.max && !isSelected;
                  return (
                    <button
                      key={opt}
                      type="button"
                      className="chip-option disabled:opacity-40"
                      data-selected={isSelected}
                      disabled={atMax}
                      onClick={() => {
                        const nextArr = isSelected ? arr.filter((x) => x !== opt) : [...arr, opt];
                        onChange(buildValue(nextArr, otherActive ? otherText : null));
                      }}
                    >
                      <span className={`grid h-5 w-5 place-items-center rounded-md border-[1.5px] border-ink ${isSelected ? "bg-ink" : "bg-card"}`}>
                        {isSelected && <span className="text-primary text-xs leading-none">✓</span>}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
                {q.allowOther && (
                  <button
                    type="button"
                    className="chip-option"
                    data-selected={otherActive}
                    onClick={() => onChange(buildValue(arr, otherActive ? null : ""))}
                  >
                    <span className={`grid h-5 w-5 place-items-center rounded-md border-[1.5px] border-ink ${otherActive ? "bg-ink" : "bg-card"}`}>
                      {otherActive && <span className="text-primary text-xs leading-none">✓</span>}
                    </span>
                    <span>Other…</span>
                  </button>
                )}
              </div>
              {q.allowOther && otherActive && (
                <input
                  type="text"
                  className="input-juno mt-3"
                  placeholder="Please specify"
                  value={otherText}
                  onChange={(e) => onChange(buildValue(arr, e.target.value))}
                />
              )}
            </>
          );
        })()}

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
