import { Product } from './types';

export const products: Product[] = [
  // --- SLIM TANDOM SYSTEM (GRIGIO TECH - GREY) ---
  {
    id: 201,
    name: "Slim Tandom System 3D Slim Box (Grigio Tech)",
    category: "Slim Tandom System",
    series: "Grigio Tech",
    price: 0.00,
    image: "https://via.placeholder.com/150",
    description: "The Edwenpro Slim Tandem System – 3D Slim Box is engineered for modern modular kitchens that demand precision, durability, and smooth performance. Designed with a sleek slim profile, this drawer system maximizes internal storage space while maintaining a refined, contemporary appearance.\n\nBuilt for strength and stability, the system ensures smooth and silent drawer movement, making everyday kitchen usage effortless. Its versatile size options make it suitable for a wide range of kitchen drawers, from compact storage to larger utility units.",
    keyFeatures: [
      "Slim, space-efficient design",
      "Smooth and stable drawer operation",
      "Ideal for modular kitchen cabinets",
      "Durable construction for long-term use",
      "Clean grey finish for a modern look"
    ],
    sku: "EP-GRT-3D-SLIMBOX",
    specs: [
      { key: "Color", value: "Grey" },
      { key: "Available Heights", value: "84mm, 116mm, 164mm, 199mm" },
      { key: "Available Lengths", value: "300mm, 350mm, 400mm, 450mm, 500mm, 550mm" }
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Grey"
  },

  // --- SLIM DRAWER SYSTEM (NERO-TECH - BLACK) ---
  {
    id: 202,
    name: "Slim Drawer System Black Series (Nero-Tech)",
    category: "Slim Drawer System",
    series: "Nero-Tech",
    price: 0.00,
    image: "https://via.placeholder.com/150",
    description: "The Edwenpro Slim Drawer System Black Series, Nero-Tech, is designed for modern kitchen aesthetics and superior functionality. Featuring a sleek black finish, this drawer system offers a sophisticated look while providing optimal storage and smooth operation.\n\nEngineered for durability, it ensures quiet and stable movement, enhancing the daily kitchen experience. With various height and length options, it adapts to diverse cabinet configurations, offering versatile storage solutions.",
    keyFeatures: [
      "Sleek black finish for modern kitchens",
      "Smooth and silent drawer operation",
      "Robust construction for lasting performance",
      "Optimized for space and accessibility",
      "Multiple size options for custom fit"
    ],
    sku: "EP-NERO-SLIMDRAWER",
    specs: [
      { key: "Color", value: "Black" },
      { key: "Available Heights", value: "84mm, 116mm, 164mm, 199mm" },
      { key: "Available Lengths", value: "450mm, 500mm, 550mm" }
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Black"
  },

  // --- PANTRY UNITS ---

  // --- PANTRY UNITS ---
  {
    id: 301,
    name: "Berlin Series - 450mm",
    category: "Pantry Units",
    series: "Berlin Series",
    price: 34699,
    image: "https://via.placeholder.com/150",
    description: "Pantry unit from Berlin Series, 450mm width, 6 layers.",
    sku: "EP-PU-BER-450G",
    specs: [
      { key: "Color", value: "Glass" },
      { key: "Height", value: "1860mm" },
      { key: "Width", value: "450mm" },
      { key: "Depth", value: "500mm" },
      { key: "Layers", value: "6" }
    ],
    keyFeatures: [
      "Glass finish",
      "6 layers for ample storage",
      "Durable and modern design"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Glass/Steel",
    color: "Glass"
  },
  {
    id: 302,
    name: "Berlin Series - 600mm",
    category: "Pantry Units",
    series: "Berlin Series",
    price: 38099,
    image: "https://via.placeholder.com/150",
    description: "Pantry unit from Berlin Series, 600mm width, 6 layers.",
    sku: "EP-PU-BER-600G",
    specs: [
      { key: "Color", value: "Glass" },
      { key: "Height", value: "1860mm" },
      { key: "Width", value: "600mm" },
      { key: "Depth", value: "500mm" },
      { key: "Layers", value: "6" }
    ],
    keyFeatures: [
      "Glass finish",
      "6 layers for ample storage",
      "Durable and modern design"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Glass/Steel",
    color: "Glass"
  },
  {
    id: 303,
    name: "Tokyo Series - 450mm",
    category: "Pantry Units",
    series: "Tokyo Series",
    price: 35599,
    image: "https://via.placeholder.com/150",
    description: "Pantry unit from Tokyo Series, 450mm width, 6 layers.",
    sku: "EP-PU-TOK-450G",
    specs: [
      { key: "Color", value: "Grey" },
      { key: "Height", value: "1860mm" },
      { key: "Width", value: "450mm" },
      { key: "Depth", value: "500mm" },
      { key: "Layers", value: "6" }
    ],
    keyFeatures: [
      "Grey finish",
      "6 layers for ample storage",
      "Robust and functional design"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Grey"
  },
  {
    id: 304,
    name: "Tokyo Series - 600mm",
    category: "Pantry Units",
    series: "Tokyo Series",
    price: 39399,
    image: "https://via.placeholder.com/150",
    description: "Pantry unit from Tokyo Series, 600mm width, 6 layers.",
    sku: "EP-PU-TOK-600G",
    specs: [
      { key: "Color", value: "Grey" },
      { key: "Height", value: "1860mm" },
      { key: "Width", value: "600mm" },
      { key: "Depth", value: "500mm" },
      { key: "Layers", value: "6" }
    ],
    keyFeatures: [
      "Grey finish",
      "6 layers for ample storage",
      "Robust and functional design"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Grey"
  },
  {
    id: 305,
    name: "Tok Rev. - 450mm",
    category: "Pantry Units",
    series: "Tok Rev.",
    price: 32199,
    image: "https://via.placeholder.com/150",
    description: "Reversible pantry unit from Tok Rev. Series, 450mm width, 5 layers.",
    sku: "EP-PU-TOKREV-450G",
    specs: [
      { key: "Color", value: "Grey" },
      { key: "Height", value: "1828mm" },
      { key: "Width", value: "450mm" },
      { key: "Depth", value: "500mm" },
      { key: "Layers", value: "5" }
    ],
    keyFeatures: [
      "Reversible design",
      "5 layers for versatile storage",
      "Durable construction"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Grey"
  },
  {
    id: 306,
    name: "Tok Rev. - 600mm",
    category: "Pantry Units",
    series: "Tok Rev.",
    price: 34699,
    image: "https://via.placeholder.com/150",
    description: "Reversible pantry unit from Tok Rev. Series, 600mm width, 5 layers.",
    sku: "EP-PU-TOKREV-600G",
    specs: [
      { key: "Color", value: "Grey" },
      { key: "Height", value: "1828mm" },
      { key: "Width", value: "600mm" },
      { key: "Depth", value: "500mm" },
      { key: "Layers", value: "5" }
    ],
    keyFeatures: [
      "Reversible design",
      "5 layers for versatile storage",
      "Durable construction"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Grey"
  },
  {
    id: 307,
    name: "Rio Series - 450mm",
    category: "Pantry Units",
    series: "Rio Series",
    price: 0.00,
    image: "https://via.placeholder.com/150",
    description: "Pantry unit from Rio Series, 450mm width, 6 layers.",
    sku: "EP-PU-RIO-450GB",
    specs: [
      { key: "Color", value: "Grey/Black" },
      { key: "Height", value: "1828mm" },
      { key: "Width", value: "450mm" },
      { key: "Depth", value: "500mm" },
      { key: "Layers", value: "6" }
    ],
    keyFeatures: [
      "Stylish Grey/Black finish",
      "6 layers for extensive storage",
      "Robust and modern design"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Grey/Black"
  },
  {
    id: 308,
    name: "Rio Series - 600mm",
    category: "Pantry Units",
    series: "Rio Series",
    price: 0.00,
    image: "https://via.placeholder.com/150",
    description: "Pantry unit from Rio Series, 600mm width, 6 layers.",
    sku: "EP-PU-RIO-600GB",
    specs: [
      { key: "Color", value: "Grey/Black" },
      { key: "Height", value: "1828mm" },
      { key: "Width", value: "600mm" },
      { key: "Depth", value: "500mm" },
      { key: "Layers", value: "6" }
    ],
    keyFeatures: [
      "Stylish Grey/Black finish",
      "6 layers for extensive storage",
      "Robust and modern design"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Grey/Black"
  },

  // --- CORNER SOLUTIONS ---

  // --- CORNER SOLUTIONS ---
  {
    id: 401,
    name: "Corner Units - Berlin Series",
    category: "Corner Units",
    series: "Berlin Series",
    price: 27499,
    image: "https://via.placeholder.com/150",
    description: "Corner unit from Berlin Series, 900mm, glass finish.",
    sku: "EP-CU-BER-900G",
    specs: [
      { key: "Color", value: "Glass" },
      { key: "Size", value: "900mm" }
    ],
    keyFeatures: [
      "Glass finish",
      "Space-saving design",
      "Durable construction"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Glass/Steel",
    color: "Glass"
  },
  {
    id: 402,
    name: "Tokyo Series",
    category: "Corner Units",
    series: "Tokyo Series",
    price: 27199,
    image: "https://via.placeholder.com/150",
    description: "Corner unit from Tokyo Series, 900mm, grey finish.",
    sku: "EP-CU-TOK-900G",
    specs: [
      { key: "Color", value: "Grey" },
      { key: "Size", value: "900mm" }
    ],
    keyFeatures: [
      "Grey finish",
      "Space-saving design",
      "Robust construction"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Grey"
  },
  {
    id: 403,
    name: "Rio Series - Grey",
    category: "Corner Units",
    series: "Rio Series",
    price: 18129,
    image: "https://via.placeholder.com/150",
    description: "Corner unit from Rio Series, 900mm, grey/black finish.",
    sku: "EP-CU-RIO-900GB-GREY",
    specs: [
      { key: "Color", value: "Grey/Black" },
      { key: "Size", value: "900mm" }
    ],
    keyFeatures: [
      "Grey/Black finish",
      "Swing out mechanism",
      "Efficient corner storage"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Grey/Black"
  },
  {
    id: 404,
    name: "Rio Series - Black",
    category: "Corner Units",
    series: "Rio Series",
    price: 0.00,
    image: "https://via.placeholder.com/150",
    description: "Corner unit from Rio Series, 900mm, black finish.",
    sku: "EP-CU-RIO-900GB-BLACK",
    specs: [
      { key: "Color", value: "Grey/Black" },
      { key: "Size", value: "900mm" }
    ],
    keyFeatures: [
      "Black finish",
      "Swing out mechanism",
      "Efficient corner storage"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Grey/Black"
  },

  // --- PULLOUTS ---
  {
    id: 501,
    name: "Berlin Series - Glass (200mm)",
    category: "Pullouts",
    series: "Berlin Series",
    price: 9099,
    image: "https://via.placeholder.com/150",
    description: "Glass pullout from Berlin Series, 200mm width.",
    sku: "EP-PUL-BER-200G",
    specs: [
      { key: "Color", value: "Glass" },
      { key: "Size", value: "200mm" }
    ],
    keyFeatures: [
      "Glass finish",
      "Smooth pull-out mechanism",
      "Durable design"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Glass/Steel",
    color: "Glass"
  },
  {
    id: 502,
    name: "Berlin Series - Glass (250mm)",
    category: "Pullouts",
    series: "Berlin Series",
    price: 9399,
    image: "https://via.placeholder.com/150",
    description: "Glass pullout from Berlin Series, 250mm width.",
    sku: "EP-PUL-BER-250G",
    specs: [
      { key: "Color", value: "Glass" },
      { key: "Size", value: "250mm" }
    ],
    keyFeatures: [
      "Glass finish",
      "Smooth pull-out mechanism",
      "Durable design"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Glass/Steel",
    color: "Glass"
  },
  {
    id: 503,
    name: "Berlin Series - Glass (300mm)",
    category: "Pullouts",
    series: "Berlin Series",
    price: 9699,
    image: "https://via.placeholder.com/150",
    description: "Glass pullout from Berlin Series, 300mm width.",
    sku: "EP-PUL-BER-300G",
    specs: [
      { key: "Color", value: "Glass" },
      { key: "Size", value: "300mm" }
    ],
    keyFeatures: [
      "Glass finish",
      "Smooth pull-out mechanism",
      "Durable design"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Glass/Steel",
    color: "Glass"
  },
  {
    id: 504,
    name: "Tokyo Series - Grey (200mm)",
    category: "Pullouts",
    series: "Tokyo Series",
    price: 9699,
    image: "https://via.placeholder.com/150",
    description: "Grey pullout from Tokyo Series, 200mm width.",
    sku: "EP-PUL-TOK-200G",
    specs: [
      { key: "Color", value: "Grey" },
      { key: "Size", value: "200mm" }
    ],
    keyFeatures: [
      "Grey finish",
      "Smooth pull-out mechanism",
      "Robust design"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Grey"
  },
  {
    id: 505,
    name: "Tokyo Series - Grey (250mm)",
    category: "Pullouts",
    series: "Tokyo Series",
    price: 9999,
    image: "https://via.placeholder.com/150",
    description: "Grey pullout from Tokyo Series, 250mm width.",
    sku: "EP-PUL-TOK-250G",
    specs: [
      { key: "Color", value: "Grey" },
      { key: "Size", value: "250mm" }
    ],
    keyFeatures: [
      "Grey finish",
      "Smooth pull-out mechanism",
      "Robust design"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Grey"
  },
  {
    id: 506,
    name: "Tokyo Series - Grey (300mm)",
    category: "Pullouts",
    series: "Tokyo Series",
    price: 10299,
    image: "https://via.placeholder.com/150",
    description: "Grey pullout from Tokyo Series, 300mm width.",
    sku: "EP-PUL-TOK-300G",
    specs: [
      { key: "Color", value: "Grey" },
      { key: "Size", value: "300mm" }
    ],
    keyFeatures: [
      "Grey finish",
      "Smooth pull-out mechanism",
      "Robust design"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Grey"
  },
  {
    id: 507,
    name: "Rio Series - Grey (200mm)",
    category: "Pullouts",
    series: "Rio Series",
    price: 0.00,
    image: "https://via.placeholder.com/150",
    description: "Grey/Black pullout from Rio Series, 200mm width.",
    sku: "EP-PUL-RIO-200GB-GREY",
    specs: [
      { key: "Color", value: "Grey/Black" },
      { key: "Size", value: "200mm" }
    ],
    keyFeatures: [
      "Grey/Black finish",
      "Modern design",
      "Efficient storage solution"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Grey/Black"
  },
  {
    id: 508,
    name: "Rio Series - Grey (250mm)",
    category: "Pullouts",
    series: "Rio Series",
    price: 0.00,
    image: "https://via.placeholder.com/150",
    description: "Grey/Black pullout from Rio Series, 250mm width.",
    sku: "EP-PUL-RIO-250GB-GREY",
    specs: [
      { key: "Color", value: "Grey/Black" },
      { key: "Size", value: "250mm" }
    ],
    keyFeatures: [
      "Grey/Black finish",
      "Modern design",
      "Efficient storage solution"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Grey/Black"
  },
  {
    id: 509,
    name: "Rio Series - Grey (300mm)",
    category: "Pullouts",
    series: "Rio Series",
    price: 0.00,
    image: "https://via.placeholder.com/150",
    description: "Grey/Black pullout from Rio Series, 300mm width.",
    sku: "EP-PUL-RIO-300GB-GREY",
    specs: [
      { key: "Color", value: "Grey/Black" },
      { key: "Size", value: "300mm" }
    ],
    keyFeatures: [
      "Grey/Black finish",
      "Modern design",
      "Efficient storage solution"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Grey/Black"
  },
  {
    id: 510,
    name: "Rio Series - Black (200mm)",
    category: "Pullouts",
    series: "Rio Series",
    price: 0.00,
    image: "https://via.placeholder.com/150",
    description: "Black pullout from Rio Series, 200mm width.",
    sku: "EP-PUL-RIO-200GB-BLACK",
    specs: [
      { key: "Color", value: "Grey/Black" },
      { key: "Size", value: "200mm" }
    ],
    keyFeatures: [
      "Black finish",
      "Modern design",
      "Efficient storage solution"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Grey/Black"
  },
  {
    id: 511,
    name: "Rio Series - Black (250mm)",
    category: "Pullouts",
    series: "Rio Series",
    price: 0.00,
    image: "https://via.placeholder.com/150",
    description: "Black pullout from Rio Series, 250mm width.",
    sku: "EP-PUL-RIO-250GB-BLACK",
    specs: [
      { key: "Color", value: "Grey/Black" },
      { key: "Size", value: "250mm" }
    ],
    keyFeatures: [
      "Black finish",
      "Modern design",
      "Efficient storage solution"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Grey/Black"
  },
  {
    id: 512,
    name: "Rio Series - Black (300mm)",
    category: "Pullouts",
    series: "Rio Series",
    price: 0.00,
    image: "https://via.placeholder.com/150",
    description: "Black pullout from Rio Series, 300mm width.",
    sku: "EP-PUL-RIO-300GB-BLACK",
    specs: [
      { key: "Color", value: "Grey/Black" },
      { key: "Size", value: "300mm" }
    ],
    keyFeatures: [
      "Black finish",
      "Modern design",
      "Efficient storage solution"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Grey/Black"
  },

  // --- ORGANIZERS ---

  // --- ORGANIZERS ---
  {
    id: 601,
    name: "Berlin Series - 600mm",
    category: "Drawer Organizers",
    series: "Berlin Series",
    price: 9999,
    image: "https://via.placeholder.com/150",
    description: "Drawer organizer from Berlin Series, 600mm width.",
    sku: "EP-DO-BER-600G",
    specs: [
      { key: "Color", value: "Glass" },
      { key: "Height", value: "169mm" },
      { key: "Width", value: "600mm" },
      { key: "Depth", value: "500mm" }
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Glass",
    color: "Glass"
  },
  {
    id: 602,
    name: "Berlin Series - 900mm",
    category: "Drawer Organizers",
    series: "Berlin Series",
    price: 11889,
    image: "https://via.placeholder.com/150",
    description: "Drawer organizer from Berlin Series, 900mm width.",
    sku: "EP-DO-BER-900G",
    specs: [
      { key: "Color", value: "Glass" },
      { key: "Height", value: "169mm" },
      { key: "Width", value: "900mm" },
      { key: "Depth", value: "500mm" }
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Glass",
    color: "Glass"
  },
  {
    id: 603,
    name: "Tokyo Series - 600mm",
    category: "Drawer Organizers",
    series: "Tokyo Series",
    price: 10699,
    image: "https://via.placeholder.com/150",
    description: "Drawer organizer from Tokyo Series, 600mm width.",
    sku: "EP-DO-TOK-600G",
    specs: [
      { key: "Color", value: "Grey" },
      { key: "Height", value: "131mm" },
      { key: "Width", value: "600mm" },
      { key: "Depth", value: "500mm" }
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Grey"
  },
  {
    id: 604,
    name: "Tokyo Series - 900mm",
    category: "Drawer Organizers",
    series: "Tokyo Series",
    price: 11899,
    image: "https://via.placeholder.com/150",
    description: "Drawer organizer from Tokyo Series, 900mm width.",
    sku: "EP-DO-TOK-900G",
    specs: [
      { key: "Color", value: "Grey" },
      { key: "Height", value: "131mm" },
      { key: "Width", value: "900mm" },
      { key: "Depth", value: "500mm" }
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Grey"
  },

  // --- DRAWER SLIDES (Updated with sizes) ---

  // --- DRAWER SLIDES (Updated with sizes) ---
  {
    id: 701,
    name: "Gold Premium 75GM",
    category: "Drawer Slides",
    series: "Gold Premium 75GM",
    price: 0.00,
    image: "https://via.placeholder.com/150",
    description: "Gold Premium 75GM drawer slides, available in various lengths.",
    sku: "EP-DS-GP75-ZNC",
    specs: [
      { key: "Color", value: "Zinc" },
      { key: "Available Sizes", value: "200MM, 250MM, 300MM, 350MM, 400MM, 450MM, 500MM, 550MM, 600MM" }
    ],
    keyFeatures: [
      "75GM heavy duty",
      "Smooth operation",
      "Zinc finish"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Zinc"
  },
  {
    id: 702,
    name: "Silver Premium 55GM",
    category: "Drawer Slides",
    series: "Silver Premium 55GM",
    price: 0.00,
    image: "https://via.placeholder.com/150",
    description: "Silver Premium 55GM drawer slides, available in various lengths.",
    sku: "EP-DS-SP55-ZNC",
    specs: [
      { key: "Color", value: "Zinc" },
      { key: "Available Sizes", value: "250MM, 300MM, 350MM, 400MM, 450MM, 500MM, 550MM, 600MM" }
    ],
    keyFeatures: [
      "55GM premium quality",
      "Smooth operation",
      "Zinc finish"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Zinc"
  },
  {
    id: 703,
    name: "Soft Closing",
    category: "Drawer Slides",
    series: "Soft Closing",
    price: 0.00,
    image: "https://via.placeholder.com/150",
    description: "Soft Closing drawer slides, available in various lengths.",
    sku: "EP-DS-SC-ZNC",
    specs: [
      { key: "Color", value: "Zinc" },
      { key: "Available Sizes", value: "300MM, 350MM, 400MM, 450MM, 500MM, 550MM, 600MM" }
    ],
    keyFeatures: [
      "Soft closing mechanism",
      "Smooth and silent operation",
      "Zinc finish"
    ],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Zinc"
  },

  // --- SCREWS (Variations) ---
  {
    id: 801,
    name: "Chipboard Screws (Zinc) - 4x16",
    category: "Screws & Fasteners",
    price: 310,
    image: "https://www.scrooz.com.au/assets/full/CHP08032ZT.jpg?20240815160222",
    description: "Phillips bugle head chipboard screws. Box of 1000.",
    sku: "EP-CBS-16*4",
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Zinc"
  },
  {
    id: 802,
    name: "Chipboard Screws (Zinc) - 4x25",
    category: "Screws & Fasteners",
    price: 240,
    image: "https://www.scrooz.com.au/assets/full/CHP08032ZT.jpg?20240815160222",
    description: "Box of 500.",
    sku: "EP-CBS-25*4",
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Zinc"
  },
  {
    id: 803,
    name: "Drywall Screws (Black) - 3.5x25",
    category: "Screws & Fasteners",
    price: 264,
    image: "https://i.ebayimg.com/images/g/zg8AAOSwqIld-S1-/s-l1200.jpg",
    description: "Black phosphate drywall screws. Box of 800.",
    sku: "EP-DW-BLK-25*6",
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Black"
  },
  {
    id: 804,
    name: "Self Drilling Screws (Zinc) - 3.9x13",
    category: "Screws & Fasteners",
    price: 300,
    image: "https://m.media-amazon.com/images/I/51ue103aduL._AC_UF894,1000_QL80_.jpg",
    description: "CSK Phillips head self drilling screws. Box of 1000.",
    sku: "EP-SDS-13*7",
    inStock: true,
    createdAt: "2024-01-01",
    material: "Steel",
    color: "Zinc"
  },

  // --- PROFILES ---
  {
    id: 901,
    name: "Gola Profile Handle - Rose Gold",
    category: "Profiles",
    price: 2239,
    image: "https://s.alicdn.com/@sc04/kf/Hdfe5411564f546879c3ee1e2a5a5d7f6v/252472008/Hdfe5411564f546879c3ee1e2a5a5d7f6v.jpg",
    description: "Aluminum profile handle in Rose Gold finish.",
    sku: "EP-GS-EC-RGL",
    specs: [{ key: "Finish", value: "Rose Gold" }, { key: "Length", value: "3m (approx)" }],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Aluminum",
    color: "Rose Gold"
  },
  {
    id: 902,
    name: "Gola Profile Handle - Ceramic Black",
    category: "Profiles",
    price: 1899,
    image: "https://www.cocinasplus.com/wp-content/uploads/01_11_31385_24_Structura_406_M.webp",
    description: "Aluminum profile handle in Ceramic Black finish.",
    sku: "EP-GS-EC-CBK",
    specs: [{ key: "Finish", value: "Ceramic Black" }],
    inStock: true,
    createdAt: "2024-01-01",
    material: "Aluminum",
    color: "Black"
  },

  // --- ROLLING SHUTTERS ---
  {
    id: 903,
    name: "BLACK",
    category: "Rolling Shutters",
    color: "B/G/W",
    price: 12999,
    image: "https://via.placeholder.com/150",
    description: "PVC Rolling Shutter, Black color, H-1320 W-450.",
    sku: "EP-RS-BLK-1320x450",
    specs: [
      { key: "Material", value: "PVC" },
      { key: "Height", value: "1320" },
      { key: "Width", value: "450" }
    ],
    keyFeatures: [
      "Durable PVC material",
      "Smooth rolling mechanism",
      "Available in multiple colors"
    ],
    inStock: true,
    createdAt: "2024-01-01"
  },
  {
    id: 904,
    name: "GREY",
    category: "Rolling Shutters",
    color: "B/G/W",
    price: 13499,
    image: "https://via.placeholder.com/150",
    description: "PVC Rolling Shutter, Grey color, H-1320 W-600.",
    sku: "EP-RS-GRY-1320x600",
    specs: [
      { key: "Material", value: "PVC" },
      { key: "Height", value: "1320" },
      { key: "Width", value: "600" }
    ],
    keyFeatures: [
      "Durable PVC material",
      "Smooth rolling mechanism",
      "Available in multiple colors"
    ],
    inStock: true,
    createdAt: "2024-01-01"
  },
  {
    id: 905,
    name: "WHITE",
    category: "Rolling Shutters",
    color: "B/G/W",
    price: 0.00,
    image: "https://via.placeholder.com/150",
    description: "PVC Rolling Shutter, White color, H-1320 W-450.",
    sku: "EP-RS-WHT-1320x450",
    specs: [
      { key: "Material", value: "PVC" },
      { key: "Height", value: "1320" },
      { key: "Width", value: "450" }
    ],
    keyFeatures: [
      "Durable PVC material",
      "Smooth rolling mechanism",
      "Available in multiple colors"
    ],
    inStock: true,
    createdAt: "2024-01-01"
  },

  // --- DRAWER ACCESSORIES ---
  {
    id: 906,
    name: "Wicker - Natural Cane (100mm)",
    category: "Drawer Accessories",
    price: 5929,
    image: "https://via.placeholder.com/150",
    description: "Wicker basket in natural cane finish, 100mm width.",
    sku: "EP-DA-WKR-100",
    specs: [
      { key: "Material", value: "Wicker / Natural Cane" },
      { key: "Width", value: "100mm" },
      { key: "Height", value: "Available in 150mm, 200mm options" }
    ],
    inStock: true,
    createdAt: "2024-01-01"
  },
  {
    id: 907,
    name: "Wicker - Natural Cane (150mm)",
    category: "Drawer Accessories",
    price: 6449,
    image: "https://via.placeholder.com/150",
    description: "Wicker basket in natural cane finish, 150mm width.",
    sku: "EP-DA-WKR-150",
    specs: [
      { key: "Material", value: "Wicker / Natural Cane" },
      { key: "Width", value: "150mm" }
    ],
    inStock: true,
    createdAt: "2024-01-01"
  },
  {
    id: 908,
    name: "Wicker - Natural Cane (200mm)",
    category: "Drawer Accessories",
    price: 7129,
    image: "https://via.placeholder.com/150",
    description: "Wicker basket in natural cane finish, 200mm width.",
    sku: "EP-DA-WKR-200",
    specs: [
      { key: "Material", value: "Wicker / Natural Cane" },
      { key: "Width", value: "200mm" }
    ],
    inStock: true,
    createdAt: "2024-01-01"
  },
  {
    id: 909,
    name: "Anti Skid Matt",
    category: "Drawer Accessories",
    price: 2369,
    image: "https://via.placeholder.com/150",
    description: "Anti-skid mat for drawers and shelves.",
    sku: "EP-DA-ASM-GREYBLK",
    specs: [
      { key: "Color", value: "Grey/Black" },
      { key: "Height", value: "50cm" },
      { key: "Length", value: "5 Meter" }
    ],
    inStock: true,
    createdAt: "2024-01-01"
  },
  {
    id: 910,
    name: "PVC Cutlery Tray 450 System",
    category: "Drawer Accessories",
    price: 0,
    image: "https://via.placeholder.com/150",
    description: "PVC Cutlery Tray designed for 450mm drawer systems. Also compatible with 550, 650, 750, 850mm.",
    sku: "EP-DA-PCT-450",
    specs: [
      { key: "Color", value: "Grey" },
      { key: "For Cabinet Width", value: "450mm" },
      { key: "Compatible Widths", value: "450mm, 550mm, 650mm, 750mm, 850mm" }
    ],
    inStock: true,
    createdAt: "2024-01-01"
  },
  {
    id: 911,
    name: "PVC Cutlery Tray 550 System",
    category: "Drawer Accessories",
    price: 0,
    image: "https://via.placeholder.com/150",
    description: "PVC Cutlery Tray designed for 550mm drawer systems. Also compatible with 650mm.",
    sku: "EP-DA-PCT-550",
    specs: [
      { key: "Color", value: "Grey" },
      { key: "For Cabinet Width", value: "550mm" },
      { key: "Compatible Widths", value: "550mm, 650mm" }
    ],
    inStock: true,
    createdAt: "2024-01-01"
  },
  {
    id: 912,
    name: "Bowl Rack 500mm",
    category: "Drawer Accessories",
    price: 2449,
    image: "https://via.placeholder.com/150",
    description: "Stainless steel bowl rack organizer, 500mm.",
    sku: "EP-DA-BR-500",
    specs: [
      { key: "Size", value: "500mm" }
    ],
    inStock: true,
    createdAt: "2024-01-01"
  },
  {
    id: 913,
    name: "Bowl Rack 550mm",
    category: "Drawer Accessories",
    price: 2799,
    image: "https://via.placeholder.com/150",
    description: "Stainless steel bowl rack organizer, 550mm.",
    sku: "EP-DA-BR-550",
    specs: [
      { key: "Size", value: "550mm" }
    ],
    inStock: true,
    createdAt: "2024-01-01"
  },
  {
    id: 914,
    name: "Dish Rack 500mm",
    category: "Drawer Accessories",
    price: 3139,
    image: "https://via.placeholder.com/150",
    description: "Stainless steel dish rack organizer, 500mm.",
    sku: "EP-DA-DR-500",
    specs: [
      { key: "Size", value: "500mm" }
    ],
    inStock: true,
    createdAt: "2024-01-01"
  },
  {
    id: 915,
    name: "Dish Rack 550mm",
    category: "Drawer Accessories",
    price: 3499,
    image: "https://via.placeholder.com/150",
    description: "Stainless steel dish rack organizer, 550mm.",
    sku: "EP-DA-DR-550",
    specs: [
      { key: "Size", value: "550mm" }
    ],
    inStock: true,
    createdAt: "2024-01-01"
  },
  {
    id: 916,
    name: "Knife Stand",
    category: "Drawer Accessories",
    price: 699,
    image: "https://via.placeholder.com/150",
    description: "Compact knife stand organizer.",
    sku: "EP-DA-KS-150",
    specs: [
      { key: "Color", value: "Grey" },
      { key: "Size", value: "150mm" }
    ],
    inStock: true,
    createdAt: "2024-01-01"
  },
  {
    id: 917,
    name: "Spoon Holder",
    category: "Drawer Accessories",
    price: 599,
    image: "https://via.placeholder.com/150",
    description: "Cutlery spoon holder.",
    sku: "EP-DA-SH-GRY",
    specs: [
      { key: "Color", value: "Grey" }
    ],
    inStock: true,
    createdAt: "2024-01-01"
  },
  {
    id: 918,
    name: "Divider Box (100mm)",
    category: "Drawer Accessories",
    price: 1249,
    image: "https://via.placeholder.com/150",
    description: "Drawer divider box, 100mm width.",
    sku: "EP-DA-DB-100",
    specs: [
      { key: "Color", value: "Grey" },
      { key: "Dimensions", value: "L-410mm W-100mm" }
    ],
    inStock: true,
    createdAt: "2024-01-01"
  },
  {
    id: 919,
    name: "Divider Box (150mm)",
    category: "Drawer Accessories",
    price: 1379,
    image: "https://via.placeholder.com/150",
    description: "Drawer divider box, 150mm width.",
    sku: "EP-DA-DB-150",
    specs: [
      { key: "Color", value: "Grey" },
      { key: "Dimensions", value: "L-410mm W-150mm" }
    ],
    inStock: true,
    createdAt: "2024-01-01"
  },
  {
    id: 920,
    name: "Lid Holder",
    category: "Drawer Accessories",
    price: 1999,
    image: "https://via.placeholder.com/150",
    description: "Organizer for pot and pan lids.",
    sku: "EP-DA-LH-250",
    specs: [
      { key: "Color", value: "Grey" },
      { key: "Size", value: "250mm" }
    ],
    inStock: true,
    createdAt: "2024-01-01"
  }
];