
export interface Product {
  id: number;
  name: string;
  category: string;
  series?: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  keyFeatures?: string[];
  // New fields for extended product info
  sku?: string; // Specific Stock Keeping Unit ID
  details?: string; // Long form writeup
  specs?: { key: string; value: string }[]; // Key-value pairs for the table
  bulkPricing?: { minQty: number; maxQty?: number; price: number; label?: string }[]; // Dynamic pricing tiers
  installationDrawing?: string; // Technical pencil drawing
  gallery?: string[];
  features?: string[];
  inStock: boolean;
  stockLevel?: number;
  createdAt: string;
  demoUrl?: string;
  videoUrl?: string;
  material?: string;
  color?: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  features: string[];
}

export interface Testimonial {
  quote: string;
  authorName: string;
  authorTitle: string;
  avatarUrl: string;
}

export interface Feature {
  iconName: 'sofa' | 'building' | 'layers' | 'pin' | 'check' | 'users' | 'diamond';
  title: string;
  description: string;
  features?: string[];
}

export interface Brochure {
  id: number;
  title: string;
  size: string;
  image: string;
  ctaText?: string;
}

export interface Article {
  category: string;
  title: string;
  excerpt: string;
  image: string;
  ctaText?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Promotion {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  link: string;
  accentColor: string;
}
