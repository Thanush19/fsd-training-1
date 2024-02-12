const { Pool } = require("pg");

const connectionString =
  "postgresql://thanushkumarrd:WatnKBs6AbD8@ep-hidden-sunset-40392591.us-east-2.aws.neon.tech/sde?sslmode=require";

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
