import React, { useState } from 'react';
import axios from 'axios';
 
const ComposeMessage = ({ onMessageSent }) => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const handleSendMessage = async () => {
    try {
      await axios.post('/api/messages/send', { recipient, subject, content });
      onMessageSent(); // Notify the parent component that a message has been sent
      // Optionally, clear input fields or show a success message
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="compose-message">
      <h2>Compose New Message</h2>
      <label>Sender:</label>
      <input type="text" value={sender} onChange={(e) => setSender(e.target.value)} />
      <label>Recipient:</label>
      <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
      <label>Subject:</label>
      <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <label>Content:</label>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ComposeMessage;