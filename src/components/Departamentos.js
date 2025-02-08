import React, { useState, useEffect } from "react";

function Departamentos() {
  const [departamentos, setDepartamentos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://apibodega.netlify.app/departamentos")
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener los datos");
        return response.json();
      })
      .then((data) => setDepartamentos(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>Departamentos</h1>
      {error && <p className="error">{error}</p>}
      {departamentos.length > 0 ? (
        <ul>
          {departamentos.map((departamento, index) => (
            <li key={index}>
              <p><strong>Nombre:</strong> {departamento.nombre}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay departamentos disponibles</p>
      )}
    </div>
  );
}

export default Departamentos;
