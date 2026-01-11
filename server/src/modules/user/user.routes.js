import express from "express";
import { protectRoute } from "../../middleware/auth.middleware.js";
import { getAllMovies, getMoviesSortedByDuration, getMoviesSortedByName, getMoviesSortedByRating, getMoviesSortedByReleaseDate, searchMovies } from "./user.controllers.js";

const router = express.Router();


router.get("/movies",protectRoute,getAllMovies);
router.get("/movie/sorted/name",protectRoute,getMoviesSortedByName);
router.get("/movie/sorted/rating",protectRoute,getMoviesSortedByRating);
router.get("/movie/sorted/releasedate",protectRoute,getMoviesSortedByReleaseDate);
router.get("/movie/sorted/duration",protectRoute,getMoviesSortedByDuration);
router.get("/movie/search",protectRoute,searchMovies);

export default router;