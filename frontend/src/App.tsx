import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
