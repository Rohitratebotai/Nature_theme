// ─────────────────────────────────────────────────────────────────
// natureRetreatData.ts
// All content for the Aarav Mountain Retreat single-page website
// ─────────────────────────────────────────────────────────────────

export const siteInfo = {
  name: "Aarav Retreats",
  tagline: "Where the Himalayas Hold You Still",
  subTagline:
    "A sanctuary of ancient forests, glacial streams, and fire-lit evenings — nestled at 2,400 metres above the ordinary.",
  location: "Mukteshwar, Uttarakhand · 2,400m",
  phone: "+91 96508 48061",
  email: "stay@aaravretreats.in",
  instagram: "@aaravretreats",
  established: "Est. 1987",
  heroImage:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=80",
};

export const stats = [
  { value: 12, suffix: "",   label: "Unique Sanctuaries" },
  { value: 2400, suffix: "m", label: "Metres Altitude" },
  { value: 37, suffix: "",   label: "Years of Hospitality" },
  { value: 98, suffix: "%",  label: "Guest Satisfaction" },
];

export const about = {
  label: "Our Story",
  title: "Born from a Love of",
  titleItalic: "Untouched Mountains",
  body: [
    "Aarav Retreats began as a dream of two mountain wanderers who refused to believe that luxury and nature were opposites. Carved into the Kumaon hillside using local stone, reclaimed deodar wood, and traditions passed down through generations — every corner of this place breathes the mountain.",
    "Guests who arrive as strangers leave as something else entirely — quieter, slower, more rooted. The Himalayas have a way of doing that.",
  ],
  quote:
    "We didn't build a hotel in the mountains. We built a mountain home that opens its doors to those who are ready to listen.",
  image:
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80",
  imageAlt: "Mountain retreat interior",
};

export const rooms = [
  {
    id: 1,
    type: "Signature Suite",
    name: "The Forest Den",
    price: "₹18,000",
    description:
      "A cocoon of deodar wood and stone with floor-to-ceiling forest views. Your own fireplace. Your own silence.",
    beds: "1 King Bed",
    size: "65 sqm",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    amenities: ["Private Deck", "Fireplace", "Forest View", "Clawfoot Tub"],
  },
  {
    id: 2,
    type: "Panorama Suite",
    name: "Peak Horizon",
    price: "₹24,000",
    description:
      "Wake up to snow peaks framed in glass. A suite designed around the view — and nothing else.",
    beds: "1 King Bed",
    size: "80 sqm",
    image:
      "https://images.unsplash.com/photo-1518602164578-cd0074062767?auto=format&fit=crop&w=800&q=80",
    amenities: ["Panoramic Windows", "Private Plunge Pool", "Valley View", "Outdoor Shower"],
  },
  {
    id: 3,
    type: "Private Cottage",
    name: "Valley Hermitage",
    price: "₹32,000",
    description:
      "A standalone stone cottage in the pine forest. Private garden. Private life. Complete solitude.",
    beds: "2 Bedrooms",
    size: "120 sqm",
    image:
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
    amenities: ["Private Garden", "Butler Service", "Kitchenette", "Indoor Firepit"],
  },
];

export const experiences = [
  {
    id: 1,
    icon: "🧘",
    title: "Morning Yoga & Pranayama",
    description:
      "Sunrise sessions on our forest deck with a resident yoga teacher. Breath, movement, and the sound of birdsong.",
    duration: "90 min",
    time: "6:00 AM",
  },
  {
    id: 2,
    icon: "🥾",
    title: "Guided Forest Treks",
    description:
      "Half-day and full-day treks through rhododendron forests, glacial streams, and ancient shepherd paths.",
    duration: "4–8 hrs",
    time: "7:00 AM",
  },
  {
    id: 3,
    icon: "🍽️",
    title: "Farm-to-Fire Dining",
    description:
      "Meals from our organic kitchen garden. Fireside dinners under starlit skies. Flavours rooted in Kumaoni tradition.",
    duration: "2 hrs",
    time: "7:30 PM",
  },
  {
    id: 4,
    icon: "🌊",
    title: "River Immersion Rituals",
    description:
      "Cold-water river bathing guided by local healers. Ancient purification rituals in glacial mountain streams.",
    duration: "60 min",
    time: "8:00 AM",
  },
  {
    id: 5,
    icon: "🎨",
    title: "Artisan Craft Circles",
    description:
      "Traditional Kumaoni weaving, dyeing, and pottery with local artisans. A living tradition kept alive.",
    duration: "2 hrs",
    time: "3:00 PM",
  },
  {
    id: 6,
    icon: "🔭",
    title: "Himalayan Stargazing",
    description:
      "Clear skies at 2,400m reveal a cosmos few ever witness. Expert-guided sessions with telescope under dark skies.",
    duration: "2 hrs",
    time: "9:00 PM",
  },
];

export const gallery = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
    caption: "The Valley",
    span: "tall",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=700&q=80",
    caption: "Forest Path",
    span: "normal",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=700&q=80",
    caption: "Morning Mist",
    span: "normal",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=700&q=80",
    caption: "Glacial Stream",
    span: "normal",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=700&q=80",
    caption: "Infinity Pool",
    span: "normal",
  },
];

export const testimonials = [
  {
    id: 1,
    stars: 5,
    text: "I arrived exhausted from the city and left feeling like the mountains had washed me clean. Aarav isn't just a hotel — it's a perspective shift.",
    author: "Priya M.",
    location: "Mumbai",
    date: "September 2024",
  },
  {
    id: 2,
    stars: 5,
    text: "The forest trek at dawn, the fire-lit dinner, the silence at night — we didn't look at our phones once. That alone is worth everything.",
    author: "Arjun & Neeha",
    location: "Bangalore",
    date: "July 2024",
  },
  {
    id: 3,
    stars: 5,
    text: "Nothing prepares you for waking up to those peaks. The staff remembered my name, my preferences, my story. Genuinely remarkable hospitality.",
    author: "Sarah L.",
    location: "London",
    date: "March 2024",
  },
];

export const navLinks = [
  { label: "Story",       href: "#about" },
  { label: "Sanctuaries", href: "#rooms" },
  { label: "Experiences", href: "#experiences" },
  { label: "Gallery",     href: "#gallery" },
];

export const footerLinks = {
  navigate: [
    { label: "Our Story",    href: "#about" },
    { label: "Sanctuaries",  href: "#rooms" },
    { label: "Experiences",  href: "#experiences" },
    { label: "Gallery",      href: "#gallery" },
  ],
  stay: [
    { label: "Forest Den",       href: "#rooms" },
    { label: "Peak Horizon",     href: "#rooms" },
    { label: "Valley Hermitage", href: "#rooms" },
    { label: "Group Bookings",   href: "#contact" },
  ],
  connect: [
    { label: "Instagram",     href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms",          href: "#" },
    { label: "Careers",        href: "#" },
  ],
};