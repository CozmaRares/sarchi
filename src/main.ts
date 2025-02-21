import bangs from "./bangs";
import "./global.css";

const DEFAULT_BANG = localStorage.getItem("default-bang") ?? "g";

function redirect() {
  const url = new URL(window.location.href);
  let query = url.searchParams.get("q")?.trim() ?? "";
  if (!query) return;

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
