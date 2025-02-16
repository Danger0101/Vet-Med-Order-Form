import { BrowserRouter, Routes, Route } from "react-router-dom";  // Change HashRouter to BrowserRouter
import Home from "./pages/Home";
import VetMedOrderForm from "./pages/Order_Form";
import "./css/App.css";

function App() {
  return (
    <BrowserRouter basename="/">
      <div className="app-container">
        <h1>Vet Med Order Form</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order-form" element={<VetMedOrderForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
