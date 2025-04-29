import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma'
import { generateToken } from '../middlewares/jwt.middleware'

// ! REGISTER
export const register = async (userData: { name: string, email: string, id: string }) => {

    const response = await prisma.users.create({
        data: {
            username: userData.name,
            email: userData.email,
            googleId: userData.id

        },
    })
    return response
}

// ! LOGIN
export const login = async (userData: { name: string, email: string, id: string }) => {
    const existingUser = await prisma.users.findFirst({
        where: {
            OR: [
                { email: userData.email },
                { googleId: userData.id }
            ]
        }
    })

    if (!existingUser) {
        return await register(userData);
    }

    if (existingUser.googleId === null) {
        const updatedUser = await prisma.users.update({
            where: { id: existingUser.id },
            data: { googleId: userData.id }
        });
        return updatedUser;
    }

    return existingUser;

}

export const getUserProfile = async (userId: number) => {
    const user = await prisma.users.findFirst({
        where: {
            id: userId
        }
    })
    return {
        id: user?.id,
        username: user?.username
    }

}