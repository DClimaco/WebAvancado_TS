import { Router } from "express";
import PostController from "../controllers/PostController";
const PostRouter = Router();

//Listar Posts
PostRouter.get("/posts", PostController.listPost);

//Inserir usuários
PostRouter.post("/posts/create", PostController.createPost);

//Atualizar usuários
PostRouter.put("/posts/edit/:id", PostController.updatePost);

//Deletar usuários
PostRouter.delete("/posts/delete/:id", PostController.deletePost);

export default PostRouter;