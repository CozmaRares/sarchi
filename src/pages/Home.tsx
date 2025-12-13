import Card from "../components/Card";
import CopyInput from "../components/CopyInput";
import OutgoingLink from "../components/OutgoingLink";

export default function Home() {
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
              <OutgoingLink href="https://duckduckgo.com/">
                DuckDuckGo's
              </OutgoingLink>{" "}
              bang redirects are cool. I took{" "}
              <OutgoingLink href="https://x.com/theo">Theo's</OutgoingLink>{" "}
              client side remake (
              <OutgoingLink href="https://unduck.link/">und*ck</OutgoingLink>)
              and made it work with my own{" "}
              <span class="line-through">bangs</span> dotts.
            </p>
            <p class="max-w-xl text-lg text-balance">
              If you want to have your own version of this, I encourage you to
              fork{" "}
              <OutgoingLink href="https://github.com/CozmaRares/sarchi">
                my repo
              </OutgoingLink>{" "}
              and deploy it however you like.
            </p>
          </div>

          <Card
            padding="p-6"
            class="flex flex-col justify-center space-y-4"
          >
            <div class="space-y-3">
              <p>Add this url as a custom search engine in your browser</p>
              <CopyInput value="https://sarchi.raru.dev/?q=%s" />
            </div>

            <div class="flex flex-row items-center gap-2">
              <span class="h-[2px] flex-grow bg-gray-300"></span>
              OR
              <span class="h-[2px] flex-grow bg-gray-300"></span>
            </div>

            <div class="space-y-3">
              <p>
                Do a search to have the url be automatically picked up by your
                browser as a recently used search engine
                <span class="block text-sm">
                  &gt; for when you can't add Sărchi as a custom search engine
                </span>
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
