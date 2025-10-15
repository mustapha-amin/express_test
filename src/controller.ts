import type { Request, Response } from "express";
import fs from "fs";
import type { Movie } from "./models.ts";
import { fetchMoviesFromFile, writeMoviesToFile } from "./movie_handlers.ts";

function userDisplay(req: Request, res: Response) {
    res.status(200).json(`Hello, ${req.params.username}`)
}

function search(req: Request, res: Response) {
    const name = req.query.name;
    res.status(200).send(`Searching for ${name}`)
}

function findMovie(req: Request, res: Response) {
    const movies = fetchMoviesFromFile()
    const movie = movies.find((e) => e.id == req.params.id)
    if (movie) {
        res.status(200).json(movie)
    } else {
        res.status(404).json({ "message": "not found" })
    }
}

function fetchMovies(req: Request, res: Response) {
    res.status(200).json(fetchMoviesFromFile())
}

function uploadMovie(req: Request, res: Response) {
    const movie: Movie = req.body;
    if (!movie.id || !movie.title || !movie.director || !movie.year) {
        return res.status(400).json({ "error": "missing parameter" })
    }
    
    let existingMovies = fetchMoviesFromFile()
    if (existingMovies.some((e) => e.id.toString() === movie.id)) {
        return res.status(409).json({ "message": "movie already exists" })
    }
    
    existingMovies.push(req.body)
    writeMoviesToFile(existingMovies)
    res.status(201).json({ "message": "movie uploaded" })
}

function updateMovie(req: Request, res: Response) {
    const movie: Movie = req.body;
    if (!movie.id || !movie.title || !movie.director || !movie.year) {
        return res.status(400).json({ "error": "missing parameter" })
    }
    
    let existingMovies = fetchMoviesFromFile()
    if (existingMovies.some((e) => e.id.toString() === req.params.id)) {
        const index = existingMovies.findIndex((e) => e.id.toString() === req.params.id)
        existingMovies[index] = req.body
        writeMoviesToFile(existingMovies)
        return res.status(200).json({ "message": "movie updated" })
    }
    
    res.status(404).json({ "message": "movie not found" })
}

function deleteMovie(req: Request, res: Response) {
    let existingMovies = fetchMoviesFromFile()
    if(existingMovies.some((e) => e.id === req.params.id)) {
        existingMovies = existingMovies.filter((movie) => movie.id !== req.params.id);
        writeMoviesToFile(existingMovies);
        return res.status(200).json({"message" : "movie deleted"})
    }
    
    res.status(404).json({"message" : "movie not found"})
}

function updateMoviePatch(req: Request, res: Response) {
    let existingMovies = fetchMoviesFromFile()
    // TODO: Implement PATCH functionality
    res.status(501).json({ "message": "Not implemented" })
} 

export { userDisplay, search, findMovie, uploadMovie, fetchMovies, updateMovie, deleteMovie, updateMoviePatch }