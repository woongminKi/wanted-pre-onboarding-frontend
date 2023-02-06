import { Routes, Route } from "react-router-dom";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import Todo from "../components/Todo";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </>
  );
}

export default App;
