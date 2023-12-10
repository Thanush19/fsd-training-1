const express = require("express");
const router = express.Router();

const { createEmp, getEmp, updateEmp, delEmp } = require("../controller/emp");

router.post("/create-emp", createEmp);
router.get("/get-emp", getEmp);
router.patch("/update-emp/:id", updateEmp);
router.delete("/del-emp/:id", delEmp);
module.exports = router;
