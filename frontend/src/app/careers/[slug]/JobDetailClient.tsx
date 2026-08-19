"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FadeIn, LineReveal } from "@/components/ui/Motion";
import { JobPosition, submitJobApplication } from "@/lib/api";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  DollarSign,
  CheckCircle2,
  Send,
  Sparkles,
  Share2,
  Clock,
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
    <div className="container-xl space-y-16">
      {/* ── Top Header ────────────────────────────────────── */}
      <div className="space-y-8">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Positions
        </Link>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="pill text-white/70 text-[10px]">{job.department}</span>
            <span className="pill text-white/40 text-[10px]">{job.jobType}</span>
            {job.featured && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                Priority Role
              </span>
            )}
          </div>

          <h1 className="text-display max-w-4xl">{job.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-white/50 pt-2 font-light">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-white/40" /> {job.location}
            </span>
            <span className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-white/40" /> {job.experienceLevel}
            </span>
            <span className="flex items-center gap-2 text-white font-mono">
              <DollarSign className="w-4 h-4 text-white/40" /> {job.salaryRange}
            </span>
            <span className="flex items-center gap-2 text-white/30 text-xs">
              <Clock className="w-3.5 h-3.5" /> Posted {job.createdAt}
            </span>
          </div>
        </div>

        {/* Share & Quick Apply bar */}
        <div className="flex items-center justify-between pt-6 border-t border-white/[0.06]">
          <a
            href="#apply-section"
            className="btn-primary py-3 px-6 text-sm"
          >
            Apply for this Role <ArrowLeft className="w-4 h-4 rotate-[-90deg]" />
          </a>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copied ? "Link Copied!" : "Share Role"}
          </button>
        </div>
      </div>

      {/* ── Main Content Grid ─────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left 7 cols: Job Specs */}
        <div className="lg:col-span-7 space-y-16">
          {/* Overview */}
          <div className="space-y-4">
            <h2 className="text-label text-white/30">01 — Role Overview</h2>
            <p className="text-white/70 text-lg leading-relaxed font-light">
              {job.overview}
            </p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-label text-white/30">02 — Key Responsibilities</h2>
              <ul className="space-y-3.5">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/75 text-sm sm:text-base leading-relaxed font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-label text-white/30">03 — What We&apos;re Looking For</h2>
              <ul className="space-y-3.5">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/75 text-sm sm:text-base leading-relaxed font-light">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400/80 mt-1 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Perks */}
          {job.perks && job.perks.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-label text-white/30">04 — Role Benefits &amp; Perks</h2>
              <ul className="space-y-3.5">
                {job.perks.map((perk, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/75 text-sm sm:text-base leading-relaxed font-light">
                    <Sparkles className="w-4 h-4 text-white/50 mt-1 shrink-0" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right 5 cols: Application Form */}
        <div id="apply-section" className="lg:col-span-5">
          <div className="sticky top-28 p-8 rounded-3xl bg-[#111] border border-white/[0.08] space-y-6">
            <div className="space-y-1">
              <span className="pill text-white/60 text-[10px]">Direct Application</span>
              <h3 className="text-2xl font-bold text-white">Apply for {job.title}</h3>
              <p className="text-xs text-white/40 font-light">
                No formal resume PDFs needed. Share your portfolio or LinkedIn link.
              </p>
            </div>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white">Application Submitted!</h4>
                <p className="text-sm text-white/50 leading-relaxed font-light">
                  Thank you for applying. Our talent team reviews all candidates and reaches out within 3 business days.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="btn-ghost text-xs mt-4"
                >
                  Submit Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
                    {error}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-label text-white/40">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-label text-white/40">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="alex@domain.com"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-label text-white/40">Phone (Optional)</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-label text-white/40">Resume / CV Link *</label>
                  <input
                    type="url"
                    required
                    value={form.resumeLink}
                    onChange={(e) => update("resumeLink", e.target.value)}
                    placeholder="https://drive.google.com/... or Notion link"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-label text-white/40">Portfolio / Web</label>
                    <input
                      type="url"
                      value={form.portfolioUrl}
                      onChange={(e) => update("portfolioUrl", e.target.value)}
                      placeholder="https://alex.design"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-label text-white/40">LinkedIn / GitHub</label>
                    <input
                      type="url"
                      value={form.linkedinUrl}
                      onChange={(e) => update("linkedinUrl", e.target.value)}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-label text-white/40">Note or Pitch (Optional)</label>
                  <textarea
                    rows={3}
                    value={form.coverLetter}
                    onChange={(e) => update("coverLetter", e.target.value)}
                    placeholder="What makes you a great fit for this role?"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center py-3.5 text-sm disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Application"} <Send className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-white/25 text-center font-mono">
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
