import { Router } from "express";
import PostController from "../controllers/PostController";
const PostRouter = Router();

//Listar Posts
PostRouter.get("/users", PostController.listPost);

//Inserir usuários
PostRouter.post("/user", PostController.createPost);

//Atualizar usuários
PostRouter.put("/user/:id", PostController.updatePost);

//Deletar usuários
PostRouter.delete("/user/:id", PostController.deletePost);

export default PostRouter;