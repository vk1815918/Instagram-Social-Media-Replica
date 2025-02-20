import { pushNewNotification } from "../helper/push-notification.js";
import User from "../models/user.model.js";
import tryCatch from "../utils/tryCatch.js";

const getUserAccount = tryCatch(async (req, res, next) => {
  const username = req.params.username;
  const accountDoc = await User.findOne({ username: username });

  if (!accountDoc) {
    res.status(404);
    throw new Error("Account Not Found");
  }
  res.json(accountDoc);
});

const follow = tryCatch(async (req, res, next) => {
  const userId = req.params.id;
  const authId = req.userDoc._id;
  const userAccount = await User.findById(userId);

  if (!userAccount) {
    res.status(404);
    throw new Error("Account not find");
  }

  if (userId.toString() === authId.toString()) {
    res.status(400);
    throw new Error("You can't follow your self");
  }
   
  // Check if the user has already followed the account
  const authUser = await User.findById(authId);
 
 if (authUser.following.includes(userAccount._id)) {
    res.status(400);
    throw new Error("You already follow this account");
  }

  // Follow account;
  await User.findByIdAndUpdate(authId, {
    $push: { following: userAccount._id },
  });

  await User.findByIdAndUpdate(userAccount._id, {
    $push: { followers: authId },
  });

  await pushNewNotification(
    authId,
    "new_follow",
    userAccount._id,
    req.userDoc._id
  );
  res.json({ message: "Followed Successfull" });
});

const unfollow = tryCatch(async (req, res, next) => {
  const userId = req.params.id;
  const authId = req.userDoc._id;
  const userAccount = await User.findById(userId);

  if (!userAccount) {
    res.status(404);
    throw new Error("Account not find");
  }

  // Unfollow account;
  await User.findByIdAndUpdate(authId, {
    $pull: { following: userAccount._id },
  });
  await User.findByIdAndUpdate(userAccount._id, {
    $pull: { followers: authId },
  });
  res.json({ message: "Unfollowed Successfull" });
});

const getFollowing = tryCatch(async (req, res, next) => {
  const searchQuery = req.query.searchQuery || null;
  const username = req.params.username;

  const userDoc = await User.findOne({ username }, "following").populate({
    path: "following",
    select: "username email fullName profilePicture",
  });
  const followingsTotalCount = userDoc.following.length;

  let followings = userDoc.following.filter((f) => {
    if (!searchQuery) return f;
    return f.username.includes(searchQuery) || f.fullName.includes(searchQuery);
  });

  res.json({
    followings,
    totalCount: followingsTotalCount,
  });
});

const getFollowers = tryCatch(async (req, res, next) => {
  const searchQuery = req.query.searchQuery || null;
  const username = req.params.username;

  const userDoc = await User.findOne({ username }, "followers").populate({
    path: "followers",
    select: "username email fullName profilePicture",
  });
  const followersTotalCount = userDoc.followers.length;

  let followers = userDoc.followers.filter((f) => {
    if (!searchQuery) return f;
    return f.username.includes(searchQuery) || f.fullName.includes(searchQuery);
  });

  res.json({
    followers,
    totalCount: followersTotalCount,
  });
});

const checkFollowingStatus = tryCatch(async (req, res, next) => {
  const currentUser = await User.findById(req.userDoc._id);
  const otherUser = req.params.accountId;
  if (!currentUser) {
    res.status(404);
    throw new Error("User not found");
  }
  const isFollowing = currentUser.following.includes(otherUser);
  res.json({ isFollowing });
});

const getFollowersFollowing = tryCatch(async (req, res, next) => {
  const userId = req.userDoc._id;
  const result = await User.findById(userId)
    .select("followers following")
    .populate({
      path: "followers",
      select: "profilePicture username fullName email",
    })
    .populate({
      path: "following",
      select: "profilePicture username fullName email",
    });

  res.json({ followers: result.followers, following: result.following });
});

const accountController = {
  getUserAccount,
  follow,
  unfollow,
  getFollowing,
  getFollowers,
  checkFollowingStatus,
  getFollowersFollowing,
};
export default accountController;
