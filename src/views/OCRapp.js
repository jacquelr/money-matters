import React from 'react';
import Sidebar from '../components/navbar';

const OCRapp = () => {
  return (
    <div>
      <Sidebar/>
        <p>Ya llevame diosito</p>
        <div class="mb-3">
          <label for="formFile" class="form-label">Seleccione un archivo:</label>
          <input class="form-control" type="file" id="formFile"/>
        </div>
    </div>
    
  );
};

export default OCRapp;
