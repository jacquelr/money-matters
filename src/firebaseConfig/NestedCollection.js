import React from "react";
import { db } from "./firebase";
import { addDoc, collection, doc } from "firebase/firestore";

function NestedCollection() {
  const handledAdd = (e) => {
    e.preventDefault();

    const val = doc(db, "usuarios", "Y3yo8XHNpHeinIHM7N5k");
    const CollectionVal = collection(val, "gastos");

    addDoc(CollectionVal, {
      title: e.target.title.value,
      concepto: e.target.concepto.value,
      fecha: e.target.fecha.value,
    });
    alert("added...");
  };

  return (
    <div>
      <form onSubmit={(e) => handledAdd(e)}>
        <input name="title" type="number" placeholder="cantidad" />
        <br/>
        <input name="concepto" placeholder="concepto" />
        <br/>
        <input name="fecha" type="date" />
        <br/>

        <button>Add</button>
      </form>
    </div>
  );
}
export default NestedCollection;