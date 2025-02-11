import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VetMedOrderForm from "./pages/Order_Form";
import "./css/App.css";
import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<VetMedOrderForm />} />
        </Routes>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </Router>
  );
}

export default App;
