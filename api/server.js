const { Pool } = require("pg");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware

// Create an Express app
const app = express();
const port = 3000;

// Middleware
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

app.post("/employees", async (req, res) => {
  try {
    const { employee_name, department, dob, gender, designation, salary } =
      req.body;
    const newEmployee = await pool.query(
      "INSERT INTO employees (employee_name, department, dob, gender, designation, salary) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [employee_name, department, dob, gender, designation, salary]
    );
    res.json(newEmployee.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/employees", async (req, res) => {
  try {
    const allEmployees = await pool.query("SELECT * FROM employees");
    res.json(allEmployees.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await pool.query(
      "SELECT * FROM employees WHERE employee_id = $1",
      [id]
    );
    res.json(employee.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update an employee by ID
app.put("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { employee_name, department, dob, gender, designation, salary } =
      req.body;
    const updatedEmployee = await pool.query(
      "UPDATE employees SET employee_name = $1, department = $2, dob = $3, gender = $4, designation = $5, salary = $6 WHERE employee_id = $7 RETURNING *",
      [employee_name, department, dob, gender, designation, salary, id]
    );
    res.json(updatedEmployee.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete an employee by ID
app.delete("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM employees WHERE employee_id = $1", [id]);
    res.json("Employee deleted successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
