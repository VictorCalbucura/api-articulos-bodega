import React, { useState, useEffect } from "react";

function Historial() {
  const [historial, setHistorial] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/historial")
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener los datos");
        return response.json();
      })
      .then((data) => setHistorial(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>Historial</h1>
      {error && <p className="error">{error}</p>}
      {historial.length > 0 ? (
        <ul>
          {historial.map((registro, index) => (
            <li key={index}>
              <p><strong>Empleado:</strong> {registro.empleado}</p>
              <p><strong>Fecha:</strong> {registro.fecha}</p>
              <p><strong>Cantidad:</strong> {registro.cantidadArticulos}</p>
              <p><strong>Departamento:</strong> {registro.departamento}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay registros en el historial</p>
      )}
    </div>
  );
}

export default Historial;
