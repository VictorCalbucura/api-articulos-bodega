import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Articulos from "./components/Articulos";
import Historial from "./components/Historial";
import Departamentos from "./components/Departamentos";
import Empleados from "./components/Empleados";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li>
                <Link to="/articulos">Artículos</Link>
              </li>
              <li>
                <Link to="/historial">Historial</Link>
              </li>
              <li>
                <Link to="/departamentos">Departamentos</Link>
              </li>
              <li>
                <Link to="/empleados">Empleados</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<p>Detail not found</p>} />
            <Route path="/articulos" element={<Articulos />} />
            <Route path="/historial" element={<Historial />} />
            <Route path="/departamentos" element={<Departamentos />} />
            <Route path="/empleados" element={<Empleados />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;