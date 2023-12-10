import "./App.css";
import { Routes, Route } from "react-router-dom";
import Input from "./components/Input";
import Emp from "./pages/Emp";
function App() {
  return (
    <>
      <Routes>
        <Route path="employee-input" element={<Input />} />
        <Route path="/" element={<Emp />} />
      </Routes>
    </>
  );
}

export default App;
