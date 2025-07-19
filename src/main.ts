import { defaultDott, getDefaultDott } from "./dotts";
import { getCustomDott } from "./localStorage";
import "./global.css";
import IndexPage from "./pages";
import DottsPage from "./pages/dotts";
import CustomPage from "./pages/custom";

function useDott({ dott, query }: { dott: string; query: string }) {
  let selectedDott = getDefaultDott(dott);

  if (!selectedDott) {
    selectedDott = getCustomDott(dott);
    if (!selectedDott) return false;
  }

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
  const url = new URL(window.location.href);

  if (url.pathname === "/dotts") return DottsPage();
  if (url.pathname === "/custom") return CustomPage();
  if (url.pathname !== "/") return window.location.replace("/");

  let query = url.searchParams.get("q")?.trim() ?? "";
  if (!query) return IndexPage();

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
    dott: defaultDott,
    query,
  });
}

redirect();
