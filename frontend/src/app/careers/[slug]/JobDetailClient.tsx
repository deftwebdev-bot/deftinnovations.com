"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FadeIn, LineReveal } from "@/components/ui/Motion";
import { JobPosition, submitJobApplication } from "@/lib/api";
import {
  ArrowRight, Briefcase, MapPin, DollarSign, CheckCircle2, Send,
  Sparkles, Share2, Clock,
} from "lucide-react";
import { motion } from "framer-motion";

interface JobDetailClientProps {
  job: JobPosition;
}

export function JobDetailClient({ job }: JobDetailClientProps) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    portfolioUrl: "",
    linkedinUrl: "",
    githubUrl: "",
    resumeLink: "",
    coverLetter: "",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const update = (key: string, val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.fullName.trim() || !form.email.trim() || !form.resumeLink.trim()) {
      setError("Please fill in your Full Name, Email, and Resume Link.");
      return;
    }

    try {
      setLoading(true);
      await submitJobApplication({
        jobSlug: job.slug,
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        portfolioUrl: form.portfolioUrl,
        linkedinUrl: form.linkedinUrl,
        githubUrl: form.githubUrl,
        resumeLink: form.resumeLink,
        coverLetter: form.coverLetter,
      });
      setSent(true);
    } catch (err) {
      setError((err as Error).message || "Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="container-xl space-y-16 pt-32 pb-20">
      {/* ── Header ────────────────────────────────────── */}
      <div className="space-y-6">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-sm text-black/40 hover:text-[#0a0a0a] transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to All Positions
        </Link>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-black/5 border border-black/10 text-[10px] font-mono font-semibold text-black/50 uppercase tracking-wider">
              {job.department}
            </span>
            <span className="px-3 py-1 rounded-full bg-black/5 border border-black/10 text-[10px] font-mono font-semibold text-black/40 uppercase tracking-wider">
              {job.jobType}
            </span>
            {job.featured && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-mono font-semibold">
                Priority Role
              </span>
            )}
          </div>

          <h1 className="ttl-80 font-light text-[#0a0a0a] tracking-tight leading-[1.08]">
            <LineReveal delay={0.1}>{job.title}</LineReveal>
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-black/50 font-light">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-black/30" /> {job.location}
            </span>
            <span className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-black/30" /> {job.experienceLevel}
            </span>
            <span className="flex items-center gap-2 text-[#0a0a0a] font-mono font-medium">
              <DollarSign className="w-4 h-4 text-black/30" /> {job.salaryRange}
            </span>
          </div>
        </div>

        {/* Apply & Share bar */}
        <div className="flex items-center justify-between pt-6 border-t border-black/[0.08]">
          <a
            href="#apply-section"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0a0a0a] text-white font-semibold text-sm hover:bg-[#222] transition-all"
          >
            <span>Apply for this Role</span>
            <ArrowRight className="w-4 h-4 rotate-[-90deg]" />
          </a>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-xs font-mono text-black/40 hover:text-[#0a0a0a] transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copied ? "Link Copied!" : "Share Role"}
          </button>
        </div>
      </div>

      {/* ── Main Content Grid ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left 7 cols: Job Specs */}
        <div className="lg:col-span-7 space-y-16">
          {/* Overview */}
          <FadeIn direction="up">
            <div className="space-y-4">
              <span className="text-xs font-mono font-semibold tracking-widest text-black/30 uppercase">
                01 — Role Overview
              </span>
              <p className="text-base text-black/60 leading-relaxed font-light">
                {job.overview}
              </p>
            </div>
          </FadeIn>

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <FadeIn direction="up" delay={0.08}>
              <div className="space-y-5">
                <span className="text-xs font-mono font-semibold tracking-widest text-black/30 uppercase">
                  02 — Key Responsibilities
                </span>
                <ul className="space-y-3">
                  {job.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-black/65 leading-relaxed font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-black/20 mt-2 shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          )}

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <FadeIn direction="up" delay={0.12}>
              <div className="space-y-5">
                <span className="text-xs font-mono font-semibold tracking-widest text-black/30 uppercase">
                  03 — What We&apos;re Looking For
                </span>
                <ul className="space-y-3">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-black/65 leading-relaxed font-light">
                      <CheckCircle2 className="w-4 h-4 text-black/25 mt-0.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          )}

          {/* Perks */}
          {job.perks && job.perks.length > 0 && (
            <FadeIn direction="up" delay={0.16}>
              <div className="space-y-5">
                <span className="text-xs font-mono font-semibold tracking-widest text-black/30 uppercase">
                  04 — Role Benefits &amp; Perks
                </span>
                <ul className="space-y-3">
                  {job.perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-black/65 leading-relaxed font-light">
                      <Sparkles className="w-4 h-4 text-black/25 mt-0.5 shrink-0" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          )}
        </div>

        {/* Right 5 cols: Application Form */}
        <div id="apply-section" className="lg:col-span-5">
          <div className="sticky top-28 p-8 border border-black/10 space-y-6">
            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full bg-black/5 border border-black/10 text-[10px] font-mono font-semibold text-black/50 uppercase tracking-wider inline-block">
                Direct Application
              </span>
              <h3 className="text-xl font-semibold text-[#0a0a0a]">Apply for {job.title}</h3>
              <p className="text-xs text-black/40 font-light">
                No formal resume PDFs needed. Share your portfolio or LinkedIn link.
              </p>
            </div>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                </div>
                <h4 className="text-lg font-semibold text-[#0a0a0a]">Application Submitted!</h4>
                <p className="text-sm text-black/50 leading-relaxed font-light">
                  Thank you for applying. Our talent team reviews all candidates and reaches out within 3 business days.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-4"
                >
                  Submit Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3.5 bg-red-50 border border-red-200 text-xs text-red-600">
                    {error}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-semibold tracking-widest text-black/30 uppercase">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full bg-black/[0.02] border border-black/10 py-2.5 px-4 text-sm text-[#0a0a0a] placeholder:text-black/25 focus:outline-none focus:border-black/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-semibold tracking-widest text-black/30 uppercase">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="alex@domain.com"
                    className="w-full bg-black/[0.02] border border-black/10 py-2.5 px-4 text-sm text-[#0a0a0a] placeholder:text-black/25 focus:outline-none focus:border-black/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-semibold tracking-widest text-black/30 uppercase">Phone (Optional)</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-black/[0.02] border border-black/10 py-2.5 px-4 text-sm text-[#0a0a0a] placeholder:text-black/25 focus:outline-none focus:border-black/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-semibold tracking-widest text-black/30 uppercase">Resume / CV Link *</label>
                  <input
                    type="url"
                    required
                    value={form.resumeLink}
                    onChange={(e) => update("resumeLink", e.target.value)}
                    placeholder="https://drive.google.com/... or Notion link"
                    className="w-full bg-black/[0.02] border border-black/10 py-2.5 px-4 text-sm text-[#0a0a0a] placeholder:text-black/25 focus:outline-none focus:border-black/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-semibold tracking-widest text-black/30 uppercase">Portfolio / Web</label>
                    <input
                      type="url"
                      value={form.portfolioUrl}
                      onChange={(e) => update("portfolioUrl", e.target.value)}
                      placeholder="https://alex.design"
                      className="w-full bg-black/[0.02] border border-black/10 py-2.5 px-3 text-xs text-[#0a0a0a] placeholder:text-black/25 focus:outline-none focus:border-black/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-semibold tracking-widest text-black/30 uppercase">LinkedIn / GitHub</label>
                    <input
                      type="url"
                      value={form.linkedinUrl}
                      onChange={(e) => update("linkedinUrl", e.target.value)}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full bg-black/[0.02] border border-black/10 py-2.5 px-3 text-xs text-[#0a0a0a] placeholder:text-black/25 focus:outline-none focus:border-black/30"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-semibold tracking-widest text-black/30 uppercase">Note or Pitch (Optional)</label>
                  <textarea
                    rows={3}
                    value={form.coverLetter}
                    onChange={(e) => update("coverLetter", e.target.value)}
                    placeholder="What makes you a great fit for this role?"
                    className="w-full bg-black/[0.02] border border-black/10 py-2.5 px-4 text-sm text-[#0a0a0a] placeholder:text-black/25 focus:outline-none focus:border-black/30 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#0a0a0a] text-white font-semibold text-sm hover:bg-[#222] transition-all disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Application"} <Send className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-black/25 text-center font-mono">
                  Your information is kept 100% confidential.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
