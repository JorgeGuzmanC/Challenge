import { useState } from "react";
import { useEffect} from "react"
import { useSelector, useDispatch } from "react-redux";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Alert } from '@mui/material';
import { Button } from "@mui/material";
import { deletePost, filteredPosts, getPosts } from '../features/postSlice';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
    { id: 'name', label: 'Nombre', minWidth: 170 },
    { id: 'description', label: 'Descripción', minWidth: 100 },
    { id: 'action', label: 'Acción', minWidth: 170, align: 'right',},
];

export default function PostList(){
    //Estilo lista MUI
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(true);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDelete = (id) => {
        dispatch(filteredPosts(""));
        setOpen(true)
        dispatch(deletePost(id))

        //Al eliminar un post se setea un timeout para quitar la alerta en 5 segundos
        const timer = setTimeout(() => {
            setOpen(false); 
        }, 5000); 
    
        return () => {
            clearTimeout(timer);
        };
    }

    //Constantes para obtener posts
    const dispatch = useDispatch()
    const postsState = useSelector((state) => state.posts)
    const {posts} = postsState
    
    //Función que dispara el obtener posts
    useEffect(() =>{
        dispatch(getPosts());
    }, [dispatch])


    return(
        <div>
            <Paper sx={{ width: '80%', overflow: 'hidden', alignItems: 'center', margin: 'auto', marginTop: '20px', marginBottom: '20px'}}>
                <TableContainer sx={{ maxHeight: 475 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}
                                sx={{
                                    fontSize: "18px",
                                    fontWeight: "bold"
                                }}>
                                {column.label}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {posts
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((post) => {
                                return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={post.id}>
                                    {columns.map((column) => {
                                    const value = post[column.id];
                                    if(post[column.id]){
                                        return (
                                            <TableCell key={column.id} align={column.align} >
                                            {value}
                                            </TableCell>
                                        );
                                    }else{
                                        return (
                                            <TableCell align={column.align}>
                                                <Button variant="outlined" color="error" startIcon={<DeleteIcon />}
                                                onClick={() => handleDelete(post.id)}
                                                >
                                                    Eliminar
                                                </Button>
                                            </TableCell>
                                        );
                                    }
                                    
                                    })}
                                </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={posts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Filas por página"
                />
                
            </Paper>
            {postsState.deletePostStatus === "rejected" ? open && (
                <Alert severity="error" onClose={() => {setOpen(false)}} sx={{marginBottom: "15px"}}>
                    {postsState.deletePostError}
                </Alert>
            ): null}

            {postsState.deletePostStatus === "success" ? open && (
                <Alert severity="warning" onClose={() => {setOpen(false)}} sx={{marginBottom: "15px", display: "flex",
                margin: "auto",
                justifyContent: "center",
                alignItems: "center",
                width: "400px",
                }}>
                    Post eliminado!
                </Alert>
            ): null}
        </div>
    );
}