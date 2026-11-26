// ─── CONSTANTS ───────────────────────────────────────────────────────────────
export const HER_NAME = "Amina";
export const HER_FULL_NAME = "Amina Gumel";
export const HIS_NAME = "Mansur";
export const BIRTHDAY = "27 November 2026";

// ─── GATE / LOADER ───────────────────────────────────────────────────────────
export const GATE = {
  loaderLine: "Today is all yours.",
  buttonLabel: "Open your gift",
};

// ─── HERO ─────────────────────────────────────────────────────────────────────
export const HERO = {
  scriptLine: "Happy Birthday",
  headline: HER_NAME,
  date: BIRTHDAY,
  subline: "Three years of you and me.",
  scrollCue: "scroll",
};

// ─── STORY SECTION ────────────────────────────────────────────────────────────
export const STORY = {
  label: "our story",
  heading: "Since the very first day.",
  body: [
    `Three years ago, two people walked the same school corridors and somehow\u2014quietly, inevitably\u2014found each other. That was the beginning of everything.`,
    `You brought warmth into ordinary days. You made laughter louder and silence softer. Every single memory we\u2019ve built together feels like a gift I didn\u2019t know I was allowed to ask for.`,
    `And now here we are. ${BIRTHDAY}. Another year of you, and I\u2019m still the luckiest person in the room.`,
  ],
  signature: `With all of my love, ${HIS_NAME}`,
};

// ─── MEMORIES SECTION ─────────────────────────────────────────────────────────
export const MEMORIES = {
  label: "moments",
  heading: "Little pieces of you.",
  sub: "Every one of them is my favourite.",
  polaroids: [
    { src: "/images/optimized/her-2.webp", fallback: "/images/her-2.jpg", caption: "my sunshine", objectPosition: "40% 35%" },
    { src: "/images/optimized/her-4.webp", fallback: "/images/her-4.jpg", caption: "always her",  objectPosition: "35% 40%" },
    { src: "/images/optimized/her-5.webp", fallback: "/images/her-5.jpg", caption: "my whole world", objectPosition: "36% 58%" },
  ],
};

// ─── TIMELINE SECTION ─────────────────────────────────────────────────────────
export const TIMELINE = {
  label: "three years",
  heading: "How we grew.",
  years: [
    {
      num: "01",
      title: "Year One",
      body: "It started as a secret smile in school. A glance held a little too long, a note passed at the wrong time. I didn\u2019t have the words yet, but I knew.",
    },
    {
      num: "02",
      title: "Year Two",
      body: "We grew up, and somehow I fell for you more. Every season with you was better than the last. You became the person I wanted to tell everything to.",
    },
    {
      num: "03",
      title: "Year Three",
      body: "Now I cannot imagine a single day without you. Three years later and you still make my heart move. Here\u2019s to every year that comes after this.",
    },
  ],
};

// ─── MOVING MOMENTS SECTION ───────────────────────────────────────────────────
export const MOVING_MOMENTS = {
  label: "moving moments",
  heading: "Moving moments.",
  sub: "Because some things cannot be kept in a photo.",
  nowPlaying: "Now playing",
};

// ─── MAKE A WISH SECTION ──────────────────────────────────────────────────────
export const MAKE_A_WISH = {
  label: "make a wish",
  heading: "Make a wish.",
  prompt: "Tap the lantern.",
  afterWish: "Whatever you wished for, I\u2019m wishing it too.",
};

// ─── LETTER SECTION ───────────────────────────────────────────────────────────
export const LETTER = {
  label: "a letter for you",
  sealLabel: "Tap to open",
  paragraphs: [
    "My love Amina,",
    "Happy Birthday.",
    "Three years ago we were just two kids in secondary school who had no idea what we were starting. Today I look at you and I am still the luckiest person I know.",
    "Thank you for your patience, your laughter, and the way you make ordinary days feel soft and special. You have grown into someone beautiful in every way, and I am proud to be the one who gets to love you.",
    "May this new year bring you peace, joy, and every dream you have been praying for. I promise to keep choosing you, today and always.",
    "Forever yours,",
    `${HIS_NAME} \u2764\uFE0F`,
  ],
};

// ─── WISH SECTION (closing night section) ────────────────────────────────────
export const WISH = {
  label: "today",
  heading: "On your day.",
  wish: `${HER_NAME}, on this birthday I wish you every beautiful thing you\u2019ve ever deserved\u2014and you deserve all of it. May this year bring you joy that surprises you, peace that holds you, and love that never lets you doubt yourself.`,
  closing: `Happy birthday, my love.`,
  from: HIS_NAME,
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────
export const FOOTER = {
  scriptLine: "Made with love",
  credit: "Built by Askar DEV",
  replayLabel: "Replay",
};

// ─── META ─────────────────────────────────────────────────────────────────────
export const META = {
  title: "For Amina 🌹",
  description: `A birthday gift for ${HER_FULL_NAME}, from ${HIS_NAME}.`,
};
