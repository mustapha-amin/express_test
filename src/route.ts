import express from "express"
import { deleteMovie, fetchMovies, findMovie, search, updateMovie, uploadMovie, userDisplay, } from "./controller.ts";

const router = express.Router()


router.get('/user/:username', userDisplay)
router.get('/search', search)
router.get('/movies/:id', findMovie)
router.get('/movies/', fetchMovies)
router.post('/movies/upload', uploadMovie)
router.put('/movies/:id', updateMovie)
router.delete('/movies/:id', deleteMovie)
router.get('/talkback/:name/:id', (req: express.Request, res: express.Response) => {
    res.json({"message" : `You are ${req.params.name} with ID - ${req.params.id} `})
})

router.get('/talkback2/', (req: express.Request, res: express.Response) => {
    const {name, id} = req.query
    if(!name || !id) {
        res.json({"message" : "Missing query"})
    } else {
        res.json({"message" : `You are ${name} with ID - ${id} `})
    }
})

router.use((req : express.Request, res: express.Response) => {
    res.json({"message" : "invalid route"})
}) 

export default router 