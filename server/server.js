import express from 'express';
import cors from  'cors';
import morgan from 'morgan'
import connect from './database/conn.js';
import router from './router/route.js';
import bodyParser from 'body-parser';
const app = express();

/** middlewares*/
app.use(bodyParser.json({limit:'10mb'}));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny')); //simplifies te process of logging requests
app.disable('x-powered-by'); //one of the HTTP response headers that can be returned by the web server.less hackers know about our stack

const port = 8080;

app.get('/', (req,res) => {
    res.status(201).json("Home Get Request");
});
/** api routes */
app.use('/api',router)
connect().then(() => {
    try{
        app.listen(port, () => {
            console.log(`sever connected to http://localhost:${port}`);
        })
    } catch(error){
        console.log("Cannot connect to database");
    }
}).catch(error => {
    console.log("Invalid DataBase connection");
});

