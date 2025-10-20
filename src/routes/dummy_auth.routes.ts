import { Router, type Request, type Response } from "express";
import type { User } from "../models/user.ts";

const authRouter = Router()

const users : User[] = []
 
authRouter.post('/register', (req:Request, res: Response) => {
    const user : User = req.body
    if(!user.username || !user.password) {
       return res.json(401).send({message:"missing parameter"})
    }

    if(users.find((u) => u.username === user.username && u.password === user.password)) {
        return res.status(401).send({message:"User exists"})
    } 
    users.push(user)
    res.send({message:"user registed"})
}) 

authRouter.post('/login', (req:Request, res: Response) => {
    const user : User = req.body
    if(!user.username || !user.password) {
       return res.status(401).send({message:"missing parameter"})
    }

    const matchedUser = users.find((u) => u.username === user.username && u.password === user.password)
    
    if(!matchedUser) {
        return res.send({message:"unauthorized"})
    }

    req.session.user = matchedUser
    res.send({message:"user logged in"})
}) 

authRouter.get('/dashboard', (req:Request, res:Response) => {
    if(!req.session.user) {
        return res.send({message:"Unauthorized"})
    }

    res.send({
        message:"Welcome " + req.session.user.username
    })
})

export default authRouter