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
import Expense from "./pages/expense/Expense";
import AuthCallBackGoogle from "./pages/auth/AuthCallBackGoogle";
import MobileNav from "./components/nav/Mobile_nav";

const queryClient = new QueryClient();

const MainLayout = () => {
  return (
    <div className="flex border border-[red] w-full h-screen p-10 max-md:p-0 max-md:justify-center max-md:items-center">
      <Aside />
      <MobileNav />
      <div className="flex-1 ml-[300px] max-lg:ml-[80px] max-md:ml-0">
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
          <Route path="/auth/callback" element={<AuthCallBackGoogle />} />
          
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/Income" element={<Income />} />
              <Route path="/expense" element={<Expense />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
