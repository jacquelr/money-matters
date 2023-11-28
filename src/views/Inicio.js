import React from 'react'
import Sidebar from '../components/navbar'
import { Pie } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';


Chart.register(ArcElement, Tooltip, Legend);


// Datos de ejemplo para la gráfica
const data = {
  labels: ['Alimentos', 'Transporte', 'Salud'],
  datasets: [
     {
       data: [500, 200, 300],
       backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
     },
  ],
 };
 
 // Configuración de la gráfica
 const options = {
  maintainAspectRatio: false,
  plugins: {
     legend: {
       display: true,
       position: 'bottom',
       labels: {
         boxWidth: 10,
       },
     },
  },
 };
 
function Inicio() {
  return (
    
    <div>
      <Sidebar />
      <div className='container' style={{marginTop:'110px'}}>
        <div className='row'>
          <div className='col-4'>
            <div className='shadow p-3 mb-5 bg-white rounded' style={{height:'330px'}}>
              <div className="pie-chart" style={{height:'300px'}}>
                <Pie data={data} options={options}/>
              </div>
            </div>
          </div>
          <div className='col-8'>
          <div className='shadow-lg p-4 mt-4 mb-5 bg-white rounded'>
              <h2> B I E N V E N I D O </h2>
            </div>
            <div className='shadow-lg p-2 mb-3 bg-white rounded'>
              <h3> Total de ingresos: </h3>
            </div>
            <div className='shadow-lg p-2 mb-3 bg-white rounded'>
            <h3> Total de gastos: </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inicio