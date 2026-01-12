import React from 'react'
import Navbar from '../components/Navbar'
import { useUserStore } from '../store/userStore'
import { Typography, Divider } from '@mui/material'

function MovieView() {
    const { viewMovieData } = useUserStore()

    return (
        <div className="flex flex-col h-screen w-full">
            <Navbar />

            <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 lg:flex-row lg:items-start">

                    {/* Image */}
                    <div className="w-full sm:w-2/3 lg:w-1/3 flex justify-center">
                        <img
                            src={viewMovieData.movie_cover_image_url}
                            alt={viewMovieData.movie_name}
                            className="w-80 rounded-3xl object-cover"
                        />
                    </div>

                    {/* View-only details */}
                    <div className="w-full lg:w-2/3 flex flex-col gap-4">
                        <div>
                            <Typography variant="subtitle2" color="text.secondary">
                                Movie Name
                            </Typography>
                            <Typography variant="h6">
                                {viewMovieData.movie_name}
                            </Typography>
                        </div>

                        <Divider />

                        <div>
                            <Typography variant="subtitle2" color="text.secondary">
                                Description
                            </Typography>
                            <Typography>
                                {viewMovieData.movie_description}
                            </Typography>
                        </div>

                        <Divider />

                        <div>
                            <Typography variant="subtitle2" color="text.secondary">
                                Release Year
                            </Typography>
                            <Typography>
                                {viewMovieData.movie_release_date.slice(0,4)}
                            </Typography>
                        </div>

                        <Divider />

                        <div>
                            <Typography variant="subtitle2" color="text.secondary">
                                Duration
                            </Typography>
                            <Typography>
                                {viewMovieData.movie_duration} minutes
                            </Typography>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MovieView
