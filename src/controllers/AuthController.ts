import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CheckUserPassword, CreateHashPassword } from "../utils/HashPassword";

const prisma = new PrismaClient();

class AuthController{
    constructor(){

    }
    async signIn(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
    
            if (!email || !password) {
                return res.json({
                    status: 400,
                    message: "Email ou senha não informados."
                });
            }
    
            const user = await prisma.user.findFirst({
                where: {
                    email
                }
            });
    
            if (!user) {
                return res.json({
                    status: 404,
                    message: "Um usuário com este email não existe."
                });
            }
    
            console.log("Senha fornecida:", password);
            console.log("Senha armazenada:", user.password);
    
            const passwordChecks = await CheckUserPassword(password, user.password);
    
            console.log("Resultado da comparação de senha:", passwordChecks);
    
            if (!passwordChecks) {
                return res.json({
                    status: 401,
                    message: "Senha incorreta."
                });
            }
    
            return res.json({
                status: 200,
                message: "Autenticação bem sucedida."
            });
    
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: error
            });
        }
    }
    
    async signUp(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
    
            if (!email || !password) {
                return res.status(400).json({
                    message: "Email ou senha não informados."
                });
            }
    
            // Verifique se o usuário já existe
            const existingUser = await prisma.user.findFirst({
                where: {
                    email
                }
            });
    
            if (existingUser) {
                return res.status(400).json({
                    message: "Um usuário com este email já existe."
                });
            }
    
            // Crie o hash da senha
            const hashedPassword = await CreateHashPassword(password);
            
            // Verifique se o hashing foi bem-sucedido
            if (!hashedPassword) {
                return res.status(500).json({
                    message: "Erro ao criar a senha."
                });
            }
    
            // Salve o novo usuário no banco de dados com a senha hasheada
            await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword // Salve a senha hasheada
                }
            });
    
            return res.status(201).json({
                message: "Usuário criado com sucesso."
            });
    
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: error
            });
        }
    }
    
    
    async signOut(){

    }
}

export default new AuthController()