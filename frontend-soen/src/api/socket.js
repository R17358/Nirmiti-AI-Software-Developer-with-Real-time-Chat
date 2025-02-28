import { io } from "socket.io-client";

let socketInstance = null;

//wss://soen-ai-software-developer.onrender.com

export const initializeSocket = (projectId) => {
    socketInstance = io('https://soen-ai-software-developer.onrender.com', {
        auth: {
        token: localStorage.getItem("token")
        },
        query: {
            projectId
        },
        transports: ["websocket", "polling"]
    });

    socketInstance.on("disconnect", (reason) => {
        console.warn("Socket disconnected:", reason);
        setTimeout(() => initializeSocket(projectId), 5000); // Reconnect in 5s
    });
    

    // Handle errors
    socketInstance.on("connect_error", (err) => {
        console.error("WebSocket Connection Error:", err.message);
    });

    return socketInstance;
}


export const receiveMessage = (eventName, cb) => {
    socketInstance.on(eventName, cb);
}

export const sendMessage = (eventName, data) => {
    socketInstance.emit(eventName, data);
}