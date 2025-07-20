import { createComputed, createSignal } from "solid-js";
import Card from "../components/Card";
import currentHash from "../logic/currentHash";
import { customDotts } from "../logic/localStorage";

export default function Export() {
  let importUrlRef!: HTMLInputElement;
  let clipboardIconRef!: HTMLImageElement;

  const copyImportUrl = async () => {
    await navigator.clipboard.writeText(importUrlRef.value);
    clipboardIconRef.src = "/clipboard-check.svg";

    setTimeout(() => {
      clipboardIconRef.src = "/clipboard.svg";
    }, 2000);
  };

  const [stringified, setStringified] = createSignal("");
  const [url, setUrl] = createSignal("");

  createComputed(() => {
    setStringified(JSON.stringify(customDotts, null, 2));
    const base64 = btoa(stringified());
    const importUrl = new URL(window.location.href);
    importUrl.hash = "";
    importUrl.searchParams.set("import", base64);
    setUrl(importUrl.toString());
  });

  createComputed(async () => {
    if (currentHash() !== "#export") return;

    try {
      await copyImportUrl();
      console.log("copied to clipboard");
    } catch {}
  });

  return (
    <div class="w-full max-w-2xl space-y-8">
      <h1 class="text-center text-4xl font-bold">Export Your Custom Dotts</h1>

      <Card>
        <div class="space-y-3">
          <p>
            This url should have been copied to your clipboard. To import the
            dotts again, just paste it in the search bar and press enter.
          </p>
          <p class="text-xs">
            You can also copy the url manually in case it didn't automatically
            copy.
          </p>
          <div class="flex flex-row items-center divide-x divide-gray-400 rounded-md border border-gray-400 bg-gray-100">
            <input
              ref={importUrlRef}
              type="text"
              value={url()}
              readOnly
              class="h-10 flex-grow rounded-l-md px-3 py-2 font-mono text-sm ring-offset-gray-100 focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
            />
            <button
              class="flex size-10 items-center justify-center rounded-r-md ring-offset-gray-100 hover:cursor-pointer focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
              onclick={copyImportUrl}
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
      </Card>

      <Card class="space-y-4">
        <h2>Current Shape of the Dotts</h2>
        <div class="rounded-lg border border-gray-400 bg-gray-100 p-4">
          <code class="whitespace-pre-wrap">{stringified()}</code>
        </div>
      </Card>
    </div>
  );
}

// function getBaseUrl() {
//   if (typeof window !== "undefined") return ""; // browser should use relative url
//   if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
//   return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
// };
