import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';

const API_URL = 'http://localhost:5001/api/ai/analyze';

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if(messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);
    
    const sendMessage = async () => {
        if (!input) return;

       const userMessage = { sender: 'User', content: input};
       setMessages((prev) => [...prev, userMessage])
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ symptoms: input}),
            });

            const data = await response.json();

            if (data.error) {
                setMessages((prev) => [...prev, {sender: 'AI', content: data.error}])
            } else {
                setMessages((prev) => [
                    ...prev,
                    { sender: 'AI', content: data.response },
                ]);
            }
        } catch (error) {
            console.error('Error sending message: ', error);
            setMessages((prev) => [
                ...prev,
                { sender: 'AI', content: 'An error occurred. Please try again.' },
            ]);
        }
        setInput('');
    };

    return(
        <div className = 'min-h-screen flex flex-col bg-gray-50'>
            <Navbar />
            <div className = 'flex-1 flex flex-col items-center justify-center p-6'>
                <div className = 'w-full max-w-2xl bg-gradient-to-b from-sky-100 to-blue-400 shadow-lg rounded-2xl flex flex-col h-[500px]'>
                    <div className = 'flex-1 overflow-y-auto p-6 space-y-3 flex flex-col justify-end'>
                        {messages.map((msg, idx) => (
                            <div 
                                key = {idx}
                                className = {`chat ${msg.sender === 'User' ? 'chat-end' : 'chat-start'}`}
                            >
                                <div
                                    className = {`chat-bubble ${
                                        msg.sender === 'User' ? 'bg-gray-200 text-gray-800' : 'bg-white text-gray-800'
                                    }`}
                                >
                                    <strong>{msg.sender}: </strong> {msg.content}
                                </div>
                            </div>
                        ))}
                        
                        <div ref={messagesEndRef}></div>
                    </div>

                    <div className = 'p-4 border-t flex items-center gap-2 sticky bottom-0 bg-gray-200'>
                        <input
                            type = "text"
                            value = {input}
                            onChange = {(e) => setInput(e.target.value)}
                            placeholder = "Describe your patient's current symptoms..."
                            className = "input bg-white text-gray-800 w-full rounded-full"
                        />
                        <button onClick = {sendMessage} className = "btn rounded-2xl bg-white hover:bg-blue-400 text-gray-800">Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;