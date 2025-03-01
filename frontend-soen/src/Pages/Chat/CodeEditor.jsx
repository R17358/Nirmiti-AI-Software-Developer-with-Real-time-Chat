import { useState, useEffect } from "react";
import "./CodeEditor.css";
import "./Chat.css";
import axios from "../../api/axios";

const CodeEditor = ({ fileTree, setFileTree, extractedFiles, project }) => {
  
  const [openedFiles, setOpenedFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const content = fileTree[currentFile]?.content || "";
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    });
  };

  
  const saveFileTree = (fileTree, project) => {
    
    const config = {
      headers:{
          "Content-Type":"application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      withCredentials: true,
  };
     axios.post(`/update-file-tree`, { projectId: project?._id, fileTree }, config)
          .then((response) => {
              toast.success("File tree saved successfully");
          })
          .catch((error) => {
              toast.error("Failed to save file tree:", error);
          });
  };

  const openFile = (fileName) => {
    if (!openedFiles.includes(fileName)) {
      setOpenedFiles([...openedFiles, fileName]);
    }
    setCurrentFile(fileName);
    setCurrentFileIndex(openedFiles.length);
  };

  const closeFile = (fileName) => {
    const filteredFiles = openedFiles.filter((file) => file !== fileName);
    setOpenedFiles(filteredFiles);
    if (currentFile === fileName) {
      setCurrentFile(filteredFiles.length > 0 ? filteredFiles[0] : null);
      setCurrentFileIndex(0);
    }
  };

  useEffect(() => {
    if (extractedFiles.length > 0) {
      const newFileTree = {};
      extractedFiles.forEach((file) => {
        newFileTree[file.fileName] = { content: file.content };
      });
      setFileTree(newFileTree);

      // Auto open the first extracted file if none are opened
      if (openedFiles.length === 0 && extractedFiles.length > 0) {
        openFile(extractedFiles[0].fileName);
      }
    }
  }, [extractedFiles]);

  useEffect(() => {
    if (currentFile) {
      saveFileTree(fileTree, project);
    }
  }, [fileTree]);

  return (
    <div className="code-editor">
      
      <div className="file-list">
        {extractedFiles.map((file) => (
          <button key={file.fileName} onClick={() => openFile(file.fileName)}>
            {file.fileName}
          </button>
        ))}
      </div>

      <div className="code-editor-right">

      <div className="code-editor-top">
      <div className="copy-button">
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
              >
                {copied ? <i className='bx bx-copy-alt'></i> : <i className='bx bxs-copy-alt' ></i>}
              </button>
        </div>
        
        <div className="code-editor-tabs">
          {openedFiles.map((file) => (
            <div
              key={file}
              className={`tab ${file === currentFile ? "active" : ""}`}
              onClick={() => {
                setCurrentFile(file);
                setCurrentFileIndex(openedFiles.indexOf(file));
              }}
            >
              {file}
              <button
                className="close-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  closeFile(file);
                }}
              >
                ❌
              </button>
            </div>
          ))}
        </div>

      </div>
        {!currentFile && <p className="no-current-file">Select a file to view its content.</p>}

        {currentFile && (
          <div className="code-editor-body">

            <textarea
                spellCheck="false" autoCorrect="off" autoCapitalize="off"
              value={fileTree[currentFile]?.content || ""}
              onChange={(e) => {
                setFileTree({
                  ...fileTree,
                  [currentFile]: { content: e.target.value },
                });
              }}
            /> 
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
