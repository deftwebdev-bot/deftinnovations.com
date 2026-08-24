"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { FadeIn } from "@/components/ui/Motion";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone, Send, CheckCircle2, User, ChevronDown } from "lucide-react";
import { submitContactLead } from "@/lib/api";

const LOCATIONS = [
  {
    country: "Kozhikode",
    flag: "🇮🇳",
    address: "HiLITE Business Park, NH 66, Thondayad, Kozhikode, Pantheeramkavu, Kerala 673014",
    mapUrl: "https://maps.app.goo.gl/2MYs3mEwhr58vYG3A",
    phones: ["+91 860 603 5050", "+91 8078 255 277"],
    emails: ["Info@deftinnovations.in", "hr@deftinnovations.in"],
  },
  {
    country: "Nilambur",
    flag: "🇮🇳",
    address: "Chandakunnu, Nilambur, Kerala 679329",
    mapUrl: "https://maps.app.goo.gl/PPqUQP1f9cKZNbUdA",
    phones: ["+91 860 603 5050", "+91 8078 255 277"],
    emails: ["Info@deftinnovations.in", "hr@deftinnovations.in"],
  },
];

const ContactFormInner = () => {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("service") || "";

  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", service: preselected, message: "",
  });
  const [serviceOpen, setServiceOpen] = useState(false);

  const SERVICE_OPTIONS = [
    "Performance Marketing",
    "Brand & Creative",
    "SEO & Organic Growth",
    "Web & Technology",
    "Advertising & PR",
    "Social Media Marketing",
    "Other",
  ];
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
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h3 className="ttl-h3 font-normal text-[#0a0a0a]">We&apos;ll be in touch.</h3>
        <p className="text-black/50 text-base max-w-md mx-auto font-light leading-relaxed">
          Your inquiry has been received. Our senior team reviews every submission and responds within 2 business hours.
        </p>
        <button onClick={() => setSent(false)} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Send Another Inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Full Name *" value={form.name} onChange={(v) => update("name", v)} placeholder="Enter first name" />
        <Input label="Company" value={form.company} onChange={(v) => update("company", v)} placeholder="Enter company name" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Email *" value={form.email} onChange={(v) => update("email", v)} placeholder="Enter email" type="email" />
        <Input label="Phone" value={form.phone} onChange={(v) => update("phone", v)} placeholder="+91" />
      </div>

      {/* Service dropdown */}
      <div className="space-y-2">
        <label className="text-[11px] font-mono font-semibold tracking-widest text-black/30 uppercase">Service Interested In</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setServiceOpen(!serviceOpen)}
            className="w-full flex items-center justify-between bg-black/[0.02] border border-black/10 py-3 px-4 text-sm text-left transition-colors hover:border-black/20 focus:outline-none focus:border-black/30"
          >
            <span className={form.service ? "text-[#0a0a0a]" : "text-black/25"}>
              {form.service || "Select a service"}
            </span>
            <ChevronDown className={`w-4 h-4 text-black/30 transition-transform ${serviceOpen ? "rotate-180" : ""}`} />
          </button>
          {serviceOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-black/10 shadow-lg z-50 max-h-60 overflow-y-auto">
              {SERVICE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => { update("service", opt); setServiceOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-black/[0.03] transition-colors ${
                    form.service === opt ? "text-[#0a0a0a] font-medium bg-black/[0.03]" : "text-black/50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[11px] font-mono font-semibold tracking-widest text-black/30 uppercase">Message *</label>
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={5}
          placeholder="Brief about your project"
          className="w-full bg-black/[0.02] border border-black/10 py-3 px-4 text-sm text-[#0a0a0a] placeholder:text-black/25 focus:outline-none focus:border-black/30 transition-colors resize-none"
        />
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={loading} className="inline-flex items-center gap-2 px-10 py-4 bg-[#0a0a0a] text-white font-semibold text-sm hover:bg-[#222] transition-all disabled:opacity-50">
          {loading ? "Submitting..." : "Send Enquiry"} <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

const Input: React.FC<{
  label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string;
}> = ({ label, value, onChange, placeholder, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-[11px] font-mono font-semibold tracking-widest text-black/30 uppercase">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-black/[0.02] border border-black/10 py-3 px-4 text-sm text-[#0a0a0a] placeholder:text-black/25 focus:outline-none focus:border-black/30 transition-colors"
    />
  </div>
);

export function ContactClient() {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <Navbar />

      <main>
        {/* Form Section — white, no hero */}
        <section className="section bg-white pt-40 sm:pt-48">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

              {/* Left — Title */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
                <FadeIn direction="up">
                  <h1 className="ttl-80 font-light text-[#0a0a0a] tracking-tight leading-[1.05]">
                    Discover
                    <br />
                    Digital
                    <br />
                    Transformation
                  </h1>
                </FadeIn>
                <FadeIn direction="up" delay={0.1}>
                  <p className="text-base text-black/50 font-light leading-relaxed max-w-sm">
                    Please feel free to share your thoughts and we can discuss it over a cup of tea.
                  </p>
                </FadeIn>
              </div>

              {/* Right — Form */}
              <div className="lg:col-span-7">
                <FadeIn direction="up" delay={0.1}>
                  <div className="p-8 sm:p-10 border border-black/10">
                    <Suspense fallback={<div className="py-20 text-center text-black/30">Loading...</div>}>
                      <ContactFormInner />
                    </Suspense>
                  </div>
                </FadeIn>
              </div>

            </div>
          </div>
        </section>

        {/* Our Locations */}
        <section className="section bg-white border-t border-black/10">
          <div className="container-xl space-y-16">
            <div className="text-center space-y-3">
              <FadeIn direction="up">
                <h2 className="ttl-80 font-light text-[#0a0a0a] tracking-tight">
                  Our Locations
                </h2>
              </FadeIn>
              <FadeIn direction="up" delay={0.05}>
                <p className="text-base text-black/50 font-light max-w-lg mx-auto">
                  We work in all corners of the world. Find a Deft Innovations location near you.
                </p>
              </FadeIn>
            </div>

            <div className="space-y-0">
              {LOCATIONS.map((loc, i) => (
                <FadeIn key={i} direction="up" delay={i * 0.1}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-12 border-b border-black/[0.06] last:border-b-0">
                    {/* Location info */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{loc.flag}</span>
                        <h3 className="text-xl font-semibold text-[#0a0a0a] uppercase tracking-wider">{loc.country}</h3>
                      </div>
                      <p className="text-sm text-black/50 font-light leading-relaxed">
                        {loc.address}
                      </p>
                      <Link
                        href={loc.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0a0a0a] hover:text-black/60 transition-colors border-b border-[#0a0a0a] pb-0.5"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        Google Map
                      </Link>
                    </div>

                    {/* Contact details */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {loc.phones.map((phone, pi) => (
                        <div key={`p${pi}`} className="flex items-center gap-3 p-4 border border-black/[0.06]">
                          <div className="w-10 h-10 bg-black/[0.03] border border-black/10 flex items-center justify-center shrink-0">
                            {pi === 0 ? (
                              <Phone className="w-4 h-4 text-black/40" />
                            ) : (
                              <User className="w-4 h-4 text-black/40" />
                            )}
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-black/30 uppercase tracking-wider">
                              {pi === 0 ? "General Enquiry" : "HR Enquiry"}
                            </span>
                            <a href={`tel:${phone.replace(/\s/g, "")}`} className="block text-sm font-semibold text-[#0a0a0a] hover:text-black/60 transition-colors">
                              {phone}
                            </a>
                          </div>
                        </div>
                      ))}
                      {loc.emails.map((email, ei) => (
                        <div key={`e${ei}`} className="flex items-center gap-3 p-4 border border-black/[0.06]">
                          <div className="w-10 h-10 bg-black/[0.03] border border-black/10 flex items-center justify-center shrink-0">
                            <Mail className="w-4 h-4 text-black/40" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-black/30 uppercase tracking-wider">
                              {ei === 0 ? "Email" : "HR Email"}
                            </span>
                            <a href={`mailto:${email}`} className="block text-sm font-semibold text-[#0a0a0a] hover:text-black/60 transition-colors">
                              {email}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
