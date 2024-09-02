// import React, { useState, useEffect } from 'react';
// import Chat from './components/Chat';
// import TicketForm from './components/TicketForm';

// const App = () => {
//   const [showTicketForm, setShowTicketForm] = useState(false);
//   const [ticketDetails, setTicketDetails] = useState(null);
//   const [museums, setMuseums] = useState([]);

//   useEffect(() => {
//     fetchMuseums();
//   }, []);

//   const fetchMuseums = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/museums');
//       const data = await response.json();
//       setMuseums(data);
//     } catch (error) {
//       console.error('Error fetching museums:', error);
//     }
//   };

//   const handleBookTicket = async (details) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/tickets', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(details),
//       });
//       const data = await response.json();
//       setTicketDetails(data);
//       setShowTicketForm(false);
//     } catch (error) {
//       console.error('Error booking ticket:', error);
//     }
//   };

//   return (
//     <div className="app">
//       <h1>Advanced Museum Ticket Booking Chatbot</h1>
//       {showTicketForm ? (
//         <TicketForm onSubmit={handleBookTicket} museums={museums} />
//       ) : (
//         <Chat onBookTicket={() => setShowTicketForm(true)} ticketDetails={ticketDetails} />
//       )}
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import Chat from './components/Chat';
import Header from './components/Header';
import './App.css';

const App = () => {
  const [museums, setMuseums] = useState([]);

  useEffect(() => {
    fetchMuseums();
  }, []);

  const fetchMuseums = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/museums');
      const data = await response.json();
      setMuseums(data);
    } catch (error) {
      console.error('Error fetching museums:', error);
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Chat museums={museums} />
      </main>
    </div>
  );
};

export default App;