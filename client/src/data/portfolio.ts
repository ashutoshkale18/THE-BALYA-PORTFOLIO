export interface Profile {
  name: string;
  dob: string;
  location: string;
  instagram: string;
  email: string;
  linkedin: string;
  bio: string;
  status: string;
  resumeYear: string;
  services: string[];
  education: Array<{ institution: string }>;
  experience: Array<{
    id: string;
    company: string;
    role: string;
    period: string;
    highlights: string[];
    shortVersion?: string;
  }>;
}

export interface GalleryItem {
  type: 'video' | 'image';
  src: string;
  poster?: string; // for video only
  label?: string;
}

export interface ProjectItem {
  id: string;
  num: string;
  slug: string;
  title: string;
  category: string;
  featured: boolean;
  image: string;
  video?: string;
  year?: string;
  client?: string;
  description: string;
  link: string;
  gallery?: GalleryItem[];
}

export interface BrandItem {
  name: string;
  logo: string;
}

export interface SoftwareItem {
  name: string;
  icon: string;
  tag: string;
}

export const initialProfile: Profile = {
  name: "ARYAN NIKAM",
  dob: "09/08/2004",
  location: "MUMBAI, INDIA",
  instagram: "@thebalya",
  email: "aryannikam7556@gmail.com",
  linkedin: "https://www.linkedin.com/in/aryan-nikam/",
  status: "CREATIVE / AI VISUAL DEVELOPMENT",
  resumeYear: "2026",
  bio: "Multidisciplinary creative working at the intersection of AI, motion, and visual storytelling. I craft bold, future-forward visuals that translate complex ideas into impactful brand communication. Driven by experimentation and emerging tools, I build work that blends technology with strong narrative thinking.",
  services: [
    "AI VISUAL DEVELOPMENT",
    "AI VIDEOS",
    "CAMPAIGNS",
    "ILLUSTRATION",
    "AGENTIC AI INTEGRATION"
  ],
  education: [
    { institution: "SIR JJ SCHOOL OF DESIGN" }
  ],
  experience: [
    {
      id: "exp-01",
      company: "LEO BURNETT",
      role: "Art Intern",
      period: "04.2025 – 05.2025",
      highlights: [
        "Worked on Flipkart \"Not Out Deals\" campaign, contributing to visual and campaign assets.",
        "Created illustration assets for Flipkart Minutes."
      ],
      shortVersion: "LEO BURNETT — Art Intern | 04.2025–05.2025 • Flipkart \"Not Out Deals\" • Flipkart Minutes Illustrations"
    },
    {
      id: "exp-02",
      company: "ID8NXT",
      role: "AI Consultant",
      period: "11.2025 – 08.2026",
      highlights: [
        "AWS Book Screening — \"Mahishasura\"",
        "Flipkart \"Nachoo Nachoo\" Campaign — Developed AI-assisted video visuals.",
        "Adhantar — AI-assisted short film.",
        "Abby Zoozoo — AI-assisted content for YouTube channel."
      ],
      shortVersion: "ID8NXT — AI Consultant | 11.2025–08.2026 • AWS \"Mahishasura\" • Flipkart \"Nachoo Nachoo\" • Adhantar • Abby Zoozoo"
    },
    {
      id: "exp-03",
      company: "WISE GAYS FILMS",
      role: "AI Consultant",
      period: "07.2026 – 08.2026",
      highlights: [
        "GM Modular — Created AI-assisted campaign visuals."
      ],
      shortVersion: "WISE GAYS FILMS — AI Consultant | 07.2026–08.2026 • GM Modular — AI Visuals"
    }
  ]
};

export const initialBrands: BrandItem[] = [
  { name: "Flipkart", logo: "/assets/brand logoes/brand logoes-01.png" },
  { name: "AWS", logo: "/assets/brand logoes/brand logoes-02.png" },
  { name: "Leo Burnett", logo: "/assets/brand logoes/brand logoes-03.png" },
  { name: "GM Modular", logo: "/assets/brand logoes/brand logoes-05.png" },
  { name: "Wise Guys", logo: "/assets/brand logoes/brand logoes-04.png" }
];

