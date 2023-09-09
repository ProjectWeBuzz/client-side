import React, { useState } from 'react';

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState({ recipient: '', subject: '', content: '' });

  const handleSendMessage = () => {
    const newMessageWithId = { ...newMessage, id: messages.length + 1 };
    setMessages([...messages, newMessageWithId]);
    setNewMessage({ recipient: '', subject: '', content: '' });
  };

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  const clearSelectedMessage = () => {
    setSelectedMessage(null);
  };

  return (
    <div>
      <h1>Inbox</h1>

      <div>
        <h2>Compose New Message</h2>
        <div>
          <label>To:</label>
          <input
            type="text"
            value={newMessage.recipient}
            onChange={(e) => setNewMessage({ ...newMessage, recipient: e.target.value })}
          />
        </div>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={newMessage.subject}
            onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            value={newMessage.content}
            onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
          />
        </div>
        <button onClick={handleSendMessage}>Send</button>
      </div>

      <div>
        <h2>Your Messages</h2>
        <div className="messages-list">
          {messages.map((message) => (
            <div
              key={message.id}
              className="message"
              onClick={() => handleSelectMessage(message)}
            >
              <div>From: {message.sender}</div>
              <div>Subject: {message.subject}</div>
            </div>
          ))}
        </div>
        <div className="message-content">
          {selectedMessage ? (
            <div>
              <h2>Message Detail</h2>
              <div>From: {selectedMessage.sender}</div> 
              <div>Subject: {selectedMessage.subject}</div>
              <p>Content: {selectedMessage.content}</p>
              <button onClick={clearSelectedMessage}>Close</button>
            </div>
          ) : (
            <p>Select a message to view its content.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
