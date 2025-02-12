import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VetMedOrderForm from "./pages/Order_Form";
import "./css/App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1>Vet Med Order Form</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<VetMedOrderForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
