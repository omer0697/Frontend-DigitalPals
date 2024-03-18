import Navbar from "./components/Navbar";
import ProductLists from "./components/ProductLists";

function App() {
  return (
    <div className="flex flex-col bg-slate-100">
      <Navbar />
      <ProductLists />
    </div>
  );
}

export default App;
