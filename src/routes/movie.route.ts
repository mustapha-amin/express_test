import express, {type Request, type Response, Router} from "express"
import { deleteMovie, fetchMovies, findMovie, search, updateMovie, uploadMovie, userDisplay, } from "../controllers/movie_controller.ts";


const movieRouter = Router()


movieRouter.get('/user/:username', userDisplay)
movieRouter.get('/search', search)
movieRouter.get('/movies/:id', findMovie)
movieRouter.get('/movies/', fetchMovies)
movieRouter.post('/movies/upload', uploadMovie)
movieRouter.put('/movies/:id', updateMovie)
movieRouter.delete('/movies/:id', deleteMovie)
movieRouter.get('/talkback/:name/:id', (req: Request, res: Response) => {
    res.json({"message" : `You are ${req.params.name} with ID - ${req.params.id} `})
})

movieRouter.get('/talkback2/', (req: Request, res: Response) => {
    const {name, id} = req.query
    if(!name || !id) {
        res.json({"message" : "Missing query"})
    } else {
        res.json({"message" : `You are ${name} with ID - ${id} `})
    }
})

movieRouter.post('/form', (req: Request, res: Response)=>{
    res.json({"message" : "form received"})
    console.log(req.body)
    console.log(req.file)
})


movieRouter.get('/get-cookie', (req:Request, res:Response) => {
    const name = req.cookies.username;
    if(!name) {
        return res.send({
            message:"name not set"
        })
    }
    res.send({
        "message" : `Hello ${name}`
    })
})
movieRouter.get('/set-cookie/:name', (req:Request, res:Response) => {
    res.cookie("username", `${req.params.name}`, {
        maxAge: 60 * 1000,
    })
    res.send({
        message:"cookie set"
    })
})


movieRouter.get('/visit', (req:Request, res:Response) => {
    if(req.session.views) {
        if(req.session.views === 5) {
            return req.session.destroy((err) => {
                if(err) return res.send("Unable to clear session")
                res.send("session destroyed")
            })
        }
        req.session.views++;
        res.send(`You have visited this page ${req.session.views} times`)
    } else {
        req.session.views = 1
        res.send("You are visiting the page for the first time")
    }
})


export default movieRouter 