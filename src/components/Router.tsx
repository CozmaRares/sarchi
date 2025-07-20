import { For, Match, Switch } from "solid-js";
import type { JSX } from "solid-js";
import redirect from "../logic/redirect";
import currentHash from "../logic/currentHash";

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

  let query = currentLocation.searchParams.get("q")?.trim() ?? "";
  if (query) {
    redirect(query);
    return null;
  }

  return (
    <Layout>
      <Switch fallback={null}>
        <For each={routes}>
          {route => (
            <Match when={route.hash === currentHash()}>{route.component}</Match>
          )}
        </For>
      </Switch>
    </Layout>
  );
}
