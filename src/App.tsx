import Router from "./components/Router";
import Custom from "./pages/Custom";
import Dotts from "./pages/Dotts";
import Index from "./pages/Index";

function App() {
  return (
    <Router
      routes={[
        { hash: "", component: <Index /> },
        { hash: "#dotts", component: <Dotts /> },
        { hash: "#custom", component: <Custom /> },
      ]}
    />
  );
}

export default App;
