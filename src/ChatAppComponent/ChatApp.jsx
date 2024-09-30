import React, { useState, useRef, useEffect } from 'react'
import './ChatApp.css';

const initialData = {
    users: [
        {
            id: 0,
            name: 'Rajesh',
            messages: [
                {
                    id: 101,
                    text: 'Hi, how are you',
                    time: "2024-09-30 10:00",
                    sender: 'Rajesh',
                },
                {
                    id: 102,
                    text: 'Hello, I am good.',
                    time: "2024-09-30 10:00",
                    sender: 'Kartar',
                }
            ],
            latestMessage: new Date().getTime(),
        },
        {
            id: 1,
            name: 'Rajat',
            messages: [
                {
                    id: 101,
                    text: 'Hi',
                    time: "2024-09-30 10:00",
                    sender: 'Rajat',
                },
                {
                    id: 102,
                    text: 'Hello',
                    time: "2024-09-30 10:00",
                    sender: 'Kartar',
                }
            ],
            latestMessage: new Date().getTime()
        }
    ]
}

const ChatApp = () => {
    const inputRef = useRef(null);
    const [data, setData] = useState(initialData)
    const [user, setUser] = useState(data.users[0]);

    useEffect(() => {
        const newMessageHandler = () => {
            setData((prev) => {
                const prevClone = structuredClone(prev);
                const curUser = prevClone.users[user.id];
                const newMessage = {
                    id: new Date().getTime(),
                    text: 'KYA HALL HI',
                    time: new Date().toLocaleDateString(),
                    sender: user.name,
                }
                curUser.messages.push(newMessage);
                curUser.latestMessage = new Date().getTime();
                console.log(JSON.stringify(prevClone))
                return prevClone;
            });
        }

        const timer = setInterval(() => {
            newMessageHandler();
        }, 3000);

        return () => clearInterval(timer)

    },[user])

    const handleClick = (user) => {
        setUser(user);
    }

    const sortUsersByTime = () => {
        const users = structuredClone(data.users);
        users.sort((a,b) => b.latestMessage - a.latestMessage);
        return users;
    }

    return (
        <>
            <h2>ChatApp</h2>
            <div className='container'>
                {/* User Lists */}
                <div className="user-list">
                    {
                        sortUsersByTime().map((user) => (
                            <div
                                key={user.id}
                                className="user"
                                onClick={() => { handleClick(user) }}
                            >
                                <div>
                                    {user.name}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="messages-container">
                    <div className="messages-header">{user.name}</div>
                    <div className="messages-body">
                        {
                            data.users[user.id].messages.map(msg => {
                                const sender = (msg.sender !== 'Kartar');
                                return (
                                    <div id={msg.id} className={`message ${sender ? "sender": ""}`}>
                                        <div className="message-body">
                                            <span className='message-name'>{msg.name}</span>
                                            <span className='message-text'>{msg.text}</span>
                                            <span className='message-time'>{msg.time}</span>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="message-input-container">
                        <input ref={inputRef} type="text" className='message-input' placeholder='Write your message' />
                        <button className="send-button">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatApp