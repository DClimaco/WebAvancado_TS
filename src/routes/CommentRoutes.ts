import { Router } from "express";
import CommentController from "../controllers/CommentController";
const CommentRouter = Router();

// Listar comentários
CommentRouter.get("/comment", CommentController.listComment);

// Inserir comentário
CommentRouter.post("/comment/create", CommentController.createComment);

// Atualizar comentário
CommentRouter.put("/comment/edit/:id", CommentController.updateComment);

// Deletar comentário
CommentRouter.delete("/comment/delete/:id", CommentController.deleteComment);

export default CommentRouter;