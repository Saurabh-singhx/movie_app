import express from "express";
import { AdminprotectRoute, validate } from "../../middleware/auth.middleware.js";
import { createMovie, deleteMovie, updateMovie } from "./admin.controllers.js";
import { createMovieValidator } from "./admin.validator.js";

const router = express.Router();


router.post("/addmovie",AdminprotectRoute,createMovieValidator,validate,createMovie);
router.put("/updatemovie/:movieId",AdminprotectRoute,createMovieValidator,validate,updateMovie);
router.delete("/deletemovie/:movieId",AdminprotectRoute,deleteMovie);

export default router;