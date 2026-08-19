export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  logoText: string;
  metric?: string;
  metricLabel?: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    quote: "Deft Innovations transformed our institutional web presence completely. Their monochrome visual direction and sub-second Next.js architecture resulted in a 320% increase in qualified investor inquiries within 90 days of launch.",
    author: "Alexander Wright",
    role: "Managing Partner",
    company: "Nexus Global Capital",
    logoText: "NEXUS",
    metric: "+320%",
    metricLabel: "Lead Conversion Growth"
  },
  {
    id: "test-2",
    quote: "Working with Deft Innovations feels like having an elite in-house creative and engineering team. Their disciplined performance ad strategy delivered a 4.8x ROAS while elevating our luxury brand positioning.",
    author: "Claire Sterling",
    role: "Chief Marketing Officer",
    company: "Aura Luxury Group",
    logoText: "AURA ATELIER",
    metric: "4.8x",
    metricLabel: "Paid Campaign ROAS"
  },
  {
    id: "test-3",
    quote: "They don't just build websites; they build high-converting growth engines. The level of speed, polish, and strategic clarity Deft brought to our B2B cybersecurity launch was outstanding.",
    author: "Vikram Malhotra",
    role: "VP of Enterprise Marketing",
    company: "Sentinel Security Labs",
    logoText: "SENTINEL",
    metric: "-45%",
    metricLabel: "Sales Cycle Shortened"
  }
];

export const TRUST_STATS = [
  { value: "150+", label: "Projects Delivered Globally" },
  { value: "$45M+", label: "Client Revenue Generated" },
  { value: "98.4%", label: "Client Retention Rate" },
  { value: "0.4s", label: "Average Page Speed" }
];
