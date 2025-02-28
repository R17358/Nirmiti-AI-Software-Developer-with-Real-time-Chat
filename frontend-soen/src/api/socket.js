import { io } from "socket.io-client";

let socketInstance = null;

//wss://soen-ai-software-developer.onrender.com

export const initializeSocket = (projectId) => {
    socketInstance = io('wss://soen-ai-software-developer.onrender.com', {
        auth: {
        token: localStorage.getItem("token")
        },
        query: {
            projectId
        }
    });

    // Handle errors
    socketInstance.on("connect_error", (err) => {
        console.error("WebSocket Connection Error:", err.message);
    });

    return socketInstance;
}


export const receiveMessage = (eventName, cb) => {
    socketInstance.on(eventName, cb);
    console.log('event received');
    console.log(eventName);
    console.log(cb);
}

export const sendMessage = (eventName, data) => {
    socketInstance.emit(eventName, data);
}