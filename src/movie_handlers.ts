import fs from "fs"
import type { Movie } from "./models/movie.ts";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const movieFilePath = path.join(__dirname, "../data/movies.json");

export function fetchMoviesFromFile(): Movie[] {
    const raw = fs.readFileSync(movieFilePath, "utf-8");
    const movies: Movie[] = JSON.parse(raw);
    return movies;
}

export function writeMoviesToFile(movies: Movie[]) {
    const data = JSON.stringify(movies, null, 2);
    fs.writeFileSync(movieFilePath, data);
}