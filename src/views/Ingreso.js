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
          <label style={{marginTop:'10px'}}>Eliga la cuenta a la que se añade este ingreso:</label>
          <select className="form-select" style={{marginTop:'10px'}}>
            <option selected>Seleccione una opción</option>
            <option value={1}>Ingreso</option>
            <option value={2}>Gasto</option>
          </select>

          <label style={{marginTop:'10px'}}>Monto:</label>
          <input className="form-control" type="number" style={{marginTop:'10px'}} placeholder="$00.00"></input>

          <label style={{marginTop:'10px'}}>Fecha:</label>
          <input className="form-control" type="date" style={{marginTop:'10px'}}></input>

          <button className="btn btn-primary" style={{marginTop:'20px'}}>Agregar</button>
        </div>
      </form>
    </div>
  );
}

export default Ingreso;
