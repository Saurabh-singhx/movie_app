import { create } from "zustand";
import { toast } from 'react-toastify';
import { axiosInstance } from "../lib/axios";


export const useUserStore = create((set, get) => ({

    movieData: [],
    isLoading: false,
    nextCursor: null,
    isSearching: false,
    viewMovieData:null,

    getAllMovies: async () => {
        const { nextCursor, movieData } = get();

        set({ isLoading: true });

        try {
            const res = await axiosInstance.get("/api/user/movies", {
                params: {
                    limit: 10,
                    ...(nextCursor && { lastId: nextCursor })
                }
            });

            set({
                movieData: [...movieData, ...res.data.movies],
                nextCursor: res.data.nextCursor
            });

        } catch (error) {
            console.error("error in getMovies", error);
            toast.error("error while fetching movies");
        } finally {
            set({ isLoading: false });
        }
    },

    getAllMoviesByName: async () => {
        const { nextCursor, movieData } = get();

        set({ isLoading: true });

        try {
            const res = await axiosInstance.get("/api/user/movie/sorted/name", {
                params: {
                    limit: 10,
                    ...(nextCursor && { lastId: nextCursor })
                }
            });

            set({
                movieData: [...movieData, ...res.data.movies],
                nextCursor: res.data.nextCursor
            });

        } catch (error) {
            console.error("error in getAllMoviesByName", error);
            toast.error("error while fetching movies");
        } finally {
            set({ isLoading: false });
        }
    },

    getAllMoviesByRating: async () => {
        const { nextCursor, movieData } = get();

        set({ isLoading: true });

        try {
            const res = await axiosInstance.get("/api/user/movie/sorted/rating", {
                params: {
                    limit: 10,
                    ...(nextCursor && { lastId: nextCursor })
                }
            });

            set({
                movieData: [...movieData, ...res.data.movies],
                nextCursor: res.data.nextCursor
            });

        } catch (error) {
            console.error("error in getAllMoviesByRating", error);
            toast.error("error while fetching movies");
        } finally {
            set({ isLoading: false });
        }
    },
    getAllMoviesByRelease: async () => {
        const { nextCursor, movieData } = get();

        set({ isLoading: true });

        try {
            const res = await axiosInstance.get("/api/user/movie/sorted/releasedate", {
                params: {
                    limit: 10,
                    ...(nextCursor && { lastId: nextCursor })
                }
            });

            set({
                movieData: [...movieData, ...res.data.movies],
                nextCursor: res.data.nextCursor
            });

        } catch (error) {
            console.error("error in getAllMoviesByRelease", error);
            toast.error("error while fetching movies");
        } finally {
            set({ isLoading: false });
        }
    },
    getAllMoviesByDuration: async () => {
        const { nextCursor, movieData } = get();

        set({ isLoading: true });

        try {
            const res = await axiosInstance.get("/api/user/movie/sorted/duration", {
                params: {
                    limit: 10,
                    ...(nextCursor && { lastId: nextCursor })
                }
            });

            set({
                movieData: [...movieData, ...res.data.movies],
                nextCursor: res.data.nextCursor
            });

        } catch (error) {
            console.error("error in getAllMoviesByDuration", error);
            toast.error("error while fetching movies");
        } finally {
            set({ isLoading: false });
        }
    },

    clearMovieData: () => {
        set({ movieData: [] });
        set({ nextCursor: null })
    },

    setViewMovieData:(data)=>{
        set({viewMovieData:data})
        set({movieData:[]})
        set({nextCursor:null})
    },

    searchMovies: async (data) => {

        if(!data){
            return;
        }
        set({nextCursor:null})
        set({ isSearching: true });

        try {
            const res = await axiosInstance.get("/api/user/movie/search", {
                params: { searchInput: data }
            })

            set({ movieData: res.data.movies })
        } catch (error) {
            console.error("error in searchMovies", error);
            toast.error("error while fetching movies");
        }finally{
             set({ isSearching: false });
        }
    }

}));