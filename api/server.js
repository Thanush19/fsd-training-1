const express = require("express");
const cors = require("cors");
const app = express();
const EmpRouter = require("./route/Emp");
app.use(cors());
app.use(express.json());

app.use("/api", EmpRouter);
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
