import React, { useState, useEffect } from "react";

function Articulos() {
  const [articulos, setArticulos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://apibodega.netlify.app/articulos")
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener los datos");
        return response.json();
      })
      .then((data) => setArticulos(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>Artículos</h1>
      {error && <p className="error">{error}</p>}
      {articulos.length > 0 ? (
        <ul>
          {articulos.map((articulo) => (
            <li key={articulo.id}>
              <h2>{articulo.nombre}</h2>
              <p>{articulo.descripcion}</p>
              <p><strong>Departamento:</strong> {articulo.departamento}</p>
              <p><strong>Cantidad:</strong> {articulo.cantidad}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay artículos disponibles</p>
      )}
    </div>
  );
}

export default Articulos;