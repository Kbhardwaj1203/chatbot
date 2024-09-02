// import React, { useState } from 'react';

// const TicketForm = ({ onSubmit }) => {
//   const [name, setName] = useState('');
//   const [date, setDate] = useState('');
//   const [quantity, setQuantity] = useState(1);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ name, date, quantity });
//   };

//   return (
//     <form className="ticket-form" onSubmit={handleSubmit}>
//       <h2>Book Your Museum Ticket</h2>
//       <div>
//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="date">Date:</label>
//         <input
//           type="date"
//           id="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="quantity">Quantity:</label>
//         <input
//           type="number"
//           id="quantity"
//           value={quantity}
//           onChange={(e) => setQuantity(parseInt(e.target.value))}
//           min="1"
//           required
//         />
//       </div>
//       <button type="submit">Book Ticket</button>
//     </form>
//   );
// };

// export default TicketForm;

// import React, { useState } from 'react';

// const TicketForm = ({ museums, onBookingComplete }) => {
//   const [formData, setFormData] = useState({
//     museumId: '',
//     visitorName: '',
//     email: '',
//     date: '',
//     quantity: 1,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:5000/api/tickets', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();
//       onBookingComplete(data);
//     } catch (error) {
//       console.error('Error booking ticket:', error);
//       alert('There was an error booking your ticket. Please try again.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="ticket-booking-form">
//       <h2>Book Your Museum Ticket</h2>
//       <div className="form-group">
//         <label htmlFor="museumId">Select Museum:</label>
//         <select
//           id="museumId"
//           name="museumId"
//           value={formData.museumId}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select a museum</option>
//           {museums.map(museum => (
//             <option key={museum.id} value={museum.id}>{museum.name}</option>
//           ))}
//         </select>
//       </div>
//       <div className="form-group">
//         <label htmlFor="visitorName">Your Name:</label>
//         <input
//           type="text"
//           id="visitorName"
//           name="visitorName"
//           value={formData.visitorName}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="date">Visit Date:</label>
//         <input
//           type="date"
//           id="date"
//           name="date"
//           value={formData.date}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="quantity">Number of Tickets:</label>
//         <input
//           type="number"
//           id="quantity"
//           name="quantity"
//           value={formData.quantity}
//           onChange={handleChange}
//           min="1"
//           required
//         />
//       </div>
//       <button type="submit" className="book-button">Book Ticket</button>
//     </form>
//   );
// };

// export default TicketForm;

// import React, { useState } from 'react';
// // import './App.css'; // Import CSS for styling

// const TicketForm = ({ museums, onBookingComplete }) => {
//   const [formData, setFormData] = useState({
//     museumId: '',
//     visitorName: '',
//     email: '',
//     date: '',
//     quantity: 1,
//   });
//   const [bookingData, setBookingData] = useState(null);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(''); // Reset error state
//     try {
//       const response = await fetch('http://localhost:5000/api/tickets', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       if (!response.ok) throw new Error('Network response was not ok');
//       const data = await response.json();
//       setBookingData(data); // Save booking data
//       onBookingComplete(data);
//     } catch (error) {
//       console.error('Error booking ticket:', error);
//       setError('There was an error booking your ticket. Please try again.');
//     }
//   };

//   return (
//     <div className="ticket-booking-container">
//       {bookingData ? (
//         <div className="booking-summary">
//           <h2>Booking Confirmation</h2>
//           <p><strong>Museum:</strong> {bookingData.museumName}</p>
//           <p><strong>Visitor Name:</strong> {bookingData.visitorName}</p>
//           <p><strong>Email:</strong> {bookingData.email}</p>
//           <p><strong>Visit Date:</strong> {bookingData.visitDate}</p>
//           <p><strong>Quantity:</strong> {bookingData.quantity}</p>
//           <p><strong>Ticket ID:</strong> {bookingData.id}</p>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} className="ticket-booking-form">
//           <h2>Book Your Museum Ticket</h2>
//           {error && <div className="error-message">{error}</div>}
//           <div className="form-group">
//             <label htmlFor="museumId">Select Museum:</label>
//             <select
//               id="museumId"
//               name="museumId"
//               value={formData.museumId}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select a museum</option>
//               {museums.map(museum => (
//                 <option key={museum.id} value={museum.id}>{museum.name}</option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="visitorName">Your Name:</label>
//             <input
//               type="text"
//               id="visitorName"
//               name="visitorName"
//               value={formData.visitorName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="date">Visit Date:</label>
//             <input
//               type="date"
//               id="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="quantity">Number of Tickets:</label>
//             <input
//               type="number"
//               id="quantity"
//               name="quantity"
//               value={formData.quantity}
//               onChange={handleChange}
//               min="1"
//               required
//             />
//           </div>
//           <button type="submit" className="book-button">Book Ticket</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default TicketForm;



import React, { useState } from 'react';
// import './styles.css'; // Import the CSS file

const TicketForm = ({ museums, onBookingComplete }) => {
  const [formData, setFormData] = useState({
    museumId: '',
    visitorName: '',
    email: '',
    date: '',
    quantity: 1,
  });
  const [bookingData, setBookingData] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(''); // Reset error state
  //   try {
  //     const response = await fetch('http://localhost:5000/api/tickets', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     if (!response.ok) throw new Error('Network response was not ok');
  //     const data = await response.json();
  //     setBookingData(data); // Save booking data
  //     onBookingComplete(data);
  //   } catch (error) {
  //     console.error('Error booking ticket:', error);
  //     setError('There was an error booking your ticket. Please try again.');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
  
      const data = await response.json();
      onBookingComplete(data);
    } catch (error) {
      console.error('Error booking ticket:', error);
      alert('There was an error booking your ticket. Please try again.');
    }
  };
  

  return (
    <div className="ticket-form">
      {bookingData ? (
        <div className="booking-summary">
          <h2>Booking Confirmation</h2>
          <p><strong>Museum:</strong> {bookingData.museumName}</p>
          <p><strong>Visitor Name:</strong> {bookingData.visitorName}</p>
          <p><strong>Email:</strong> {bookingData.email}</p>
          <p><strong>Visit Date:</strong> {bookingData.visitDate}</p>
          <p><strong>Quantity:</strong> {bookingData.quantity}</p>
          <p><strong>Ticket ID:</strong> {bookingData.id}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Book Your Museum Ticket</h2>
          {error && <div className="error-message">{error}</div>}
          <div>
            <label htmlFor="museumId">Select Museum:</label>
            <select
              id="museumId"
              name="museumId"
              value={formData.museumId}
              onChange={handleChange}
              required
            >
              <option value="">Select a museum</option>
              {museums.map(museum => (
                <option key={museum.id} value={museum.id}>{museum.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="visitorName">Your Name:</label>
            <input
              type="text"
              id="visitorName"
              name="visitorName"
              value={formData.visitorName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="date">Visit Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="quantity">Number of Tickets:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          <button type="submit" className="book-button">Book Ticket</button>
        </form>
      )}
    </div>
  );
};

export default TicketForm;
