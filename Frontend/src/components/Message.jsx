// import React from 'react';

// const Message = ({ sender, text }) => (
//   <div className={`message ${sender}`}>
//     <span className="sender">{sender === 'bot' ? 'Chatbot' : 'You'}</span>
//     <p>{text}</p>
//   </div>
// );

// export default Message;

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