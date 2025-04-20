import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema, SignUpSchema, signUpSchema } from "@/lib/auth.users";
import { loginService, signUpService } from "@/services/auth.service";
import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from "@/stores/auth.store";
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
            window.location.href='/dashboard'
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
            window.location.href='/login'
        },
        onError: (err: any) => {
            toast.error(err.message)
        },
    })
}