import express from "express";
import {invalidRoute, logger, } from "./middleware.ts";
import router from "./route.ts";
import multer from "multer";
import session, {  } from "express-session";
import cookieParser from "cookie-parser";

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
}))
app.use('/api', router)
app.use(invalidRoute)

app.listen(port, () => {
    console.log(`express app running on port ${port}`)
})