export const initialSoftwares: SoftwareItem[] = [
  { name: "Photoshop", icon: "/assets/software logoes/software-01.png", tag: "Ps" },
  { name: "Premiere Pro", icon: "/assets/software logoes/software-02.png", tag: "Pr" },
  { name: "After Effects", icon: "/assets/software logoes/software-03.png", tag: "Ae" },
  { name: "Illustrator", icon: "/assets/software logoes/software-04.png", tag: "Ai" },
  { name: "CapCut", icon: "/assets/software logoes/software-05.png", tag: "C" },
  { name: "Runway ML", icon: "/assets/software logoes/software-06.png", tag: "R" },
  { name: "Gen AI Suite", icon: "/assets/software logoes/software-07.png", tag: "AI" },
  { name: "Midjourney", icon: "/assets/software logoes/software-08.png", tag: "Mj" },
  { name: "Figma", icon: "/assets/software logoes/software-09.png", tag: "Fg" }
];


export const initialProjects: ProjectItem[] = [
  {
    id: "project-01",
    num: "01",
    slug: "adhantar-short-film",
    title: "ADHANTAR SHORT FILM",
    category: "AI-assisted Short Film",
    featured: false,
    image: "/assets/work_videos/ADHANTAR_STILLS/adhantar_still_1.jpg",
    video: "/assets/work_videos/ADHANTAR_SHORT_FILM.mp4",
    year: "2026",
    client: "ID8NXT",
    description: "Adhantar AI-assisted Short Film investigating cognitive surrealism, experimental cinematography, and modern digital identity.",
    link: "#",
    gallery: [
      { type: "video", src: "/assets/work_videos/ADHANTAR_SHORT_FILM.mp4", poster: "/assets/work_videos/ADHANTAR_STILLS/adhantar_still_1.jpg", label: "01 — Short Film" },
      { type: "image", src: "/assets/work_videos/ADHANTAR_STILLS/adhantar_still_1.jpg", label: "02 — Production Still 01" },
      { type: "image", src: "/assets/work_videos/ADHANTAR_STILLS/adhantar_still_2.jpg", label: "03 — Production Still 02" },
      { type: "image", src: "/assets/work_videos/ADHANTAR_STILLS/adhantar_still_3.jpg", label: "04 — Production Still 03" },
      { type: "image", src: "/assets/work_videos/ADHANTAR_STILLS/adhantar_still_4.jpg", label: "05 — Production Still 04" },
      { type: "image", src: "/assets/work_videos/ADHANTAR_STILLS/adhantar_still_5.jpg", label: "06 — Production Still 05" },
      { type: "image", src: "/assets/work_videos/ADHANTAR_STILLS/adhantar_still_6.jpg", label: "07 — Production Still 06" }
    ]
  },
  {
    id: "project-02",
    num: "02",
    slug: "gm-modular",
    title: "GM MODULAR",
    category: "AI Visuals / Commercial",
    featured: false,
    image: "/assets/work_videos/GM_MODULAR/gmframes1.png",
    year: "2026",
    client: "GM Modular (via Wise Gays Films)",
    description: "GM Modular AI-driven commercial visual aesthetics and high-fidelity production staging.",
    link: "#",
    gallery: [
      { type: "image", src: "/assets/work_videos/GM_MODULAR/gmframes1.png",  label: "01 — Frame 01" },
      { type: "image", src: "/assets/work_videos/GM_MODULAR/gmframes2.png",  label: "02 — Frame 02" },
      { type: "image", src: "/assets/work_videos/GM_MODULAR/gmframes3.png",  label: "03 — Frame 03" },
      { type: "image", src: "/assets/work_videos/GM_MODULAR/gmframes4.png",  label: "04 — Frame 04" },
      { type: "image", src: "/assets/work_videos/GM_MODULAR/gmframes5.png",  label: "05 — Frame 05" },
      { type: "image", src: "/assets/work_videos/GM_MODULAR/gmframes6.png",  label: "06 — Frame 06" },
      { type: "image", src: "/assets/work_videos/GM_MODULAR/gmframes7.png",  label: "07 — Frame 07" },
      { type: "image", src: "/assets/work_videos/GM_MODULAR/gmframes8.png",  label: "08 — Frame 08" },
      { type: "image", src: "/assets/work_videos/GM_MODULAR/gmframes9.png",  label: "09 — Frame 09" },
      { type: "image", src: "/assets/work_videos/GM_MODULAR/gmframes10.png", label: "10 — Frame 10" },
      { type: "image", src: "/assets/work_videos/GM_MODULAR/gmframes11.png", label: "11 — Frame 11" },
      { type: "image", src: "/assets/work_videos/GM_MODULAR/gmframes12.png", label: "12 — Frame 12" },
      { type: "image", src: "/assets/work_videos/GM_MODULAR/gmframes13.png", label: "13 — Frame 13" },
      { type: "image", src: "/assets/work_videos/GM_MODULAR/gmframes14.png", label: "14 — Frame 14" }
    ]
  },
  {
    id: "project-03",
    num: "03",
    slug: "flipkart-not-out-deals",
    title: 'FLIPKART "NOT OUT DEALS" CAMPAIGN',
    category: "Illustration / Campaign Execution",
    featured: true,
    image: "/assets/work_videos/FLIPKART_NOT_OUT_DEALS/flipcart_portfolio-01.jpg",
    video: "/assets/work_videos/FLIPKART_NOT_OUT_DEALS/Flipkart_Not_Out_Deals.mp4",
    year: "2025",
    client: "Flipkart (via Leo Burnett)",
    description: 'Worked on Flipkart "Not Out Deals" campaign, contributing to visual and campaign assets. Bold digital iconography and sports-themed promotional illustrations.',
    link: "#",
    gallery: [
      { type: "video", src: "/assets/work_videos/FLIPKART_NOT_OUT_DEALS/Flipkart_Not_Out_Deals.mp4", poster: "/assets/work_videos/FLIPKART_NOT_OUT_DEALS/flipcart_portfolio-01.jpg", label: "01 — Campaign Film" },
      { type: "image", src: "/assets/work_videos/FLIPKART_NOT_OUT_DEALS/flipcart_portfolio-01.jpg", label: "02 — Key Art 01" },
      { type: "image", src: "/assets/work_videos/FLIPKART_NOT_OUT_DEALS/flipcart_portfolio-02.jpg", label: "03 — Key Art 02" },
      { type: "image", src: "/assets/work_videos/FLIPKART_NOT_OUT_DEALS/flipcart_portfolio-03.jpg", label: "04 — Key Art 03" },
      { type: "image", src: "/assets/work_videos/FLIPKART_NOT_OUT_DEALS/flipcart_portfolio-04.jpg", label: "05 — Key Art 04" },
      { type: "image", src: "/assets/work_videos/FLIPKART_NOT_OUT_DEALS/flipcart_portfolio-05.jpg", label: "06 — Key Art 05" },
      { type: "image", src: "/assets/work_videos/FLIPKART_NOT_OUT_DEALS/flipcart_portfolio-06.jpg", label: "07 — Key Art 06" },
      { type: "image", src: "/assets/work_videos/FLIPKART_NOT_OUT_DEALS/flipcart_portfolio-07.jpg", label: "08 — Key Art 07" },
      { type: "image", src: "/assets/work_videos/FLIPKART_NOT_OUT_DEALS/flipcart_portfolio-08.jpg", label: "09 — Key Art 08" },
      { type: "image", src: "/assets/work_videos/FLIPKART_NOT_OUT_DEALS/flipcart_portfolio-09.jpg", label: "10 — Key Art 09" },
      { type: "image", src: "/assets/work_videos/FLIPKART_NOT_OUT_DEALS/flipcart_portfolio-10.jpg", label: "11 — Key Art 10" }
    ]
  },
  {
    id: "project-04",
    num: "04",
    slug: "flipkart-bachat-utsav",
    title: 'FLIPKART "BACHAT UTSAV" CAMPAIGN',
    category: "AI Video / Campaign Visuals",
    featured: true,
    image: "/assets/work_videos/BACHAT_UTSAV_STILLS/bachat_still_1.jpg",
    video: "/assets/work_videos/Flipkart_Bachat_Utsav_0_Commission_.mp4",
    year: "2025",
    client: "Flipkart (via ID8NXT)",
    description: 'Flipkart "Bachat Utsav" 0 Commission campaign, developing AI-assisted video visuals, dynamic camera movement, and festive high-energy promotional sequences.',
    link: "#",
    gallery: [
      { type: "video", src: "/assets/work_videos/Flipkart_Bachat_Utsav_0_Commission_.mp4", poster: "/assets/work_videos/BACHAT_UTSAV_STILLS/bachat_still_1.jpg", label: "01 — Campaign Film" },
      { type: "image", src: "/assets/work_videos/BACHAT_UTSAV_STILLS/bachat_still_1.jpg", label: "02 — Campaign Visual 01" },
      { type: "image", src: "/assets/work_videos/BACHAT_UTSAV_STILLS/bachat_still_2.jpg", label: "03 — Campaign Visual 02" },
      { type: "image", src: "/assets/work_videos/BACHAT_UTSAV_STILLS/bachat_still_3.jpg", label: "04 — Campaign Visual 03" },
      { type: "image", src: "/assets/work_videos/BACHAT_UTSAV_STILLS/bachat_still_4.jpg", label: "05 — Campaign Visual 04" },
      { type: "image", src: "/assets/work_videos/BACHAT_UTSAV_STILLS/bachat_still_5.jpg", label: "06 — Campaign Visual 05" },
      { type: "image", src: "/assets/work_videos/BACHAT_UTSAV_STILLS/bachat_still_6.jpg", label: "07 — Campaign Visual 06" }
    ]
  },
  {
    id: "project-05",
    num: "05",
    slug: "aws-book-screening-mahishasura",
    title: 'AWS BOOK SCREENING — "MAHISHASURA"',
    category: "AI Visuals / Event Content",
    featured: true,
    image: "/assets/work_videos/MAHISHASUR_STILLS/mahishasur_still_1.jpg",
    video: "/assets/work_videos/MAHISHASUR_BOOK_INTRO_SCREENING_AWS_02.mp4",
    year: "2025",
    client: "Amazon Web Services (via ID8NXT)",
    description: 'AWS Book Screening — "Mahishasura". Epic mythological architecture, atmospheric dusk illumination, and monumental worldbuilding produced through advanced AI generative synthesis.',
    link: "#",
    gallery: [
      { type: "video", src: "/assets/work_videos/MAHISHASUR_BOOK_INTRO_SCREENING_AWS_02.mp4", poster: "/assets/work_videos/MAHISHASUR_STILLS/mahishasur_still_1.jpg", label: "01 — Screening Film" },
      { type: "image", src: "/assets/work_videos/MAHISHASUR_STILLS/mahishasur_still_1.jpg", label: "02 — Screening Visual 01" },
      { type: "image", src: "/assets/work_videos/MAHISHASUR_STILLS/mahishasur_still_2.jpg", label: "03 — Screening Visual 02" },
      { type: "image", src: "/assets/work_videos/MAHISHASUR_STILLS/mahishasur_still_3.jpg", label: "04 — Screening Visual 03" },
      { type: "image", src: "/assets/work_videos/MAHISHASUR_STILLS/mahishasur_still_4.jpg", label: "05 — Screening Visual 04" },
      { type: "image", src: "/assets/work_videos/MAHISHASUR_STILLS/mahishasur_still_5.jpg", label: "06 — Screening Visual 05" },
      { type: "image", src: "/assets/work_videos/MAHISHASUR_STILLS/mahishasur_still_6.jpg", label: "07 — Screening Visual 06" }
    ]
  },
  {
    id: "project-06",
    num: "06",
    slug: "stage-screening-synergy",
    title: 'STAGE SCREENING — "SYNERGY"',
    category: "Stage & Event Visuals",
    featured: false,
    image: "/assets/work_videos/SYNERGY_STILLS/synergy_still_01_1.jpg",
    year: "2025",
    client: "Live Events & Production",
    description: "Synchronized multi-display visual identity and motion loops designed for experiential stage presence.",
    link: "#",
    gallery: [
      { type: "image", src: "/assets/work_videos/SYNERGY_STILLS/synergy_still_01_1.jpg", label: "01 — Stage Display 01" },
      { type: "image", src: "/assets/work_videos/SYNERGY_STILLS/synergy_still_01_2.jpg", label: "02 — Stage Display 02" },
      { type: "image", src: "/assets/work_videos/SYNERGY_STILLS/synergy_still_02_1.jpg", label: "03 — Stage Display 03" },
      { type: "image", src: "/assets/work_videos/SYNERGY_STILLS/synergy_still_03_1.jpg", label: "04 — Stage Display 04" },
      { type: "video", src: "/assets/work_videos/SYNERGY/synergyscreening (1).mp4",  label: "05 — Screening Motion 01" },
      { type: "video", src: "/assets/work_videos/SYNERGY/synergyscreening (2).mp4",  label: "06 — Screening Motion 02" },
      { type: "video", src: "/assets/work_videos/SYNERGY/synergyscreening (3).mp4",  label: "07 — Screening Motion 03" },
      { type: "video", src: "/assets/work_videos/SYNERGY/synergyscreening (5).mp4",  label: "08 — Screening Motion 04" },
      { type: "video", src: "/assets/work_videos/SYNERGY/synergyscreening (6).mp4",  label: "09 — Screening Motion 05" },
      { type: "video", src: "/assets/work_videos/SYNERGY/synergyscreening (7).mp4",  label: "10 — Screening Motion 06" },
      { type: "video", src: "/assets/work_videos/SYNERGY/synergyscreening (8).mp4",  label: "11 — Screening Motion 07" },
      { type: "video", src: "/assets/work_videos/SYNERGY/synergyscreening (9).mp4",  label: "12 — Screening Motion 08" },
      { type: "video", src: "/assets/work_videos/SYNERGY/synergyscreening (10).mp4", label: "13 — Screening Motion 09" },
      { type: "video", src: "/assets/work_videos/SYNERGY/synergyscreening (11).mp4", label: "14 — Screening Motion 10" },
      { type: "video", src: "/assets/work_videos/SYNERGY/synergyscreening (12).mp4", label: "15 — Screening Motion 11" },
      { type: "video", src: "/assets/work_videos/SYNERGY/synergyscreening (13).mp4", label: "16 — Screening Motion 12" },
      { type: "video", src: "/assets/work_videos/SYNERGY/synergyscreening1.mp4",     label: "17 — Screening Motion 13" }
    ]
  },
  {
    id: "project-07",
    num: "07",
    slug: "street-hustle",
    title: "STREET HUSTLE",
    category: "Visual Storytelling",
    featured: false,
    image: "/assets/work_videos/STREET_HUSTLE/STREET_HUSTLE1.jpeg",
    year: "2024",
    client: "Personal Editorial",
    description: "Urban street culture study translated through high-contrast monochrome brutalist compositions.",
    link: "#",
    gallery: [
      { type: "image", src: "/assets/work_videos/STREET_HUSTLE/STREET_HUSTLE1.jpeg", label: "01 — Street Study 01" },
      { type: "image", src: "/assets/work_videos/STREET_HUSTLE/STREET_HUSTLE2.png",  label: "02 — Street Study 02" },
      { type: "image", src: "/assets/work_videos/STREET_HUSTLE/STREET_HUSTLE3.jpeg", label: "03 — Street Study 03" },
      { type: "image", src: "/assets/work_videos/STREET_HUSTLE/STREET_HUSTLE4.jpeg", label: "04 — Street Study 04" },
      { type: "image", src: "/assets/work_videos/STREET_HUSTLE/STREET_HUSTLE5.png",  label: "05 — Street Study 05" },
      { type: "image", src: "/assets/work_videos/STREET_HUSTLE/STREET_HUSTLE6.jpeg", label: "06 — Street Study 06" },
      { type: "image", src: "/assets/work_videos/STREET_HUSTLE/STREET_HUSTLE7.png",  label: "07 — Street Study 07" },
      { type: "image", src: "/assets/work_videos/STREET_HUSTLE/STREET_HUSTLE8.png",  label: "08 — Street Study 08" },
      { type: "image", src: "/assets/work_videos/STREET_HUSTLE/STREET_HUSTLE9.png",  label: "09 — Street Study 09" }
    ]
  },
  {
    id: "project-09",
    num: "09",
    slug: "abby-zoozoo",
    title: "ABBY ZOOZOO",
    category: "AI Content / YouTube",
    featured: false,
    image: "/assets/work_videos/ABBY_ZOOZOO_STILLS/zoozoo_still_1.jpg",
    video: "/assets/work_videos/abby_zoozoo.mp4",
    year: "2026",
    client: "ID8NXT",
    description: "Abby ZooZoo — AI-assisted content series created for YouTube channel, blending character-driven storytelling with generative visual production.",
    link: "#",
    gallery: [
      { type: "video", src: "/assets/work_videos/abby_zoozoo.mp4", poster: "/assets/work_videos/ABBY_ZOOZOO_STILLS/zoozoo_still_1.jpg", label: "01 — Film" },
      { type: "image", src: "/assets/work_videos/ABBY_ZOOZOO_STILLS/zoozoo_still_1.jpg", label: "02 — Character Still 01" },
      { type: "image", src: "/assets/work_videos/ABBY_ZOOZOO_STILLS/zoozoo_still_2.jpg", label: "03 — Character Still 02" },
      { type: "image", src: "/assets/work_videos/ABBY_ZOOZOO_STILLS/zoozoo_still_3.jpg", label: "04 — Character Still 03" },
      { type: "image", src: "/assets/work_videos/ABBY_ZOOZOO_STILLS/zoozoo_still_4.jpg", label: "05 — Character Still 04" },
      { type: "image", src: "/assets/work_videos/ABBY_ZOOZOO_STILLS/zoozoo_still_5.jpg", label: "06 — Character Still 05" },
      { type: "image", src: "/assets/work_videos/ABBY_ZOOZOO_STILLS/zoozoo_still_6.jpg", label: "07 — Character Still 06" }
    ]
  },
  {
    id: "project-08",
    num: "10",
    slug: "art-works",
    title: "ART WORKS",
    category: "Experimental / AI Lab",
    featured: false,
    image: "/assets/work_videos/artworks/artworks 1.jpg",
    year: "2024-2026",
    client: "Lab Research",
    description: "Archive of generative explorations, typography experiments, character designs, and motion studies.",
    link: "#",
    gallery: [
      { type: "image", src: "/assets/work_videos/artworks/artworks 1.jpg",  label: "01 — Artwork 01" },
      { type: "image", src: "/assets/work_videos/artworks/artworks 2.jpg",  label: "02 — Artwork 02" },
      { type: "image", src: "/assets/work_videos/artworks/artworks 3.jpg",  label: "03 — Artwork 03" },
      { type: "image", src: "/assets/work_videos/artworks/artworks 4.jpeg", label: "04 — Artwork 04" },
      { type: "image", src: "/assets/work_videos/artworks/artworks 5.png",  label: "05 — Artwork 05" },
      { type: "image", src: "/assets/work_videos/artworks/artworks 6.jpeg", label: "06 — Artwork 06" },
      { type: "image", src: "/assets/work_videos/artworks/artworks 7.png",  label: "07 — Artwork 07" },
      { type: "image", src: "/assets/work_videos/artworks/artworks 8.png",  label: "08 — Artwork 08" },
      { type: "image", src: "/assets/work_videos/artworks/artworks 9.png",  label: "09 — Artwork 09" },
      { type: "image", src: "/assets/work_videos/artworks/artworks 10.png", label: "10 — Artwork 10" },
      { type: "image", src: "/assets/work_videos/artworks/artworks 11.png", label: "11 — Artwork 11" }
    ]
  }
];
