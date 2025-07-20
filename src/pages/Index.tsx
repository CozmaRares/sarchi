import Card from "../components/Card";

export default function Index() {
  let customEngineUrlRef!: HTMLInputElement;
  let clipboardIconRef!: HTMLImageElement;

  const copyCustomEngineUrl = async () => {
    await navigator.clipboard.writeText(customEngineUrlRef.value);
    clipboardIconRef.src = "/clipboard-check.svg";

    setTimeout(() => {
      clipboardIconRef.src = "/clipboard.svg";
    }, 2000);
  };

  let searchInputRef!: HTMLInputElement;
  let searchFormRef!: HTMLFormElement;

  const search = async (e: Event) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    url.searchParams.set("q", searchInputRef.value);
    window.location.replace(url);
  };

  return (
    <div class="flex flex-1 flex-col items-center justify-center">
      <main class="max-w-xl lg:max-w-screen-xl">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-4">
          <div class="flex flex-col justify-center gap-4 text-center lg:text-left">
            <h1 class="text-5xl font-bold">Sărchi</h1>
            <p class="max-w-xl text-lg text-balance">
              <a
                href="https://duckduckgo.com/"
                class="underline hover:text-gray-600"
              >
                DuckDuckGo
              </a>
              's bang redirects are cool. I took{" "}
              <a
                href="https://x.com/theo"
                class="underline hover:text-gray-600"
              >
                Theo
              </a>
              's client side remake (
              <a
                href="https://unduck.link/"
                class="underline hover:text-gray-600"
              >
                und*uck
              </a>
              ) and made it work with my own{" "}
              <span class="line-through">bangs</span> dotts.
            </p>
            <p class="max-w-xl text-lg text-balance">
              If you want to have your own version of this, I encourage you to
              fork{" "}
              <a
                href="https://github.com/CozmaRares/sarchi"
                class="underline hover:text-gray-600"
              >
                my repo
              </a>{" "}
              and deploy it however you like.
            </p>
          </div>

          <Card
            padding="p-6"
            class="flex flex-col justify-center space-y-4"
          >
            <div class="space-y-3">
              <p class="font-medium">
                Add this url as a custom search engine in your browser:
              </p>
              <div class="flex flex-row items-center divide-x divide-gray-400 rounded-md border border-gray-400 bg-gray-100">
                <input
                  ref={customEngineUrlRef}
                  type="text"
                  value="https://sarchi.raru.dev/?q=%s"
                  readOnly
                  class="h-10 flex-grow rounded-l-md px-3 py-2 font-mono text-sm ring-offset-gray-100 focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
                />
                <button
                  class="flex size-10 items-center justify-center rounded-r-md ring-offset-gray-100 hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
                  onclick={copyCustomEngineUrl}
                >
                  <img
                    ref={clipboardIconRef}
                    src="/clipboard.svg"
                    alt="Copy"
                    class="size-6"
                  />
                </button>
              </div>
            </div>

            <div class="flex flex-row items-center gap-2">
              <span class="h-[2px] flex-grow bg-gray-300"></span>
              OR
              <span class="h-[2px] flex-grow bg-gray-300"></span>
            </div>

            <div class="space-y-3">
              <p class="font-medium">
                Do a search to have the url be automatically picked up by your
                browser as a recently used search engine:
              </p>
              <form
                ref={searchFormRef}
                onsubmit={search}
              >
                <div class="flex flex-row items-center divide-x divide-gray-400 rounded-md border border-gray-400 bg-gray-100">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="cat videos .y"
                    class="h-10 flex-grow rounded-l-md px-3 py-2 font-mono text-sm ring-offset-gray-100 focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
                  />
                  <button class="flex size-10 items-center justify-center rounded-r-md ring-offset-gray-100 hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none">
                    <img
                      src="/search.svg"
                      alt="Search"
                      class="size-6"
                    />
                  </button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
