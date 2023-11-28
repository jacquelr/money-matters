import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  addDoc,
} from "firebase/firestore";

const MySwal = withReactContent(Swal);

function Ahorros() {
  const userID = "Y3yo8XHNpHeinIHM7N5k";
  
  const handledAdd= (e) => {
    //e.preventDefault();

    const val = doc(db, "usuarios", userID);
    const montoValue = parseInt(e.target.monto.value,10);
    const conceptoValue = e.target.concepto.value;
    const fechaValue = e.target.fecha.value;
  
  
    //agregar a ingreso
    const CollectionVal = collection(val, "ahorros");
    addDoc(CollectionVal, {
      monto:montoValue,
      concepto:conceptoValue,
      fecha:fechaValue,
    });
    alert("Ahorro reportado");
  }

  const [ahorros, setAhorros] = useState([]);

  const getAhorros = async (idUsuario) => {
    const q = query(collection(db, "usuarios", idUsuario, "ahorros"));
    const data = await getDocs(q);
    setAhorros(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(ahorros);
  };

  function eliminarAhorro(savingsId) {
    const savingsRef = doc(db, "usuarios", userID, "ahorros", savingsId);
    deleteDoc(savingsRef)
      .then(() => {
        console.log("Document successfully deleted!");
        getAhorros(userID); // Llama a la función para actualizar la lista de gastos
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  const confirmDelete = (savingsId) => {
    MySwal.fire({
      title: "¿Elimina el registro de la cuenta de ahorros?",
      text: "Esta accion no podrá revertirse",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Si, borrarlo",
    }).then((result) => {
      if (result.isConfirmed) {
        //llamamos a la funcion para eliminar
        eliminarAhorro(savingsId);
        Swal.fire("Eliminado!", "El registro ha sido eliminado", "éxito");
      }
    });
  };

  useEffect(() => {
    getAhorros(userID);
  }, []);

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <div className="container" style={{ marginTop: "40px" }}>
        <div className="row">
          <div className="col-5">
            <h5>Agregue un nuevo registro de la cuenta de ahorros:</h5>
            <p>Si va a registrar un gasto de la cuenta, ingrese el monto en negativo.</p>
            <form onSubmit={(e) => handledAdd(e)}>
              <div className="mb-3">
                <label style={{ marginTop: "10px" }}>Monto:</label>
                <input
                  className="form-control"
                  name="monto"
                  type="number"
                  style={{ marginTop: "10px" }}
                  placeholder="0"
                ></input>

                <label style={{ marginTop: "10px" }}>Concepto:</label>
                <input
                  className="form-control"
                  name="concepto"
                  type="text"
                  style={{ marginTop: "10px" }}
                  placeholder="Concepto o nota"
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
                  className="btn"
                  style={{ marginTop: "20px" , backgroundColor:'#71a1f4'}}
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
          <div className="col-7">
            <div className="shadow-sm p-3 mb-5 bg-white rounded">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Concepto</th>
                    <th>Fecha</th>
                    <th>Monto</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {}
                  {ahorros.map((ahorro) => (
                    <tr key={ahorro.id}>
                      <td>{ahorro.concepto}</td>
                      <td>{ahorro.fecha}</td>
                      <td>{ahorro.monto}</td>
                      <td>
                        <Link
                          to={`/Editar/${ahorro.id}`}
                          className="btn btn-light"
                        >
                          <i className="fa-solid fa-pencil"></i>
                        </Link>
                        <button
                          onClick={() => {
                            confirmDelete(ahorro.id);
                          }}
                          className="btn"
                          style={{backgroundColor:'#71a1f4'}}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ahorros;
