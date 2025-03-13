import { useState } from "react";
import axios from "axios";
import DragDropBox from "./DragDropBox";
import "./App.css";

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const nodeServerUrl  = import.meta.env.NODE_SERVER_URL;

  // Function to send the dropped/selected file to the backend
  const sendToBackend = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post(`https://cvpipeline2.up.railway.app:8080/upload`, formData, {
        headers: {
          // "Content-Type": "multipart/form-data",
          "Accept": "application/json",
        },
        withCredentials: true,
      });
      console.log("File sent:", file);

      setMessages((prevMessages) => [
        ...prevMessages,
        `File ${file.name} uploaded successfully`
      ]);
    } catch (error) {
      console.error("Error sending file:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        `Error uploading ${file.name}: ${error}, ${nodeServerUrl}`
      ]);
    }
  };

  return (
    <>
      <div className="app-container">
        <DragDropBox sendToBackend={sendToBackend} />

        <div className="message-box">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div key={index} className="message">
                {message}
              </div>
            ))
          ) : (
            <p>No messages to display</p>
          )}
        </div>
      </div>
    </>

  );
}

export default App;
