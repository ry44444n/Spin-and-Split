import { Route, Routes, Link, BrowserRouter as Router } from "react-router-dom";
import Bill from "./components/Bill";
import Roulette from "./components/Roulette";

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen ">
        <nav className="text-orange-300 bg-slate-500 text-white text-center text-5xl font-extrabold py-4 shadow-lg z-10 rounded-b-lg">Spin and Split</nav>
        <div >
          <ul className="navigation-list list-none flex justify-center gap-8 text-lg mb-8">
            <li>
              <button className="hover:bg-stone-500 border-double bg-neutral-600 text-white px-6 py-2 rounded-lg shadow-md transition-all"><Link to="/roulette">Roulette</Link></button>
            </li>
            <li>
              <button className="hover:bg-stone-500 border-double bg-neutral-600 text-white px-6 py-2 rounded-lg shadow-md transition-all"><Link to="/bill">Bill</Link></button>
            </li>
          </ul>
        </div>
        <Routes>
          <Route path="/roulette" element={<Roulette />} />
          <Route path="/bill" element={<Bill />} />
        </Routes>
        </div>
    </Router>
  );
}

export default App;
