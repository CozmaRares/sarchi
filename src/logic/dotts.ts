const cats = ["Search", "AI", "Icons", "Code", "Misc", "Manga"] as const;

export type DottList = Record<string, DottValue>;
export type Dott = keyof typeof originalDotts;
export type DottValue = {
  name: string;
  url: string;
  category: string;
  keepSlashes?: boolean;
};

const originalDotts = {
  g: {
    name: "Google",
    url: "https://www.google.com/search?q=%s",
    category: cats[0],
  },
  y: {
    name: "YouTube",
    url: "https://www.youtube.com/results?search_query=%s",
    category: cats[0],
  },
  ym: {
    name: "YouTube Music",
    url: "https://music.youtube.com/search?q=%s&utm_source=opensearch",
    category: cats[0],
  },
  gi: {
    name: "Google Images",
    url: "https://google.com/search?tbm=isch&q=%s&tbs=imgo:1",
    category: cats[0],
  },
  z: {
    name: "Z Library",
    url: "https://z-library.rs/s/?q=%s",
    category: cats[0],
  },
  t3: {
    name: "T3 Chat",
    url: "https://www.t3.chat/new?q=%s",
    category: cats[1],
  },
  fas: {
    name: "Font Awesome",
    url: "https://fontawesome.com/search?q=%s",
    category: cats[2],
  },
  lurl: {
    name: "Lucide",
    url: "https://lucide.dev/icons/?search=%s",
    category: cats[2],
  },
  npm: {
    name: "NPM",
    url: "https://www.npmjs.com/search?q=%s",
    category: cats[3],
  },
  rs: {
    name: "Docs.rs Crates",
    url: "https://docs.rs/%s",
    keepSlashes: true,
    category: cats[3],
  },
  rss: {
    name: "Docs.rs",
    url: "https://docs.rs/releases/search?query=%s",
    category: cats[3],
  },
  gh: {
    name: "GitHub Repo",
    url: "https://github.com/%s",
    keepSlashes: true,
    category: cats[3],
  },
  ghs: {
    name: "GitHub Search",
    url: "https://github.com/search?q=%s",
    category: cats[3],
  },
  mdname: {
    name: "MDN Web Docs",
    url: "https://developer.mozilla.org/search?q=%s",
    category: cats[3],
  },
  caname: {
    name: "Can I Use",
    url: "https://caniuse.com/?search=%s",
    category: cats[3],
  },
  tr: {
    name: "Google Translate (auto to English)",
    url: "https://translate.google.com/?sl=auto&tl=en&text=%s&op=translate",
    category: cats[4],
  },
  ter: {
    name: "Google Translate (English to Romanian)",
    url: "https://translate.google.com/?sl=en&tl=ro&text=%s&op=translate",
    category: cats[4],
  },
  tre: {
    name: "Google Translate (Romanian to English)",
    url: "https://translate.google.com/?sl=ro&tl=en&text=%s&op=translate",
    category: cats[4],
  },
  acategory: {
    name: "AC UTCN",
    url: "https://ac.utcluj.ro/%s.html",
    keepSlashes: true,
    category: cats[4],
  },
  mal: {
    name: "My Anime List",
    url: "https://myanimelist.net/anime.php?q=%s",
    category: cats[4],
  },
  ctp: {
    name: "CTP Cluj",
    url: "https://ctpcj.ro/index.php/ro/orare-linii/linii-urbane/linia-%s",
    category: cats[4],
  },
  tcategory: {
    name: "ToonClash",
    url: "https://toonclash.com/?s=%s&post_type=wp-manga",
    category: cats[5],
  },
  asura: {
    name: "Asura Comic",
    url: "https://asuracomic.net/series?page=1&name=%s",
    category: cats[5],
  },
  mdex: {
    name: "MangaDex",
    url: "https://mangadex.org/search?q=%s",
    category: cats[5],
  },
} as const satisfies DottList;

export const dotts: Record<Dott, DottValue> = originalDotts;

export const defaultDott = "g" satisfies Dott;

export function getDefaultDott(dott: string): DottValue | undefined {
  if (!(dott in dotts)) return undefined;
  const selectedDott = dotts[dott as Dott];
  return selectedDott;
}
