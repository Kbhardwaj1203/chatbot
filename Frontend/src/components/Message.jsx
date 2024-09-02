

import React from 'react';

const Message = ({ sender, text }) => (
  <div className={`message ${sender}`}>
    <div className="message-content">
      <span className="sender">{sender === 'bot' ? 'Museum Explorer' : 'You'}</span>
      <p>{text}</p>
    </div>
  </div>
);

export default Message;