"use client";

import React from "react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/Motion";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing and using the Deft Innovations website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website or services. These terms constitute a legally binding agreement between you and Deft Innovations.`,
  },
  {
    title: "2. Services",
    content: `Deft Innovations provides digital marketing, branding, web development, and related technology services. The scope, deliverables, and timelines for each engagement are defined in separate service agreements or statements of work agreed upon between Deft Innovations and the client.

We reserve the right to modify, suspend, or discontinue any service at any time without prior notice. We will not be liable for any modification, suspension, or discontinuation of a service.`,
  },
  {
    title: "3. Intellectual Property",
    content: `All content, designs, code, trademarks, and other intellectual property on this website are the property of Deft Innovations or its licensors and are protected by applicable intellectual property laws.

Upon full payment for services rendered, clients receive ownership of final deliverables as specified in the respective service agreement. Deft Innovations retains the right to display work in portfolio and marketing materials unless otherwise agreed in writing.

You may not reproduce, distribute, modify, or create derivative works from any content on this website without prior written permission from Deft Innovations.`,
  },
  {
    title: "4. Client Responsibilities",
    content: `Clients are responsible for:

• Providing accurate and complete information required for project execution.
• Timely review and feedback on deliverables as outlined in the project timeline.
• Ensuring that provided materials (images, content, brand assets) do not infringe on third-party rights.
• Maintaining confidentiality of project-related information and access credentials.

Delays caused by the client may impact project timelines and deliverable schedules. Additional costs may apply for scope changes or extended timelines due to client-side delays.`,
  },
  {
    title: "5. Payment Terms",
    content: `Payment terms are defined in individual service agreements. Generally:

• Invoices are payable within 15 days of issue unless otherwise specified.
• Late payments may incur a fee of 1.5% per month on the outstanding balance.
• Work may be paused or suspended if payments are overdue by more than 30 days.
• All quoted prices are exclusive of applicable taxes unless stated otherwise.

Refunds are handled on a case-by-case basis as outlined in the specific service agreement.`,
  },
  {
    title: "6. Confidentiality",
    content: `Both parties agree to maintain the confidentiality of proprietary information shared during the course of an engagement. This includes business strategies, technical information, client lists, financial data, and any other materials marked as confidential.

This obligation survives the termination of the business relationship for a period of two years. Neither party may disclose confidential information to third parties without prior written consent.`,
  },
  {
    title: "7. Limitation of Liability",
    content: `To the maximum extent permitted by law, Deft Innovations shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from:

• Use of or inability to use our website or services.
• Any unauthorized access to or alteration of your data.
• Errors or omissions in any content on our website.
• Third-party actions or content linked from our website.

Our total liability for any claim arising from our services shall not exceed the amount paid by the client for the specific service giving rise to the claim in the twelve months preceding the event.`,
  },
  {
    title: "8. Indemnification",
    content: `You agree to indemnify and hold harmless Deft Innovations, its directors, employees, and partners from any claims, damages, losses, or expenses (including reasonable attorneys' fees) arising from:

• Your use of our website or services.
• Your violation of these Terms and Conditions.
• Your violation of any third-party rights.
• Any content you submit or transmit through our services.`,
  },
  {
    title: "9. Third-Party Links",
    content: `Our website may contain links to third-party websites or services that are not owned or controlled by Deft Innovations. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.

We strongly advise you to read the terms and conditions and privacy policy of any third-party site you visit.`,
  },
  {
    title: "10. Termination",
    content: `We may terminate or suspend your access to our website and services immediately, without prior notice, for conduct that we determine, in our sole discretion, violates these Terms and Conditions or is harmful to other users, us, or third parties, or for any other reason.

Upon termination, your right to use our website and services will cease immediately. All provisions of these terms that by their nature should survive termination shall survive.`,
  },
  {
    title: "11. Governing Law",
    content: `These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Kozhikode, Kerala, India.

For international clients, disputes may be resolved through arbitration in accordance with the rules of the International Chamber of Commerce, with the seat of arbitration in Kozhikode, India.`,
  },
  {
    title: "12. Changes to Terms",
    content: `We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on this page with a revised "Last updated" date. Your continued use of our website or services after any changes constitutes your acceptance of the new terms.

We encourage you to review these terms periodically for any updates.`,
  },
  {
    title: "13. Contact Us",
    content: `If you have any questions about these Terms and Conditions, please contact us at:

Email: sales@deftinnovations.in | hr@deftinnovations.in
Phone: +91 9496 464 650 (Sales) | +91 8330 081 350 (HR)
Address: HiLITE Business Park, NH 66, Thondayad, Kozhikode, Kerala 673014, India`,
  },
];

export function TermsClient() {
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
              Terms & Conditions
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
                These Terms and Conditions govern your use of the Deft Innovations website and services. By engaging with our services or using our website, you acknowledge that you have read, understood, and agree to be bound by these terms.
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
                  If you have any questions about these Terms & Conditions, please{" "}
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
