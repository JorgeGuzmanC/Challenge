//backend setup
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
import { AppDataSource } from "./data-source"
const postRoutes = require('./routes/post.routes');
const app = express();

AppDataSource.initialize().then(async () => {
    app.use(cors())
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(postRoutes);
    app.listen(3001);
    console.log('Server on port 3001');
}).catch(error => console.log(error))
