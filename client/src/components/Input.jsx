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
      <div className="border border-black flex">
        <form onSubmit={handleSubmit}>
          <div className="m-2">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={empInfo.name}
                onChange={handleChange}
                className="border border-black "
              />
            </label>
          </div>
          <div className="m-2">
            <label>
              Department
              <input
                type="text"
                value={empInfo.dept}
                name="dept"
                onChange={handleChange}
                className="border border-black "
              />
            </label>
          </div>
          <div className="m-2">
            <label>
              Gender:
              <input
                type="radio"
                name="gender"
                value="male"
                checked={empInfo.gender === "male"}
                onChange={handleChange}
                className="border border-black"
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={empInfo.gender === "female"}
                onChange={handleChange}
                className="border border-black"
              />
              Female
            </label>
          </div>

          <div className="m-2">
            <label>
              Roll no:
              <input
                type="text "
                name="sal"
                value={empInfo.sal}
                onChange={handleChange}
                className="border border-black "
              />
            </label>
          </div>
          <div className="m-2">
            <label>
              Date of birth:
              <input
                type="date "
                name="dob"
                value={empInfo.dob}
                onChange={handleChange}
                className="border border-black "
              />
            </label>
          </div>
          <div className="m-2">
            <label>
              Addrress:
              <input
                type="text "
                name="addr"
                value={empInfo.addr}
                onChange={handleChange}
                className="border border-black "
              />
            </label>
          </div>
          <div className="m-2">
            <button className="bg-black text-white p-2" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Input;
