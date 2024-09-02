// // import React, { useState, useEffect } from 'react';
// // import Message from './Message';

// // const Chat = ({ onBookTicket, ticketDetails }) => {
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState('');

// //   useEffect(() => {
// //     addMessage('bot', 'Welcome to the Advanced Museum Ticket Booking Chatbot! How can I help you today?');
// //   }, []);

// //   useEffect(() => {
// //     if (ticketDetails) {
// //       addMessage('bot', `Great! Your ticket has been booked. Details: ${JSON.stringify(ticketDetails)}`);
// //     }
// //   }, [ticketDetails]);

// //   const addMessage = (sender, text) => {
// //     setMessages((prevMessages) => [...prevMessages, { sender, text }]);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (input.trim()) {
// //       addMessage('user', input);
// //       try {
// //         const response = await fetch('http://localhost:5000/api/chat', {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify({ message: input }),
// //         });
// //         const data = await response.json();
// //         addMessage('bot', data.response);
// //         setInput('');

// //         if (data.response.includes('book a ticket')) {
// //           onBookTicket();
// //         }
// //       } catch (error) {
// //         console.error('Error processing message:', error);
// //         addMessage('bot', 'Sorry, there was an error processing your message. Please try again.');
// //       }
// //     }
// //   };

// //   return (
// //     <div className="chat">
// //       <div className="messages">
// //         {messages.map((message, index) => (
// //           <Message key={index} sender={message.sender} text={message.text} />
// //         ))}
// //       </div>
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           value={input}
// //           onChange={(e) => setInput(e.target.value)}
// //           placeholder="Type your message..."
// //         />
// //         <button type="submit">Send</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Chat;

// import React, { useState, useEffect, useRef } from 'react';
// import Message from './Message';

// const Chat = ({ museums }) => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     addMessage('bot', 'Welcome to the Indian Museum Explorer! How can I assist you today?');
//   }, []);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const addMessage = (sender, text) => {
//     setMessages((prevMessages) => [...prevMessages, { sender, text }]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (input.trim()) {
//       addMessage('user', input);
//       setInput('');
//       setIsTyping(true);

//       try {
//         const response = await fetch('http://localhost:5000/api/chat', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ message: input, museums }),
//         });
//         const data = await response.json();
//         setIsTyping(false);
//         addMessage('bot', data.response);
//       } catch (error) {
//         console.error('Error processing message:', error);
//         setIsTyping(false);
//         addMessage('bot', 'Sorry, there was an error processing your message. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="messages">
//         {messages.map((message, index) => (
//           <Message key={index} sender={message.sender} text={message.text} />
//         ))}
//         {isTyping && <div className="typing-indicator">Bot is typing...</div>}
//         <div ref={messagesEndRef} />
//       </div>
//       <form onSubmit={handleSubmit} className="input-form">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//           className="chat-input"
//         />
//         <button type="submit" className="send-button">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Chat;


import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import TicketForm from './TicketForm';

const Chat = ({ museums }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    addMessage('bot', 'Welcome to the Indian Museum Explorer! How can I assist you today?');
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (sender, text) => {
    setMessages((prevMessages) => [...prevMessages, { sender, text }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      addMessage('user', input);
      setInput('');
      setIsTyping(true);

      try {
        const response = await fetch('http://localhost:5000/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input, museums }),
        });
        const data = await response.json();
        setIsTyping(false);
        addMessage('bot', data.response);

        if (data.showBookingForm) {
          setShowBookingForm(true);
        }
      } catch (error) {
        console.error('Error processing message:', error);
        setIsTyping(false);
        addMessage('bot', 'Sorry, there was an error processing your message. Please try again.');
      }
    }
  };

  const handleBookingComplete = (bookingData) => {
    setShowBookingForm(false);
    addMessage('bot', `Great! Your ticket has been booked. Booking details: ${JSON.stringify(bookingData)}`);
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <Message key={index} sender={message.sender} text={message.text} />
        ))}
        {isTyping && <div className="typing-indicator">Bot is typing...</div>}
        <div ref={messagesEndRef} />
      </div>
      {showBookingForm ? (
        <TicketForm museums={museums} onBookingComplete={handleBookingComplete} />
      ) : (
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="chat-input"
          />
          <button type="submit" className="send-button">Send</button>
        </form>
      )}
    </div>
  );
};

export default Chat;