const cats = ["Search", "AI", "Icons", "Code", "Misc", "Manga"] as const;

export type DottList = Record<string, DottValue>;
export type Dott = keyof typeof originalDotts;
export type DottValue = {
  n: string;
  u: string;
  c: string;
  k?: boolean;
};

const originalDotts = {
  g: {
    n: "Google",
    u: "https://www.google.com/search?q=%s",
    c: cats[0],
  },
  y: {
    n: "YouTube",
    u: "https://www.youtube.com/results?search_query=%s",
    c: cats[0],
  },
  ym: {
    n: "YouTube Music",
    u: "https://music.youtube.com/search?q=%s&utm_source=opensearch",
    c: cats[0],
  },
  gi: {
    n: "Google Images",
    u: "https://google.com/search?tbm=isch&q=%s&tbs=imgo:1",
    c: cats[0],
  },
  z: {
    n: "Z Library",
    u: "https://z-library.rs/s/?q=%s",
    c: cats[0],
  },
  t3: {
    n: "T3 Chat",
    u: "https://www.t3.chat/new?q=%s",
    c: cats[1],
  },
  fas: {
    n: "Font Awesome",
    u: "https://fontawesome.com/search?q=%s",
    c: cats[2],
  },
  lu: {
    n: "Lucide",
    u: "https://lucide.dev/icons/?search=%s",
    c: cats[2],
  },
  npm: {
    n: "NPM",
    u: "https://www.npmjs.com/search?q=%s",
    c: cats[3],
  },
  rs: {
    n: "Docs.rs Crates",
    u: "https://docs.rs/%s",
    k: true,
    c: cats[3],
  },
  rss: {
    n: "Docs.rs",
    u: "https://docs.rs/releases/search?query=%s",
    c: cats[3],
  },
  gh: {
    n: "GitHub Repo",
    u: "https://github.com/%s",
    k: true,
    c: cats[3],
  },
  ghs: {
    n: "GitHub Search",
    u: "https://github.com/search?q=%s",
    c: cats[3],
  },
  mdn: {
    n: "MDN Web Docs",
    u: "https://developer.mozilla.org/search?q=%s",
    c: cats[3],
  },
  can: {
    n: "Can I Use",
    u: "https://caniuse.com/?search=%s",
    c: cats[3],
  },
  tr: {
    n: "Google Translate (auto to English)",
    u: "https://translate.google.com/?sl=auto&tl=en&text=%s&op=translate",
    c: cats[4],
  },
  ter: {
    n: "Google Translate (English to Romanian)",
    u: "https://translate.google.com/?sl=en&tl=ro&text=%s&op=translate",
    c: cats[4],
  },
  tre: {
    n: "Google Translate (Romanian to English)",
    u: "https://translate.google.com/?sl=ro&tl=en&text=%s&op=translate",
    c: cats[4],
  },
  ac: {
    n: "AC UTCN",
    u: "https://ac.utcluj.ro/%s.html",
    k: true,
    c: cats[4],
  },
  mal: {
    n: "My Anime List",
    u: "https://myanimelist.net/anime.php?q=%s",
    c: cats[4],
  },
  ctp: {
    n: "CTP Cluj",
    u: "https://ctpcj.ro/index.php/ro/orare-linii/linii-urbane/linia-%s",
    c: cats[4],
  },
  tc: {
    n: "ToonClash",
    u: "https://toonclash.com/?s=%s&post_type=wp-manga",
    c: cats[5],
  },
  asura: {
    n: "Asura Comic",
    u: "https://asuracomic.net/series?page=1&name=%s",
    c: cats[5],
  },
  mdex: {
    n: "MangaDex",
    u: "https://mangadex.org/search?q=%s",
    c: cats[5],
  },
} as const satisfies DottList;

export const dotts: Record<Dott, DottValue> = originalDotts;

export const defaultDott = "g" satisfies Dott;

export function getDefaultDott(dott: string): DottValue | undefined {
  if (!(dott in dotts)) return undefined;
  const selectedDott = dotts[dott as Dott];
  return selectedDott;
}
