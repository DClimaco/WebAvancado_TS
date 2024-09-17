import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AuthController{
    constructor(){

    }
    async singIn(req: Request, res: Response){
        try{
            const{email, password} = req.body;

            if(!email || !password){
                return res.json({
                    status: 400,
                    message: "Email ou senha não informados."
                )
                }     
            }

            const user = prisma.user.findFirst({
                where: {
                    email
                }
            })

            if(!user){
                return res.json
            }
        }
    }

    async singUp(){

    }

    async singOut(){

    }
}