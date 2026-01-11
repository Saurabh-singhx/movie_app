import { Queue } from "bullmq";
import { redisClient } from "../config/redis.js";


export const movieQueue = new Queue("movie-queue", {
  connection: redisClient,
});
