import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ChatInterface.css";

const ChatInterface = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [file, setFile] = useState(null);
  const [qaHistory, setQaHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [textUpload, setTextUpload] = useState("");
  const [error, setError] = useState("");

  const chatBoxRef = useRef(null); 

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [qaHistory, loading]);

  // Fetch previous chat history from the database
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/documents/previous");
        setQaHistory(res.data);
      } 
      catch (error) {
        setError("Error fetching history");
      }
    };
    fetchHistory();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleFileUpload = async () => {
    if (!file){
      setError("Please select a file to upload!");
      return;
    }
    const formData = new FormData();
    formData.append("document", file);

    try {
      const res = await axios.post("http://localhost:5000/api/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
      setError("");
    } 
    catch (error) {
      setError(error.message);
    }
  };

  const handleTextUpload = async () => {
    if (!textUpload.trim()){
      setError("Text field cannot be empty!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/documents/upload-text", { textUpload });
      alert(res.data.message);
      setTextUpload("");
      setError("");
    } 
    catch (error) {
      setError(error.message);
    }
  };

  const handleAskQuestion = async () => {
    if (!question.trim()){
      setError("Please enter a question before asking.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/documents/ask", { question });
      setResponse(res.data.answer);

      // Update QA history
      setQaHistory([...qaHistory, { question, answer: res.data.answer}]);
      setQuestion("");
    } 
    catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="chat-container">

      {/* 🔴 Error Message Div */}
      {error && <div className="error-message">{error}</div>}

      {/* Chat Interface */}
      <div className="chat-box" ref={chatBoxRef}>
        {qaHistory.map((qa, index) => (
          <div key={index} className="chat-message">
            <div className="user-message user-top-left">🧑‍💻 {qa.question}</div>
            <div className="ai-message ai-bottom-right">🤖 {qa.answer}</div>
          </div>
        ))}
        {loading && <div className="loading">Generating answer...</div>}
      </div>

      <div className="upload-container">
        {/* File Upload */}
        <div className="file-upload">
          <input type="file" onChange={handleFileChange} accept=".pdf,.txt" />
          <button onClick={handleFileUpload}>Upload File</button>
        </div>

        {/* Text Upload */}
        <div className="text-upload">
          <textarea
            value={textUpload}
            onChange={(e) => setTextUpload(e.target.value)}
            placeholder="Enter text to upload..."
          />
          <button onClick={handleTextUpload}>Upload Text</button>
        </div>
      </div>

      {/* Question Input */}
      <div className="chat-input">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
        />
        <button onClick={handleAskQuestion}>Send</button>
      </div>
    </div>
  );
};
export default ChatInterface;