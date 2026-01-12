import React, { useEffect, useState } from 'react';
import { useAdminStore } from '../store/adminStore';
import TextField from '@mui/material/TextField';
import Navbar from '../components/Navbar';
import Button from '@mui/material/Button';

function EditMovie() {
    const { editMoviesData, updateMovie } = useAdminStore();

    const [formData, setFormData] = useState({
        movieName: "",
        description: "",
        releaseDate: "",
        duration: "",
        coverImageUrl: "",
    });


    useEffect(() => {
        if (editMoviesData) {
            setFormData({
                movieName: editMoviesData.movie_name || "",
                description: editMoviesData.movie_description || "",
                releaseDate: editMoviesData.movie_release_date.slice(0, 4),
                duration: editMoviesData.movie_duration || "",
                coverImageUrl: editMoviesData.movie_cover_image_url || "",
            });
        }
    }, [editMoviesData]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMovie(formData, editMoviesData._id);
    };

    if (!editMoviesData) return null;

    return (
        <div className="flex flex-col h-screen w-full">
            <Navbar />

            <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 lg:flex-row lg:items-start">

                    {/* Image */}
                    <div className="w-full sm:w-2/3 lg:w-1/3 flex justify-center">
                        <img
                            src={formData.coverImageUrl}
                            alt="movie"
                            className="w-80 rounded-3xl object-cover"
                        />
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="w-full lg:w-2/3 flex flex-col gap-4"
                    >
                        <TextField
                            label="Movie Name"
                            name="movie_name"
                            value={formData.movieName}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            label="Description"
                            name="movie_description"
                            value={formData.description}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            fullWidth
                        />

                        <TextField
                            label="Release Date"
                            name="movie_release_date"
                            type="text"
                            value={formData.releaseDate}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            label="Duration (minutes)"
                            name="movie_duration"
                            type="number"
                            value={formData.duration}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            label="Cover Image URL"
                            name="movie_cover_image_url"
                            value={formData.coverImageUrl}
                            onChange={handleChange}
                            fullWidth
                        />

                        <Button variant="contained" type="submit" className="self-start">
                            Update Movie
                        </Button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default EditMovie;
