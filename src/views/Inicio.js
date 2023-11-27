import React from 'react'
import Sidebar from '../components/navbar'
import { Pie } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import LineChart from './LineChart';

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
        <br/><br/><br/><br/>
        <div className="pie-chart">
          <Pie data={data} options={options} style={{width: '600px', height: '400px', position: 'relative', top: '50px', left: '-300px'}}/>
        </div>

    </div>
  )
}

export default Inicio