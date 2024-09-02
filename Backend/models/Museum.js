const db = require('../config/database');

class Museum {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM museums');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM museums WHERE id = ?', [id]);
    return rows[0];
  }

  static async search(query) {
    const [rows] = await db.query('SELECT * FROM museums WHERE name LIKE ? OR description LIKE ?', [`%${query}%`, `%${query}%`]);
    return rows;
  }
}

module.exports = Museum;