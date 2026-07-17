import { Shield, Lock, Database, FileText, Smartphone, CheckCircle, Server, KeyRound, Bot, Filter, Cloud, Activity } from "lucide-react";

const layers = [
  { icon: Lock, title: "HTTPS (TLS Encryption)", desc: "All communication between your device and Grokkon is encrypted using HTTPS." },
  { icon: Shield, title: "Web Application Firewall (WAF)", desc: "Malicious requests are blocked before they reach our servers." },
  { icon: Activity, title: "Rate Limiting & DDoS Protection", desc: "Protects the platform from abuse, bots and denial-of-service attacks." },
  { icon: Server, title: "FastAPI Backend", desc: "Requests are securely processed using modern backend security practices." },
  { icon: KeyRound, title: "JWT Authentication", desc: "Protected resources are accessible only after authentication." },
  { icon: CheckCircle, title: "Input Validation", desc: "Every request is validated and sanitized before processing." },
  { icon: Bot, title: "AI Prompt Protection", desc: "Built-in safeguards reduce prompt injection and AI misuse." },
  { icon: Smartphone, title: "SMS Transaction Filtering", desc: "Only bank and UPI transaction SMS are processed. Personal conversations are ignored." },
  { icon: Lock, title: "Sensitive Data Encryption", desc: "Sensitive financial information is encrypted before storage." },
  { icon: Database, title: "Encrypted Database", desc: "Customer data is stored securely using encryption." },
  { icon: FileText, title: "Audit Logs", desc: "Important security events are recorded for accountability." },
  { icon: Cloud, title: "Encrypted Backups", desc: "Encrypted backups protect against accidental data loss." },
];

const promises = [
"We only process bank and UPI transaction SMS required for our services.",
"We never read personal conversations.",
"We never sell customer data.",
"Your data is encrypted during transmission and storage.",
"We collect only the information necessary to provide our services.",
"Your trust is our highest priority."
];

export default function PrivacyAndSecurity() {
  return (
    <section className="py-24 bg-[#07101f] text-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.3em]">Privacy & Security</span>
          <h2 className="mt-4 text-4xl font-extrabold">Privacy and Security</h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Your financial data deserves the highest level of protection. Every transaction processed by Grokkon is protected through multiple layers of security.
          </p>
        </div>

        <div className="relative ml-4 border-l border-blue-500/30">
          {layers.map((l, i) => {
            const Icon = l.icon;
            return (
              <div key={i} className="relative pl-12 pb-8">
                <div className="absolute -left-5 top-1 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
                  <Icon size={20}/>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 hover:border-blue-500 transition">
                  <h3 className="font-semibold text-xl">{l.title}</h3>
                  <p className="mt-2 text-gray-400">{l.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-slate-900/50 p-8">
          <h3 className="text-3xl font-bold mb-6">Your Privacy Comes First</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {promises.map((p, i)=>(
              <div key={i} className="flex gap-3 rounded-xl bg-white/5 p-4 border border-white/10">
                <CheckCircle className="text-green-400 shrink-0"/>
                <span className="text-gray-300">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
