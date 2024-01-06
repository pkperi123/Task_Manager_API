const express = require("express");
const tasks = require("./routes/task");
const connectDB = require('./db/connect')
const env = require("dotenv")
const notFound = require('./middleware/not_found')
const errorHandler = require('./middleware/error_handler')

env.config()
const url = process.env.MONGO_URL

const app = express();
const port = 3000;

//middleware

app.use(express.json());

//routes

app.use('/api/v1/tasks',tasks);

app.use(notFound);

app.use(errorHandler);

const start = async () =>{
    try{
        await connectDB(url)
        app.listen(port,()=>{
            console.log(`server started at port number ${port}`);
        });
    }catch(err){
        console.log(err);
    }
}

start()

