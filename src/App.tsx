import type { JSX } from "solid-js";

import Custom from "./pages/Custom";
import Dotts from "./pages/Dotts";
import Index from "./pages/Index";

import Router from "./components/Router";
import Nav from "./components/Nav";
import TailwindIndicator from "./components/TailwindIndicator";
import Export from "./pages/Export";

function App() {
  return (
    <Router
      routes={[
        { hash: "", component: <Index /> },
        { hash: "#dotts", component: <Dotts /> },
        { hash: "#custom", component: <Custom /> },
        { hash: "#export", component: <Export /> },
      ]}
      layout={Layout}
    />
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

export default App;
