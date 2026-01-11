import Movie from "../../models/movie.model.js";


import mongoose from "mongoose";

export const getAllMovies = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const lastId = req.query.lastId;

    try {
        const query = {};

        if (lastId) {
            query._id = { $gt: new mongoose.Types.ObjectId(lastId) };
        }

        const movies = await Movie.find(query)
            .sort({ _id: 1 })
            .limit(limit + 1); // fetch one extra

        const hasNextPage = movies.length > limit;

        if (hasNextPage) {
            movies.pop();
        }

        res.json({
            movies,
            nextCursor: hasNextPage ? movies[movies.length - 1]._id : null,
        });
    } catch (error) {
        console.error("error in getAllMovies controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getMoviesSortedByName = async (req, res) => {

    const limit = parseInt(req.query.limit) || 10;
    const lastId = req.query.lastId;

    try {
        const query = {};

        if (lastId) {
            query._id = { $gt: new mongoose.Types.ObjectId(lastId) };
        }

        const movies = await Movie.find(query)
            .sort({ movie_name: 1 })
            .limit(limit + 1);

        const hasNextPage = movies.length > limit;

        if (hasNextPage) {
            movies.pop();
        }

        res.json({
            movies,
            nextCursor: hasNextPage ? movies[movies.length - 1]._id : null,
        });
    } catch (error) {
        console.error("error in getMoviesSortedByName controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMoviesSortedByRating = async (req, res) => {

    const limit = parseInt(req.query.limit) || 10;
    const lastId = req.query.lastId;

    try {
        const query = {};

        if (lastId) {
            query._id = { $gt: new mongoose.Types.ObjectId(lastId) };
        }

        const movies = await Movie.find(query)
            .sort({ movie_rating: -1 })
            .limit(limit + 1);

        const hasNextPage = movies.length > limit;

        if (hasNextPage) {
            movies.pop();
        }

        res.json({
            movies,
            nextCursor: hasNextPage ? movies[movies.length - 1]._id : null,
        });
    } catch (error) {
        console.error("error in getMoviesSortedByRating controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMoviesSortedByReleaseDate = async (req, res) => {

    const limit = parseInt(req.query.limit) || 10;
    const lastId = req.query.lastId;

    try {
        const query = {};

        if (lastId) {
            query._id = { $gt: new mongoose.Types.ObjectId(lastId) };
        }

        const movies = await Movie.find(query)
            .sort({ movie_release_date: -1 })
            .limit(limit + 1);

        const hasNextPage = movies.length > limit;

        if (hasNextPage) {
            movies.pop();
        }

        res.json({
            movies,
            nextCursor: hasNextPage ? movies[movies.length - 1]._id : null,
        });
    } catch (error) {
        console.error("error in getMoviesSortedByReleaseDate controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const getMoviesSortedByDuration = async (req, res) => {

    const limit = parseInt(req.query.limit) || 10;
    const lastId = req.query.lastId;

    try {
        const query = {};

        if (lastId) {
            query._id = { $gt: new mongoose.Types.ObjectId(lastId) };
        }

        const movies = await Movie.find(query)
            .sort({ movie_duration: -1 })
            .limit(limit + 1);

        const hasNextPage = movies.length > limit;

        if (hasNextPage) {
            movies.pop();
        }

        res.json({
            movies,
            nextCursor: hasNextPage ? movies[movies.length - 1]._id : null,
        });
    } catch (error) {
        console.error("error in getMoviesSortedByDuration controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const searchMovies = async (req, res) => {

    const { searchInput } = req.query;

    try {

        if(!searchInput){
            return res.status(400).json({message:"searchinput not found"})
        }

        const movies = await Movie.find({

            $text: { $search: searchInput },

        }).limit(10);

        res.json({movies});
    } catch (error) {
        console.error("error in searchMovies controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

