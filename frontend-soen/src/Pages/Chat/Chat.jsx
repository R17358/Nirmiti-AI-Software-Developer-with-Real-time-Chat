import React, { useEffect, useState } from 'react'
import './Chat.css'
import {useDispatch, useSelector} from 'react-redux'
import { getAllUsersInProject } from '../../actions/projectAction';
import { useLocation } from 'react-router-dom';
import { getAllUsers } from '../../actions/userAction';
import { addUserToProject } from '../../actions/projectAction';
import { initializeSocket, receiveMessage, sendMessage } from '../../api/socket';
import Markdown from 'markdown-to-jsx'
import ReactDOM from 'react-dom';
import CodeEditor from './CodeEditor';


function Chat({collapse}) {

    const [project, setProject] = useState(null);

    useEffect(() => {
        const storedProject = localStorage.getItem("selectedProject");
        if (storedProject) {
            setProject(JSON.parse(storedProject));
        }
    }, []);

    if (!project) {
        return <h2>No project data available</h2>;
    }


    const dispatch = useDispatch();

    const [panel, setPanel] = useState(false);
    const [collabPanel, setCollabPanel] = useState(false);
    const [message, setMessage] = useState("");
    const [currentFile, setCurrentFile] = useState(null);
    const [extractedFiles, setExtractedFiles] = useState([]);

    const [fileTree, setFileTree] = useState(
        {}
    );

    const messageBox = React.createRef();

    
    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    useEffect(()=> {
        
    initializeSocket(project?._id.toString());

    const handleMessage = (data) => {

        appendIncomingMessage(data);
    };

    receiveMessage("project-message", handleMessage);

    return () => {
        receiveMessage("project-message", null);
    };
}, [project?._id]);


    useEffect(() => {
        scrollToBottom();
    }, [message]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "Enter" && document.activeElement.tagName === "INPUT") {
                event.preventDefault();
                send();
            }
        };

        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [message]);

    const showCollaborators = async(projectId) => {
       
        setPanel(!panel);
        try{
            await dispatch(getAllUsersInProject(projectId));
        }
        catch(error){
            console.log(error);
        }
    }

    const {user} = useSelector((state)=>state.user);
    const {users} = useSelector((state) => state.projects);

    const allUsers = useSelector((state) => state.allUsers.users);

    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleUserClick = (userId) => {
        setSelectedUsers((prevSelected) => 
            prevSelected.includes(userId)
                ? prevSelected.filter(id => id !== userId) // Deselect user
                : [...prevSelected, userId] // Select user
        );
    };

    const handleAddClick = (projectId) => {
        
        try{
            dispatch(addUserToProject(projectId, selectedUsers));
        }
        catch(error)
        {
            console.log(error);
        }
    };

    const send = ()=>{
        sendMessage('project-message', {
            message,
            sender: user.email,
        })
        appendOutgoingMessage(message, user.email);
        setMessage("");
    }

    function getCodeFiles(jsonObj) {
        return Object.keys(jsonObj).filter(key => key.endsWith('.js') || key.endsWith('.py'));
    }

    function extractFiles(fileTree, path = "") {
        let files = [];
    
        for (const key in fileTree) {
            // Ignore the specified keys
            if (["createCommands", "buildCommands", "startCommands"].includes(key)) {
                continue;
            }
    
            if (typeof fileTree[key] === "object" && fileTree[key] !== null && !fileTree[key].content) {
                // Recursively extract files from nested objects
                files = files.concat(extractFiles(fileTree[key], `${path}${key}/`));
            } else if (typeof fileTree[key] === "object" && fileTree[key]?.content) {
                // If it's a file (has `content` key), store it
                files.push({ fileName: `${path}${key}`, content: fileTree[key].content });
            } else if (typeof fileTree[key] === "string") {
                // If it's a text key-value pair, treat it as a file
                files.push({ fileName: `${path}${key}`, content: fileTree[key] });
            }
        }
    
        return files;
    }
    
    
    
    const appendIncomingMessage = (data) => {

        let message = {};
        let sender = data.sender;
    
        if (typeof data.message === "string") {
            try {
                
                if (data.message.trim().startsWith("{") || data.message.trim().startsWith("[")) {
                    message = JSON.parse(data.message);
                } else {
                    throw new Error("Message is not valid JSON");
                }
            } catch (error) {
                console.warn("Failed to parse message:", error);
                console.warn("Received a plain text message:", data.message);
                message = { text: data.message }; // Treat it as plain text
            }
        } else {
            message = data.message; // If it's already an object, use it directly
        }
        
        console.log("Parsed message:", message); // Should now always be an object
        const oneMessage = message?.text || "";
        console.log("One message:", oneMessage);
        const extractedFilesVar = extractFiles(message);
        setExtractedFiles(extractedFilesVar);

        let files = null;
        try {
            if (message.fileTree) {
                setFileTree(message?.fileTree);
                files = getCodeFiles(message.fileTree); // Extract files only if fileTree exists
    
            }
        } catch (error) {   
            console.log("No such file found");
        }
    
        const chatBox = document.querySelector('.chat-box-body');
    
        const chatBoxMessageSender = document.createElement('div');
        chatBoxMessageSender.className = "chat-box-message-sender";
    
        const chatMe = document.createElement('div');
        chatMe.className = "chat-me";
    
        const messageDiv = document.createElement('div');
        messageDiv.className = "send-message";
    
        chatMe.innerHTML = `<p>${sender}</p>`;
    
        // Add "ai-class" dynamically
        messageDiv.classList.toggle("ai-class", sender === "AI");
    
        let messageSections = [];

if (oneMessage) messageSections.push(oneMessage);
if (message?.createCommands?.commands?.length) {
    messageSections.push(
        `Create Commands:\n\`\`\`sh\n${message["createCommands"]["mainItem"]}\n${message["createCommands"]["commands"].join("\n")}\n\`\`\``
    );
}
if (message?.buildCommands?.commands?.length) {
    messageSections.push(
        `Build Commands:\n\`\`\`sh\n${message["buildCommands"]["mainItem"]}\n${message["buildCommands"]["commands"].join("\n")}\n\`\`\``
    );
}
if (message?.startCommands?.commands?.length) {
    messageSections.push(
        `Run Commands:\n\`\`\`sh\n${message["startCommands"]["mainItem"]}\n${message["startCommands"]["commands"].join("\n")}\n\`\`\``
    );
}
if (message?.fileTree?.text) messageSections.push(message.fileTree.text);

let messageContent = messageSections.join("\n\n");

if (messageContent.trim()) {
    const markdownMessage = React.createElement(Markdown, { children: messageContent });
    ReactDOM.render(markdownMessage, messageDiv);
} else {
    messageDiv.innerHTML = "";
}

        
    
        chatBoxMessageSender.appendChild(chatMe);
        chatBoxMessageSender.appendChild(messageDiv);
        chatBox.appendChild(chatBoxMessageSender);
    };
    

    const appendOutgoingMessage = (message, sender)=>{
        
        const chatBox = document.querySelector('.chat-box-body');
        const chatBoxMessageMy = document.createElement('div')
        chatBoxMessageMy.className = "chat-box-message-my"
        const chatMe = document.createElement('div')
        chatMe.className = "chat-me"
        chatMe.innerHTML = `<p>${sender}</p>`
        const messageDiv = document.createElement('div')
        messageDiv.className = "my-message"
        messageDiv.innerHTML = `<p>${message}</p>`
        chatBoxMessageMy.appendChild(chatMe)
        chatBoxMessageMy.appendChild(messageDiv)
        chatBox.appendChild(chatBoxMessageMy);
       
    }

    function scrollToBottom() {
        if (messageBox.current) {
            messageBox.current.scrollTop = messageBox.current.scrollHeight;
        }
    }
   
  return (
    <div className={`chat-container ${collapse ? 'chat-collapse' : ''}`}>
        <div className={`left ${collapse ? 'left-collapse' : ''}`}>
            <div className="chat-box">
                <div className="chat-box-header">
                    <div className="head">
                        <button type="button" onClick={()=>{setCollabPanel(!collabPanel)}}>Add Member +</button> 
                    </div>
                    <div className="collaborator">
                        <i className='bx bxs-user-detail' onClick={()=>{showCollaborators(project?._id)}}></i>
                    </div>
                </div>
                <div ref={messageBox} className="chat-box-body">
                    
                </div>
                
            </div>
            <div className="chat-box-footer">
                    <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Type a message"/>
                    <button type="button" onClick={send}>
                        <i className="bx bxs-send"></i>
                    </button>
            </div>
        </div>
        <div className={`collaborator-panel ${panel ? 'show' : ''}`}>
            <div className={`collab-body ${panel ? 'show' : ''}`}>
                <div className="button">
                    <i className='bx bx-x' onClick={()=>{setPanel(!panel)}}></i>
                </div>
            {users.length > 0 ? (  
                users.map((user) => (
                    <div key={user._id} className="collablist">
                        <div className="collaborator-list">
                            <div className="collab-img">
                                <i className='bx bxs-user-circle'></i>
                            </div>
                            <div className="collab-name">
                                <h3>{user.email}</h3>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No collaborators found.</p>
            )}
        </div>
    </div>
    <div className="right">

        <CodeEditor fileTree={fileTree} setFileTree={setFileTree} extractedFiles={extractedFiles} />

            <div className={`colab-panel ${collabPanel ? 'show' : ''}`}>
                <div className="collablist">
                    {allUsers?.map((user) => (
                        <div
                            key={user._id}
                            className={`user ${selectedUsers.includes(user._id) ? "selected" : ""}`}
                            onClick={() => handleUserClick(user._id)}
                        >
                            <div className="colab-logo">
                                <i className='bx bxs-user-circle'></i>
                            </div>
                            <div className="colab-name">
                                <h3>{user.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="add-colab-btn">
                    <button type="button" onClick={()=>handleAddClick(project?._id)}>ADD</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Chat