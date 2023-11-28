import React from "react";
import Sidebar from "../components/navbar";
import { db } from "../firebaseConfig/firebase";
import { useNavigate } from "react-router-dom"
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

function Ingreso() {
  //empieza con recibir los datos de firebase
  const [data, setData] = useState([]);
  const [suma, setSuma] = useState(0);
  const navigate = useNavigate();

  const getValue = async () => {
    const val = doc(db, "usuarios", "Y3yo8XHNpHeinIHM7N5k");
    const CollectionVal = collection(val, "ganancias");

    const querySnapshot = await getDocs(CollectionVal);

    setData(
      querySnapshot.docs.map((doc) => ({
        monto: parseInt(doc.data().monto, 10), // Accede a la propiedad 'monto' de 'doc.data()'
      }))
    );

    setSuma(data.reduce(
      (acumulador, objeto) => acumulador + objeto.monto,
      0
    ))
  };

  useEffect(() => {
    getValue();
  }, []);
  
  console.log(suma);
  //termina de recibir los datos

  //evento de registrar transaccion
  const handledAdd = (e) => {
    e.preventDefault();

    const val = doc(db, "usuarios", "Y3yo8XHNpHeinIHM7N5k");

    const montoValue = parseInt(e.target.monto.value,10);
    const conceptoValue = e.target.concepto.value;
    const fechaValue = e.target.fecha.value;

    //agregar a ingreso
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
        navigate('/')
      } else {
        alert("Error: Some values are undefined");
        console.log(montoValue, conceptoValue, fechaValue);
      }
    }

    //agregar a gasto
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
        navigate('/')
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
      <div className="container" style={{marginTop:'80px'}}>
      <div className="shadow p-3 mb-5 bg-body-tertiary rounded">
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
            min={0}
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
      </div>
    </div>
  );
}

export default Ingreso;