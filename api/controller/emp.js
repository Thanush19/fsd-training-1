const db = require("../db/db");

const createEmp = async (req, res) => {
  try {
    const { name, desg, dept, dob, addr, sal } = req.body;
    const responseFromDB = await db.query(
      "INSERT INTO emp (name, desg, dept, dob, addr, sal) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, desg, dept, dob, addr, sal]
    );

    res.status(200).json(responseFromDB.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a employee" });
  }
};
const getEmp = async (req, res) => {
  try {
    const result = await db.query("select * from emp");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
};
const updateEmp = async (req, res) => {
  try {
    const empId = req.params.id;

    const { name, desg, dept, dob, addr, sal } = req.body;

    const existingEmp = await db.query("SELECT * FROM emp WHERE id = $1", [
      empId,
    ]);

    if (existingEmp.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const updatedEmp = await db.query(
      "UPDATE emp SET name = $2, desg = $3, dept = $4, dob = $5, addr = $6, sal = $7 WHERE id = $1 RETURNING *",
      [empId, name, desg, dept, dob, addr, sal]
    );

    res.status(200).json(updatedEmp.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update employee" });
  }
};
const delEmp = async (req, res) => {
  try {
    const empId = req.params.id;

    const existingEmp = await db.query("SELECT * FROM emp WHERE id = $1", [
      empId,
    ]);

    if (existingEmp.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    await db.query("DELETE FROM emp WHERE id = $1", [empId]);
    console.log("Received DELETE request for employee ID:", req.params.id);

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
};
module.exports = {
  createEmp,
  getEmp,
  updateEmp,
  delEmp,
};
