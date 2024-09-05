import { Router } from "express";
import CommentController from "../controllers/CommentController";

const CommentRouter = Router();

// Listar comentários
CommentRouter.get("/comments", CommentController.listComment);

// Inserir comentário
CommentRouter.post("/comment", CommentController.createComment);

// Atualizar comentário
CommentRouter.put("/comment/:id", CommentController.updateComment);

// Deletar comentário
CommentRouter.delete("/comment/:id", CommentController.deleteComment);

export default CommentRouter;