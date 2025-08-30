type Category =
  | "Search"
  | "Music"
  | "AI"
  | "Code"
  | "Misc"
  | "Manga"
  | "Custom";

export type DottList = Record<string, DottValue>;
export type Dott = keyof typeof originalDotts;
export type DottValue = {
  name: string;
  url: string;
  category: Category;
  keepSlashes?: boolean;
};

const originalDotts = {
  g: {
    name: "Google",
    url: "https://www.google.com/search?q=%s",
    category: "Search",
  },
  y: {
    name: "YouTube",
    url: "https://www.youtube.com/results?search_query=%s",
    category: "Search",
  },
  ym: {
    name: "YouTube Music",
    url: "https://music.youtube.com/search?q=%s&utm_source=opensearch",
    category: "Music",
  },
  ymm: {
    name: "YouTube Music Liked Music Playlist",
    url: "https://music.youtube.com/playlist?list=LM",
    category: "Music",
  },
  gi: {
    name: "Google Images",
    url: "https://google.com/search?tbm=isch&q=%s&tbs=imgo:1",
    category: "Search",
  },
  t3: {
    name: "T3 Chat",
    url: "https://www.t3.chat/new?q=%s",
    category: "AI",
  },
  fas: {
    name: "Font Awesome",
    url: "https://fontawesome.com/search?q=%s",
    category: "Code",
  },
  lu: {
    name: "Lucide",
    url: "https://lucide.dev/icons/?search=%s",
    category: "Code",
  },
  npm: {
    name: "NPM",
    url: "https://www.npmjs.com/search?q=%s",
    category: "Code",
  },
  rs: {
    name: "Docs.rs",
    url: "https://docs.rs/releases/search?query=%s",
    category: "Code",
  },
  gh: {
    name: "GitHub Repo",
    url: "https://github.com/%s",
    keepSlashes: true,
    category: "Code",
  },
  ghs: {
    name: "GitHub Search",
    url: "https://github.com/search?q=%s",
    category: "Code",
  },
  mdn: {
    name: "MDN Web Docs",
    url: "https://developer.mozilla.org/search?q=%s",
    category: "Code",
  },
  can: {
    name: "Can I Use",
    url: "https://caniuse.com/?search=%s",
    category: "Code",
  },
  tr: {
    name: "Google Translate (auto to English)",
    url: "https://translate.google.com/?sl=auto&tl=en&text=%s&op=translate",
    category: "Misc",
  },
  ter: {
    name: "Google Translate (English to Romanian)",
    url: "https://translate.google.com/?sl=en&tl=ro&text=%s&op=translate",
    category: "Misc",
  },
  tre: {
    name: "Google Translate (Romanian to English)",
    url: "https://translate.google.com/?sl=ro&tl=en&text=%s&op=translate",
    category: "Misc",
  },
  ac: {
    name: "AC UTCN",
    url: "https://ac.utcluj.ro/%s.html",
    keepSlashes: true,
    category: "Misc",
  },
  mal: {
    name: "My Anime List",
    url: "https://myanimelist.net/anime.php?q=%s",
    category: "Misc",
  },
  ctp: {
    name: "CTP Cluj",
    url: "https://ctpcj.ro/index.php/ro/orare-linii/linii-urbane/linia-%s",
    category: "Misc",
  },
  tc: {
    name: "ToonClash",
    url: "https://toonclash.com/?s=%s&post_type=wp-manga",
    category: "Manga",
  },
  mdex: {
    name: "MangaDex",
    url: "https://mangadex.org/search?q=%s",
    category: "Manga",
  },
} as const satisfies DottList;

export const dotts: Record<Dott, DottValue> = originalDotts;

export const defaultDott = "g" satisfies Dott;

export function getDefaultDott(dott: string): DottValue | undefined {
  if (!(dott in dotts)) return undefined;
  const selectedDott = dotts[dott as Dott];
  return selectedDott;
}
