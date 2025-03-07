# AI Software Developer

## Overview

AI Software Developer is a **MERN stack** application designed to generate complete app or game code with a structured file tree. It also provides a real-time collaborative environment with chat functionality and AI-powered discussions using the **Gemini-1.5-Flash API**.

## Features

- **AI Code Generation**: Generate well-structured app or game code with proper file organization.
- **Copy Code Feature**: Easily copy generated code for immediate use.
- **Real-time Chat**: Collaborators can chat in real-time using WebSockets.
- **AI-Powered Discussions**: Discuss project-related topics with an AI assistant.
- **Authentication & Authorization**: Secure user authentication with login and registration.
- **CRUD Operations**: Perform create, read, update, and delete operations on project-related data.
- **Database**: Uses **MongoDB** for efficient data storage.
- **Backend**: Built with **Node.js** and **Express.js**.
- **Frontend**: Developed using **React.js** with **Redux** for state management.

## Tech Stack

| Technology               | Usage                   |
| ------------------------ | ----------------------- |
| **MongoDB**              | Database                |
| **Express.js**           | Backend framework       |
| **React.js**             | Frontend UI             |
| **Node.js**              | Server-side environment |
| **Redux**                | State management        |
| **WebSockets**           | Real-time chat feature  |
| **Gemini-1.5-Flash API** | AI-powered discussions  |

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/)

### Setup

1. **Clone the repository**

   ```sh
   git clone https://github.com/yourusername/AI-Software-Developer.git
   cd AI-Software-Developer
   ```

2. **Install dependencies**

   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the `backend` directory and add:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the application**

   - Start the backend:
     ```sh
     cd backend
     npm start
     ```
   - Start the frontend:
     ```sh
     cd frontend
     npm start
     ```

5. **Access the application**
   Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

## Usage

- **Login/Register** to access the platform.
- **Generate Code** using AI assistance.
- **Collaborate** via real-time chat.
- **Discuss** ideas with AI-powered suggestions.
- **Manage projects** with built-in CRUD operations.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m "Added new feature"`
4. Push to branch: `git push origin feature-name`
5. Open a Pull Request.

## License

This project is licensed under the **MIT License**.

## Contact

For any queries, reach out at **[your.email@example.com](mailto\:your.email@example.com)** or open an issue.

---

**Made with ❤️ using MERN Stack & AI**

Ritesh Pandit

