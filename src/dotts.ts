const dotts: Readonly<
  Record<
    string,
    { n: string; u: string; c: string; k?: boolean }
  >
> = {
  g: {
    n: "Google",
    u: "https://www.google.com/search?q=%s",
    c: "Search",
  },
  gi: {
    n: "Google Images",
    u: "https://google.com/search?tbm=isch&q=%s&tbs=imgo:1",
    c: "Search",
  },
  t3: {
    n: "T3 Chat",
    u: "https://www.t3.chat/new?q=%s",
    c: "AI",
  },
  fas: {
    n: "Font Awesome",
    u: "https://fontawesome.com/search?q=%s",
    c: "Icons",
  },
  lu: {
    n: "Lucide",
    u: "https://lucide.dev/icons/?search=%s",
    c: "Icons",
  },
  npm: {
    n: "NPM",
    u: "https://www.npmjs.com/search?q=%s",
    c: "Code",
  },
  rs: {
    n: "Docs.rs Crates",
    u: "https://docs.rs/%s",
    k: true,
    c: "Code",
  },
  rss: {
    n: "Docs.rs",
    u: "https://docs.rs/releases/search?query=%s",
    c: "Code",
  },
  gh: {
    n: "GitHub Repo",
    u: "https://github.com/%s",
    k: true,
    c: "Code",
  },
  ghs: {
    n: "GitHub Search",
    u: "https://github.com/search?q=%s",
    c: "Code",
  },
  tr: {
    n: "Google Translate (auto to English)",
    u: "https://translate.google.com/?sl=auto&tl=en&text=%s&op=translate",
    c: "Miscellaneous",
  },
  ter: {
    n: "Google Translate (English to Romanian)",
    u: "https://translate.google.com/?sl=en&tl=ro&text=%s&op=translate",
    c: "Miscellaneous",
  },
  tre: {
    n: "Google Translate (Romanian to English)",
    u: "https://translate.google.com/?sl=ro&tl=en&text=%s&op=translate",
    c: "Miscellaneous",
  },
  y: {
    n: "YouTube",
    u: "https://www.youtube.com/results?search_query=%s",
    c: "Search",
  },
  ac: {
    n: "AC UTCN",
    u: "https://ac.utcluj.ro/%s.html",
    k: true,
    c: "Miscellaneous",
  },
  mal: {
    n: "My Anime List",
    u: "https://myanimelist.net/anime.php?q=%s",
    c: "Miscellaneous",
  },
  can: {
    n: "Can I Use",
    u: "https://caniuse.com/?search=%s",
    c: "Code",
  },
  z: {
    n: "Z Library",
    u: "https://z-library.rs/s/?q=%s",
    c: "Search",
  },
  ctp: {
    n: "CTP Cluj",
    u: "https://ctpcj.ro/index.php/ro/orare-linii/linii-urbane/linia-%s",
    c: "Miscellaneous",
  },
  mdn: {
    n: "MDN Web Docs",
    u: "https://developer.mozilla.org/search?q=%s",
    c: "Code",
  },
};
export default dotts;
