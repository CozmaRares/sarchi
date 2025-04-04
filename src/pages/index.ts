export default function Index() {
  document.getElementById("app")!.innerHTML = `
    <div class="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <main class="w-full max-w-150 lg:max-w-screen-xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-4">
          <div class="flex flex-col justify-center gap-4 text-center lg:text-left">
            <h1 class="text-5xl font-bold">Sărchi</h1>
            <p class="text-lg max-w-xl text-balance">
              <a href="https://duckduckgo.com/" class="underline hover:text-gray-600">DuckDuckGo</a>'s
              bang redirects are cool. I took
              <a href="https://x.com/theo" class="underline hover:text-gray-600">Theo</a>'s
              client side remake
              (<a href="https://unduck.link/" class="underline hover:text-gray-600">und*uck</a>)
              and made it work with my own <span class="line-through">bangs</span> dotts.
            </p>
            <div>
              <a href="/dotts" class="text-sm inline-flex items-center gap-1 hover:text-gray-600 font-bold">
                See available dotts ↗
              </a>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-sm flex flex-col justify-center space-y-4">
            <div class="space-y-3">
              <p class="font-medium">Add this url as a custom search engine in your browser:</p >
              <div class="flex flex-row gap-2 items-center divide-x divide-gray-400 rounded-md border border-gray-400 bg-gray-100">
                <input
                  id="url-input"
                  type="text" value="https://sarchi.raru.dev/?q=%s" readOnly class="flex-grow h-10 px-3 py-2 rounded-l-md text-sm ring-offset-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black font-mono text-sm" />
                <button id="copy-button" class="size-8 hover:cursor-pointer">
                  <img src="/clipboard.svg" id="clipboard-icon" alt="Copy" class="size-6" />
                </button>
              </div>
            </div>

            <div class="flex flex-row gap-2 items-center">
              <span class="h-[2px] flex-grow bg-gray-300"></span>
              OR
              <span class="h-[2px] flex-grow bg-gray-300"></span>
            </div>


            <div class="space-y-3">
              <p class="font-medium">
                Do a search to have the url be automatically picked up by your browser as a recently used search engine:
              </p>
                <form id="search-form">
                <div class="flex flex-row gap-2 items-center divide-x divide-gray-400 rounded-md border border-gray-400 bg-gray-100">
                  <input
                    id="search-input"
                    type="text" placeholder="Search..." class="flex-grow h-10 px-3 py-2 rounded-l-md text-sm ring-offset-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black font-mono text-sm" />
                  <button class="size-8 hover:cursor-pointer">
                    <img src="/search.svg" alt="Search" class="size-6" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;

  const copyButton = document.getElementById("copy-button")!;
  const clipboardIcon = document.getElementById(
    "clipboard-icon",
  )! as HTMLImageElement;
  const urlInput = document.getElementById("url-input")! as HTMLInputElement;

  copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(urlInput.value);
    clipboardIcon.src = "/clipboard-check.svg";

    setTimeout(() => {
      clipboardIcon.src = "/clipboard.svg";
    }, 2000);
  });

  const searchForm = document.getElementById("search-form")!;
  const searchInput = document.getElementById(
    "search-input",
  )! as HTMLInputElement;

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    url.searchParams.set("q", searchInput.value);
    window.location.replace(url);
  });
}
