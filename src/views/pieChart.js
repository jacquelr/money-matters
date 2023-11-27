import React from 'react';
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

const PieChart = () => {
 return (
    <div className="pie-chart">
      <Pie data={data} options={options} />
    </div>
 );
};

export default PieChart;