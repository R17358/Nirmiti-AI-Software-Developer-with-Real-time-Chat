import express from 'express';
const app = express();

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';


import user from "./routes/userRoute.js"
import project from "./routes/projectRoute.js"
import gemini from "./routes/geminiRoute.js"
import dotenv from "dotenv";



app.use(cors({
    // origin: "https://soen-ai-software-developer.vercel.app", // allow only your frontend origin
    origin: "http://localhost:5173", // allow only your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,               // allow cookies if needed
  }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1', user);
app.use('/api/v1', project);
app.use('/api/v1', gemini)


const staticPath = path.resolve('./public'); // Adjust relative path as needed
app.use(express.static(staticPath));

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
  });
});


export default app;