import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';


const ComposeMessage = ({ onMessageSent }) => {
  
  const [message, setMessage] = useState({
    recipient: '',
    subject: '',
    content: '',
  });
  const [sending, setSending] = useState(false);
  const {user} = useContext(AuthContext);

  const handleSendMessage = async () => {
    if (sending) return;
    setSending(true)  

    
    try {
    
      const storedToken = localStorage.getItem('authToken');

      await axios.post(`${process.env.REACT_APP_API_URL}/api/messages/${user.username}`, message, 
      { headers: { Authorization: `Bearer ${storedToken}`} });
      onMessageSent();
      setMessage({ recipient: '', subject: '', content: '' });
      // showConfirmationModal();
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
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
        <Modal.Title>Message Sent</Modal.Title>
      </Modal.Header>
        <Modal.Body>Your message was successfully sent.</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setShowConfirmation(false)}>
        OK
      </Button>
        </Modal.Footer>
      </Modal>

    </div>
    
  );
};

export default ComposeMessage;
