import React from "react";
import Sidebar from "../components/navbar";

function Ingreso() {
  return (
    <div>
      <Sidebar />
      <p>KHE</p>
      <p>KHE</p>

      <form>
        <div className="mb-3">
          <label>Eliga la cuenta a la que se añade este ingreso:</label>
          <select className="form-select">
            <option selected>Seleccione una opción</option>
            <option value={1}>Ingreso</option>
            <option value={2}>Gasto</option>
          </select>

          <label>Monto:</label>
          <input className="form-control" type="number"></input>

          <label>Fecha:</label>
          <input type="date"></input>
        </div>
      </form>
    </div>
  );
}

export default Ingreso;
