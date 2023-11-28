import React from "react";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"

function Editar() {

    //user hardcodeado
    const userID = 'Y3yo8XHNpHeinIHM7N5k';

    const [ concepto, setConcepto ] = useState('')
    const [ monto, setMonto ] = useState(0)
    const [ fecha, setFecha ] = useState('')

    const navigate = useNavigate()    
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        const incomeRef = doc(db, "usuarios", userID, "ganancias", id);
        const data = {concepto: concepto, monto: monto, fecha: fecha}
        await updateDoc(incomeRef, data)
        navigate('/')
    }

    const getIncomeById = async (id) => {
        const incomeRef = await getDoc( doc(db, "usuarios", userID, "ganancias", id) )
        if(incomeRef.exists()) {
            //console.log(product.data())
            setConcepto(incomeRef.data().concepto)    
            setMonto(incomeRef.data().monto)
            setFecha(incomeRef.data().fecha)
        }else{
            console.log('El ingreso no existe')
        }
    }

    useEffect( () => {
        getIncomeById(id)
        // eslint-disable-next-line
    }, [])


  return (
    <div className="d-flex justify-content-center">
      <Navbar />
      <div
        className="shadow p-3 mb-5 bg-white rounded w-75 p-3 "
        style={{ marginTop: "110px" }}
      >
        <form onSubmit={update}>
          <div className="mb-3">
            <label style={{ marginTop: "10px" }}>
              Modifique aquello que desee:
            </label>
            <br/>
            <label style={{ marginTop: "10px" }}>Concepto:</label>
            <input
              value={concepto}
              className="form-control"
              onChange={ (e) => setConcepto(e.target.value)}
              type="text"
              style={{ marginTop: "10px" }}
              placeholder="concepto de la transaccion"
            ></input>

            <label style={{ marginTop: "10px" }}>Monto:</label>
            <input
              value={monto}
              className="form-control"
              onChange={ (e)=> setMonto(e.target.value)}
              type="number"
              style={{ marginTop: "10px" }}
              placeholder="$00.00"
            ></input>

            <label style={{ marginTop: "10px" }}>Fecha:</label>
            <input
              value={fecha}
              className="form-control"
              onChange={ (e)=> setFecha(e.target.value)}
              type="date"
              style={{ marginTop: "10px" }}
            ></input>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: "20px" }}
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Editar;
