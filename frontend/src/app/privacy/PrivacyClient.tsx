"use client";

import React from "react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/Motion";

const SECTIONS = [
  {
    title: "1. Information We Collect",
    content: `We may collect personal information you voluntarily provide when interacting with our website, including:

• Name, email address, phone number, and company details when you fill out contact forms or subscribe to our newsletter.
• Resume and professional information when you apply for a career position.
• Payment and billing information when you engage our services.
• Communication records when you reach out to us via email or other channels.

We also automatically collect certain information when you visit our website, such as IP address, browser type, operating system, referring URLs, pages visited, and time spent on our site. This data is collected through cookies and similar tracking technologies.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect for the following purposes:

• To respond to your inquiries and provide requested services.
• To process job applications and manage recruitment.
• To send marketing communications and newsletters (with your consent).
• To improve our website, services, and user experience.
• To analyze website traffic and usage patterns.
• To comply with legal obligations and protect our rights.
• To personalize content and advertisements relevant to your interests.`,
  },
  {
    title: "3. Cookies and Tracking Technologies",
    content: `Our website uses cookies and similar tracking technologies to enhance your browsing experience. Cookies are small text files stored on your device that help us:

• Remember your preferences and settings.
• Analyze website traffic and performance.
• Provide personalized content and recommendations.
• Enable social media features and functionality.

You can control cookies through your browser settings. Disabling cookies may affect certain features and functionality of our website.`,
  },
  {
    title: "4. Data Sharing and Disclosure",
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with:

• Service providers and partners who assist in operating our website and providing services.
• Analytics providers to help us understand website usage.
• Legal authorities when required by law or to protect our rights.
• Business transfers in the event of a merger, acquisition, or sale of assets.

All third-party service providers are contractually obligated to protect your information and use it only for the purposes we specify.`,
  },
  {
    title: "5. Data Security",
    content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:

• Encryption of data in transit and at rest.
• Regular security assessments and updates.
• Access controls and authentication mechanisms.
• Employee training on data protection practices.

While we strive to protect your information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.`,
  },
  {
    title: "6. Your Rights and Choices",
    content: `You have certain rights regarding your personal information:

• Access: Request a copy of the personal information we hold about you.
• Correction: Request correction of inaccurate or incomplete information.
• Deletion: Request deletion of your personal information, subject to legal obligations.
• Opt-out: Unsubscribe from marketing communications at any time.
• Data Portability: Request transfer of your data in a structured, machine-readable format.

To exercise these rights, please contact us using the information provided below.`,
  },
  {
    title: "7. Data Retention",
    content: `We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable law. When your information is no longer needed, we securely delete or anonymize it.`,
  },
  {
    title: "8. International Data Transfers",
    content: `As a global company, your information may be transferred to and processed in countries other than your country of residence. We ensure that appropriate safeguards are in place to protect your information during such transfers, in compliance with applicable data protection laws.`,
  },
  {
    title: "9. Children's Privacy",
    content: `Our website is not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete it promptly.`,
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website with a revised effective date.`,
  },
  {
    title: "11. Contact Us",
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:

Email: info@deftinnovations.in
Phone: +91 860 603 5050
Address: HiLITE Business Park, NH 66, Thondayad, Kozhikode, Kerala 673014, India`,
  },
];

export function PrivacyClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[35vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a]">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
        <div className="relative z-10 text-center space-y-4 pt-28 pb-16 px-6">
          <FadeIn direction="up">
            <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/15 text-[11px] font-mono font-semibold tracking-widest text-white/60 uppercase">
              Legal
            </span>
          </FadeIn>
          <FadeIn direction="up" delay={0.05}>
            <h1 className="ttl-80 font-light text-white tracking-tight">
              Privacy Policy
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <p className="text-sm text-white/40 max-w-md mx-auto">
              Last updated: August 2026
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="max-w-3xl mx-auto space-y-12">
            <FadeIn direction="up">
              <p className="text-base text-black/60 leading-relaxed font-light">
                At Deft Innovations, we are committed to protecting your privacy and ensuring transparency in how we collect, use, and safeguard your personal information. This Privacy Policy outlines our practices regarding the data we gather from visitors to our website and clients of our services.
              </p>
            </FadeIn>

            <div className="space-y-10">
              {SECTIONS.map((section, idx) => (
                <FadeIn key={idx} direction="up" delay={idx * 0.03}>
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-[#0a0a0a] tracking-tight">
                      {section.title}
                    </h2>
                    <div className="text-sm text-black/55 leading-relaxed font-light whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn direction="up" delay={0.2}>
              <div className="pt-8 border-t border-black/10">
                <p className="text-sm text-black/40 font-light">
                  If you have any questions about this Privacy Policy, please{" "}
                  <Link href="/contact" className="text-blue-600 hover:text-blue-700 underline underline-offset-2">
                    contact us
                  </Link>.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
