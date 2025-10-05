import express from "express"
import { fetchMovies, findMovie, search, updateMovie, uploadMovie, userDisplay, } from "./controller.ts";

const router = express.Router()


router.get('/user/:username', userDisplay)
router.get('/search', search)
router.get('/movies/:id', findMovie)
router.get('/movies/', fetchMovies)
router.post('/movies/upload', uploadMovie)
router.put('/movies/:id', updateMovie)

export default router 