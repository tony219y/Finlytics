import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema, SignUpSchema, signUpSchema } from "@/lib/auth.users";
import { getProfile, loginService, signUpService } from "@/services/auth.service";
import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from "@/stores/auth.store";
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner";


//use zod to check input
export const useLoginForm = () =>
    useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

export const useLogin = () => {
    const setToken = useAuthStore((state) => state.setToken)

    return useMutation({
        mutationFn: loginService,
        onSuccess: (data) => {
            setToken(data)
            toast.success("Login Success!")
            window.location.href = '/dashboard'
        },
        onError: (err: any) => {
            toast.error(err.message)
        },
    })
}

export const useSignupForm = () => useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    }
})

export const useSignUp = () => {
    return useMutation({
        mutationFn: signUpService,
        onSuccess: () => {
            toast.success("Sign Up Success!")
            window.location.href = '/login'
        },
        onError: (err: any) => {
            toast.error(err.message)
        },
    })
}

// * Get Profile
export const useProfile = () => {
    return useQuery({
        queryKey:['profile'],
        queryFn: getProfile,
        retry: false, // ! Don't retry is Token expires
    })
}


