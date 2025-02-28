import { io } from "socket.io-client";

let socketInstance = null;

//wss://soen-ai-software-developer.onrender.com

export const initializeSocket = (projectId) => {
    socketInstance = io('ws://soen-ai-software-developer.onrender.com', {
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