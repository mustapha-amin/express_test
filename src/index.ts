import express from "express";
import logger from "./middleware.ts";
import router from "./route.ts";


const app = express()  
const port = 3001;

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(logger)

app.use('/api', router)

app.use('*', (_ : express.Request, res: express.Response) => {
    res.status(404).json({"message" : "invalid route"})
}) 

app.listen(port, () => {
    console.log(`express app running on port ${port}`)
})