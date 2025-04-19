import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma'
import { generateToken } from '../middlewares/jwt.middleware'


export const register = async (username: string, email: string, password: string) => {

    const existingUser = await prisma.users.findFirst({
        where: {
            OR: [
                { email: email },
                { username: username }
            ]
        }
    })

    if (existingUser) throw new Error("Username or email already exists.")

    const hash_password = await bcrypt.hash(password, 10)
    const response = await prisma.users.create({
        data: {
            username: username,
            email: email,
            password: hash_password,
        },
    })
    return response
}


export const login = async (email: string, password: string) => {
    const existingUser = await prisma.users.findFirst({
        where: {
            email: email
        }
    })

    if (!existingUser) throw new Error("Email or Password is incorrect")

    const hashed = await bcrypt.compare(password, existingUser.password);
    if (!hashed) throw new Error("Email or Password is incorrect")

    return generateToken((existingUser.id).toString());
}