import { useCallback, useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import Sidebar from "../components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "../firebaseConfig/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const OCRapp = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("");

  //implementacion de filtros
  const [keywords, setKeywords] = useState([
    "gas",
    "gasolina",
    "alimento",
    "empanada",
    "ropa",
    "magna",
    "premium",
  ]);
  const totalKeywords = ["total", "total:"];
  const [matches, setMatches] = useState([]);
  const [monto, setMonto] = useState(null);
  const [concepto, setConcepto] = useState(null);

  const convertImageToText = useCallback(async () => {
    if (!selectedImage) return;
    const worker = await createWorker("eng");
    const ret = await worker.recognize(selectedImage);
    setTextResult(ret.data.text);
    await worker.terminate();

    const wordArray = ret.data.text
      .replaceAll(/\n/g, " ")
      .toLowerCase()
      .split(" ");
    const totalFound = totalKeywords.filter((keyword, i) => {
      return wordArray.includes(keyword);
    });
    const totalIndex = wordArray.indexOf(totalFound[0]);
    console.log({ wordArray });
    console.log({ totalIndex });
    console.log({ total: wordArray[totalIndex + 1] });
    // console.log(wordArray.totalIndex);

    if (totalIndex > -1) {
      const total = parseFloat(wordArray[totalIndex + 1].replaceAll("$", ""));
      console.log(total);
      setMonto(total);
    }
    //comparar el texto
    const foundMatches = keywords.filter((keyword) =>
      ret.data.text.toLowerCase().includes(keyword.toLowerCase())
    );
    setMatches(foundMatches);
    setConcepto(foundMatches[0]);
    console.log(foundMatches[0]);
  }, [selectedImage, keywords]);

  useEffect(() => {
    convertImageToText();
  }, [selectedImage, convertImageToText]);

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    } else {
      setSelectedImage(null);
      setTextResult("");
    }
  };

  const handledAdd = (e) => {
    e.preventDefault();

    const val = doc(db, "usuarios", "Y3yo8XHNpHeinIHM7N5k");
    var fechaActual = new Date();

    // Obtiene el día, mes y año
    var dia = fechaActual.getDate();
    var mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0, por lo que se suma 1
    var año = fechaActual.getFullYear();

    // Formatea la fecha como "yyyy-mm-dd"
    var fechaFormateada = año + '-' + (mes < 10 ? '0' : '') + mes + '-' + (dia < 10 ? '0' : '') + dia;

    const montoValue = monto;
    const conceptoValue = concepto;
    const fechaValue = fechaFormateada;

    //agregar a ingreso
    if (
      montoValue !== undefined &&
      conceptoValue !== undefined &&
      fechaValue !== undefined
    ) {
      const CollectionVal = collection(val, "gastos");
      addDoc(CollectionVal, {
        monto: montoValue,
        concepto: conceptoValue,
        fecha: fechaValue,
      });
      alert("Gasto reportado");
    } else {
      alert("Error: Some values are undefined");
      console.log(montoValue, conceptoValue, fechaValue);
    }
  };


  return (
    <div>
      <Sidebar />
      <div className='container' style={{marginTop:'100px'}}>
      <p>
        En esta sección podrá seleccionar una imagen de un ticket o factura para
        ingresar su gasto.
        <br /> Asegurese de que la imagen sea legible.
        <br /> Puede tomar unos segundos.
      </p>
      <div className="row no-gutters">
        <label for="formFile" class="form-label">
          Seleccione un archivo:
        </label>
        <input
          className="form-control"
          type="file"
          id="upload"
          accept="image/*"
          onChange={handleChangeImage}
        />
      </div>
      <div className="md-3">
        {selectedImage && (
          <div className="box-image">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="thumb"
              style={{ height: "500px", marginTop: "20px" }}
            ></img>
          </div>
        )}
        {textResult && (
          <div className="box-paragrph" style={{ marginTop: "20px" }}>
            <p>{textResult}</p>
          </div>
        )}
        {matches.length > 0 && (
          <div className="box-matches" style={{ marginTop: "20px" }}>
            <p>Palabras clave encontradas: {matches.join(", ")}</p>
            <div>
              <form onSubmit={(e) => handledAdd(e)}>
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ marginTop: "20px" }}
                  >
                    Agregar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default OCRapp;