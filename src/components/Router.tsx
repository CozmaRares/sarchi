import { createSignal, Match, onCleanup, Switch } from "solid-js";
import type { JSX } from "solid-js";
import redirect from "../logic/redirect";

type Route = {
  hash: string;
  component: JSX.Element;
};

type Props = {
  routes: Route[];
};

export default function Router({ routes }: Props) {
  const currentLocation = new URL(window.location.href);

  let query = currentLocation.searchParams.get("q")?.trim() ?? "";
  if (query) {
    redirect(query);
    return null;
  }

  const [currentHash, setCurrentHash] = createSignal(currentLocation.hash);

  const handleHashChange = () => {
    setCurrentHash(window.location.hash);
  };

  window.addEventListener("hashchange", handleHashChange);

  onCleanup(() => {
    window.removeEventListener("hashchange", handleHashChange);
  });

  return (
    <Switch fallback={null}>
      {routes.map(route => (
        <Match when={route.hash === currentHash()}>{route.component}</Match>
      ))}
    </Switch>
  );
}
