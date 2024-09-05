import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class CommentController {
    constructor() {}

    async listComment(req: Request, res: Response) {
        try {
            const comments = await prisma.comment.findMany();
            res.json(comments);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: error,
            });
        }
    }

    async createComment(req: Request, res: Response) {
        try {
            const commentData = req.body.comment;
            console.log(commentData);

            if (!commentData.title || !commentData.content || !commentData.authorId || !commentData.postId) {
                return res.status(400).json({
                    status: 400,
                    message: "Você precisa passar o título, conteúdo, autor e post no corpo da requisição",
                });
            }

            const newComment = await prisma.comment.create({
                data: commentData,
            });

            console.log(newComment);

            res.json({
                status: 200,
                newComment: newComment,
            });
        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: error,
            });
        }
    }

    async updateComment(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const body = req.body;

            const updatedComment = await prisma.comment.update({
                where: {
                    id: parseInt(id),
                },
                data: body,
            });

            if (updatedComment) {
                return res.json({
                    status: 200,
                    updatedComment: updatedComment,
                });
            }
        } catch (error) {
            console.log(error);
            res.json({
                status: 500,
                message: error,
            });
        }
    }

    async deleteComment(req: Request, res: Response) {
        try {
            const id = req.params.id;

            await prisma.comment.delete({
                where: {
                    id: parseInt(id),
                },
            });

            res.status(200).json({
                status: 200,
                message: "Comentário deletado com sucesso",
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: "Falha ao deletar o comentário",
            });
        }
    }
}

export default new CommentController();