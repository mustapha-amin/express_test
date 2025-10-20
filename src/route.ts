import express, {type Request, type Response, Router} from "express"
import { deleteMovie, fetchMovies, findMovie, search, updateMovie, uploadMovie, userDisplay, } from "./controller.ts";

const router = Router()


router.get('/user/:username', userDisplay)
router.get('/search', search)
router.get('/movies/:id', findMovie)
router.get('/movies/', fetchMovies)
router.post('/movies/upload', uploadMovie)
router.put('/movies/:id', updateMovie)
router.delete('/movies/:id', deleteMovie)
router.get('/talkback/:name/:id', (req: Request, res: Response) => {
    res.json({"message" : `You are ${req.params.name} with ID - ${req.params.id} `})
})

router.get('/talkback2/', (req: Request, res: Response) => {
    const {name, id} = req.query
    if(!name || !id) {
        res.json({"message" : "Missing query"})
    } else {
        res.json({"message" : `You are ${name} with ID - ${id} `})
    }
})

router.post('/form', (req: Request, res: Response)=>{
    res.json({"message" : "form received"})
    console.log(req.body)
    console.log(req.file)
})


router.get('/get-cookie', (req:Request, res:Response) => {
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
router.get('/set-cookie/:name', (req:Request, res:Response) => {
    res.cookie("username", `${req.params.name}`, {
        maxAge: 60 * 1000,
    })
    res.send({
        message:"cookie set"
    })
})


router.get('/visit', (req:Request, res:Response) => {
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


export default router 