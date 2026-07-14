import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-ByIEo9ZE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SECTIONS = [
	{
		id: "about-you",
		title: "A little about you",
		kicker: "Chapter 01",
		emoji: "🎟️",
		accent: "grape",
		questions: [
			{
				id: "age",
				type: "radio",
				label: "Which age group do you belong to?",
				options: [
					"Under 18",
					"18 – 24",
					"25 – 34",
					"35 – 44",
					"45 – 54",
					"55+"
				]
			},
			{
				id: "life_stage",
				type: "radio",
				label: "How would you describe your current life stage?",
				options: [
					"Student",
					"Young professional",
					"Couple / Partnered",
					"Parent with kids",
					"Empty nester"
				]
			},
			{
				id: "city",
				type: "text",
				label: "Which city do you mostly hang out in?",
				placeholder: "e.g. Bengaluru, Mumbai, Delhi…"
			},
			{
				id: "companions",
				type: "checkbox",
				label: "Who do you usually go out with?",
				help: "Pick all that apply",
				options: [
					"Solo",
					"Partner",
					"Close friends",
					"Larger friend group",
					"Family",
					"Kids",
					"Colleagues"
				]
			}
		]
	},
	{
		id: "habits",
		title: "Your weekend rhythm",
		kicker: "Chapter 02",
		emoji: "🌇",
		accent: "tangerine",
		questions: [
			{
				id: "frequency",
				type: "radio",
				label: "How often do you go out for leisure or entertainment?",
				options: [
					"Almost every day",
					"A few times a week",
					"Once a week",
					"A few times a month",
					"Rarely"
				]
			},
			{
				id: "budget",
				type: "select",
				label: "What's your typical spend per outing (per person)?",
				options: [
					"Under ₹500",
					"₹500 – ₹1,500",
					"₹1,500 – ₹3,000",
					"₹3,000 – ₹6,000",
					"₹6,000+"
				]
			},
			{
				id: "planning",
				type: "radio",
				label: "How far in advance do you usually plan?",
				options: [
					"Same day / spontaneous",
					"1 – 2 days ahead",
					"About a week ahead",
					"Weeks in advance"
				]
			},
			{
				id: "day_part",
				type: "checkbox",
				label: "When do you most often go out?",
				options: [
					"Weekday evenings",
					"Friday nights",
					"Saturday afternoons",
					"Saturday nights",
					"Sunday brunch",
					"Sunday evenings"
				]
			}
		]
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
				options: [
					"Food & dining",
					"Cafés & coffee",
					"Movies & cinema",
					"Live music",
					"Comedy & theatre",
					"Museums & art",
					"Parks & outdoors",
					"Adventure sports",
					"Gaming & arcades",
					"Shopping",
					"Nightlife & bars",
					"Weekend travel"
				]
			},
			{
				id: "discovery",
				type: "radio",
				label: "How do you usually discover new places?",
				options: [
					"Instagram / Social media",
					"Friends & word of mouth",
					"Google Maps / reviews",
					"Curated blogs & guides",
					"Local events apps",
					"Just walking around"
				]
			},
			{
				id: "vibe",
				type: "radio",
				label: "Which vibe do you gravitate toward?",
				options: [
					"Cozy & intimate",
					"Trendy & upscale",
					"Lively & social",
					"Quirky & offbeat",
					"Family-friendly",
					"Nature & outdoors"
				]
			}
		]
	},
	{
		id: "opinions",
		title: "How you rate the scene",
		kicker: "Chapter 04",
		emoji: "⭐",
		accent: "sky",
		questions: [
			{
				id: "rate_variety",
				type: "rating",
				label: "How would you rate the variety of options in your city?",
				leftLabel: "Very limited",
				rightLabel: "Excellent"
			},
			{
				id: "rate_value",
				type: "rating",
				label: "How satisfied are you with the value for money?",
				leftLabel: "Not at all",
				rightLabel: "Very satisfied"
			},
			{
				id: "rate_discovery",
				type: "rating",
				label: "How easy is it to discover new experiences?",
				leftLabel: "Very hard",
				rightLabel: "Effortless"
			},
			{
				id: "important",
				type: "checkbox",
				label: "What matters most when choosing a place?",
				help: "Pick up to 3",
				max: 3,
				options: [
					"Ambience",
					"Price",
					"Distance",
					"Reviews",
					"Menu / offering",
					"Crowd",
					"Safety",
					"Instagrammability"
				]
			}
		]
	},
	{
		id: "wishes",
		title: "One last thing",
		kicker: "Chapter 05",
		emoji: "💭",
		accent: "rose",
		questions: [
			{
				id: "missing",
				type: "textarea",
				label: "What's missing from your city's entertainment scene?",
				placeholder: "Tell us anything — a type of venue, an event, a service…"
			},
			{
				id: "dream",
				type: "text",
				label: "Describe your dream weekend in one line.",
				placeholder: "e.g. rooftop jazz, ramen, and a late-night bookstore"
			},
			{
				id: "email",
				type: "text",
				label: "Email (optional) — if you'd like early access to what we build.",
				placeholder: "you@example.com"
			}
		]
	}
];
function SurveyPage() {
	const [started, setStarted] = (0, import_react.useState)(false);
	const [sectionIdx, setSectionIdx] = (0, import_react.useState)(0);
	const [answers, setAnswers] = (0, import_react.useState)({});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const totalSections = SECTIONS.length;
	const progress = (0, import_react.useMemo)(() => {
		if (submitted) return 100;
		if (!started) return 0;
		return Math.round((sectionIdx + 1) / totalSections * 100);
	}, [
		started,
		sectionIdx,
		submitted,
		totalSections
	]);
	const currentSection = SECTIONS[sectionIdx];
	function setAnswer(id, value) {
		setAnswers((a) => ({
			...a,
			[id]: value
		}));
		setErrors((e) => {
			if (!e[id]) return e;
			const next = { ...e };
			delete next[id];
			return next;
		});
	}
	function validateSection(section) {
		const next = {};
		for (const q of section.questions) {
			if (q.id === "email" || q.id === "missing" || q.id === "dream") continue;
			const v = answers[q.id];
			if (v === void 0 || v === "" || Array.isArray(v) && v.length === 0) next[q.id] = "Please answer this question.";
		}
		setErrors(next);
		return Object.keys(next).length === 0;
	}
	function goNext() {
		if (!validateSection(currentSection)) {
			const firstErr = Object.keys(errors)[0];
			if (firstErr) document.getElementById(`q-${firstErr}`)?.scrollIntoView({
				behavior: "smooth",
				block: "center"
			});
			return;
		}
		if (sectionIdx < totalSections - 1) {
			setSectionIdx((i) => i + 1);
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		} else {
			setSubmitted(true);
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		}
	}
	function goPrev() {
		if (sectionIdx > 0) {
			setSectionIdx((i) => i - 1);
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background bg-dots relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundAccents, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, { progress: started && !submitted ? progress : null }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative mx-auto max-w-3xl px-5 pb-24 pt-6 sm:pt-10",
				children: [
					!started && !submitted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { onStart: () => setStarted(true) }),
					started && !submitted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
						section: currentSection,
						index: sectionIdx,
						total: totalSections,
						answers,
						errors,
						setAnswer,
						onNext: goNext,
						onPrev: goPrev
					}),
					submitted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThankYou, { answers })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function TopBar({ progress }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "relative z-10 mx-auto max-w-6xl px-5 pt-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between rounded-full border-[1.5px] border-ink bg-cream/90 px-4 py-2 backdrop-blur",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-8 w-8 place-items-center rounded-full bg-primary border-[1.5px] border-ink",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-base",
							children: "✦"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-sm font-bold tracking-wide",
						children: "WEEKENDER"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline text-xs text-muted-foreground ml-2",
						children: "Entertainment & Leisure Research"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pill hidden sm:inline-flex",
				children: "Survey · 2026"
			})]
		}), progress !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 px-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-xs font-medium text-muted-foreground mb-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display tracking-widest uppercase",
					children: "Progress"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-mono",
					children: [progress, "%"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-2.5 w-full rounded-full border-[1.5px] border-ink bg-cream overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full transition-all duration-500 ease-out",
					style: {
						width: `${progress}%`,
						background: "linear-gradient(90deg, var(--tangerine), var(--primary), var(--lime))"
					}
				})
			})]
		})]
	});
}
function Hero({ onStart }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "pt-10 sm:pt-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "pill",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-tangerine" }), "5 min survey · 100% anonymous"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-6 font-display text-4xl sm:text-6xl font-bold leading-[1.02] tracking-tight",
				children: [
					"Help shape better",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative inline-block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative z-10",
							children: "entertainment"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							className: "absolute inset-x-0 bottom-1 h-3 sm:h-4 -z-0 rounded-full",
							style: { background: "var(--primary)" }
						})]
					}),
					" ",
					"experiences."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 mx-auto max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed",
				children: "Your opinions help us understand how people explore, enjoy, and choose recreational destinations — from Friday nights to Sunday brunches. Takes only a few minutes."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col sm:flex-row items-center justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "btn-primary",
					onClick: onStart,
					children: ["Start Survey", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						children: "→"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground font-mono",
					children: "no signup · no spam"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconStrip, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 grid grid-cols-3 gap-3 sm:gap-5 text-left",
				children: [
					{
						k: "5 min",
						l: "Average time"
					},
					{
						k: "5",
						l: "Short chapters"
					},
					{
						k: "100%",
						l: "Anonymous"
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-juno p-4 sm:p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-2xl sm:text-3xl font-bold",
						children: s.k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-xs sm:text-sm text-muted-foreground",
						children: s.l
					})]
				}, s.l))
			})
		]
	});
}
function IconStrip() {
	const items = [
		{
			e: "🍜",
			l: "Food"
		},
		{
			e: "🎬",
			l: "Movies"
		},
		{
			e: "☕",
			l: "Cafés"
		},
		{
			e: "🌳",
			l: "Parks"
		},
		{
			e: "🛍️",
			l: "Shopping"
		},
		{
			e: "🎤",
			l: "Live"
		},
		{
			e: "🎮",
			l: "Gaming"
		},
		{
			e: "🏔️",
			l: "Adventure"
		},
		{
			e: "🎧",
			l: "Music"
		},
		{
			e: "✈️",
			l: "Travel"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-12 -mx-5 overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "marquee-track py-2",
			children: [...items, ...items].map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 rounded-full border-[1.5px] border-ink bg-card px-4 py-2 shadow-card-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-lg",
					children: it.e
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-xs font-semibold tracking-wide uppercase",
					children: it.l
				})]
			}, i))
		})
	});
}
var ACCENT = {
	grape: "var(--grape)",
	tangerine: "var(--tangerine)",
	lime: "var(--lime)",
	sky: "var(--sky)",
	rose: "var(--rose)"
};
function SectionCard({ section, index, total, answers, errors, setAnswer, onNext, onPrev }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "pt-6 sm:pt-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card-juno p-6 sm:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs font-display font-semibold tracking-widest uppercase text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "h-1.5 w-1.5 rounded-full",
								style: { background: ACCENT[section.accent] }
							}),
							section.kicker,
							" · ",
							index + 1,
							" of ",
							total
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight",
						children: section.title
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden sm:grid h-14 w-14 shrink-0 place-items-center rounded-2xl border-[1.5px] border-ink text-2xl",
						style: { background: ACCENT[section.accent] },
						children: section.emoji
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 space-y-8",
					children: section.questions.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionField, {
						q,
						value: answers[q.id],
						error: errors[q.id],
						onChange: (v) => setAnswer(q.id, v)
					}, q.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-ghost disabled:opacity-40",
						onClick: onPrev,
						disabled: index === 0,
						children: "← Back"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "btn-primary",
						onClick: onNext,
						children: [index === total - 1 ? "Submit Survey" : "Continue", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							children: "→"
						})]
					})]
				})
			]
		}, section.id), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-center text-xs text-muted-foreground font-mono",
			children: "Your answers stay confidential. Aggregated insights only."
		})]
	});
}
function QuestionField({ q, value, error, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: `q-${q.id}`,
		className: "scroll-mt-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "block font-display text-lg sm:text-xl font-semibold leading-snug",
				children: q.label
			}),
			q.help && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: q.help
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [
					q.type === "radio" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2.5 sm:grid-cols-2",
						children: q.options.map((opt) => {
							const selected = value === opt;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "chip-option",
								"data-selected": selected,
								onClick: () => onChange(opt),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `grid h-5 w-5 place-items-center rounded-full border-[1.5px] border-ink ${selected ? "bg-ink" : "bg-card"}`,
									children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: opt })]
							}, opt);
						})
					}),
					q.type === "checkbox" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2.5 sm:grid-cols-2",
						children: q.options.map((opt) => {
							const arr = value ?? [];
							const selected = arr.includes(opt);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "chip-option disabled:opacity-40",
								"data-selected": selected,
								disabled: q.max !== void 0 && arr.length >= q.max && !selected,
								onClick: () => {
									onChange(selected ? arr.filter((x) => x !== opt) : [...arr, opt]);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `grid h-5 w-5 place-items-center rounded-md border-[1.5px] border-ink ${selected ? "bg-ink" : "bg-card"}`,
									children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary text-xs leading-none",
										children: "✓"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: opt })]
							}, opt);
						})
					}),
					q.type === "select" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "input-juno appearance-none pr-10 cursor-pointer",
							value: value ?? "",
							onChange: (e) => onChange(e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								disabled: true,
								children: "Choose one…"
							}), q.options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: o,
								children: o
							}, o))]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm",
							children: "▾"
						})]
					}),
					q.type === "rating" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingField, {
						value,
						scale: q.scale ?? 5,
						leftLabel: q.leftLabel,
						rightLabel: q.rightLabel,
						onChange
					}),
					q.type === "text" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						className: "input-juno",
						placeholder: q.placeholder,
						value: value ?? "",
						onChange: (e) => onChange(e.target.value)
					}),
					q.type === "textarea" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "input-juno min-h-[120px] resize-y",
						placeholder: q.placeholder,
						value: value ?? "",
						onChange: (e) => onChange(e.target.value)
					})
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm font-medium text-destructive flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						children: "⚠"
					}),
					" ",
					error
				]
			})
		]
	});
}
function RatingField({ value, scale, leftLabel, rightLabel, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		children: Array.from({ length: scale }, (_, i) => i + 1).map((n) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onChange(n),
				"data-selected": value === n,
				className: "chip-option !w-14 !justify-center !py-3.5 font-display text-lg font-bold",
				"aria-label": `Rating ${n}`,
				children: n
			}, n);
		})
	}), (leftLabel || rightLabel) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2 flex justify-between text-xs text-muted-foreground font-medium",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: leftLabel }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: rightLabel })]
	})] });
}
function ThankYou({ answers }) {
	const count = Object.values(answers).filter((v) => Array.isArray(v) ? v.length > 0 : v !== "" && v !== void 0).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "pt-16 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card-juno p-8 sm:p-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid h-20 w-20 place-items-center rounded-full border-[1.5px] border-ink bg-primary text-3xl",
					children: "🎉"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-6 font-display text-3xl sm:text-4xl font-bold tracking-tight",
					children: "Thank you — genuinely."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-base text-muted-foreground max-w-md mx-auto leading-relaxed",
					children: "You've helped shape a smarter, more delightful entertainment scene. Every answer moves the needle for how weekends get better."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink bg-cream px-4 py-2 font-mono text-xs",
					children: [count, " responses recorded · confidential"]
				})
			]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "relative z-10 border-t-[1.5px] border-ink bg-cream/60 backdrop-blur mt-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-7 w-7 place-items-center rounded-full bg-primary border-[1.5px] border-ink text-xs",
						children: "✦"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-sm font-bold tracking-wide",
						children: "WEEKENDER"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground text-center",
					children: "Responses remain confidential and are used only for aggregated market research."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs text-muted-foreground",
					children: "© 2026 Weekender Research"
				})
			]
		})
	});
}
function BackgroundAccents() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-hidden": true,
		className: "pointer-events-none absolute inset-0 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl opacity-40",
				style: { background: "radial-gradient(circle, var(--tangerine), transparent 70%)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-1/3 -right-32 h-96 w-96 rounded-full blur-3xl opacity-40",
				style: { background: "radial-gradient(circle, var(--grape), transparent 70%)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-0 left-1/4 h-72 w-72 rounded-full blur-3xl opacity-40",
				style: { background: "radial-gradient(circle, var(--lime), transparent 70%)" }
			})
		]
	});
}
//#endregion
export { SurveyPage as component };
