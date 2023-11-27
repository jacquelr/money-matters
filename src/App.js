import './App.css';

//myviews
import OCRapp from './views/OCRapp';
import Inicio from './views/Inicio';
import Ingreso from './views/Ingreso';
import Lista from './views/Lista';
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
            <Route path='/Lista' element={ <Lista /> } />
            <Route path='/Ahorros' element={ <Ahorros /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
