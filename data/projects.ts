
import { Project } from './types';

export const projects: Project[] = [
  {
    id: 1,
    title: "Titan Power Tools",
    category: "Manufacturer",
    // Power Tools / Workshop
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    description: "Titan equipped their 200 field sales reps with VistaDeck. Catalog printing costs dropped to zero, and sales velocity increased by 40%.",
    features: ["Zero Printing Costs", "Field Sales Enabled", "Instant Spec Access"]
  },
  {
    id: 2,
    title: "BuildRight Supply Chain",
    category: "Distributor",
    // Warehouse / Inventory
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    description: "BuildRight digitized 45,000 SKUs of plumbing and electrical hardware. Their dealers now check stock in real-time.",
    features: ["45k+ SKUs", "Real-time Stock", "Dealer Portal"]
  },
  {
    id: 3,
    title: "Ace Hardware Franchise",
    category: "Retail Chain",
    // Retail Store / Shelves
    image: "https://images.unsplash.com/photo-1556742528-98e3c3162754?auto=format&fit=crop&w=800&q=80",
    description: "Implemented in-store kiosks using VistaDeck's Expo Mode. Customers can now find obscure parts without waiting for staff.",
    features: ["Self-Serve Kiosks", "Reduced Wait Times", "Inventory Search"]
  },
  {
    id: 4,
    title: "SafeGuard Industrial",
    category: "Safety Gear",
    // Industrial Safety
    image: "https://images.unsplash.com/photo-1617105267444-42b7e1999208?auto=format&fit=crop&w=800&q=80",
    description: "Used VistaDeck to showcase compliance certificates and video demos for safety gear, critical for B2B industrial contracts.",
    features: ["Compliance Docs", "Video Demos", "B2B Contracts"]
  },
  {
    id: 5,
    title: "Vertex Architectural",
    category: "Fittings",
    // Modern Building / Architecture
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    description: "Architects use the digital catalog to drag-and-drop door fittings into their mood boards directly from the app.",
    features: ["Architect Friendly", "High-Res Finish", "Spec Downloads"]
  },
  {
    id: 6,
    title: "Global Fasteners Inc",
    category: "Wholesale",
    // Screws / Bolts Macro
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
    description: "Global Fasteners uses the bulk order table feature to let industrial clients order screws and bolts by the thousands.",
    features: ["Bulk Ordering", "Tiered Pricing", "Quick Re-order"]
  }
];