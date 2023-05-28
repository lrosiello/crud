const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "ags175ags175",
  database: "data_for_kan",
  port: "5432",
});

async function query(text, params) {
  try {
    const result = await pool.query(text, params);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { query };