import socket from "socket.io-client";
import { io } from "socket.io-client";

let socketInstance = null;

//http://localhost:4000


export const initializeSocket = (projectId) => {
    socketInstance = io("https://soen-ai-software-developer.onrender.com", {
        auth: {
        token: localStorage.getItem("token")
        },
        query: {
            projectId
        }
    });
    return socketInstance;
}

export const receiveMessage = (eventName, cb) => {
    socketInstance.on(eventName, cb);
}

export const sendMessage = (eventName, data) => {
    socketInstance.emit(eventName, data);
}