import React, { useEffect, useState } from "react";
import { createRoot } from 'react-dom/client'; // React 18's method
import './ChatBot.css'; // Ensure your CSS file is correctly referenced
import ChatBotCard from './chatbotcard'; // Import the ChatBotCard component
import ChatBotMainSection from './ChatBotMainCard'; // Import the ChatBotMainSection component
import chatIcon from './Animation - 1727288257547.gif'; // Ensure this path is correct

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false); // Tracks chat bot opening after 1 second
    const [toggleCardOpen, setToggleCardOpen] = useState(false); // Tracks the main section toggle

    useEffect(() => {const timer = setTimeout(() => {setIsOpen(true);}, 1000);return () => clearTimeout(timer);}, []);

    const toggleClick = () => {
        setToggleCardOpen(!toggleCardOpen);
    };

    return (
        <div className="chat-bot-container">
            <div className="chat-icon">
                <img 
                    src={chatIcon} 
                    alt="Chat Icon" 
                    className="chat-icon-gif" 
                    onClick={toggleClick} 
                />
            </div>

            {isOpen && !toggleCardOpen && (
                <ChatBotCard closeChat={() => setIsOpen(false)} />
            )}

            {toggleCardOpen && (
                <ChatBotMainSection closeChat={() => setToggleCardOpen(false)} />
            )}
        </div>
    );
};

export default ChatBot;

(function() {
    window.addEventListener('DOMContentLoaded', function() {
        let chatBotContainer = document.querySelector('.chat-bot-container');
        if (!chatBotContainer) {
            chatBotContainer = document.createElement('div');
            chatBotContainer.classList.add('chat-bot-container');
            document.body.appendChild(chatBotContainer); // Append it to the body
        }

        // Use React 18's createRoot instead of ReactDOM.render
        const root = createRoot(chatBotContainer);
        root.render(<ChatBot />);
    });
})();
