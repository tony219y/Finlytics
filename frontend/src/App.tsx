import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import { Toaster } from "@/components/ui/sonner";
import ProtectedRoute from "./components/auth/ProtectedRoute";
const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
