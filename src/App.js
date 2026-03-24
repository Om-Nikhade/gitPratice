import Home from "./pages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlanTrip from "./pages/planTrip";
import "leaflet/dist/leaflet.css";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
   
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plan" element={<PlanTrip />} />
      </Routes>
    </Router>
      
     </>
  );
}


export default App;