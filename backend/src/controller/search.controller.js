import tryCatch from "../utils/tryCatch.js";
import User from "../models/user.model.js";

const getSearchResult = tryCatch(async (req, res, next) => {
  const query = req.query.q;
  const searchResult = await User.find({
    $or: [
      { fullName: { $regex: query.toLowerCase(), $options: "i" } },
      { username: { $regex: query.toLowerCase(), $options: "i" } },
    ],
    _id: { $ne: req.userDoc._id },
  });
  res.json(searchResult);
});

const searchController = { getSearchResult };
export default searchController;

{
  /*
  const searchResult = await User.find({
    $or: [{ username: { $regex: query } }, { fullName: { $regex: query } }],
  });
 */
}
