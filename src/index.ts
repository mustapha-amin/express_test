import express from "express";
import {invalidRoute, logger, } from "./middleware.ts";
import router from "./routes/movie.route.ts";
import multer from "multer";
import session, {  } from "express-session";
import cookieParser from "cookie-parser";
import { routes } from "./routes/routes.ts";

const app = express()  
const upload = multer()
const port = 3001;

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(logger)
app.use(cookieParser())
app.use(session({
    secret:'test-secret',
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000 * 60 * 60
    }
}))
app.use('/api', routes.authRouter)
app.use('/api', routes.movieRouter)
app.use(invalidRoute)

app.listen(port, () => {
    console.log(`express app running on port ${port}`)
})