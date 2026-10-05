import { Product } from '../types';

export const HERO_CAMPAIGN_IMAGE = '/src/assets/images/hero_footwear_campaign_1791195481474.jpg';
export const RUNNER_PULSE_IMAGE = '/src/assets/images/product_runner_pulse_1791195498979.jpg';
export const MINIMALIST_COURT_IMAGE = '/src/assets/images/product_minimalist_court_1791195514343.jpg';
export const TRAIL_RIDGE_IMAGE = '/src/assets/images/product_trail_ridge_1791195527346.jpg';
export const CARBON_MARATHON_IMAGE = '/src/assets/images/product_carbon_marathon_1791195541287.jpg';

export const SIZES_STANDARD = [
  { size: 7.0, inStock: true },
  { size: 7.5, inStock: true },
  { size: 8.0, inStock: true },
  { size: 8.5, inStock: true },
  { size: 9.0, inStock: true },
  { size: 9.5, inStock: true },
  { size: 10.0, inStock: true },
  { size: 10.5, inStock: true },
  { size: 11.0, inStock: true },
  { size: 11.5, inStock: false },
  { size: 12.0, inStock: true },
  { size: 13.0, inStock: true },
];

export const PRODUCTS: Product[] = [
  {
    id: 'aeroform-pulse-01',
    name: 'Aeroform Pulse 01',
    subtitle: 'High-Cadence Neutral Daily Road Trainer',
    category: 'running',
    categoryLabel: 'Road Running',
    price: 195,
    badge: 'Best Seller',
    rating: 4.9,
    reviewsCount: 142,
    heroImage: RUNNER_PULSE_IMAGE,
    gallery: [
      RUNNER_PULSE_IMAGE,
      HERO_CAMPAIGN_IMAGE,
    ],
    colorways: [
      { id: 'slate-chalk', name: 'Slate / Chalk Glaze', hex: '#cfd4dc', image: RUNNER_PULSE_IMAGE },
      { id: 'monochrome-black', name: 'Pitch Obsidian', hex: '#1e2124', image: RUNNER_PULSE_IMAGE },
      { id: 'desert-sage', name: 'Desert Sage / Bone', hex: '#8c9489', image: RUNNER_PULSE_IMAGE },
    ],
    availableSizes: SIZES_STANDARD,
    description:
      'Engineered for fluid tempo transitions and relentless road mileage. The Aeroform Pulse 01 harnesses our proprietary nitrogen-infused supercritical Aeroflex foam paired with a curved nylon propulsion cradle to return 83% mechanical energy return with every strike.',
    highlights: [
      'Supercritical Aeroflex nitrogen-infused midsole foam',
      'Dual-zone engineered circular knit upper with zoned lock-down',
      'Anatomical heel collar with Achilles relief channel',
      'Lugless liquid rubber road compound for wet-tarmac grip',
    ],
    specs: {
      weight: '215g / 7.6 oz (US 9)',
      heelDrop: '8mm',
      stackHeight: '36mm heel / 28mm forefoot',
      midsole: 'Aeroflex Supercritical EVA + Nylon Rocker',
      outsole: 'Micro-siped high-abrasion blown rubber',
      surface: 'Road, Pavement, Track',
    },
    fitNote: 'True to size. Standard medium D width with spacious ergonomic toe box.',
    isFeatured: true,
  },
  {
    id: 'cadence-carbon-evo',
    name: 'Cadence Carbon Evo',
    subtitle: 'Sub-2:10 Marathon Race Day Super-Shoe',
    category: 'racing',
    categoryLabel: 'Road Racing',
    price: 275,
    originalPrice: 295,
    badge: 'Race Legal (39.5mm)',
    rating: 5.0,
    reviewsCount: 88,
    heroImage: CARBON_MARATHON_IMAGE,
    gallery: [
      CARBON_MARATHON_IMAGE,
      HERO_CAMPAIGN_IMAGE,
    ],
    colorways: [
      { id: 'optic-volt', name: 'Optic Volt / Ice White', hex: '#b5f500', image: CARBON_MARATHON_IMAGE },
      { id: 'hyper-charcoal', name: 'Carbon Weave / Slate', hex: '#2b2d30', image: CARBON_MARATHON_IMAGE },
    ],
    availableSizes: SIZES_STANDARD.map(s => s.size === 13 ? { ...s, inStock: false } : s),
    description:
      'The definitive race weapon. Built around an ultra-rigid full-length 3K contoured carbon propulsion plate suspended between dual layers of PEBA foam. Calibrated specifically for high cadence efficiency over 42.195 kilometers.',
    highlights: [
      'Full-length 3D curved carbon-fiber propulsion plate',
      '100% bio-based ultra-light PEBA foam core (91% energy return)',
      'Single-layer featherweight ripstop monomesh upper (42g)',
      'Race-legal 39.5mm maximum stack height (World Athletics verified)',
    ],
    specs: {
      weight: '178g / 6.3 oz (US 9)',
      heelDrop: '6mm',
      stackHeight: '39.5mm heel / 33.5mm forefoot',
      midsole: 'Dual-density Dual-PEBA + 3K Carbon Plate',
      outsole: 'Targeted lightweight traction matrix',
      surface: 'Road Racing, Marathon, Half-Marathon',
    },
    fitNote: 'Racer-snug fit. For endurance road runs with thick socks, consider ordering a half size up.',
    isFeatured: true,
  },
  {
    id: 'terraform-ridge',
    name: 'Terraform Ridge',
    subtitle: 'Technical Mountain & Scree Trail Shoe',
    category: 'trail',
    categoryLabel: 'Trail & Off-Road',
    price: 210,
    badge: 'Vibram Megagrip',
    rating: 4.8,
    reviewsCount: 96,
    heroImage: TRAIL_RIDGE_IMAGE,
    gallery: [
      TRAIL_RIDGE_IMAGE,
      HERO_CAMPAIGN_IMAGE,
    ],
    colorways: [
      { id: 'granite-hazard', name: 'Granite / Hazard Ochre', hex: '#585954', image: TRAIL_RIDGE_IMAGE },
      { id: 'lichen-black', name: 'Lichen Green / Obsidian', hex: '#3d4439', image: TRAIL_RIDGE_IMAGE },
    ],
    availableSizes: SIZES_STANDARD,
    description:
      'Conquer erratic alpine terrain, loose scree, and technical singletracks. Equipped with 5mm directional multidirectional chevron lugs forged from Vibram Megagrip rubber, an embedded ballistic rock shield, and mud-shedding Matryx aramid upper.',
    highlights: [
      'Vibram Megagrip Litebase rubber with 5mm multidirectional lugs',
      'Ballistic TPU rock plate shield protecting forefoot from jagged stone',
      'Matryx aramid-fiber reinforced ripstop upper resists abrasion',
      'Gaiter attachment anchors and debris-deflecting tongue gusset',
    ],
    specs: {
      weight: '270g / 9.5 oz (US 9)',
      heelDrop: '5mm',
      stackHeight: '32mm heel / 27mm forefoot',
      midsole: 'Firm-rebound EVA compound + Forefoot TPU Rock Shield',
      outsole: 'Vibram Megagrip Litebase 5.0mm lugs',
      surface: 'Technical Trail, Mud, Scree, Mountain',
    },
    fitNote: 'True to size with secure midfoot lock and protective reinforced toe bumper.',
    isFeatured: true,
  },
  {
    id: 'monolith-court-low',
    name: 'Monolith Court Low',
    subtitle: 'Artisanal Full-Grain Italian Nubuck Sneaker',
    category: 'court',
    categoryLabel: 'Atelier Court',
    price: 240,
    badge: 'Hand-Finished in Civitanova',
    rating: 4.9,
    reviewsCount: 114,
    heroImage: MINIMALIST_COURT_IMAGE,
    gallery: [
      MINIMALIST_COURT_IMAGE,
      HERO_CAMPAIGN_IMAGE,
    ],
    colorways: [
      { id: 'chalk-bone', name: 'Chalk White / Warm Bone', hex: '#e8e5dc', image: MINIMALIST_COURT_IMAGE },
      { id: 'cast-shadow', name: 'Cast Shadow Grey', hex: '#4a4d52', image: MINIMALIST_COURT_IMAGE },
      { id: 'espresso-raw', name: 'Raw Espresso / Vachetta', hex: '#3d2e26', image: MINIMALIST_COURT_IMAGE },
    ],
    availableSizes: SIZES_STANDARD,
    description:
      'A masterclass in restraint. Sculpted from certified Gold-Rated Italian calf leather and fine suede panels. Features a stitched Margom natural rubber cupsole, vegetable-tanned calfskin lining, and an ergonomic memory-foam cork footbed that molds to your unique stride over time.',
    highlights: [
      'Hand-selected full-grain Italian calf leather and waxed nubuck',
      'Authentic stitched Margom vulcanized natural rubber cupsole',
      'Calfskin leather interior lining with breathable perforations',
      'Removable cork-backed anatomical memory foam footbed',
    ],
    specs: {
      weight: '340g / 12.0 oz (US 9)',
      heelDrop: '0mm (Zero Drop Neutral Platform)',
      stackHeight: '22mm uniform cupsole',
      midsole: 'Natural cork layer + Ortholite high-rebound cushioning',
      outsole: 'Stitched Margom natural rubber',
      surface: 'Urban, Gallery, Travel, Smart Casual',
    },
    fitNote: 'Slightly generous fit. If you are between sizes, we advise taking the smaller size.',
    isFeatured: true,
  },
  {
    id: 'aeroform-tempo-trainer',
    name: 'Aeroform Tempo Carbon',
    subtitle: 'Daily Speed Training & Interval Shoe',
    category: 'running',
    categoryLabel: 'Road Running',
    price: 215,
    badge: 'Speed Day',
    rating: 4.8,
    reviewsCount: 74,
    heroImage: HERO_CAMPAIGN_IMAGE,
    gallery: [
      HERO_CAMPAIGN_IMAGE,
      RUNNER_PULSE_IMAGE,
    ],
    colorways: [
      { id: 'raw-monolith', name: 'Aero White / Titanium', hex: '#d9dce1', image: HERO_CAMPAIGN_IMAGE },
      { id: 'solar-ember', name: 'Solar Ember / Charcoal', hex: '#e85d04', image: HERO_CAMPAIGN_IMAGE },
    ],
    availableSizes: SIZES_STANDARD,
    description:
      'The daily training counterpart to our marathon race-day shoe. Retains a flexible winged carbon plate with high-mileage resilient supercritical foam, delivering explosive toe-off durability for 800+ kilometers of interval work.',
    highlights: [
      'Forked carbon-composite propulsion plate tuned for high durability',
      'Dual-layer Aeroflex Pro rebound foam',
      'Griptec blown rubber targeted wear pads',
      'Laser-ventilated tongue with gusseted wrap',
    ],
    specs: {
      weight: '202g / 7.1 oz (US 9)',
      heelDrop: '7mm',
      stackHeight: '35mm heel / 28mm forefoot',
      midsole: 'Aeroflex Pro + Winged Carbon Composite Plate',
      outsole: 'Griptec segmented rubber pads',
      surface: 'Road, Track, Interval Workouts',
    },
    fitNote: 'True to size. Snug performance midfoot lock with room in forefoot.',
    isFeatured: false,
  }
];

