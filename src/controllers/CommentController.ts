import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import VerifyComment from "../utils/validComment";
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
            const commentData = req.body

            if(!commentData.content){
                return res.status(400).json({
                    status: 400,
                    message: "O comentario deve possuir um conteudo",
                })
            }
            
            const response= await VerifyComment(commentData.content)
            console.log(response)
            if(response === "true"){
                return res.status(400).json({
                    status:400,
                    message:"Comentario ofensivo"
                })
            }

            const newComment = await prisma.comment.create({
                data: commentData,
                });
                
            res.json({
                status: 200,
                newuser: newComment,
                }); 
            return res.status(200)
            
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