import React, { useState, useEffect } from 'react';
import './App.css'

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const ws = new WebSocket('ws://localhost:8000/ws/chat/');

    useEffect(() => {
        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, data.message]);
        };

        return () => {
            ws.close();
        };
    }, []);

    const sendMessage = () => {
        ws.send(JSON.stringify({ message: input }));
        setInput('');
    };

    return (
        <div>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
