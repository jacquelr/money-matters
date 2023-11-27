import React, {useEffect,useState} from "react";
import Navbar from "../components/navbar";
import "../css/styles.css";
import { Link } from "react-router-dom";
//import {collection, getDocs,getDoc, deleteDoc, doc} from 'firebase/firestore'
import { db } from "../firebaseConfig/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { async } from "@firebase/util";

import {
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const MySwal = withReactContent(Swal);

function Lista() {

  //1 - configuramos los hooks
  const [users, setUsers] = useState([]);
  
  //gastos jacquetry
  const userID = 'Y3yo8XHNpHeinIHM7N5k';
  const [gastos, setGastos] = ([]);
  const [ingresos, setIngresos] = ([]);

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
  const confirmDelete = (id) => {
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
        deleteuser(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  //getGastos
  const getgastos = async () => {
    //const data = await getDocs(usersCollection);
    //console.log(data.docs)
    //setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //console.log(users)
    setGastos ()
  } 

  useEffect(() => {
    const getData = async () => {
       const data = await getDocs(usersCollection);
       const newUsers = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
       setUsers(newUsers);
   
       const newGastos = [];
       const newGanancias = [];
   
       for (let user of newUsers) {
         //const gastos = await getGastos(user.id);
         //const ganancias = await getGanancias(user.id);
         //newGastos.push(gastos);
         //newGanancias.push(ganancias);
       }
   
       setGastos(newGastos);
       //setGanancias(newGanancias);
    };
   
    getData();
   }, []);

  //6 - usamos useEffect
  useEffect(() => {
    getusers();
    getgastos(userID);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
        <Navbar/>
        <br/><br/>

        <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-grid gap-2">
              <Link to="/Ingreso" className="btn btn-secondary mt-2 mb-2">
                Nuevo Registro
              </Link>
            </div>
            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th>Concepto</th>
                  <th>Fecha</th>
                  <th>Monto</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.nombre}</td>
                    <td>{user.email}</td>
                    <td>
                      <Link to={`/edit/${user.id}`} className="btn btn-light">
                        <i className="fa-solid fa-pencil"></i>
                      </Link>
                      <button
                        onClick={() => {
                          confirmDelete(user.id);
                        }}
                        className="btn btn-danger"
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
  )
}

export default Lista