import React, {useEffect,useState} from "react";
import Navbar from "../components/navbar";
import "../css/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";
//import {collection, getDocs,getDoc, deleteDoc, doc} from 'firebase/firestore'
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
  const [users, setUsers] = useState([]);
  
  //gastos jacquetry
  const userID = 'Y3yo8XHNpHeinIHM7N5k';
  const [gastos, setGastos] = useState([]);
  //const [ingresos, setIngresos] = useState([]);

  //2 - referenciamos a la DB firestore
  const usersCollection = collection(db, "usuarios");

  //3 - Funcion para mostrar TODOS los docs
  const getusers = async () => {
    const data = await getDocs(usersCollection);
    //console.log(data.docs)
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //console.log(users)
  };
  //4 - Funcion para eliminar un doc
  const deleteuser = async (id) => {
    const userDoc = doc(db, "usuarios", id);
    await deleteDoc(userDoc);
    getusers();
  };
  //5 - Funcion de confirmacion para Sweet Alert 2
  const confirmDelete = (gastoid) => {
    MySwal.fire({
      title: "¿Elimina el usero?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //llamamos a la fcion para eliminar
        eliminarGasto(gastoid);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  
  //getgastos
  const getGastos = async (idUsuario) => {
    const q = query(collection(db, "usuarios", idUsuario, "gastos"));
    const data = await getDocs(q);
    setGastos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(gastos)
  };

    //delete gasto
  
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
    if (users.length > 0) {
       getGastos(users[0].id);
    }
   }, [users]);

   
  //6 - usamos useEffect
  useEffect(() => {
    getusers();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
        <Navbar/>
        <br/><br/><br/>  
        <div class="btn-group btn-group-lg" role="group" aria-label="Large button group">
          <button type="button" class="btn btn-outline-primary">Ingresos</button>
          <button type="button" class="btn btn-outline-primary">Gastos</button>
        </div>
        <div className='d-grid gap-2'>
          <Link to="/Ingreso" className='btn btn-secondary mt-2 mb-2'>Create</Link>
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
          {gastos.map((gasto) => (
            <tr key={gasto.id}>
              <td>{gasto.concepto}</td>
              <td>{gasto.fecha}</td>
              <td>{gasto.monto}</td>
              <td>
                <Link to={`/Editar/${gasto.id}`} className="btn btn-light">
                  <i className="fa-solid fa-pencil"></i>
                </Link>
                  <button
                    onClick={() => {
                      confirmDelete(gasto.id);
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
  )
}

export default Lista