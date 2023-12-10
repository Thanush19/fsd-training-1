import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa"; // Import icons
import BACKEND from "../../constant";

const EmpList = () => {
  const [emp, setEmp] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleUpdate = (employee) => {
    setSelectedEmployee(employee);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BACKEND}/del-emp/${id}`);
      const updatedEmpList = emp.filter((employee) => employee.id !== id);
      setEmp(updatedEmpList);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleUpdateSubmit = async () => {
    try {
      const id = selectedEmployee.id;
      await axios.patch(`${BACKEND}/update-emp/${id}`, selectedEmployee);
      const updatedEmpList = emp.map((employee) =>
        employee.id === selectedEmployee.id ? selectedEmployee : employee
      );
      setEmp(updatedEmpList);
      setSelectedEmployee(null);
      console.log("updated", updatedEmpList[0]);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  useEffect(() => {
    axios
      .get(`${BACKEND}/get-emp`)
      .then((response) => {
        setEmp(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, []);

  return (
    <>
      <h1>Employee List</h1>
      <table>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Address</th>
            <th>Date of Birth</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {emp.map((employee) => (
            <tr key={employee.id}>
              {/* <td>{employee.id}</td> */}
              <td>{employee.name}</td>
              <td>{employee.dept}</td>
              <td>{employee.desg}</td>
              <td>{employee.sal}</td>
              <td>{employee.addr}</td>
              <td>{new Date(employee.dob).toLocaleDateString()}</td>
              <td>{new Date(employee.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => handleUpdate(employee)}>
                  <FaPencilAlt /> Update
                </button>
                <button onClick={() => handleDelete(employee.id)}>
                  <FaTrashAlt /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEmployee && (
        <div>
          <h2>Update Employee</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateSubmit(selectedEmployee);
            }}
          >
            <label>
              Name:
              <input
                type="text"
                value={selectedEmployee.name}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    name: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Department:
              <input
                type="text"
                value={selectedEmployee.dept}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    dept: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Salary:
              <input
                type="text"
                value={selectedEmployee.sal}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    sal: e.target.value,
                  })
                }
              />
            </label>
            <label>
              DOB:
              <input
                type="date"
                value={selectedEmployee.dob}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    dob: e.target.value,
                  })
                }
              />
            </label>
            <label>
              addr:
              <input
                type="text"
                value={selectedEmployee.addr}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    addr: e.target.value,
                  })
                }
              />
            </label>
            <button type="submit">Update</button>
          </form>
        </div>
      )}
    </>
  );
};

export default EmpList;
