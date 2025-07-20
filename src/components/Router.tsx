import { For, Match, Switch } from "solid-js";
import type { JSX } from "solid-js";
import redirect from "../logic/redirect";
import currentHash from "../logic/currentHash";
import { importDotts } from "../logic/localStorage";

type Route = {
  hash: string;
  component: JSX.Element;
};

type Props = {
  routes: Route[];
  layout: ({ children }: { children: JSX.Element }) => JSX.Element;
};

export default function Router({ routes, layout: Layout }: Props) {
  const currentLocation = new URL(window.location.href);

  if (currentLocation.pathname !== "/") {
    window.location.pathname = "/";
    return null;
  }

  let query = currentLocation.searchParams.get("q")?.trim() ?? "";
  if (query) {
    redirect(query);
    return null;
  }

  let importData = currentLocation.searchParams.get("import")?.trim() ?? "";
  if (importData) {
    importDotts(atob(importData));
    return <RedirectHome />;
  }

  return (
    <Layout>
      <Switch fallback={<RedirectHome />}>
        <For each={routes}>
          {route => (
            <Match when={route.hash === currentHash()}>{route.component}</Match>
          )}
        </For>
      </Switch>
    </Layout>
  );
}

function RedirectHome() {
  console.log("redirecting home");
  window.location.hash = "";
  window.location.search = "";
  return null;
}
