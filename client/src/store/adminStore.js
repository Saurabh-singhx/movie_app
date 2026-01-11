import { create } from "zustand";
import { toast } from 'react-toastify';
import { axiosInstance } from "../lib/axios.js";
import { useUserStore } from "./userStore.js";

export const useAdminStore = create((set, get) => ({

    editMoviesData:null,
    isUpdatingMovie:false,
    isDeleting:false,
    isAdding:false,

    setEditData:(data)=>{
        set({editMoviesData:data})
    },

    updateMovie:async(data,id)=>{

        set({isUpdatingMovie:true})

        try {
            const res = await axiosInstance.put(`/api/admin/updatemovie/${id}`,data);

            set({editMoviesData:res.data.movie});
            toast.success(res.data.message)
        } catch (error) {
            console.error("error in updatemovie",error);
            toast.error("error while updating movie details")
        }finally{
            set({isUpdatingMovie:false})
        }
    },

    deleteMovie:async(data)=>{
        set({isDeleting:true})
        try {
            const res = await axiosInstance.delete(`/api/admin/deletemovie/${data}`)

            toast.success(res.data.message || "deleted successfully")

        } catch (error) {
            console.error("error in deletemovie",error);
            toast.error("error while deleting movie")
        }finally{
            set({isDeleting:false})
        }
    },

    addNewMovie:async(data)=>{
        set({isAdding:true});

        try {
            const res = await axiosInstance.post("/api/admin/addmovie",data);

            toast.success(res.data.message || "movie added")
        } catch (error) {
            console.error("error in addNewMovie",error);
            toast.error("error while adding new movie movie")
        }finally{
            set({isAdding:false})
        }
    }
}));