import type { Request, Response } from "express";
import fs from "fs";
import type { Movie } from "./models.ts";
import { fetchMoviesFromFile, writeMoviesToFile } from "./movie_handlers.ts";

function userDisplay(req: Request, res: Response) {
    res.json(`Hello, ${req.params.username}`)
}

function search(req: Request, res: Response) {
    const name = req.query.name;
    res.send(`Searching for ${name}`)
}

function findMovie(req: Request, res: Response) {
    const movies = fetchMoviesFromFile()
    res.json(movies.find((e) => e.id == req.params.id) ?? { "message": "not found" })
}

function fetchMovies(req: Request, res: Response) {
    res.json(fetchMoviesFromFile())
}


function uploadMovie(req: Request, res: Response) {
    const movie: Movie = req.body;
    if (!movie.id || !movie.title || !movie.director || !movie.year) {
        res.json({ "error": "missing parameter" })
    } else {
        let existingMovies = fetchMoviesFromFile()
        if (existingMovies.some((e) => e.id.toString() === movie.id)) {
            res.json({ "message": "movie already exists" })
        } else {
            existingMovies.push(req.body)
            writeMoviesToFile(existingMovies)
            res.json({ "message": "movie uploaded" })
        }
    }
}

function updateMovie(req: Request, res: Response) {
    const movie: Movie = req.body;
    if (!movie.id || !movie.title || !movie.director || !movie.year) {
        res.json({ "error": "missing parameter" })
    } else {
        let existingMovies = fetchMoviesFromFile()
        if (existingMovies.some((e) => e.id.toString() === req.params.id)) {
            const index = existingMovies.findIndex((e) => e.id.toString() === req.params.id)
            existingMovies[index] = req.body
            writeMoviesToFile(existingMovies)
            res.json({ "message": "movie updated" })
        } else {
            res.json({ "message": "movie not found" })
        }
    }
}

function deleteMovie(req: Request, res: Response) {
    let existingMovies = fetchMoviesFromFile()
    if(existingMovies.some((e) => e.id === req.params.id)) {
        existingMovies = existingMovies.filter((movie) => movie.id !== req.params.id);
        writeMoviesToFile(existingMovies);
        res.json({"message" : "movie deleted"})
    }  else {
        res.json({"message" : "movie not found"})
    }
}

function updateMoviePatch(req: Request, res: Response) {
    let existingMovies = fetchMoviesFromFile()
      
} 
  

export { userDisplay, search, findMovie, uploadMovie, fetchMovies, updateMovie, deleteMovie, }