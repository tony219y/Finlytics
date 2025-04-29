import { getProfile } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query"

// * Get Profile
export const useProfile = () => {
    return useQuery({
        queryKey:['profile'],
        queryFn: getProfile,
        retry: false, // ! Don't retry is Token expires
    })
}