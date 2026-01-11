import { Worker } from "bullmq";
import dotenv from "dotenv";
import connectDB from "../lib/db.js";
import Movie from "../models/movie.model.js";
import { redisClient } from "../lib/redis.js";

dotenv.config();
await connectDB();
console.log("Connected DB:", Movie.db.name);

new Worker(
  "movie-queue",
  async (job) => {
    console.log("Processing job:", job.data);

    try {
      const {
        movie_name,
        movie_description,
        movie_cover_image_url,
        movie_duration,
        movie_release_date
      } = job.data;

      const duration = Number(movie_duration);
      const releaseYear = new Date(movie_release_date).getFullYear();

      if (
        !movie_name ||
        !movie_description ||
        !movie_cover_image_url ||
        Number.isNaN(duration) ||
        Number.isNaN(releaseYear)
      ) {
        throw new Error("Invalid job data");
      }

      const movie = await Movie.create({
        movie_name,
        movie_description,
        movie_cover_image_url,
        movie_duration: duration,
        movie_release_date: releaseYear
      });

      console.log("✅ Inserted movie:", movie._id);

    } catch (err) {
      console.error("❌ Mongo insert failed:", err);
      throw err; // REQUIRED so BullMQ marks job failed
    }
  },
  { connection: redisClient }
);
