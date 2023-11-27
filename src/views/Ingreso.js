import React from "react";
import Sidebar from "../components/navbar";
import { db } from "../firebaseConfig/firebase";
import { addDoc, collection, doc } from "firebase/firestore";

function Ingreso() {
  const handledAdd = (e) => {
    e.preventDefault();

    const val = doc(db, "usuarios", "Y3yo8XHNpHeinIHM7N5k");

    const montoValue = e.target.monto.value;
    const conceptoValue = e.target.concepto.value;
    const fechaValue = e.target.fecha.value;

    if (e.target.select.value === "1") {
      if (
        montoValue !== undefined &&
        conceptoValue !== undefined &&
        fechaValue !== undefined
      ) {
        const CollectionVal = collection(val, "ganancias");
        addDoc(CollectionVal, {
          monto: montoValue,
          concepto: conceptoValue,
          fecha: fechaValue,
        });
        alert("Ganancia reportada");
      } else {
        alert("Error: Some values are undefined");
        console.log(montoValue, conceptoValue, fechaValue);
      }
    }

    if (e.target.select.value === "2") {
      if (
        montoValue !== undefined &&
        conceptoValue !== undefined &&
        fechaValue !== undefined
      ) {
        const CollectionVal = collection(val, "gastos");
        addDoc(CollectionVal, {
          monto: montoValue,
          concepto: conceptoValue,
          fecha: fechaValue,
        });
        alert("Gasto reportado");
      } else {
        alert("Error: Some values are undefined");
      }
    }
  };

  return (
    <div>
      <Sidebar />
      <p>KHE</p>
      <p>KHE</p>

      <form onSubmit={(e) => handledAdd(e)}>
        <div className="mb-3">
          <label style={{ marginTop: "10px" }}>
            Eliga la cuenta a la que se añade este ingreso:
          </label>
          <select
            className="form-select"
            name="select"
            style={{ marginTop: "10px" }}
          >
            <option selected>Seleccione una opción</option>
            <option value={1}>Ingreso</option>
            <option value={2}>Gasto</option>
          </select>

          <label style={{ marginTop: "10px" }}>Monto:</label>
          <input
            className="form-control"
            name="monto"
            type="number"
            style={{ marginTop: "10px" }}
            placeholder="$00.00"
          ></input>

          <label style={{ marginTop: "10px" }}>Concepto:</label>
          <input
            className="form-control"
            name="concepto"
            type="text"
            style={{ marginTop: "10px" }}
            placeholder="concepto de la transaccion"
          ></input>

          <label style={{ marginTop: "10px" }}>Fecha:</label>
          <input
            className="form-control"
            name="fecha"
            type="date"
            style={{ marginTop: "10px" }}
          ></input>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "20px" }}
          >
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Ingreso;