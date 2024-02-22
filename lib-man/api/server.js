const { Pool } = require("pg");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
  })
);

const connectionString =
  "postgresql://Thanush19:gVCkpIl67TJm@ep-shiny-fire-69396007.ap-southeast-1.aws.neon.tech/fsd%20training?sslmode=require";

const pool = new Pool({
  connectionString,
});

pool.on("connect", () => {
  console.log("Connected to the database");
});

app.get("/getBooks", async (req, res) => {
  try {
    const queryResult = await pool.query("SELECT * FROM books"); // Use pool.query() instead of db.query()
    console.log(queryResult.rows);
    res.json(queryResult.rows);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
