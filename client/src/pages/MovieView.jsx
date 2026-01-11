import React from 'react'
import Navbar from '../components/Navbar'

function MovieView({movie}) {
    return (
        <div className='bg-amber-600 h-full w-full '>
            <Navbar />
            <div className='w-full border border-blue-300 rounded-2xl flex justify-between items-center p-2 gap-8 bg-blue-50'>
                <div className='flex gap-4'>

                    <div className='w-20 shrink-0'>
                        <img src={movie.movie_cover_image_url} alt="" className='rounded-2xl' />
                    </div>
                    <div className='flex flex-col justify-around'>
                        {/* <span>{index}</span> */}
                        <span>{movie.movie_name}</span>
                        <span>{new Date(movie.movie_release_date).getFullYear()}</span>
                        <span className='overflow-hidden line-clamp-1'>{movie.movie_description}</span>
                        <span>{movie.movie_rating}</span>

                    </div>
                </div>

                <div className="mr-4 flex flex-col gap-2 items-center">
                    {
                        authUser?.role === 'ADMIN' && (<button type="button">
                            <SquarePen className="cursor-pointer hover:text-yellow-500" />
                        </button>)
                    }

                    <button type="button">
                        <Info className="cursor-pointer hover:text-blue-500" />
                    </button>

                    {
                        authUser?.role === 'ADMIN' && (
                            <button type="button">
                                <Trash2 className="cursor-pointer hover:text-red-500" />
                            </button>
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default MovieView