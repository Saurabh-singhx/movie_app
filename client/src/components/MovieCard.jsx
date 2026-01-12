import React from 'react'
import { Info, SquarePen, Trash2 } from "lucide-react"
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import { useAdminStore } from '../store/adminStore'
import { useUserStore } from '../store/userStore'
import { formatDuration } from '../lib/utils'

function MovieCard({ movie, index }) {
    const navigate = useNavigate()
    const { authUser } = useAuthStore()
    const { setEditData, isDeleting, deleteMovie } = useAdminStore()
    const { setViewMovieData } = useUserStore()

    const handleEditData = () => {
        setEditData(movie)
        navigate("/editmovie")
    }

    const handleDelete = () => {
        deleteMovie(movie._id)
    }

    const handleMovieDetailsView = () => {
        setViewMovieData(movie)
        navigate("/movieview")
    }

    return (
        <div className="w-full flex justify-between items-center gap-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition">

            {/* Left section */}
            <div className="flex gap-4 items-start">
                <div className="w-24 h-32 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    <img
                        src={movie.movie_cover_image_url}
                        alt={movie.movie_name}
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <h3 className="text-base font-semibold text-slate-800 leading-tight">
                        {movie.movie_name}
                    </h3>

                    <div className="flex items-center gap-3 text-sm text-slate-500">
                        <span>{new Date(movie.movie_release_date).getFullYear()}</span>
                        <span>•</span>
                        <span>{formatDuration(movie.movie_duration)}</span>
                    </div>

                    <p className="text-sm text-slate-600 line-clamp-2 max-w-md">
                        {movie.movie_description}
                    </p>

                    <span className="text-sm font-medium text-slate-700">
                        ⭐ {movie.movie_rating}
                    </span>
                </div>
            </div>

            {/* Right actions */}
            <div className="flex flex-col gap-3 items-center">
                {authUser?.role === 'ADMIN' && (
                    <button
                        type="button"
                        onClick={handleEditData}
                        className="p-2 rounded-lg hover:bg-yellow-100 transition"
                    >
                        <SquarePen className="h-5 w-5 text-slate-600 hover:text-yellow-600" />
                    </button>
                )}

                <button
                    type="button"
                    onClick={handleMovieDetailsView}
                    className="p-2 rounded-lg hover:bg-blue-100 transition"
                >
                    <Info className="h-5 w-5 text-slate-600 hover:text-blue-600" />
                </button>

                {authUser?.role === 'ADMIN' && (
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="p-2 rounded-lg hover:bg-red-100 transition disabled:opacity-50"
                    >
                        <Trash2 className="h-5 w-5 text-slate-600 hover:text-red-600" />
                    </button>
                )}
            </div>
        </div>
    )
}

export default MovieCard
