import express from "express";
import logger from "./middleware.ts";
import router from "./route.ts";


const app = express()  
const port = 3001;

app.use(logger)
app.use(express.json())

app.use('/api', router)

app.listen(port, () => {
    console.log(`express app running on port ${port}`)
})