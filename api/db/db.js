const { Pool } = require("pg");

const connectionString =
  "postgresql://Thanush19:gVCkpIl67TJm@ep-shiny-fire-69396007-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

const pool = new Pool({
  connectionString,
});

async function checkDatabaseConnection() {
  try {
    const client = await pool.connect();
    console.log("conected to db");
    client.release();
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
}
checkDatabaseConnection();

module.exports = pool;
