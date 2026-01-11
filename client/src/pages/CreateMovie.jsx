import React, { useState } from 'react';
import { useAdminStore } from '../store/adminStore';
import TextField from '@mui/material/TextField';
import Navbar from '../components/Navbar';
import Button from '@mui/material/Button';

function createMovie() {
    const { addNewMovie, isAdding } = useAdminStore();

    const [formData, setFormData] = useState({
        movieName: "",
        description: "",
        releaseDate: "",
        duration: "",
        coverImageUrl: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.movieName.trim()) {
            newErrors.movieName = "Movie name is required";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        }

        if (!formData.releaseDate.trim()) {
            newErrors.releaseDate = "Release date is required";
        }

        if (!formData.duration) {
            newErrors.duration = "Duration is required";
        } else if (Number(formData.duration) <= 0) {
            newErrors.duration = "Duration must be greater than 0";
        }

        if (!formData.coverImageUrl.trim()) {
            newErrors.coverImageUrl = "Cover image URL is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        await addNewMovie(formData);

        setFormData({
            movieName: "",
            description: "",
            releaseDate: "",
            duration: "",
            coverImageUrl: "",
        })
    };

    return (
        <div className="flex flex-col h-screen w-full">
            <Navbar />

            <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 lg:flex-row lg:items-start">

                    {/* Image */}
                    <div className="w-full sm:w-2/3 lg:w-1/3 flex justify-center">
                        <img
                            src={formData.coverImageUrl}
                            alt="movie image"
                            className="w-80 rounded-3xl object-cover"
                        />
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="w-full lg:w-2/3 flex flex-col gap-4"
                    >
                        <TextField
                            focused
                            label="Movie Name"
                            name="movieName"
                            value={formData.movieName}
                            onChange={handleChange}
                            error={!!errors.movieName}
                            helperText={errors.movieName}
                            fullWidth
                        />

                        <TextField
                            focused
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            error={!!errors.description}
                            helperText={errors.description}
                            multiline
                            rows={4}
                            fullWidth
                        />

                        <TextField
                            focused
                            label="Release Date"
                            name="releaseDate"
                            type="text"
                            value={formData.releaseDate}
                            onChange={handleChange}
                            error={!!errors.releaseDate}
                            helperText={errors.releaseDate}
                            fullWidth
                        />

                        <TextField
                            focused
                            label="Duration (minutes)"
                            name="duration"
                            type="number"
                            value={formData.duration}
                            onChange={handleChange}
                            error={!!errors.duration}
                            helperText={errors.duration}
                            fullWidth
                        />

                        <TextField
                            focused
                            label="Cover Image URL"
                            name="coverImageUrl"
                            value={formData.coverImageUrl}
                            onChange={handleChange}
                            error={!!errors.coverImageUrl}
                            helperText={errors.coverImageUrl}
                            fullWidth
                        />

                        <Button variant="contained" type="submit" className="self-start">
                            {isAdding ? "adding..." : "add movie"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default createMovie;
