import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ✅ เพิ่ม
import { Toaster } from "@/components/ui/sonner";

import Landing from "./pages/Landing/Landing";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Aside from "./components/nav/Aside";
import About from "./pages/about/About";
import Income from "./pages/Income/Income";

const queryClient = new QueryClient(); // ✅ สร้าง instance

const MainLayout = () => {
  return (
    <div className="flex w-full h-screen p-10">
      <Aside />
      <div className="flex-1 ml-[300px] max-lg:ml-[80px]">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}> {/* ✅ Wrap ทั้งแอป */}
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/Income" element={<Income />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
