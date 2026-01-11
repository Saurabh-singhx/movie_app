import { Queue } from "bullmq";
import { redisClient } from "../lib/redis.js";

export const movieQueue = new Queue("movie-queue", { connection: redisClient });
