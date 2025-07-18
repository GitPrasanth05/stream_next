import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: String,
    original_title: String,
    original_language: String,
    overview: String,
    release_date: String,
    adult: Boolean,
    backdrop_path: String,
    poster_path: String,
    genre_ids: [Number],
    popularity: Number,
    vote_average: Number,
    vote_count: Number,
    video: Boolean,
  },
  { timestamps: true }
);

export default mongoose.models.Movie || mongoose.model("Movie", MovieSchema);
