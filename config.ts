
/**
 * BRAND CONFIGURATION
 * 
 * Edwen Pro Configuration
 */
export const CONFIG = {
  company: {
    name: "EdwenPro",
    shortName: "EdwenPro", 
    logoText: "EDWEN", 
    logoSubText: "PRO", 
    tagline: "Premium Kitchen Tandem Hardware",
    description: "EdwenPro is the leading manufacturer of premium Kitchen Tandem Hardware, soft-close drawer systems, and architectural fittings. Upgrade your modular kitchen with EdwenPro.",
    url: "https://edwenpro.com"
  },
  // Feature Flags - Toggle modules to optimize memory and UI
  features: {
    enableMobileBottomNav: false, // Toggle the mobile bottom navigation bar
  },
  // Store Configuration
  store: {
    showOutOfStockFilter: true, 
  },
  // Layout Configuration
  layout: {
    home: ['hero', 'stats', 'benefits', 'experience', 'cta']
  },
  // Homepage Section Content
  homepage: {
    benefits: [
      { 
        title: "Dealer Sync", 
        description: "Push new product updates to your entire dealer network instantly.", 
        icon: "users" 
      },
      { 
        title: "QR Standees", 
        description: "Enable customers to scan shelf items for detailed specs and videos.", 
        icon: "pin" 
      },
      { 
        title: "Offline Catalog", 
        description: "Your sales team works in warehouses with zero connectivity.", 
        icon: "layers" 
      }
    ],
    experience: {
       title: "EdwenPro In Action",
       subtitle: "Experience how EdwenPro manages technical specs for Kitchen Tandem Hardware and B2B ordering workflows."
    },
    cta: {
       titleLabel: "Distributor Ready",
       title: "Modernize Your\nSupply Chain",
       description: "Stop printing catalogs that go obsolete in a month. Give your dealers the power of real-time digital inventory.",
       buttonText: "Launch Hardware Demo"
    }
  },
  hero: {
    headline: "Engineered for the Modern Kitchen.", 
    subheadline: "Experience the smooth glide of EdwenPro Tandem Hardware. The preferred choice for modular kitchen manufacturers and architects.",
    ctaButton: "Explore Collection",
    // Industrial / Construction Site
    image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=1920&q=80"
  },
  contact: {
    phone: "+91 95611 30990",
    phoneRaw: "+919561130990", 
    email: "contact@edwenpro.com",
    address: "EdwenPro Hardware India Pvt Ltd",
    addressMapLink: "https://maps.google.com/?q=EdwenPro",
    hours: "Support: Mon-Sat, 9am - 7pm",
    responseTime: "Priority B2B Support"
  },
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    whatsapp: "https://wa.me/919561130990",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com"
  },
  stats: [
    { value: "5000+", label: "Happy Kitchens", icon: "users" },
    { value: "100%", label: "Tested Quality", icon: "check" },
    { value: "Premium", label: "Tandem Tech", icon: "diamond" },
    { value: "20+", label: "Years Experience", icon: "building" },
  ]
};
