import logo from "./assets/logo.png"
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  MessageSquare,
  TrendingUp,
  Globe,
  FileText,
  Bell,
  Check,
  Star,
  ChevronDown,
} from "lucide-react";
import PrivacyAndSecurity from "./PrivacyAndSecurity";

const NAV = [
  { id: "home", label: "Home" },
  { id: "products", label: "Products" },
  { id: "about", label: "About Us" },
  { id: "founder", label: "Our Team" },
  { id: "contact", label: "Contact" },
];

const WAITLIST_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeBITQwPy9UiaIeIT3KH2GsrCP2IzfTli4JM-Gptgsi2GOJLw/viewform?usp=header";

export default function App() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const sessionSubmitted = sessionStorage.getItem("grokkon-waitlist-submitted");
    if (sessionSubmitted === "true") {
      setSubmitted(true);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const pos = window.scrollY + 120;
      for (let i = NAV.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV[i].id);
        if (el && el.offsetTop <= pos) {
          setActive(NAV[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const openWaitlist = () => window.open(WAITLIST_URL, "_blank");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitted) return;

    setSubmitted(true);
    sessionStorage.setItem("grokkon-waitlist-submitted", "true");
    openWaitlist();
  };

  return (
    <div
      className="min-h-screen bg-white text-gray-900"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ─── NAV ─────────────────────────────────────────────────────────── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => goto("home")}
            className="flex items-center gap-2.5"
          >
            <img src={logo} alt="Grokkon" className="w-8 h-8 object-contain" />
            <span
              className={`text-xl font-bold transition-colors ${scrolled ? "text-gray-900" : "text-white"}`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Grokkon
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-7">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => goto(n.id)}
                className={`text-sm font-medium transition-colors ${active === n.id
                  ? "text-blue-500"
                  : scrolled
                    ? "text-gray-600 hover:text-gray-900"
                    : "text-white/80 hover:text-white"}`}
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-1 ${scrolled ? "text-gray-900" : "text-white"}`}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => goto(n.id)}
                className="block w-full text-left py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                {n.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ─── HERO ────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#07101f]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-[#07101f] to-[#07101f]" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-700/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-700/10 rounded-full blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />

        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-7">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-blue-300 text-xs font-semibold tracking-wide uppercase">
                Waitlist Now Open
              </span>
            </div>

            <h1
              className="text-5xl lg:text-[3.75rem] font-extrabold text-white leading-[1.08] mb-6"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Your Business&apos;s
              <br />
              <span className="text-blue-400">AI Finance Brain</span>
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-9 max-w-lg">
              Grokkon reads your bank SMS messages to track every rupee,
              monitors markets and news in real time, and speaks to you in your
              own language — starting at just ₹49/month.
            </p>

            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 border border-white/15 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 transition-colors"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-blue-500 active:scale-95 transition-all whitespace-nowrap"
                >
                  Join Waitlist
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-5 py-3.5 max-w-md">
                <Check className="text-emerald-400 shrink-0" size={18} />
                <span className="text-emerald-300 text-sm font-medium">
                  {"You're on the list! We'll reach out when we launch."}
                </span>
              </div>
            )}

            <p className="text-gray-600 text-xs mt-3">
              No spam, ever. Be first to know when we launch.
            </p>

            <div className="flex items-center gap-10 mt-12 pt-10 border-t border-white/10">
              {[
                { val: "22+", sub: "Indian Languages" },
                { val: "₹49", sub: "Starting Price" },
                { val: "SMS", sub: "Based Tracking" },
              ].map((s) => (
                <div key={s.sub}>
                  <div
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {s.val}
                  </div>
                  <div className="text-gray-500 text-sm mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex justify-end pr-4">
            <div className="relative w-72">
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden">
                <div className="flex justify-center pt-4 pb-0">
                  <div className="w-20 h-5 bg-black rounded-full" />
                </div>
                <div className="px-5 pb-7 pt-4 space-y-3">
                  <div className="text-gray-400 text-xs font-medium">
                    Good morning, Arjun 👋
                  </div>
                  <div
                    className="text-white text-lg font-bold"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Today&apos;s Summary
                  </div>
                  <div className="bg-blue-600/20 border border-blue-500/30 rounded-2xl p-4">
                    <div className="text-blue-300 text-[11px] font-semibold mb-1 uppercase tracking-wide">
                      SMS Transactions
                    </div>
                    <div
                      className="text-white font-bold text-2xl"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      ₹12,450
                    </div>
                    <div className="text-emerald-400 text-xs mt-1">
                      ↓ 8% from last week
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-3.5">
                    <div className="text-gray-400 text-[11px] mb-1.5 font-medium">
                      📰 Market Alert
                    </div>
                    <div className="text-white text-xs leading-relaxed">
                      Onion prices rising 23% this week. Consider stocking up now.
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-3.5">
                    <div className="text-gray-400 text-[11px] mb-1.5 font-medium">
                      🏛️ Tax Update
                    </div>
                    <div className="text-white text-xs leading-relaxed">
                      New GST filing deadline announced for Q3.
                    </div>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-3.5">
                    <div className="text-emerald-300 text-[11px] font-medium mb-1">
                      💡 AI Advice
                    </div>
                    <div className="text-white text-xs leading-relaxed">
                      Revenue up 14% this month. Great time to reinvest in inventory.
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-52 h-16 bg-blue-600/25 blur-3xl rounded-full" />
            </div>
          </div>
        </div>

        <div className="relative flex justify-center pb-10">
          <button
            onClick={() => goto("products")}
            className="text-gray-500 hover:text-gray-300 transition-colors flex flex-col items-center gap-1.5"
          >
            <span className="text-xs font-medium tracking-wide uppercase">Explore</span>
            <ChevronDown size={18} className="animate-bounce" />
          </button>
        </div>
      </section>

      {/* ─── TAGLINE STRIP ───────────────────────────────────────────────── */}
      <div className="bg-blue-600 py-3.5 text-center">
        <p
          className="text-white font-bold text-lg tracking-tight"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Making the Future Affordable.
        </p>
      </div>

      {/* ─── FEATURES ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">
              What Grokkon Does
            </span>
            <h2
              className="text-4xl font-extrabold text-gray-900 mt-3 mb-4"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Financial intelligence for every business
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
              From tracking daily expenses to monitoring global markets, Grokkon
              gives every Indian entrepreneur access to enterprise-grade financial tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <MessageSquare size={22} />,
                color: "blue",
                title: "SMS Expense Tracking",
                desc: "Grokkon reads your bank SMS messages to automatically log every transaction — no manual entry, no app integrations, no privacy concerns.",
              },
              {
                icon: <TrendingUp size={22} />,
                color: "indigo",
                title: "AI Financial Advice",
                desc: "Reads hundreds of market reports and news articles to give you timely, data-backed guidance tailored to your business.",
              },
              {
                icon: <Bell size={22} />,
                color: "violet",
                title: "Real-Time News Alerts",
                desc: '"Onion prices rising — stock up fast!" Get actionable alerts before market shifts hit your margins.',
              },
              {
                icon: <FileText size={22} />,
                color: "blue",
                title: "Investor-Ready Reports",
                desc: "Auto-generate professional financial reports you can share with investors, banks, or government schemes — instantly.",
              },
              {
                icon: <Globe size={22} />,
                color: "indigo",
                title: "22+ Indian Languages",
                desc: "Hindi, Tamil, Telugu, Bengali, Marathi, Kannada and more — powerful finance accessible to every rural entrepreneur.",
              },
              {
                icon: <Star size={22} />,
                color: "violet",
                title: "Tax & Law Updates",
                desc: "Never miss a GST deadline or new tax bill. Grokkon monitors government updates and explains what they mean for you.",
              },
              {
                icon: <TrendingUp size={22} />,
                color: "blue",
                title: "Opportunity Radar",
                desc: "AI detects business growth opportunities like subsidies, price drops, seasonal demand, and market trends.",
              },
              {
                icon: <Check size={22} />,
                color: "indigo",
                title: "Business Health Score",
                desc: "A daily score (0–100) that measures your business's financial health and overall performance.",
              },
              {
                icon: <FileText size={22} />,
                color: "violet",
                title: "Automatic Business Diary",
                desc: "AI automatically records and summarizes your business's daily activities, income, expenses, and key events.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300 group"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${f.color === "blue"
                    ? "bg-blue-50 text-blue-600"
                    : f.color === "indigo"
                      ? "bg-indigo-50 text-indigo-600"
                      : "bg-violet-50 text-violet-600"}`}
                >
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRIVACY & SECURITY ──────────────────────────────────────────── */}
      <section id="security">
        <PrivacyAndSecurity />
      </section>

      {/* ─── PRODUCTS / PRICING ──────────────────────────────────────────── */}
      <section id="products" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">
              Plans & Pricing
            </span>
            <h2
              className="text-4xl font-extrabold text-gray-900 mt-3 mb-4"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Powerful AI. Honest Pricing.
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              We are launching soon — join the waitlist and be among the first to access Grokkon.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-200 transition-colors flex flex-col">
              <div className="mb-7">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Pro Plan
                </div>
                <div className="flex items-end gap-1">
                  <span
                    className="text-5xl font-extrabold text-gray-900"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    ₹49
                  </span>
                  <span className="text-gray-400 mb-1.5 text-base">/month</span>
                </div>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                  Perfect for shop owners and first-time entrepreneurs.
                </p>
              </div>
              <ul className="space-y-3.5 flex-1 mb-8">
                {[
                  "Speaks all 22+ Indian Languages",
                  "Voice chat with your AI",
                  "5-minute morning briefing daily",
                  "Tax law & GST update alerts",
                  "SMS-based expense tracking",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} className="text-blue-600" />
                    </div>
                    <span className="text-gray-700 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative border-2 border-blue-600 rounded-2xl p-8 bg-gradient-to-b from-blue-50/80 to-white flex flex-col">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-blue-600 text-white text-[11px] font-bold tracking-widest px-4 py-1.5 rounded-full uppercase">
                  Advanced
                </span>
              </div>
              <div className="mb-7">
                <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
                  Advanced Plan
                </div>
                <div className="flex items-end gap-1">
                  <span
                    className="text-5xl font-extrabold text-gray-900"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    ₹599
                  </span>
                  <span className="text-gray-400 mb-1.5 text-base">/month</span>
                </div>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                  For growing startups and businesses ready to scale.
                </p>
              </div>
              <ul className="space-y-3.5 flex-1 mb-8">
                {[
                  "Everything in Pro",
                  "AI-powered financial decision advice",
                  "Real-time market & news monitoring",
                  "Investor-ready financial reports",
                  "Deep analysis from reports & articles",
                  "Priority support",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} className="text-white" />
                    </div>
                    <span className="text-gray-700 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <section className="mt-20 bg-slate-950 rounded-[2rem] border border-slate-800 p-10 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-blue-400 text-xs font-semibold uppercase tracking-[0.3em]">
                Preview
              </span>
              <h3 className="text-3xl font-extrabold mt-4 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                See the Grokkon experience in action
              </h3>
              <p className="text-slate-300 mb-8 text-base leading-relaxed">
                Explore the prototype to get a first-hand feel for how Grokkon tracks expenses, alerts you to business events, and puts financial intelligence at your fingertips.
              </p>
              <button
                onClick={() => window.open("https://grokkon-prototype.vercel.app/", "_blank")}
                className="inline-flex items-center justify-center rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400 active:scale-95"
              >
                Preview
              </button>
            </div>
          </section>
        </div>
      </section>

      {/* ─── ABOUT US ────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=700&h=500&fit=crop&auto=format"
              alt="Small business owner at their shop reviewing finances on smartphone"
              className="rounded-2xl w-full h-[420px] object-cover shadow-xl bg-blue-100" />
            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl p-5 shadow-xl border border-gray-100 hidden lg:block">
              <div
                className="text-blue-600 font-extrabold text-2xl"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                ₹49/mo
              </div>
              <div className="text-gray-500 text-xs mt-0.5">Accessible to everyone</div>
            </div>
          </div>

          <div>
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">
              About Grokkon
            </span>
            <h2
              className="text-4xl font-extrabold text-gray-900 mt-3 mb-6 leading-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Every business deserves powerful financial tools
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              Grokkon was born from a simple idea: empower every entrepreneur with
              intelligent financial tools that are easy to use, affordable, and
              built for the Indian market.
            </p>
            <div className="grid gap-4">
              {[
                "SMS-based transaction tracking across banks",
                "AI-powered market and tax alerts",
                "Built for vernacular users and voice-driven assistants",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 bg-blue-600 rounded-full mt-2" />
                  <p className="text-gray-600 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOUNDER ─────────────────────────────────────────────────────── */}
      <section id="founder" className="py-24 bg-[#07101f] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">
              Our Team
            </span>
            <h2
              className="text-4xl font-extrabold text-white mt-3"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              A 13-year-old with a billion-dollar vision.
            </h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2 flex flex-col items-center lg:items-start gap-5">
              <div
                className="w-44 h-44 rounded-full flex items-center justify-center text-white text-5xl font-extrabold shadow-2xl border-4 border-blue-500/20"
                style={{
                  background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                PM
              </div>
              <div>
                <div
                  className="text-white font-bold text-xl"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Prithu Mishra
                </div>
                <div className="text-blue-400 text-sm mt-1">Founder, Grokkon</div>
                <div className="text-gray-600 text-sm mt-1">Delhi, India · Age 13</div>
              </div>
            </div>
            <div className="lg:col-span-3 space-y-5">
              <p className="text-gray-300 text-lg leading-relaxed">
                While most kids his age were worrying about exams, Prithu was watching his
                neighbourhood shopkeepers struggle — overcharged by suppliers, blindsided by GST
                changes, with no one to guide them.
              </p>
              <p className="text-gray-400 leading-relaxed">
                At 13, he decided to do something about it. Growing up in Delhi surrounded by small
                traders, street vendors, and first-generation entrepreneurs, Prithu saw a clear gap:
                powerful financial tools existed, but only for large companies that could afford them.
              </p>
              <p className="text-gray-400 leading-relaxed">
                So he built Grokkon — an AI that reads your SMS transactions, tracks your money, and
                speaks to you in your own language. No accountant needed. No expensive software. Just
                intelligence, affordable for everyone.
              </p>
            </div>
          </div>
          <div className="mt-16 border-t border-white/10 pt-12">
            <div className="grid lg:grid-cols-5 gap-12 items-start">
              <div className="lg:col-span-2 flex flex-col items-center lg:items-start gap-5">
                <div
                  className="w-44 h-44 rounded-full flex items-center justify-center text-white text-5xl font-extrabold shadow-2xl border-4 border-blue-500/20"
                  style={{
                    background: "linear-gradient(135deg, #0f766e 0%, #38bdf8 100%)",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  RT
                </div>
                <div>
                  <div
                    className="text-white font-bold text-xl"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Raghav Tyagi
                  </div>
                  <div className="text-blue-400 text-sm mt-1">Co-Founder, Grokkon</div>
                  <div className="text-gray-600 text-sm mt-1">Delhi, India · Age 13</div>
                </div>
              </div>
              <div className="lg:col-span-3 space-y-5">
                <p className="text-gray-300 text-lg leading-relaxed">
                  <strong>Raghav Tyagi</strong> is a 13-year-old co-founder of Grokkon with an exceptional passion for science and innovation. His curiosity and analytical mindset help him approach challenges with logic and creativity. He is always eager to learn and contribute new ideas that strengthen the team&apos;s vision.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Raghav has a strong interest in Physics, Biology, and Chemistry, and has already completed studying these subjects up to the 10th-grade level.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  His scientific knowledge, dedication, and problem-solving abilities make him a valuable member of Grokkon as we continue building solutions for the future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WAITLIST CTA ────────────────────────────────────────────────── */}
      <section className="py-24 bg-blue-600 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&h=600&fit=crop&auto=format')",
          }} />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2
            className="text-4xl lg:text-5xl font-extrabold text-white mb-5"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Be the first to access Grokkon
          </h2>
          <p className="text-blue-100 text-lg mb-10 leading-relaxed">
            We are launching soon. Join our waitlist to get early access and help shape the product
            that will change how India does business.
          </p>
        </div>
      </section>

      {/* ─── CONTACT ─────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 bg-gray-50">
  <div className="max-w-5xl mx-auto px-6">
    <div className="text-center mb-14">
      <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">
        Contact Us
      </span>

      <h2
        className="text-4xl font-extrabold text-gray-900 mt-3 mb-4"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        Get in touch
      </h2>

      <p className="text-gray-500">
        Questions, partnerships, or just want to say hello — we'd love to hear from you.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">

      <a
        href="tel:8796152267"
        className="flex items-center gap-4 bg-white rounded-2xl p-7 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
      >
        <div>
          <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide">
            Phone
          </div>
          <div className="text-gray-900 font-semibold">
            +91 87961 52267
          </div>
        </div>
      </a>

      <a
        href="mailto:mishra.prithu07@gmail.com"
        className="flex items-center gap-4 bg-white rounded-2xl p-7 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
      >
        <div>
          <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide">
            Email
          </div>
          <div className="text-gray-900 font-semibold break-all">
            mishra.prithu07@gmail.com
          </div>
        </div>
      </a>

    </div>
  </div>
</section>
      {/* ─── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="bg-[#07101f] py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <button onClick={() => goto("home")} className="flex items-center gap-3">
            <img src={logo} alt="Grokkon" className="w-8 h-8 object-contain" />
            <div className="text-left">
              <div className="text-white font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Grokkon
              </div>
              <div className="text-gray-600 text-xs">Making the Future Affordable.</div>
            </div>
          </button>

          <div className="flex flex-wrap justify-center gap-6">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => goto(n.id)}
                className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                {n.label}
              </button>
            ))}
          </div>

          <div className="text-gray-600 text-xs text-center">
            © 2026 Grokkon. All rights reserved.
          </div>
        </div>
      </footer>
        </div>
  ) 
}