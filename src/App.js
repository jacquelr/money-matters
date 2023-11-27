import './App.css';

//myviews
import OCRapp from './views/OCRapp';
import Inicio from './views/Inicio';
import Ingreso from './views/Ingreso';
import Gasto from './views/Gasto';
import Ahorros from './views/Ahorros';

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
            <Route path='/Ahorros' element={ <Ahorros /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
