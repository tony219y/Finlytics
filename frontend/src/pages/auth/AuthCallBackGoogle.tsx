import { useAuthStore } from "@/stores/auth.store";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      try {
        setToken(token);
        toast.success("Login successful");
        navigate("/dashboard");
      } catch (error) {
        console.error("Failed to parse user data:", error);
        toast.error("Failed to parse user data");
        navigate("/login");
      }
    } else if (searchParams.get("error")) {
      toast.error("Login failed");
      navigate("/login");
    }
  }, [searchParams, navigate, setToken]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Loading...</p>
    </div>
  );
};

export default AuthCallback;
