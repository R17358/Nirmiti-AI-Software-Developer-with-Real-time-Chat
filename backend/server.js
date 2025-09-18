import dotenv from "dotenv";

dotenv.config({ path: "config.env" });

import app from "./app.js";
import connectDB from "./database.js";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Project } from "./schemas/projectSchema.js";
import { generateResult } from "./controllers/gemini.js";

connectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`);
});


const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    // origin: ["https://nirmiti.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["websocket", "polling"], // Allow both WebSocket and polling
});



// Middleware for authentication and project validation
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(new Error("Authentication error"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;

    const projectId = socket.handshake.query?.projectId;

    if (!projectId) {
      return next(new Error("Project ID is required"));
    }

    console.log(projectId)

    const project = await Project.findById(projectId);

    if (!project) {
      return next(new Error("Project not found"));
    }

    socket.project = project;
    socket.roomId = project._id.toString();
    next();
  } catch (err) {
    next(new Error("Authentication error"));
  }
});


io.on("connection", (socket) => {
  socket.join(socket.roomId);
  console.log("A User Connected...");
  
  socket.on("project-message", async(data) => {

    const message = data.message;

   const isAIPresent = message.startsWith("*");

    socket.broadcast.to(socket.roomId).emit("project-message", data);

    if(isAIPresent)
    {
      const prompt = message.replace("*", "");
      
      const result = await generateResult(socket.roomId, prompt);
      //console.log(result);
      io.to(socket.roomId).emit("project-message",{
        message: result,
        sender: "AI",
      });
      return;
    }

  });

  socket.on("connect_error", (err) => {
    console.error("Socket Connection Error:", err.message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    socket.leave(socket.roomId);
  });
});

// Handle unexpected server errors
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
