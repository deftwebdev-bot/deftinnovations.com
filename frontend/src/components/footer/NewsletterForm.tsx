"use client";

import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <>
      <form onSubmit={handleSub} className="relative pt-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Subscribe to newsletter"
          required
          className="w-full bg-white/[0.04] border border-white/10 rounded-full py-3 pl-5 pr-14 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 transition-colors"
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-white/90 transition-colors"
          aria-label="Subscribe"
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </form>
      {sent && (
        <p className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
          <CheckCircle2 className="w-3.5 h-3.5" /> Subscribed!
        </p>
      )}
    </>
  );
};
