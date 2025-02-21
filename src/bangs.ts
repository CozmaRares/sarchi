const bangs: Readonly<Record<string, { n: string; u: string; k?: boolean }>> = {
  g: {
    n: "Google",
    u: "https://www.google.com/search?q=%s",
  },
  gi: {
    n: "Google Images",
    u: "https://google.com/search?tbm=isch&q=%s&tbs=imgo:1",
  },
  //lg: {
  //  n: "Libgen",
  //  u: "https://libgen.is/search.php?req=%s",
  //},
  t3: {
    n: "T3 Chat",
    u: "https://www.t3.chat/new?q=%s",
  },
  fas: {
    n: "Font Awesome",
    u: "https://fontawesome.com/search?q=%s",
  },
  lu: {
    n: "Lucide",
    u: "https://lucide.dev/icons/?search=%s",
  },
  npm: {
    n: "NPM",
    u: "https://www.npmjs.com/search?q=%s",
  },
  rs: {
    n: "Docs.rs",
    u: "https://docs.rs/search?q=%s",
  },
  gh: {
    n: "GitHub Repo",
    u: "https://github.com/%s",
    k: true,
  },
  ghs: {
    n: "GitHub",
    u: "https://github.com/search?q=%s",
  },
  tr: {
    n: "Google Translate (auto to English)",
    u: "https://translate.google.com/#auto/en/%s",
  },
  ter: {
    n: "Google Translate (English to Romanian)",
    u: "https://translate.google.com/#en/ro/%s",
  },
  tre: {
    n: "Google Translate (Romanian to English)",
    u: "https://translate.google.com/#ro/en/%s",
  },
  y: {
    n: "YouTube",
    u: "https://www.youtube.com/results?search_query=%s",
  },
  ac: {
    n: "AC UTCN",
    u: "https://ac.utcn.ro/%s.html",
    k: true,
  },
};
export default bangs;
