import {useCallback, useEffect, useState} from 'react';
import {createWorker} from 'tesseract.js';
import Sidebar from '../components/navbar';

const OCRapp = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("");

  //implementacion de filtros
  const [keywords, setKeywords] = useState(["gas", "gasolina", "alimento", "ropa", "magna","premium","total"]);
  const [matches, setMatches] = useState([]);

  const convertImageToText = useCallback(async () => {
    if (!selectedImage) return;
    const worker = await createWorker('eng');
    const ret = await worker.recognize(selectedImage);
    setTextResult(ret.data.text)
    await worker.terminate();

    //comparar el texto
    const foundMatches = keywords.filter(keyword =>
      ret.data.text.toLowerCase().includes(keyword.toLowerCase())
    );
    setMatches(foundMatches);
    //console.log(foundMatches.text);

  },[selectedImage, keywords]);
  
  useEffect(() => {
    convertImageToText();
  }, [selectedImage, convertImageToText])

  const handleChangeImage = e => {
    if(e.target.files[0]){
      setSelectedImage(e.target.files[0]); 
    }else{
      setSelectedImage(null)
      setTextResult("")
    }
  }

  return (
    <div>
      <Sidebar/>
        <p>Ya llevame diosito</p> <p>Ya llevame diosito</p>
        <p>En esta sección podrá seleccionar una imagen de un ticket o factura para ingresar su gasto.<br/> Asegurese de que la imagen sea legible.<br/> Puede tomar unos segundos.</p>
        <div className='row no-gutters'>
            <label for="formFile" class="form-label">Seleccione un archivo:</label>
            <input className="form-control" type="file" id="upload" accept='image/*' onChange={handleChangeImage}/>
        </div>
        <div className='md-3'>
          {selectedImage  && (
            <div className="box-image">
              <img src={URL.createObjectURL(selectedImage)} alt="thumb" style={{height:'500px', marginTop: '20px'}}></img>
            </div>
          )}
          {textResult && (
            <div className="box-paragrph" style={{marginTop: '20px'}}>
              <p>{textResult}</p>
            </div>
          )}
          {matches.length > 0 && (
            <div className="box-matches" style={{marginTop: '20px'}}>
              <p>Palabras clave encontradas: {matches.join(", ")}</p>
            </div>
          )}
          </div>
    </div>
    
  );
};

export default OCRapp;
