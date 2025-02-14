import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VetMedOrderForm from "./pages/Order_Form";
import "./css/App.css";

function App() {
  return (
    <HashRouter>
      <div className="app-container">
        <h1>Vet Med Order Form</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order-form" element={<VetMedOrderForm />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
