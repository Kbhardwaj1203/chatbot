// const db = require('../config/database');

// class Ticket {
//   static async create(museumId, visitorName, visitDate, quantity) {
//     const [museum] = await db.query('SELECT ticket_price FROM museums WHERE id = ?', [museumId]);
//     const totalPrice = museum[0].ticket_price * quantity;

//     const [result] = await db.query(
//       'INSERT INTO tickets (museum_id, visitor_name, visit_date, quantity, total_price) VALUES (?, ?, ?, ?, ?)',
//       [museumId, visitorName, visitDate, quantity, totalPrice]
//     );

//     return result.insertId;
//   }

//   static async getById(id) {
//     const [rows] = await db.query('SELECT * FROM tickets WHERE id = ?', [id]);
//     return rows[0];
//   }
// }

// module.exports = Ticket;

const db = require('../config/database'); // Ensure this path is correct and `db` is correctly configured

class Ticket {
  static async create({ museumId, visitorName, email, date, quantity }) {
    try {
      // Insert ticket into the database
      await db.query(
        'INSERT INTO tickets (museumId, visitorName, email, date, quantity) VALUES (?, ?, ?, ?, ?)',
        [museumId, visitorName, email, date, quantity]
      );

      // Retrieve the ID of the last inserted record
      const [result] = await db.query('SELECT LAST_INSERT_ID() AS id');
      return result[0].id; // Adjust based on your database library
    } catch (error) {
      console.error('Error creating ticket in DB:', error); // Log the error for debugging
      throw error;
    }
  }

  static async getById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM tickets WHERE id = ?', [id]);
      return rows[0]; // Adjust based on your database library
    } catch (error) {
      console.error('Error fetching ticket from DB:', error); // Log the error for debugging
      throw error;
    }
  }
}

module.exports = Ticket;

