import { Router } from "express";
import PostController from "../controllers/PostController";
const PostRouter = Router();

//Listar Posts
PostRouter.get("/Posts", PostController.listPost);

//Inserir usuários
PostRouter.post("/Posts", PostController.createPost);

//Atualizar usuários
PostRouter.put("Posts/:id", PostController.updatePost);

//Deletar usuários
PostRouter.delete("/Posts/:id", PostController.deletePost);

export default PostRouter;