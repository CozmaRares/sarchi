import type { JSX } from "solid-js";
import Router from "./components/Router";
import Custom from "./pages/Custom";
import Dotts from "./pages/Dotts";
import Index from "./pages/Index";
import Nav from "./components/Nav";

function App() {
  return (
    <Router
      routes={[
        { hash: "", component: <Index /> },
        { hash: "#dotts", component: <Dotts /> },
        { hash: "#custom", component: <Custom /> },
      ]}
      layout={Layout}
    />
  );
}

function Layout({ children }: { children: JSX.Element }) {
  return (
    <div class="relative flex min-h-screen w-screen max-w-screen flex-col items-center bg-gray-100 p-12">
      {children}
      <Nav />
    </div>
  );
}

export default App;
