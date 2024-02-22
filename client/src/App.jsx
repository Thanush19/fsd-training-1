import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employee_name: "",
    department: "",
    dob: "",
    gender: [],
    designation: "",
    salary: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3000/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (e.target.name === "gender") {
      const genderArr = formData.gender.includes(e.target.value)
        ? formData.gender.filter((gender) => gender !== e.target.value)
        : [...formData.gender, e.target.value];
      setFormData({ ...formData, [e.target.name]: genderArr });
    } else {
      setFormData({ ...formData, [e.target.name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/employees", formData);
      setFormData({
        employee_name: "",
        department: "",
        dob: "",
        gender: [],
        designation: "",
        salary: "",
      });
      fetchEmployees(); // Refresh employees after adding new one
    } catch (error) {
      console.error("Error submitting employee:", error);
    }
  };

  return (
    <div>
      <h1>Employee Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="employee_name"
          placeholder="Employee Name"
          value={formData.employee_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
        <div>
          <label>
            Male
            <input
              type="checkbox"
              name="gender"
              value="male"
              checked={formData.gender.includes("male")}
              onChange={handleChange}
            />
          </label>
          <label>
            Female
            <input
              type="checkbox"
              name="gender"
              value="female"
              checked={formData.gender.includes("female")}
              onChange={handleChange}
            />
          </label>
        </div>
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={formData.designation}
          onChange={handleChange}
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Employee</button>
      </form>
      <hr />
      <h2>Employees</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.employee_id}>
            {employee.employee_name} - {employee.department} - {employee.dob} -{" "}
            {Array.isArray(employee.gender)
              ? employee.gender.join(", ")
              : employee.gender}{" "}
            - {employee.designation} - {employee.salary}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
