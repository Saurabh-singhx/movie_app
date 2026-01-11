import { create } from "zustand";
import { toast } from 'react-toastify';
import { axiosInstance } from "../lib/axios.js";
import { useUserStore } from "./userStore.js";

export const useAuthStore = create((set, get) => ({

    authUser: null,
    isLoggingIn: false,
    isSigningUp:false,
    isCheckingAuth: false,
    

    checkAuth: async () => {
        set({ isCheckingAuth: true })
        try {
            const res = await axiosInstance.get("/api/auth/checkauth");

            set({ authUser: res.data.user });
        } catch (error) {
            // console.error("Error in checkAuth:", error);
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    userSignup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/api/auth/signup", data);

            set({ authUser: res.data.user})

            toast.success("signed up successfully");

        } catch (error) {
            console.error(error)
            toast.error(error.response.data.message)
            // console.log(error.response.data.errors)
            // toast.error(error.response.data.errors?.email);
            // toast.error(error.response.data.errors?.password );
            // toast.error(error.response.data.errors?.name );
        } finally {
            set({ isSigningUp: false });
        }
    },


    userLogin: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/api/auth/login", data);
            set({ authUser: res.data.user})
            toast.success(res.data?.message);

        } catch (error) {
            console.error("error in login",error)
            toast.error(error.response.data.message);
            // toast.error(error.response.data.errors.password);
        } finally {
            set({ isLoggingIn: false });
        }
    },


    logout: async () => {

        try {
            const res = await axiosInstance.post("/api/auth/logout");

            set({authUser: null,});


            toast.success(res.data?.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    },


}));