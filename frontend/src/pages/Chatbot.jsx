import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_URL = 'http://localhost:5001/api/messages';

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, []);

    const sendMessage = async () => {
        if (!input) return;

        const message = { sender: 'User', content: input};
        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(message),
            });
            setInput('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return(
        <div className = 'chatbot-container'>
            <Header />
            <div className = 'message-log-container'>
                {messages.map((msg, idx) => (
                    <div key = {idx}>
                        <strong>{msg.sender}:</strong> {msg.content}
                    </div>
                ))}
                <input
                    type = "text"
                    value = {input}
                    onChange = {(e) => setInput(e.target.value)}
                    placeholder = "Type a message..."
                />
                <button onClick = {sendMessage}>Send</button>
            </div>
            <Footer />
        </div>
    );
};

export default Chatbot;