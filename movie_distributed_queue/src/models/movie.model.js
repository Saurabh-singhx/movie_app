import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    movie_name: {
      type: String,
      required: true,
      trim: true,
    },

    movie_rating: {
      type: Number,
      min: 0,
      max: 10,
      default:0
    },

    movie_release_date: {
      type: Date,
      required: true,
    },

    movie_duration: {
      type: Number,
      required: true,
      min: 1,
    },

    movie_description: {
      type: String,
      required: true,
    },

    movie_cover_image_url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

movieSchema.index({
  movie_name: "text",
  movie_description: "text",
});

const movie =  mongoose.model("Movie", movieSchema);

export default movie;