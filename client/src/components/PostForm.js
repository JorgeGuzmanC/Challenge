import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { filteredPosts, postAdd } from "../features/postSlice";
import { Button, Alert } from "@mui/material";

const PostForm = () => {
    //Definición de constantes
    const dispatch = useDispatch();
    const postState = useSelector((state) => state.posts);
    const [post, setPost] = useState({name: "", description: ""});
    const [open, setOpen] = useState(true);

    //Función que recibe los cambios de los inputs nombre y descripcion
    //(si existe una alerta la cierra cuando el input cambia)
    const handleChange = e => {
        setPost({
            ...post,
            [e.target.name]: e.target.value,
        })
    }

    //Función que dispara el crear usuario (botón crear post)
    //(dispara la alerta y deja el filtro vacio retornando todos los posts)
    const handleSubmit = (e) => {
        e.preventDefault();
        setOpen(true)
        dispatch(filteredPosts(""));
        dispatch(postAdd(post));
        //Si los campos no estan vacios (crea post), deja los campos vacios
        if(post.name !== "" && post.description !== ""){
            setPost({name: "", description: ""});
        }
    };

    return(
        <div  className="formulario">
            <form onSubmit={handleSubmit}>
                <input name="name" type="text" placeholder="Nombre" value={post.name} onChange={handleChange} />
                <textarea name="description" placeholder="Descripción" value={post.description} onChange={handleChange} />
                
                {postState.addPostStatus === "rejected" ? open && (
                    <Alert severity="error" sx={{minWidth: "350px"}}
                        onClose={() => {setOpen(false)}}>{postState.addPostError}
                    </Alert>
                ): null}

                {postState.addPostStatus === "success" ? open && (
                    <Alert severity="success" onClose={() => {setOpen(false)}}>Post agregado!</Alert>
                ): null}

                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <Button type="submit" variant="contained" size="small"
                    sx={{margin: "10px 0", fontFamily: "'Abel', 'sansSerif'"}}
                    >
                        Crear Post
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default PostForm;











