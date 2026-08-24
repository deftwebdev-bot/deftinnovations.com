import React from "react";
import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch — Deft Innovations",
  description:
    "Get in touch with Deft Innovations. Reach out for digital marketing, brand architecture, web development, and performance advertising inquiries.",
};

export default function ContactPage() {
  return <ContactClient />;
}
