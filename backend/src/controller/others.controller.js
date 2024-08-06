import tryCatch from "../utils/tryCatch.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import axios from "axios";
import { shuffleArray } from "../helper/shuffle.js";

const explore = tryCatch(async (req, res, next) => {
  const data = await Post.find({ type: "post" });
  res.json(shuffleArray(data));
});

const suggested = tryCatch(async (req, res, next) => {
  const userDoc = req.userDoc;
  const userId = userDoc._id;
  const limit = +req.query.limit || 5;

  const suggestedUsers = await User.aggregate([
    {
      $match: {
        _id: {
          $nin: [userId, ...userDoc.following], // Exclude the current user and users the current user follows
        },
      },
    },
    {
      $addFields: {
        random: { $rand: {} }, // Add a random field to each document
      },
    },
    {
      $sort: { random: 1 }, // Sort by the random field
    },
    {
      $limit: limit, // Limit the number of results
    },
  ]);

  res.send(suggestedUsers);
});

const getGifs = tryCatch(async (req, res, next) => {
  const limit = req.query.limit || 20;
  const searchQuery = req.query.q || "ethiopia";
  const API_KEY = process.env.GIFHY_API_KEY;
  const BASE_URL = "https://api.giphy.com/v1/gifs";

  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        api_key: API_KEY,
        q: searchQuery,
        limit,
        bundle: "messaging_non_clips",
        offset: 0,
        rating: "g",
        lang: "en",
      },
    });

    res.json(response.data.data);
  } catch (error) {
    res.status(500).json({ message: "Some error occured" });
  }
});

const othersController = { explore, suggested, getGifs };
export default othersController;
