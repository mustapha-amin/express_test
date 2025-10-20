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

export default router 