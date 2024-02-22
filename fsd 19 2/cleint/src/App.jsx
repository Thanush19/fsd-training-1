import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    department: "",
    dob: "",
    gender: "",
    designation: "",
    salary: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data
    if (
      formData.name &&
      formData.employeeId &&
      formData.department &&
      formData.dob &&
      formData.gender &&
      formData.designation &&
      formData.salary
    ) {
      // Here you would send the form data to your backend server
      // For simplicity, I'll just show a success message
      setSuccessMessage("Employee details submitted successfully.");
    } else {
      setErrorMessage("Please fill in all the required fields.");
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Employee Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          {/* Add other form fields */}
          <button type="submit">Submit</button>
        </form>
        {successMessage && <div>{successMessage}</div>}
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    </>
  );
}

export default App;
