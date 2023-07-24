
import React, { useEffect, useRef, useState } from "react";
import ItemTarea from "./ItemTarea";
import { v4 as uuid } from 'uuid';
import "./style.css"
function ListaTareas() {

    const [tareas, setTareas] = useState([]);

    const tareaRef = useRef();
    const tituloRef = useRef();
    const checkRef = useRef();
    const KEY = 'notitas';

    //Se recuperan datos desde el localStorage
    useEffect(()=>{
        const misTareas = JSON.parse(localStorage.getItem(KEY));
        if (misTareas){
            setTareas(misTareas);
        }
    }, []);

    //Aqui se almacenan los datos en el localStorage para 
    //cuando se produzcan cambios en los arrays
    useEffect(()=>{
        const json = JSON.stringify(tareas);
        console.log(json);
        localStorage.setItem(KEY, json);
    }, [tareas]);
    
    
    //Agrega las tareas con su respectivo titulo y contenido
    //Ademas de que los campos son limpiados una vez se envian los datos
    const agregarNota = () => {
        const tarea = tareaRef.current.value;
        const titulo = tituloRef.current.value;
        const check = checkRef.current.checked;

        console.log("Título:", titulo);


        if (tarea === '') return;

        setTareas( (prev) => {
            const nuevaTarea = {
                id:uuid(),
                titulo:titulo,
                tarea:tarea,
                prioridad:check
            }
            return [...prev, nuevaTarea]
        });
        tareaRef.current.value = "";
        tituloRef.current.value = "";
        checkRef.current.checked = false; 
    }

    //Aqui se mostraran los inputs de la pagina junto con la CheckBox
    //para determinar si es una tarea prioritaria o no
    return(
        <>
            <h2 id="Titlex">Notas adesivas</h2>
        <div className="input-group my-4">
            <input id="titulo" ref={tituloRef} className="form-control col-md-4" placeholder="Ingrese titulo(opcional)"></input>
            <input id="descripcion" ref={tareaRef} className="form-control col-md-4" placeholder="Ingrese la tarea"></input>
        </div>
        <div className="col" id="Centradito">
            <div >
                <input ref={checkRef} id="CheckBox" className="form-check-input " type="checkbox"></input>
                <label htmlFor="CheckBox">Tarea Prioritaria</label>
            </div>
            <button onClick={agregarNota} className="btn btn-primary ms-2">Agregar</button>
        </div>
        <ul className="row">
            {tareas.map((t) => (
                <ItemTarea key={t.id} tarea={t.tarea} titulo={t.titulo} prioridad={t.prioridad}></ItemTarea>
            ))}
        </ul>
        </>
    );
}

export default ListaTareas;