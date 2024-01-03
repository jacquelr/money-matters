import React, {useEffect,useState} from "react";
import Navbar from "../components/navbar";
import 'bootstrap/dist/css/bootstrap.min.css'
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
} from "firebase/firestore";

const MySwal = withReactContent(Swal);

function Lista() {

  //1 - configuramos los hooks
  const userID = 'Y3yo8XHNpHeinIHM7N5k';
  const [gastos, setGastos] = useState([]);
  const [ingresos, setIngresos] = useState([]);
  const [registros, setRegistros] = useState([]);

  //INGRESOS
  //Mensaje de confirmacion SW2 de ingreso
  const confirmDeleteIncome = (ingresoid) => {
    MySwal.fire({
      title: "¿Elimina el ingreso?",
      text: "Esta accion no podrá revertirse",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Si, borrarlo",
    }).then((result) => {
      if (result.isConfirmed) {
        //llamamos a la funcion para eliminar
        eliminarIngreso(ingresoid);
        Swal.fire("Eliminado!", "El ingreso ha sido eliminado", "éxito");
      }
    });
  };
  
  //Obtener los ingresos de la base de datos
  const getIngresos = async (userID) => {
    const q = query(collection(db, "usuarios", userID, "ganancias"));
    const data = await getDocs(q);
    setIngresos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(ingresos)
  };

  //Eliminar un ingreso de la base de datos
  function eliminarIngreso(incomeid) {
    const incomeRef = doc(db, "usuarios", userID, "ganancias", incomeid);
    deleteDoc(incomeRef).then(() => {
      console.log("Document successfully deleted!");
      getIngresos(userID); // Llama a la función para actualizar la lista de ingresos
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }


  //GASTOS
  //Mensaje de confirmacion SW2 de gasto
  const confirmDeleteExpense = (gastoid) => {
    MySwal.fire({
      title: "¿Elimina el gasto?",
      text: "Esta accion no podrá revertirse",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Si, borrarlo",
    }).then((result) => {
      if (result.isConfirmed) {
        //llamamos a la funcion para eliminar
        eliminarGasto(gastoid);
        Swal.fire("Eliminado!", "El gasto ha sido eliminado", "éxito");
      }
    });
  };
  
  //Obtener los gastos de la base de datos
  const getGastos = async (userID) => {
    const q = query(collection(db, "usuarios", userID, "gastos"));
    const data = await getDocs(q);
    setGastos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(gastos)
  };

  //Eliminar un gasto de la base de datos
  function eliminarGasto(expenseId) {
    const expenseRef = doc(db, "usuarios", userID, "gastos", expenseId);
    deleteDoc(expenseRef).then(() => {
      console.log("Document successfully deleted!");
      getGastos(userID); // Llama a la función para actualizar la lista de gastos
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }
  


  //useEffect 
  useEffect(() => {
    getGastos(userID);
    getIngresos(userID);
 }, []);

  //useEffect(() => {
  //  getGastos(userID);
  //  getIngresos(userID);
  //  const registrosConcatenados = [].concat(gastos, ingresos);
  //  setRegistros(registrosConcatenados);
  // }, [gastos, ingresos]);


  return (
    <div>
        <Navbar/>
        <div className="container" style={{marginTop:'100px'}}>
        <div className='d-grid gap-1'>
          <Link to="/Ingreso" className='btn btn-secondary mt-2 mb-2'>Crear nuevo registro</Link>
        </div>
      <table className="table table-hover">
        <thead>
          <tr className="table-info">
            <th>Concepto</th>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {}
          {ingresos.map((ingreso) => (
            <tr key={ingreso.id} className="table-success">
              <td>{ingreso.concepto}</td>
              <td>{ingreso.fecha}</td>
              <td>{ingreso.monto}</td>
              <td>
                <Link to={`/EditarIngreso/${ingreso.id}`} className="btn btn-light">
                  <i className="fa-solid fa-pencil"></i>
                </Link>
                  <button
                    onClick={() => {
                      confirmDeleteIncome(ingreso.id);
                    }}
                    className="btn btn-primary"
                    >
                    <i className="fa-solid fa-trash"></i>
                  </button>
              </td>
            </tr>
          ))}
          {gastos.map((gasto) => (
            <tr key={gasto.id} className="table-danger">
              <td>{gasto.concepto}</td>
              <td>{gasto.fecha}</td>
              <td>{gasto.monto}</td>
              <td>
                <Link to={`/EditarGasto/${gasto.id}`} className="btn btn-light">
                  <i className="fa-solid fa-pencil"></i>
                </Link>
                  <button
                    onClick={() => {
                      confirmDeleteExpense(gasto.id);
                    }}
                    className="btn btn-primary"
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
  )
}

export default Lista