import './App.css';

//myviews
import OCRapp from './views/OCRapp';
import Inicio from './views/Inicio';
import Ingreso from './views/Ingreso';
import Gasto from './views/Gasto';
import PieChart from './views/pieChart';

//importar el router
import { BrowserRouter, Route, Routes } from 'react-router-dom';




function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
          <Route>
            <Route path='/' element={ <Inicio /> } />
            <Route path='/OCRapp' element={ <OCRapp /> } />
            <Route path='/Ingreso' element={ <Ingreso /> } />
            <Route path='/Gasto' element={ <Gasto /> } />
            <Route path='/PieChart' element={ <PieChart /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
