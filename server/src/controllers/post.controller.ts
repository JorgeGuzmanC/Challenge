//Funciones de api
import { AppDataSource } from "../data-source"
import { Post } from "../entity/Post"


const getAllPosts = async (req, res) => {
    try {
        const posts = await AppDataSource.manager.find(Post)
        console.log("Loaded posts: ", posts)
        res.json(posts)
    } catch (error) {
        res.json({error: error.message});
    }
}

const createPost = async (req, res) => {
    const { name, description } = req.body;
    try {
        if (name !== "" && description !== ""){
            const post = new Post()
            post.name = name
            post.description = description
            await AppDataSource.manager.save(post)
            res.send(post)
        }else if(name === "" && description !== ""){
            res.status(400).send("El campo name no puede estar vacio");
        }else if(name !== "" && description === ""){
            res.status(400).send("El campo description no puede estar vacio");
        }else if(name === "" && description === ""){
            res.status(400).send("Los campos no pueden estar vacios");
        }
    } catch (error) {
        res.json({error: error.message});
    }
    
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await AppDataSource.manager
        .createQueryBuilder(Post, "post")
        .where("post.id = :id", { id: id})
        .getOne()

        if(post === null){
            res.json("El post no existe")
        }else{
            await AppDataSource.manager
            .createQueryBuilder()
            .delete()
            .from(Post)
            .where("id = :id", { id: id })
            .execute()
            
            res.json(post)
        }
    } catch (error) {
        res.json({error: error.message});
    }
    
}

module.exports = {
    getAllPosts,
    createPost,
    deletePost
}