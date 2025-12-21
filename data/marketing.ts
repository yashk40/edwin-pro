
import { Feature, Testimonial, FAQ, Promotion } from './types';

export const promotions: Promotion[] = [
  {
    id: 1,
    title: "Kitchen Organization Sale",
    subtitle: "Flat 15% off on all Soft-Close Drawer Systems & Magic Corners.",
    // Clean modern kitchen
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Shop Kitchen",
    link: "store",
    accentColor: "bg-emerald-600"
  },
  {
    id: 2,
    title: "Smart Security Upgrade",
    subtitle: "New Digital Locks with Fingerprint & App Control.",
    // Smart home lock/detail
    image: "https://images.unsplash.com/photo-1558002038-1091a166111c?auto=format&fit=crop&w=1200&q=80",
    ctaText: "View Collection",
    link: "store",
    accentColor: "bg-primary-600"
  },
  {
    id: 3,
    title: "Distributor Bulk Deals",
    subtitle: "Register as a B2B partner for wholesale pricing tiers.",
    // Warehouse / Logistics
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Contact Now",
    link: "contact",
    accentColor: "bg-slate-800"
  }
];

export const features: Feature[] = [
  {
    iconName: 'building', 
    title: "Dealer Management",
    description: "Centralize your dealer network. Push pricing updates and stock availability to all branches instantly."
  },
  {
    iconName: 'layers', 
    title: "50,000+ SKU Handling",
    description: "Engineered for massive inventories. From screws to power generators, categorize everything seamlessly."
  },
  {
    iconName: 'pin', 
    title: "QR Store Front",
    description: "Print QR codes for your physical showroom. Customers scan to view specs, videos, and installation guides."
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: "Managing inventory across 5 locations was a nightmare. VistaDeck synced our entire hardware catalog in days.",
    authorName: "Robert Miller",
    authorTitle: "CEO, Miller Industrial Supply",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
  },
  {
    quote: "Our dealers love the iPad app. They can show contractors technical specs on-site even without internet.",
    authorName: "Elena Rodriguez",
    authorTitle: "Sales Director, Apex Fittings",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
  },
  {
    quote: "The QR code feature modernized our retail floor. Customers engage with the products much more now.",
    authorName: "David Chen",
    authorTitle: "Owner, BuildRight Hardware",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
  }
];

export const faqs: FAQ[] = [
    {
      question: "Does it work offline?",
      answer: "Yes. The entire hardware catalog downloads to the device, allowing sales reps to work in warehouses or construction sites with zero signal."
    },
    {
      question: "Can I integrate with my ERP?",
      answer: "Our Business and Enterprise plans offer API access to sync with SAP, Oracle, or Tally for real-time inventory updates."
    },
    {
      question: "Is there a limit on SKUs?",
      answer: "The Pro plan supports up to 10,000 SKUs. Enterprise plans are effectively unlimited, tested with over 500,000 items."
    },
    {
      question: "How do dealers order?",
      answer: "Dealers can build a cart in the app and submit a purchase order directly to your central warehouse via WhatsApp or Email."
    }
];
