import React from "react";
import { Button } from "react-bootstrap";

function MessageDetail({ selectedMessage, clearSelectedMessage }) {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <p className="card-text">Content: {selectedMessage.content}</p>
          <Button variant="secondary" onClick={clearSelectedMessage}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MessageDetail;

