import { useState, useEffect } from "react";
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
      <h1 className="mt-10 mb-5 ">Student list </h1>
      <table className="border border-black">
        <thead className="border border-black">
          <tr className="border border-black">
            <th className="border border-black ">Name</th>
            <th className="border border-black ">Department</th>
            <th className="border border-black ">gender</th>
            <th className="border border-black ">Fees paid</th>
            <th className="border border-black ">Address</th>
            <th className="border border-black ">Date of Birth</th>
            <th className="border border-black ">Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="border border-black ">
          {emp.map((employee) => (
            <tr key={employee.id}>
              <td className="border border-black ">{employee.name}</td>
              <td className="border border-black ">{employee.dept}</td>
              <td className="border border-black ">{employee.desg}</td>
              <td className="border border-black ">{employee.sal}</td>
              <td className="border border-black ">{employee.addr}</td>
              <td className="border border-black ">
                {new Date(employee.dob).toLocaleDateString()}
              </td>
              <td className="border border-black ">
                {new Date(employee.created_at).toLocaleString()}
              </td>
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
