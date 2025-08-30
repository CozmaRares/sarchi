import { createComputed, createSignal } from "solid-js";
import Card from "../components/Card";
import { customDotts } from "../logic/localStorage";
import CopyInput from "../components/CopyInput";
import CustomDottList from "../components/CustomDottList";

export default function Export() {
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

  return (
    <div class="w-full max-w-2xl space-y-8">
      <h1 class="text-center text-4xl font-bold">Export Your Custom Dotts</h1>
      <Card>
        <div class="space-y-3">
          <p>
            Copy this url and paste it in the browser's address bar to import
            your custom dotts.
          </p>
          <CopyInput value={url()} />
        </div>
      </Card>
      <CustomDottList />
    </div>
  );
}

// function getBaseUrl() {
//   if (typeof window !== "undefined") return ""; // browser should use relative url
//   if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
//   return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
// };
