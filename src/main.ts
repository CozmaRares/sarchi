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
          (<a href="">und*uck</a>) and made it work with my own bangs.
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
     <div class="content-container" style="padding-top: 1rem">
       <h1 class="text-2xl font-bold mb-6 text-center">Bangs List</h1>
        <ul style="list-style: none;">
          ${Object.entries(bangs)
            .map(
              ([key, value], idx) =>
                `<li style="
                  border:1px solid #e4e4e7;
                  border-radius: 0.5rem;
                  padding: 1rem;
                  background: white;
                  font-size: 0.875rem;
                  line-height: 1.25;
                  color: #4b5563;
                  display: flex;
                  flex-direction: column;
                  gap: 0.25rem;
                  ${idx != 0 ? "margin-top: 1rem;" : ""}
                ">
                    <div style="color: black; font-weight: 600; font-size: 1.125rem; line-height: 1.75">!${key}</div>
                    <div>Name: ${value.n}</div>
                    <div style="word-break: break-all;">
                      URL: <span class="font-mono">${value.u}</span>
                    </div>
                    ${
                      value.k !== undefined
                        ? `<div class="text-sm text-gray-600">Keep slashes: ${value.k ? "Yes" : "No"}</div>`
                        : ""
                    }
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
