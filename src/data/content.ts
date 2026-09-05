/* ------------------------------------------------------------------ */
/*  VOLTA — editorial content model                                    */
/* ------------------------------------------------------------------ */

/** Campaign photography — consistent high-contrast film grade. */
export const images = {
  hero01: "https://image.qwenlm.ai/generated-images/82b6ac84-3fee-4f9a-81cb-c0b39c3c1c15/_result.png",
  hero02: "https://image.qwenlm.ai/generated-images/6d86281a-19e6-45a2-851b-fa90c1341765/_result.png",
  hero03: "https://image.qwenlm.ai/generated-images/021a7ac7-23b6-4f64-9097-97c093ce9f74/_result.png",
  hero04: "https://image.qwenlm.ai/generated-images/608162d9-a055-4098-b158-f3c698ec9e7f/_result.png",
  hero05: "https://image.qwenlm.ai/generated-images/9282a1d7-1e85-48aa-b7b3-1e50bfb42e8c/_result.png",
  look01: "https://image.qwenlm.ai/generated-images/ea5b09f9-7ad5-4234-a034-677568beb916/_result.png",
  look02: "https://image.qwenlm.ai/generated-images/bea55f12-085a-47c0-8859-6cb65d27f8fc/_result.png",
  look03: "https://image.qwenlm.ai/generated-images/1037f52d-2549-4077-ac4f-4a6aa3c2e540/_result.png",
  look04: "https://image.qwenlm.ai/generated-images/13e25919-ef0f-4b78-a4a3-1524498ec383/_result.png",
  look05: "https://image.qwenlm.ai/generated-images/88d7364f-505b-4422-a55c-b500576bd2cc/_result.png",
} as const;

export interface HeroSlide {
  image: string;
  word: string;
  alt: string;
  objectPosition?: string;
}

export const heroSlides: HeroSlide[] = [
  {
    image: images.hero01,
    word: "BOLD",
    alt: "Model in a structured oversized blazer under hard side light, black and white campaign",
  },
  {
    image: images.hero02,
    word: "FEARLESS",
    alt: "Model mid-motion with fabric billowing through the studio air",
  },
  {
    image: images.hero03,
    word: "YOURS",
    alt: "Lone silhouette against a brutalist concrete wall with a long shadow",
    objectPosition: "center 30%",
  },
  {
    image: images.hero04,
    word: "RAW",
    alt: "Close portrait half in shadow, chiaroscuro beauty campaign",
  },
  {
    image: images.hero05,
    word: "NOW",
    alt: "Model walking toward camera down a backlit concrete corridor",
  },
];

/* ------------------------------------------------------------------ */

export interface Look {
  image: string;
  title: string;
  meta: string;
  alt: string;
}

/** Home — featured lookbook, one dominant frame + four satellites. */
export const featuredLooks: Look[] = [
  {
    image: images.hero02,
    title: "Silhouette in Motion",
    meta: "EDITORIAL 01 — FW25",
    alt: "Editorial frame of fabric in motion around a moving model",
  },
  {
    image: images.look01,
    title: "Signal Study",
    meta: "CAPSULE — 001",
    alt: "Model in the electric yellow signal coat against a dark studio",
  },
  {
    image: images.hero04,
    title: "Raw Portrait",
    meta: "CAMPAIGN — SS25",
    alt: "Unretouched close portrait in hard light",
  },
  {
    image: images.look03,
    title: "The Seam",
    meta: "DETAIL — ATELIER",
    alt: "Hands adjusting pleated black fabric in the atelier",
  },
  {
    image: images.hero05,
    title: "Corridor",
    meta: "CAMPAIGN — FW25",
    alt: "Long coat silhouette walking a backlit concrete corridor",
  },
];

/* ------------------------------------------------------------------ */

export interface Piece {
  name: string;
  fabric: string;
}

export interface CollectionImage {
  src: string;
  alt: string;
  caption: string;
}

export interface Collection {
  slug: string;
  title: string;
  season: string;
  index: string;
  image: string;
  alt: string;
  statement: string;
  description: string;
  pieces: Piece[];
  editorial: CollectionImage[];
}

