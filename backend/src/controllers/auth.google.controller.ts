import { Request, Response } from 'express';
import querystring from "querystring";
import 'dotenv/config';

import { callbackService } from '../services/auth.google.service';
import { login } from '../services/auth.service';
import { generateToken } from '../middlewares/jwt.middleware';

export const googleAuth = async (req: Request, res: Response) => {
    const params = querystring.stringify({
        client_id: process.env.CLIENT_ID,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        response_type: "code",
        scope: [
            "openid",
            "profile",
            "email",
        ].join(" "),
        access_type: "offline",
        prompt: "consent",
    });
    res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
}

export const googleCallback = async (req: Request, res: Response) => {
    const code = req.query.code as string;
    try {
        const userData = await callbackService(code) //verify code for get user data
        const user = await login(userData);
        const token = generateToken((user.id).toString(), user.username); //generate token
        // res.redirect(`http://localhost:5173/auth/callback?token=${token}`);
        res.redirect(`https://finlytics.tony219y.com/auth/callback?token=${token}`);

    } catch (error) {
        console.error("Error during authentication:", error);
        res.status(500).send("Authentication failed");
    }
};
