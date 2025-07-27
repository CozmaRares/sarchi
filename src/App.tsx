import { lazy, type JSX } from "solid-js";
import { Match, Switch } from "solid-js";
import redirect from "./logic/redirect";
import currentHash from "./logic/currentHash";
import { importDotts } from "./logic/localStorage";
import Nav from "./components/Nav";
import TailwindIndicator from "./components/TailwindIndicator";

const Index = lazy(() => import("./pages/Index"));
const Dotts = lazy(() => import("./pages/Dotts"));
const Custom = lazy(() => import("./pages/Custom"));
const Export = lazy(() => import("./pages/Export"));

export default function App() {
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
        <Match when={currentHash() === ""}>
          <Index />
        </Match>
        <Match when={currentHash() === "#dotts"}>
          <Dotts />
        </Match>
        <Match when={currentHash() === "#custom"}>
          <Custom />
        </Match>
        <Match when={currentHash() === "#export"}>
          <Export />
        </Match>
      </Switch>
    </Layout>
  );
}

function Layout({ children }: { children: JSX.Element }) {
  return (
    <div class="relative flex min-h-screen w-screen max-w-screen flex-col items-center bg-gray-200 p-12">
      {children}
      <Nav />
      <TailwindIndicator />
    </div>
  );
}

function RedirectHome() {
  console.log("redirecting home");
  window.location.hash = "";
  window.location.search = "";
  return null;
}
