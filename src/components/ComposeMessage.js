import React, { useState } from 'react';
import axios from 'axios';

const ComposeMessage = ({ onMessageSent }) => {
  const [message, setMessage] = useState({
    recipient: '',
    subject: '',
    content: '',
  });
  const [sending, setSending] = useState(false);

  const handleSendMessage = async () => {
    if (sending) return;
    setSending(true);

    try {
      await axios.post('/api/messages/send', message);
      onMessageSent();
      setMessage({ recipient: '', subject: '', content: '' });
    } catch (error) {
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage({ ...message, [name]: value });
  };

  return (
    <div className="compose-message">
      <h2>Compose New Message</h2>
      <label>Recipient:</label>
      <input
        type="text"
        name="recipient"
        value={message.recipient}
        onChange={handleChange}
      />
      <label>Subject:</label>
      <input
        type="text"
        name="subject"
        value={message.subject}
        onChange={handleChange}
      />
      <label>Content:</label>
      <textarea
        name="content"
        value={message.content}
        onChange={handleChange}
      />
      <button onClick={handleSendMessage} disabled={sending}>
        {sending ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
};

export default ComposeMessage;
