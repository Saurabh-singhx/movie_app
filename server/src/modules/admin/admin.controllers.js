import { movieQueue } from "../../queues/movie.queue.js";
import Movie from "../../models/movie.model.js"


function yearToDate(year) {
    if (!year) return null;
    return new Date(`${year}-01-01T00:00:00.000Z`);
}


export const createMovie = async (req, res) => {
    try {
        const { movieName, releaseDate, duration, description, coverImageUrl } = req.body;

        // Add job to queue
        await movieQueue.add("movie-queue", {
            movie_name: movieName,
            movie_description: description,
            movie_cover_image_url: coverImageUrl,
            movie_duration: duration,
            movie_release_date: yearToDate(releaseDate)
        });

        res.status(201).json({
            message: "Movie created"
        });
    } catch (error) {
        console.error("Error in createMovie:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateMovie = async (req, res) => {
    const { movieId } = req.params;
    const { movieName, releaseDate, duration, description, coverImageUrl } = req.body;

    try {
        if (!movieId) {
            return res.status(400).json({ message: "movieId not found" });
        }

        if (!movieName || !releaseDate || !duration || !description || !coverImageUrl) {
            return res.status(400).json({ message: "fill all fields" });
        }

        const movie = await Movie.findByIdAndUpdate(
            movieId,
            {
                movie_name: movieName,
                movie_description: description,
                movie_cover_image_url: coverImageUrl,
                movie_duration: duration,
                movie_release_date: yearToDate(releaseDate),
            },
            { new: true }
        );

        if (!movie) {
            return res.status(404).json({ message: "movie not found" });
        }

        res.status(200).json({
            message: "movie details updated",
            movie,
        });
    } catch (error) {
        console.error("Error in updateMovie:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteMovie = async(req,res)=>{
    const { movieId } = req.params;

    try {
        
         if (!movieId) {
            return res.status(400).json({ message: "movieId not found" });
        }

        const movie = await Movie.findByIdAndDelete(movieId);

        if(!movie){
            return res.status(400).json({ message: "movieId not found" });
        }
        return res.status(200).json({message:"movie deleted"})
    } catch (error) {
        console.error("Error in deleteMovie:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