export const collections: Collection[] = [
  {
    slug: "form-01",
    title: "FORM / 01",
    season: "AUTUMN—WINTER 2025",
    index: "01",
    image: images.hero01,
    alt: "Structured blazer with exaggerated shoulders, FORM / 01 campaign",
    statement: "Structure is a language. We speak it fluently.",
    description:
      "Cut from heavy double-face wool and pressed to a knife edge, FORM / 01 treats the body as architecture. Shoulder lines extend past the body's own; hems fall where geometry — not habit — demands. Nothing soft. Nothing accidental.",
    pieces: [
      { name: "THE MONOLITH COAT", fabric: "DOUBLE-FACE WOOL" },
      { name: "AXIS TROUSER", fabric: "PRESSED GABARDINE" },
      { name: "PLAN TURTLENECK", fabric: "MERINO RIB" },
      { name: "GRID SCARF", fabric: "SILK TWILL" },
    ],
    editorial: [
      {
        src: images.look04,
        alt: "Full-length sculptural dress under a hard top light",
        caption: "FRAME 02 — STANCE, PARIS STUDIO",
      },
      {
        src: images.look03,
        alt: "Macro view of pleats being set by hand",
        caption: "FRAME 03 — PLEAT SETTING, ATELIER",
      },
      {
        src: images.hero03,
        alt: "Silhouette and shadow against a concrete wall",
        caption: "FRAME 04 — SHADOW STUDY, ON LOCATION",
      },
    ],
  },
  {
    slug: "after-dark",
    title: "AFTER DARK",
    season: "FW25 — NOIR SERIES",
    index: "02",
    image: images.look02,
    alt: "Two models in dark tailoring standing in low-key light with smoke",
    statement: "Night has a dress code. We wrote it.",
    description:
      "A study in black on black: liquid tailoring, smoked transparencies, hardware that catches light only when you move. AFTER DARK is what happens when the office lights die and the real uniform comes out.",
    pieces: [
      { name: "SMOKED BLAZER", fabric: "WOOL MOHAIR" },
      { name: "SECOND SKIN DRESS", fabric: "BONDED JERSEY" },
      { name: "HOUR TROUSER", fabric: "MATTE CREPE" },
      { name: "SIGNAL SHIRT", fabric: "SILK ORGANZA" },
    ],
    editorial: [
      {
        src: images.hero05,
        alt: "Backlit figure in a long coat inside a corridor",
        caption: "FRAME 02 — LAST TRAIN HOME",
      },
      {
        src: images.hero04,
        alt: "Portrait half-lit, half in shadow",
        caption: "FRAME 03 — 22:47, BACK ROOM",
      },
      {
        src: images.look05,
        alt: "High-key frame from the morning-after fitting",
        caption: "FRAME 04 — THE MORNING AFTER",
      },
    ],
  },
  {
    slug: "raw-state",
    title: "RAW STATE",
    season: "SPRING—SUMMER 2025",
    index: "03",
    image: images.hero04,
    alt: "Raw close portrait with visible grain, RAW STATE campaign",
    statement: "Unfinished is a finish.",
    description:
      "Exposed seams, selvedge edges left raw, fabric that remembers the loom. RAW STATE strips construction down to its honest skeleton and lets the wear lines write the rest of the story.",
    pieces: [
      { name: "SELVEDGE JACKET", fabric: "RAW DENIM" },
      { name: "OPEN-HEM TEE", fabric: "LOOPWHEEL COTTON" },
      { name: "FRACTURE KNIT", fabric: "HAND-FINISHED WOOL" },
      { name: "TENSION TROUSER", fabric: "GARMENT-DYED TWILL" },
    ],
    editorial: [
      {
        src: images.look03,
        alt: "Hands working an exposed seam in the atelier",
        caption: "FRAME 02 — EXPOSED SEAM, ATELIER",
      },
      {
        src: images.hero02,
        alt: "Fabric caught mid-air, unstyled and moving",
        caption: "FRAME 03 — UNSTYLED, IN MOTION",
      },
      {
        src: images.hero01,
        alt: "Structured shoulder line photographed straight on",
        caption: "FRAME 04 — THE SHOULDER LINE",
      },
    ],
  },
  {
    slug: "future-study",
    title: "FUTURE STUDY",
    season: "CAPSULE — 001",
    index: "04",
    image: images.look01,
    alt: "The electric yellow signal coat — the only color in a black and white frame",
    statement: "One color. One cut. Zero compromise.",
    description:
      "A single electric frequency applied to a single perfect silhouette. FUTURE STUDY is a capsule of five pieces in signal yellow — a controlled experiment in how much attitude one color can carry before it starts carrying you.",
    pieces: [
      { name: "SIGNAL COAT", fabric: "VOLT WOOL-CASHMIRE" },
      { name: "VOLT TROUSER", fabric: "TECH TWILL" },
      { name: "CURRENT SHIRT", fabric: "CRISP POPLIN" },
      { name: "STATIC KNIT", fabric: "FINE MERINO" },
      { name: "PHASE CAP", fabric: "MATTE NYLON" },
    ],
    editorial: [
      {
        src: images.look04,
        alt: "Wide stance under hard light, capsule fitting",
        caption: "FRAME 02 — VOLT ON CONCRETE",
      },
      {
        src: images.look05,
        alt: "High-key negative study for the capsule shirt",
        caption: "FRAME 03 — CURRENT SHIRT, NEGATIVE STUDY",
      },
      {
        src: images.hero05,
        alt: "Signal coat walking the corridor test",
        caption: "FRAME 04 — CORRIDOR TEST",
      },
    ],
  },
  {
    slug: "noir-ss",
    title: "NOIR / SS",
    season: "SPRING—SUMMER 2026",
    index: "05",
    image: images.hero03,
    alt: "Shadow line across concrete — NOIR / SS campaign",
    statement: "Black, but make it summer.",
    description:
      "Shadow-weight cottons, perforated knits, tailoring that breathes. NOIR / SS proves the darkest color in the spectrum is also the lightest to wear — when it is cut for heat, light, and long evenings.",
    pieces: [
      { name: "SHADOW SUIT", fabric: "TROPICAL WOOL" },
      { name: "LIGHT TEE", fabric: "PERFORATED COTTON" },
      { name: "DUSK SHORT", fabric: "RIPSTOP NYLON" },
      { name: "ECLIPSE DRESS", fabric: "SILK VOILE" },
    ],
    editorial: [
      {
        src: images.hero05,
        alt: "Long shadow and long coat at golden hour",
        caption: "FRAME 02 — GOLDEN HOUR, STILL BLACK",
      },
      {
        src: images.look05,
        alt: "White-on-white break frame between noir studies",
        caption: "FRAME 03 — THE PAUSE",
      },
      {
        src: images.hero01,
        alt: "Blazer shoulders against a bright wall",
        caption: "FRAME 04 — HEAT TEST",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */

export type LookCategory = "CAMPAIGN" | "EDITORIAL" | "DETAIL" | "BACKSTAGE";

export interface ArchiveLook extends Look {
  category: LookCategory;
  year: string;
}

export const lookbookArchive: ArchiveLook[] = [
  { image: images.hero01, title: "Monolith", meta: "CAMPAIGN — FW25", category: "CAMPAIGN", year: "2025", alt: "Structured blazer against a concrete studio wall" },
  { image: images.look02, title: "After Dark, 22:47", meta: "EDITORIAL — FW25", category: "EDITORIAL", year: "2025", alt: "Two suited figures in smoke and low light" },
  { image: images.look03, title: "The Seam", meta: "ATELIER — PARIS", category: "DETAIL", year: "2025", alt: "Macro of hands setting a pleat" },
  { image: images.hero02, title: "Wind Study", meta: "EDITORIAL — FW25", category: "EDITORIAL", year: "2025", alt: "Fabric billowing around a moving model" },
  { image: images.look01, title: "Signal", meta: "CAPSULE — 001", category: "CAMPAIGN", year: "2026", alt: "Electric yellow coat, the only color in frame" },
  { image: images.hero03, title: "Shadow Line", meta: "CAMPAIGN — SS26", category: "CAMPAIGN", year: "2026", alt: "Silhouette and long shadow on brutalist concrete" },
  { image: images.look04, title: "Stance", meta: "EDITORIAL — SS25", category: "EDITORIAL", year: "2025", alt: "Wide power stance in a sculptural dress" },
  { image: images.look05, title: "High Key", meta: "FITTING — SS26", category: "BACKSTAGE", year: "2026", alt: "White sculptural shirt on a white background" },
  { image: images.hero04, title: "Raw, Unretouched", meta: "BEAUTY — SS25", category: "DETAIL", year: "2025", alt: "Close portrait with half the face in shadow" },
  { image: images.hero05, title: "Corridor", meta: "CAMPAIGN — FW25", category: "BACKSTAGE", year: "2025", alt: "Model walking a backlit concrete corridor" },
];

export const lookCategories: Array<"ALL" | LookCategory> = [
  "ALL",
  "CAMPAIGN",
  "EDITORIAL",
  "DETAIL",
  "BACKSTAGE",
];

/* ------------------------------------------------------------------ */

export const socials = [
  { label: "INSTAGRAM", href: "https://www.instagram.com" },
  { label: "TIKTOK", href: "https://www.tiktok.com" },
  { label: "PINTEREST", href: "https://www.pinterest.com" },
  { label: "X", href: "https://www.x.com" },
];

export const navLinks = [
  { to: "/", label: "HOME" },
  { to: "/collections", label: "COLLECTIONS" },
  { to: "/lookbook", label: "LOOKBOOK" },
  { to: "/about", label: "ABOUT" },
  { to: "/contact", label: "CONTACT" },
];
