import React, { useEffect, useState } from "react";
import Sidebar from "../components/navbar";
import { Pie } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { db } from "../firebaseConfig/firebase";
import {
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
} from "firebase/firestore";

Chart.register(ArcElement, Tooltip, Legend);

// Datos de ejemplo para la gráfica
// const data = {
//   labels: ["Ganancias", "Gastos", "Ahorro"],
//   datasets: [
//     {
//       data: [57777, 46000, 15000],
//       backgroundColor: [
//         "rgba(255, 99, 132, 0.6)",
//         "rgba(54, 162, 235, 0.6)",
//         "rgba(255, 206, 86, 0.6)",
//       ],
//     },
//   ],
// };

// Configuración de la gráfica
const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        boxWidth: 10,
      },
    },
  },
};

function Inicio() {
  //empieza con recibir los datos de firebase
  const [ganancia, setGanancia] = useState(null);
  const [ahorro, setAhorro] = useState(null);
  const [gasto, setGasto] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getValue = async () => {
      const val = doc(db, "usuarios", "Y3yo8XHNpHeinIHM7N5k");
      const CollectionVal = collection(val, "ganancias");
      const CollectionGastos = collection(val, "gastos");
      const CollectionAhorro = collection(val, "ahorros");

      const querySnapshot = await getDocs(CollectionVal);
      const queryGastos = await getDocs(CollectionGastos);
      const queryAhorro = await getDocs(CollectionAhorro);
      const sumaGanancia = querySnapshot.docs
        .map((doc) => ({
          monto: parseInt(doc.data().monto, 10),
        }))
        .reduce((acumulador, objeto) => acumulador + objeto.monto, 0);
      const sumaGasto = queryGastos.docs
        .map((doc) => ({
          monto: parseInt(doc.data().monto, 10),
        }))
        .reduce((acumulador, objeto) => acumulador + objeto.monto, 0);
      const sumaAhorro = queryAhorro.docs
        .map((doc) => ({
          monto: parseInt(doc.data().monto, 10),
        }))
        .reduce((acumulador, objeto) => acumulador + objeto.monto, 0);

      const newData = {
        labels: ["Ganancias", "Gastos", "Ahorro"],
        datasets: [
          {
            data: [sumaGanancia, sumaGasto, sumaAhorro],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
            ],
          },
        ],
      };
      setData(newData);
      setAhorro(sumaAhorro);
      setGanancia(sumaGanancia);
      setGasto(sumaGasto);
    };

    getValue();
  }, []);

  // data.datasets.data;
  //termina de recibir los datos
  return (
    <div>
      <Sidebar />
      <div className="container" style={{ marginTop: "110px" }}>
        <div className="row">
          <div className="col-4">
            <div
              className="shadow p-3 mb-5 bg-white rounded"
              style={{ height: "330px" }}
            >
              {data && (
                <div className="pie-chart" style={{ height: "300px" }}>
                  <Pie data={data} options={options} />
                </div>
              )}
            </div>
          </div>
          <div className="col-8">
            <div className="shadow-lg p-4 mt-2 mb-3 bg-white rounded">
              <h2> B I E N V E N I D O </h2>
            </div>
            <div className="shadow-lg p-2 mb-3 bg-white rounded">
              <h3> Total de ingresos: ${ganancia} </h3>
            </div>
            <div className="shadow-lg p-2 mb-3 bg-white rounded">
              <h3> Total de gastos: ${gasto}</h3>
            </div>
            <div className="shadow-lg p-2 mb-3 bg-white rounded">
              <h3> Total de ahorros: ${ahorro}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio;