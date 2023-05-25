import React, { useState, useEffect, useRef } from 'react';

const WebSocketComponent: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Create a new WebSocket connection
    const newSocket = new WebSocket('ws://localhost:3000');

    newSocket.onmessage = function (msg) {
      // Chỗ này mới nhận dc message chứ chưa biết đọc ra như thế nào
      console.log(`received message from others client: `, msg)
    }
    // Save the socket connection in state
    setSocket(newSocket);

    // Cleanup function
    return () => {
      console.log(`socket closed`);
      newSocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default WebSocketComponent;