export const CURRENCY_CONFIGS: Record<string, { code: 'USD' | 'EUR' | 'GBP'; symbol: string; rate: number }> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79 },
};

export const REVIEWS = [
  {
    id: 'rev-1',
    author: 'Elena Rostova',
    role: 'Olympic Trials Marathoner',
    shoe: 'Cadence Carbon Evo',
    quote: 'Logged 450km in the Cadence Carbon through heavy rain and road heat. The mechanical pop past kilometer 30 is unmatched by anything else on the market. Ran a 2:28 PR in Berlin.',
    rating: 5,
    verifiedMileage: '450 km logged',
    date: 'September 2026',
  },
  {
    id: 'rev-2',
    author: 'Marcus Vance',
    role: 'Ultra-Trail Mont-Blanc Finisher',
    shoe: 'Terraform Ridge',
    quote: 'Descending 1,200m of slick shale in Chamonix, the Vibram Litebase outsole dug in with absolute predictability. Zero hot spots or blackened toenails after 160km.',
    rating: 5,
    verifiedMileage: '820 km logged',
    date: 'August 2026',
  },
  {
    id: 'rev-3',
    author: 'Julian Chen',
    role: 'Architectural Director, Zurich',
    shoe: 'Monolith Court Low',
    quote: 'The Margom cupsole construction and Italian calf leather hold shape exceptionally well. Minimalist, sculptural, and after 8 months of daily studio wear, the patina is immaculate.',
    rating: 5,
    verifiedMileage: 'Daily wear / 8 mos',
    date: 'October 2026',
  }
];
