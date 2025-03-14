import bangs from "./bangs";
import "./global.css";

const DEFAULT_BANG = localStorage.getItem("default-bang") ?? "g";

function showHomePage() {
  document.getElementById("app")!.innerHTML = `
    <div class="content-container" style="height: 100vh; text-align: center">
      <div>
        <h1>Sărchi</h1>
        <p>
          <a href="https://duckduckgo.com/">DuckDuckGo</a>'s bang redirects are
          cool. I took <a href="https://x.com/theo">Theo</a>'s client side remake
          (<a href="https://unduck.link/">und*uck</a>) and made it work with my own bangs.
        </p>
      </div>
      <div>
        <p>Add this url as a custom search engine in your browser:</p>
        <div id="container">
          <p id="url">https://sarchi.raru.dev/?q=%s</p>
          <button id="copy">
            <img src="/clipboard.svg" alt="Copy" />
          </button>
        </div>
      </div>
      <a href="/bangs">
        See available bangs
        <span>↗</span>
      </a>
    </div>
  `;

  const copy = document.getElementById("copy")!;
  const copyIcon = document.querySelector<HTMLImageElement>("#copy > img")!;
  const url = document.getElementById("url")!.innerText;

  copy.addEventListener("click", async () => {
    await navigator.clipboard.writeText(url);
    copyIcon.src = "/clipboard-check.svg";

    setTimeout(() => {
      copyIcon.src = "/clipboard.svg";
    }, 2000);
  });
}

function showBangs() {
  document.getElementById("app")!.innerHTML = `
     <div class="content-container">
       <h1>Bangs List</h1>
        <ul class="bang-list">
          ${Object.entries(bangs)
            .map(
              ([key, value]) =>
                `<li>
                    <div>!${key}</div>
                    <div>Name: ${value.n}</div>
                    <div style="word-break: break-all;">
                      URL: <span class="font-mono">${value.u}</span>
                    </div>
                    ${!!value.k ? `<div>Keeps slashes in path</div>` : ""}
                </li>`,
            )
            .join("")}
        </ul>
     </div>
  `;
}

function redirect() {
  const url = new URL(window.location.href);

  if (url.pathname === "/bangs") return showBangs();
  if (url.pathname !== "/") return;

  let query = url.searchParams.get("q")?.trim() ?? "";
  if (!query) return showHomePage();

  // get first bang
  const candidate = query.match(/!(\S+)/i)?.[1]?.toLowerCase();

  const bang = (
    candidate && candidate in bangs ? candidate : DEFAULT_BANG
  ) as keyof typeof bangs;
  const selectedBang = bangs[bang];

  // remove bang
  query = query.replace(/!\S+\s*/i, "").trim();
  query = encodeURIComponent(query);

  // keep slashes
  if (selectedBang.k === true) {
    query = query.replace(/%2F/g, "/");
  }

  const searchUrl = selectedBang.u.replace("%s", query);

  window.location.replace(searchUrl);
}

redirect();
