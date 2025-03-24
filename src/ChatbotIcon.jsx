import React, { useState } from 'react';
import './Chatbot.css'; // We'll style it with CSS
import chat from './chat.png'
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  // Function to fetch a random meme from the API
  const fetchMeme = async () => {
    try {
      const response = await fetch('https://meme-api.com/gimme');
      const data = await response.json();
      return data.url; // Return the URL of the meme
    } catch (error) {
      console.error('Error fetching meme:', error);
      return 'https://via.placeholder.com/500x300?text=Error+loading+meme';
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '') {
      const newMessage = { sender: 'user', text: inputMessage };
      setMessages([...messages, newMessage]);

      // Bot response (fetching meme)
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'Here is a meme for you!' },
      ]);

      const memeUrl = await fetchMeme();
      const memeMessage = { sender: 'bot', memeUrl };
      setMessages((prevMessages) => [...prevMessages, memeMessage]);

      setInputMessage('');
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
      <img src={chat} alt="Chatbot Image" class="chatbot-image" />
        <h2>Chatbot</h2>
      </div>
      <div className="chat-body">
        <div className="message-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text && <p>{message.text}</p>}
              {message.memeUrl && <img src={message.memeUrl} alt="meme" />}
            </div>
          ))}
        </div>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          placeholder="Ask for a meme!"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
