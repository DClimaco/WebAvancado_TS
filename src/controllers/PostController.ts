import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class PostController{
    constructor(){

    }

    async listPost(req: Request, res: Response){
        try{
            const posts = await prisma.post.findMany();
            res.json(posts)
        }catch(error){
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
    }

    async createPost(req: Request, res: Response) {
        try {
            const { title, content, published, authorId } = req.body;

            if (!title || !authorId) {
                return res.status(400).json({
                    status: 400,
                    message: "Título e Id do autor necessários.",
                });
            }

            const newPost = await prisma.post.create({
                data: {
                    title,
                    content,
                    published: published ?? false, // Default to false if not provided
                    author: {
                        connect: { id: authorId },
                    },
                },
            });

            console.log(newPost);

            res.status(201).json({
                status: 201,
                newPost,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 500,
                message: error,
            });
        }
    }

    async updatePost(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const { title, content, published, authorId } = req.body;

            // Validate the ID and ensure at least one field to update
            if (isNaN(id)) {
                return res.status(400).json({
                    status: 400,
                    message: "ID do post inválido.",
                });
            }

            const updatedPost = await prisma.post.update({
                where: {
                    id: id,
                },
                data: {
                    title: title,           // Update title if provided
                    content: content,       // Update content if provided
                    published: published,   // Update published status if provided
                    author: authorId ? { connect: { id: authorId } } : undefined, // Update author if provided
                },
            });

            console.log('Post updated:', updatedPost);

            res.json({
                status: 200,
                updatedPost,
            });
        } catch (error) {
            console.error('Error updating post:', error);
            res.status(500).json({
                status: 500,
                error: error,
            });
        }
    }

    async deletePost(req: Request, res: Response){
        try {
            const id = req.params.id;
        
            await prisma.post.delete({
              where: {
                id: parseInt(id),
              },
            });
        
            res.status(200).json({
              status: 200,
              message: "Post deletado com sucesso",
            });
          } catch (error) {
            console.log(error);
            res.status(400).json({
              message: "Falha ao deletar o registro",
            });
          }
    }
}

export default new PostController();