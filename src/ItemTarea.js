import React from "react";
import "./style.css";
//Aqui se mostraran los datos previamente ingresados como una nota adesiva
function ItemTarea(props) {
    const nivel = props.prioridad ? "Prioritaria" :  "Normal" ;

    return(
        <li className="col" >
            <div id={nivel}>
                <p id="entitled">  {props.titulo}</p>
                <p id="content">{props.tarea}</p>
            </div>
        </li>
    );
}

export default ItemTarea;