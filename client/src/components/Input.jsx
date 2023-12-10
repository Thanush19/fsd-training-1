import React, { useState, useEffect } from "react";
import BACKEND from "../../constant";
import axios from "axios";

const Input = () => {
  const formattedDate = "2003-11-19";
  const [empInfo, setEmpInfo] = useState({
    name: "",
    dept: "",
    desg: "",
    sal: "",
    dob: formattedDate,
    addr: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted:", empInfo);
    axios.post(`${BACKEND}/create-emp`, empInfo);
    axios
      .post(`${BACKEND}/create-emp`, empInfo)
      .then((response) => {
        console.log("Response from server:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };
  return (
    <>
      <h1 className="text-center font-bold ">Employee-details</h1>
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={empInfo.name}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="">
            <label>
              Department
              <input
                type="text"
                value={empInfo.dept}
                name="dept"
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="">
            <label>
              Designation:
              <input
                type="text "
                name="desg"
                value={empInfo.desg}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="">
            <label>
              Salary:
              <input
                type="text "
                name="sal"
                value={empInfo.sal}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="">
            <label>
              Date of birth:
              <input
                type="date "
                name="dob"
                value={empInfo.dob}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="">
            <label>
              Addrress:
              <input
                type="text "
                name="addr"
                value={empInfo.addr}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Input;
