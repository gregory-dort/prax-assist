import { useState, useEffect } from 'react';

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
        <div className = 'min-h-screen flex flex-col bg-gray-500'>
            <div className = 'flex-1 flex flex-col items-center justify-center p-6'>
                <div className = 'w-full max-w-2xl bg-gray-400 shadow-lg rounded-2xl flex flex-col h-[500px]'>
                    <div className = 'flex-1 overflow-y-auto p-6 space-y-3'>
                        {messages.map((msg, idx) => (
                            <div 
                                key = {idx}
                                className = {`chat ${
                                    msg.sender === 'User' ? 'chat-end' : 'chat-start'
                                }`}
                            >
                                <div
                                    className = {`chat-bubble ${
                                        msg.sender === 'User' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                                    }`}
                                >
                                    <strong>{msg.sender}: </strong> {msg.content}
                                </div>
                            </div>
                        ))}
                        <div className = 'p-6 border-t flex items-center gap-2'>
                            <input
                                type = "text"
                                value = {input}
                                onChange = {(e) => setInput(e.target.value)}
                                placeholder = "Type a message..."
                                className = "input input-bordered w-full rounded-full"
                            />
                            <button onClick = {sendMessage} className = "btn btn-primary">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;