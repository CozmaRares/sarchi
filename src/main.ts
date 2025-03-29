import dotts from "./dotts";
import "./global.css";

function showHomePage() {
  document.getElementById("app")!.innerHTML = `
    <div class="content-container" style="height: 100svh; text-align: center">
      <div>
        <h1>Sărchi</h1>
        <p>
          <a href="https://duckduckgo.com/">DuckDuckGo</a>'s bang redirects are
          cool. I took <a href="https://x.com/theo">Theo</a>'s client side remake
          (<a href="https://unduck.link/">und*uck</a>) and made it work with my own dotts.
        </p>
      </div>
      <div class="home-page-container">
        <p>Add this url as a custom search engine in your browser:</p>
        <div id="url-container">
          <p id="url">https://sarchi.raru.dev/?q=%s</p>
          <button id="copy">
            <img src="/clipboard.svg" alt="Copy" />
          </button>
        </div>
      </div>
      <div class="home-page-container">
        <p>Do a search to have the url be automatically picked up by your browser as a recently used search engine</p>
        <form id="search-form">
          <input id="search-input" placeholder="Search..."/>
          <button type="submit">
            <img src="/clipboard.svg" alt="Search" />
          </button>
        </form>
      </div>
      <a href="/dotts">
        See available dotts
        <span>↗</span>
      </a>
    </div>
  `;

  const copy = document.getElementById("copy")!;
  const copyIcon = document.querySelector<HTMLImageElement>("#copy > img")!;
  const url = document.getElementById("url")!.innerText;

  const searchForm = document.getElementById("search-form")!;
  const searchInput = document.getElementById(
    "search-input",
  ) as HTMLInputElement;

  copy.addEventListener("click", async () => {
    await navigator.clipboard.writeText(url);
    copyIcon.src = "/clipboard-check.svg";

    setTimeout(() => {
      copyIcon.src = "/clipboard.svg";
    }, 2000);
  });

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    url.searchParams.set("q", searchInput.value);
    window.location.replace(url);
  });
}

function showDotts() {
  const dottList = Object.entries(dotts).reduce(
    (acc: { [key: string]: string }, [key, value]) => {
      const listItem = `
        <li>
          <div>
            <span>.${key}</span>
            ${!!value.d ? `<span>(default)</span>` : ""}
          </div>
          <div>Name: ${value.n}</div>
          <div style="word-break: break-all;">
            URL: <span class="font-mono">${value.u}</span>
          </div>
          ${!!value.k ? `<div>Keeps slashes in path</div>` : ""}
        </li>
      `;

      if (!acc[value.c]) {
        acc[value.c] = "";
      }
      acc[value.c] += listItem;
      return acc;
    },
    {},
  );

  const categoryList = Object.entries(dottList)
    .map(
      ([category, items]) => `
      <div>
        <h2>${category}</h2>
        <ul class="dott-list">
          ${items}
        </ul>
      </div>
    `,
    )
    .join("");

  document.getElementById("app")!.innerHTML = `
     <div class="content-container">
       <h1>Dott List</h1>
        ${categoryList}
     </div>
  `;
}

function useDott({ dott, query }: { dott: string; query: string }) {
  if (!(dott in dotts)) return false;
  const selectedDott = dotts[dott];

  query = query.replace("." + dott, "").trim();
  query = encodeURIComponent(query);

  // keep slashes
  if (selectedDott.k === true) query = query.replace(/%2F/g, "/");

  let searchUrl: string;

  if (query.length != 0) {
    searchUrl = selectedDott.u.replace("%s", query);
  } else {
    const url = new URL(selectedDott.u);
    searchUrl = url.protocol + "//" + url.hostname;
  }

  window.location.replace(searchUrl);
  return true;
}

function redirect() {
  const DEFAULT_DOTT = "g";

  const url = new URL(window.location.href);

  if (url.pathname === "/dotts") return showDotts();
  if (url.pathname !== "/") return;

  let query = url.searchParams.get("q")?.trim() ?? "";
  if (!query) return showHomePage();

  // get first dott
  const candidates = query.matchAll(/\.(\S+)/gi);

  // keep trying for each candidate
  for (const candidate of candidates)
    if (
      useDott({
        dott: candidate[1].toLowerCase(),
        query,
      })
    )
      return;

  // use default
  useDott({
    dott: DEFAULT_DOTT,
    query,
  });
}

redirect();
