import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CreateHashPassword } from "../utils/HashPassword";

const prisma = new PrismaClient();

class UserController {
    constructor() {}

    async listUser(req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany();
            res.json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({
                status: 500,
                message: "Internal Server Error",
            });
        }
    }

    async createUser(req: Request, res: Response) {
        try {
          const userdata = req.body;
    
          if (!userdata.email && !userdata.password) {
            return res.status(400).json({
              status: 400,
              message:
                "Você precisa passar o email e a senha no corpo da requisição",
            });
          }
    
          userdata.password = await CreateHashPassword(userdata.password);
    
          console.log(userdata.password);
    
          const newuserPrisma = await prisma.user.create({
            data: userdata,
          });
    
          console.log(userdata);
    
          res.json({
            status: 200,
            newuser: newuserPrisma,
          });
        } catch (error) {
          console.log(error);
          res.json({
            status: 500,
            message: error,
          });
        }
      }

    async updateUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const body = req.body;

            // Ensure the user exists
            const updatedUser = await prisma.user.update({
                where: { id },
                data: body,
            });

            res.status(200).json({
                status: 200,
                updatedUser: updatedUser,
            });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({
                status: 500,
                message: "Internal Server Error",
            });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);

            // Ensure the user exists before deletion
            await prisma.user.delete({
                where: { id },
            });

            res.status(200).json({
                status: 200,
                message: "User deleted successfully",
            });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({
                status: 500,
                message: "Internal Server Error",
            });
        }
    }
}

export default new UserController();
