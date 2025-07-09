import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import user from "./routes/userRoute.js";
import project from "./routes/projectRoute.js";
import gemini from "./routes/geminiRoute.js";

const app = express();

// ✅ Rate limiter first
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: "Too many requests, slow down",
});
app.use("/api/v1", limiter);

// ✅ CORS before all routes
app.use(cors({
  origin: "https://nirmiti.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ API routes
app.use('/api/v1', user);
app.use('/api/v1', project);
app.use('/api/v1', gemini);

// ✅ Static and Error Handling
const staticPath = path.resolve('./public');
app.use(express.static(staticPath));

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

export default app;
