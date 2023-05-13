import React, { useState } from "react";
import DataTable from "react-data-table-component";
import "./Table.css"; // Importa el archivo CSS con los estilos

export default function Table() {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const endpoint = "https://scrapper-amazon.herokuapp.com/amazon";

  const fetchData = async () => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ word: searchValue }),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const json = await response.json();
      const data = json.data.map((url, index) => ({
        id: index + 1,
        nombre: url,
      }));

      setProducts(data);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchData();
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  return (
    <div className="table-container">
      <div className="search-container">
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress} // Agrega el evento onKeyPress para detectar la tecla Enter
          placeholder="Buscar..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Buscar
        </button>
      </div>
      <div>
        {products.length > 0 ? (
          <DataTable
            columns={[
              { name: "ID", selector: "id", sortable: true },
              { name: "Nombre", selector: "nombre", sortable: true },
            ]}
            data={products}
            className="data-table"
          />
        ) : (
          <p className="no-products">No se encontraron productos</p>
        )}
      </div>
    </div>
  );
}
