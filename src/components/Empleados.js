import React, { useState, useEffect } from "react";

function Empleados() {
  const [empleados, setEmpleados] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://apibodega.netlify.app/empleados")
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener los datos");
        return response.json();
      })
      .then((data) => setEmpleados(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>Empleados</h1>
      {error && <p className="error">{error}</p>}
      {empleados.length > 0 ? (
        <ul>
          {empleados.map((empleado, index) => (
            <li key={index}>
              <p><strong>Nombre:</strong> {empleado.nombre}</p>
              <p><strong>Departamento:</strong> {empleado.departamento}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay empleados disponibles</p>
      )}
    </div>
  );
}

export default Empleados;
