
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import Connection from './database/db.js';
import Router from './routes/route.js';



dotenv.config();
const app = express();

// Use cors middleware to enable CORS
app.use(cors());
// Body parser middleware
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended: true}));

// Use routes
app.use('/', Router);

const PORT = 8000;

// Start server
app.listen(PORT, () => console.log(`Server is running successfully on port ${PORT}`));

// Database connection
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD);


