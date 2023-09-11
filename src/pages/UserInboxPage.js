import React, { useState, useContext, useEffect } from 'react';
import MessageDetail from '../components/MessageDetail';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import { Card, Form, Button } from 'react-bootstrap';

const Inbox = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState({ recipient: '', subject: '', content: '' });

  useEffect(() => {
    // Load messages from local storage 
    const storedMessages = JSON.parse(localStorage.getItem('userMessages')) || [];
    setMessages(storedMessages);
  }, []);

  const saveMessagesToLocalStorage = (messages) => {
    // Save messages to local storage
    localStorage.setItem('userMessages', JSON.stringify(messages));
  };


  const fetchMessages = () => {
    axios
      .get(`/api/messages/${user.username}`)
      .then((response) => {
        const fetchedMessages = response.data;
        setMessages(fetchedMessages);
        saveMessagesToLocalStorage(fetchedMessages);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSendMessage = () => {
    const newMessageWithId = { ...newMessage, id: messages.length + 1, sender: user.username };
    const updatedMessages = [...messages, newMessageWithId];
    setMessages(updatedMessages);
    saveMessagesToLocalStorage(updatedMessages);

    // Reset the new message fields
    setNewMessage({ recipient: '', subject: '', content: '' });
  };

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleReadMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleDeleteMessage = (message) => {

    const updatedMessages = messages.filter((m) => m.id !== message.id);
    setMessages(updatedMessages);
    saveMessagesToLocalStorage(updatedMessages);


    if (selectedMessage && selectedMessage.id === message.id) {
      clearSelectedMessage();
    }
  };

  const clearSelectedMessage = () => {
    setSelectedMessage(null);
  };


  return (
    <div>
      <div>
      <div className="text-center">
          <h3>Your Messages</h3><br></br>
      </div>
      <div className="messages-list">
        {messages.map((message) => (
         <div key={message.id} className="message mb-2">
         <div className="d-flex justify-content-between align-items-left">
        <div>From: {message.sender}</div>
        <div>To: {message.recipient}</div>
        <div>Subject: {message.subject}</div>
      </div>
      
            
               <Button
                  variant="primary"
                  onClick={() => handleReadMessage(message)}
                  style={{ marginRight: '1cm', backgroundColor: 'white' }}
                  className="text-dark"
                >
                  Read
                </Button>

                <Button
                  variant="primary"
                  onClick={() => handleDeleteMessage(message)}
                  style={{ backgroundColor: 'black' }}
                  >
                  Delete
                </Button>
                <hr style={{ margin: '10px 0' }} />
                <hr style={{ margin: '10px 0' }} />
            </div>
            
          ) )
          }
        </div>
        <div className="message-content">
          {selectedMessage ? (
            <MessageDetail
              selectedMessage={selectedMessage}
              clearSelectedMessage={clearSelectedMessage}
            />
          ) : (
            <p><br></br>Select a message to view its content.</p>
          )}
        </div>
      </div><br></br>
      <br></br>
      <div className="text-center">
      <h3> New Message</h3>
      </div>
      <Card>
        {/* <Card.Header> </Card.Header> */}
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label>To:</Form.Label>
              <Form.Control
                type="text"
                value={newMessage.recipient}
                onChange={(e) => setNewMessage({ ...newMessage, recipient: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Subject:</Form.Label>
              <Form.Control
                type="text"
                value={newMessage.subject}
                onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Message:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newMessage.content}
                onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
              />
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={handleSendMessage}>
              Send
            </Button>
        </Card.Body>
      </Card>

      
    </div>
  );
};

export default Inbox;
