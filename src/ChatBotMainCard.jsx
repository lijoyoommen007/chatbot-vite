import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import './ChatBotMainSection.css'; 
import image from "./AgentConnect_BlogHeader-1024x576-131.jpg"; 

const ChatBotMainSection = ({ closeChat }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isClosing, setIsClosing] = useState(false);
    const chatBodyRef = useRef(null);

    useEffect(() => {
        const chatContainer = document.getElementById("chat-container");
        chatContainer.style.transform = "translateY(0)";
        chatContainer.style.opacity = 1;
    }, []);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    const handleCloseChat = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            closeChat(); 
        }, 500);
    }, [closeChat]);

    const handleSendMessage = useCallback(() => {
        if (!inputMessage.trim()) return;
        setMessages(prevMessages => [
            ...prevMessages,
            { text: inputMessage, sender: "user" }
        ]);

        setInputMessage("");
        setTimeout(() => {
            setMessages(prevMessages => [
                ...prevMessages,
                { text: "This is a dummy bot response.", sender: "bot" }
            ]);
        }, 1000);
    }, [inputMessage]);

    return (
        <div
            id="chat-container"
            className={`chat-bot-main-section ${isClosing ? "close-animation" : ""}`}
        >
            <div className="chat-header">
                <img src={image} alt="Bot" className="bot-avatar" loading="lazy" />
                <h4>Chat with Us</h4>
                <button className="close-btn" onClick={handleCloseChat}>✕</button>
            </div>

            <div className="chat-body" ref={chatBodyRef}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`chat-message ${message.sender === "user" ? "user-message" : "bot-message"}`}
                    >
                        {message.sender === "bot" && (
                            <img src={image} alt="Bot" className="message-avatar" loading="lazy" />
                        )}
                        {message.sender === "user" && (
                            <div className="user-avatar">U</div> 
                        )}
                        <div className="message-text">
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>
            <div className="chat-input-section">
                <input
                    type="text"
                    className="chat-input"
                    placeholder="Type a message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button className="send-btn" onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default memo(ChatBotMainSection);
