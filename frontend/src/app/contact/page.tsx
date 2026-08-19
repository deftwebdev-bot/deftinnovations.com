"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { FadeIn, LineReveal, WordReveal } from "@/components/ui/Motion";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";

const CONTACT_IMAGE = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85";

import { submitContactLead } from "@/lib/api";

const BUDGETS = ["Under $5K", "$5K — $10K", "$10K — $25K", "$25K — $50K", "$50K+"];

const ContactFormInner = () => {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("service") || "";

  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", budget: "", service: preselected, message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      await submitContactLead(form);
      setSent(true);
    } catch (err) {
      setError((err as Error).message || "Failed to submit inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-16 space-y-6"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-white/10 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-h2 text-white">We'll be in touch.</h3>
        <p className="text-white/55 text-lg max-w-md mx-auto font-light leading-relaxed">
          Your inquiry has been received. Our senior team reviews every submission and responds within 2 business hours.
        </p>
        <button onClick={() => setSent(false)} className="btn-ghost text-sm">
          Send Another Inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Full Name *" value={form.name} onChange={(v) => update("name", v)} placeholder="Jane Smith" />
        <Input label="Company" value={form.company} onChange={(v) => update("company", v)} placeholder="Acme Inc." />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Email *" value={form.email} onChange={(v) => update("email", v)} placeholder="jane@acme.com" type="email" />
        <Input label="Phone" value={form.phone} onChange={(v) => update("phone", v)} placeholder="+1 (555) 000-0000" />
      </div>

      <div className="space-y-2">
        <label className="text-label text-white/40">Estimated Budget</label>
        <div className="flex flex-wrap gap-2">
          {BUDGETS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => update("budget", b)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                form.budget === b
                  ? "bg-white text-black font-bold"
                  : "border border-white/10 text-white/50 hover:text-white hover:border-white/30"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-label text-white/40">Message *</label>
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={5}
          placeholder="Describe your project, challenges, and goals..."
          className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 transition-colors resize-none"
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-base py-4 disabled:opacity-50">
        {loading ? "Submitting Inquiry..." : "Submit Inquiry"} <Send className="w-4 h-4" />
      </button>

      <p className="text-xs text-white/25 text-center font-mono">
        No obligations. No spam. Response time &lt; 2 hours.
      </p>
    </form>
  );
};

const Input: React.FC<{
  label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string;
}> = ({ label, value, onChange, placeholder, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-label text-white/40">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white/[0.04] border border-white/10 rounded-full py-3 px-5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 transition-colors"
    />
  </div>
);

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="pt-32">

        {/* Hero */}
        <section className="section bg-[#0a0a0a]">
          <div className="container-xl space-y-8">
            <FadeIn direction="up"><span className="pill text-white/60">Let&apos;s Connect</span></FadeIn>
            <h1 className="text-display max-w-4xl">
              <WordReveal text="Have a project in mind?" stagger={0.05} />
            </h1>
            <FadeIn direction="up" delay={0.3}>
              <p className="text-xl text-white/50 max-w-lg leading-relaxed font-light">
                Whether you're scaling a startup or re-positioning an enterprise brand — we'd love to hear from you.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Form + Sidebar */}
        <section className="section-sm bg-[#0a0a0a]">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

              {/* Form */}
              <div className="lg:col-span-7">
                <FadeIn direction="up" delay={0.1}>
                  <div className="p-8 sm:p-10 rounded-2xl bg-[#111] border border-white/[0.07]">
                    <Suspense fallback={<div className="py-20 text-center text-white/30">Loading...</div>}>
                      <ContactFormInner />
                    </Suspense>
                  </div>
                </FadeIn>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-5 space-y-6">
                {/* Image */}
                <FadeIn direction="up" delay={0.15}>
                  <div className="relative h-64 rounded-2xl overflow-hidden">
                    <Image src={CONTACT_IMAGE} alt="Deft Innovations office" fill className="object-cover" sizes="40vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                  </div>
                </FadeIn>

                {/* Contact cards */}
                {[
                  { icon: Mail, label: "Email Us", value: "hello@deftinnovations.com", href: "mailto:hello@deftinnovations.com" },
                  { icon: Phone, label: "Call Us", value: "+1 (800) 450-DEFT", href: "tel:+18004503338" },
                  { icon: MapPin, label: "Address", value: "Dubai, UAE / London, UK / Austin, TX", href: null },
                ].map(({ icon: Icon, label, value, href }, i) => (
                  <FadeIn key={i} direction="up" delay={0.2 + i * 0.08}>
                    <div className="card-hover p-5 flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-white/60" />
                      </div>
                      <div>
                        <span className="text-label text-white/30">{label}</span>
                        {href ? (
                          <a href={href} className="block text-sm font-semibold text-white hover:text-white/80 transition-colors">{value}</a>
                        ) : (
                          <p className="text-sm font-semibold text-white">{value}</p>
                        )}
                      </div>
                    </div>
                  </FadeIn>
                ))}

                {/* Quick links */}
                <FadeIn direction="up" delay={0.5}>
                  <div className="card-hover p-5 space-y-3">
                    <span className="text-label text-white/30">Quick Links</span>
                    <div className="space-y-2">
                      {[
                        { label: "View our work", href: "/portfolio" },
                        { label: "Explore capabilities", href: "/services" },
                        { label: "Read insights", href: "/blog" },
                      ].map(({ label, href }) => (
                        <Link key={href} href={href} className="flex items-center justify-between py-2 text-sm text-white/60 hover:text-white transition-colors group">
                          {label} <ArrowUpRight className="w-3.5 h-3.5 text-white/25 group-hover:text-white" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
