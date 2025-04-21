import api from "@/lib/axios"
import { useAuthStore } from "@/stores/auth.store";

export const loginService = async (data: { email: string, password: string }) => {
  try {
    const response = await api.post("/auth/login", {
      email: data.email,
      password: data.password
    })
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const signUpService = async (data: { username: string, email: string, password: string }) => {
  try {
    const response = await api.post("/auth/signup", {
      username: data.username,
      email: data.email,
      password: data.password
    })
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};


export const getProfile = async () => {
  try {
    const token = useAuthStore.getState().token
    const response = await api.get('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error: any) {
    window.location.href='/'
    throw new Error(error.response?.data?.message);
  }
}
