import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CO2 from "./CO2";
import Burgers from "./Burgers";

function Home() {
  return (
    <div className="home">
      <h1>Welcome</h1>
      <nav>
        <Link to="/CO2">Go to CO2 Visualization</Link> <br />
        <Link to="/Burgers">Go to Burgers Visualization</Link>
      </nav>
    </div>
  );
}

function App() {
  return (
    <Router basename="/xr_datavis">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CO2" element={<CO2 />} />
        <Route path="/Burgers" element={<Burgers />} />
      </Routes>
    </Router>
  );
}

export default App;
