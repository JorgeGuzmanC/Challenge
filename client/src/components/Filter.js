import { useRef } from "react";
import { useDispatch } from "react-redux";
import { filteredPosts } from "../features/postSlice";

export default function Filter(){
    const inputRef = useRef('');
    const dispatch = useDispatch();
    //Función que dispara el filtro
    const filterName = () => {
        dispatch(filteredPosts(inputRef.current.value));
        document.getElementById("search").value = "";
    }
    //Función que limpia el filtro utilizado
    const clearfilter = () => {
        dispatch(filteredPosts(""));
        document.getElementById("search").value = "";
    }

    return(
        <div style={{width: '80%', alignItems: 'center', margin: 'auto'}}>
            <div className="filter">
                <div>
                    <input id="search" type="text" placeholder="Filtro de nombre" 
                    style={{marginRight: "10px"}}
                    ref = {inputRef}
                    />
                    <button onClick={filterName}>Buscar</button>
                </div>
                <div>
                    <button  onClick={clearfilter}>Limpiar</button>
                </div>
            </div>
        </div>
    )
}