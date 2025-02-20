import tryCatch from "../utils/tryCatch.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { deleteSingleFile, uploader } from "../helper/cloudinary.js";
import { pushNewNotification } from "../helper/push-notification.js";
import { shuffleArray } from "../helper/shuffle.js";

const getAllPosts = tryCatch(async (req, res, next) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 6;

  const postsTotalCount = await Post.find().countDocuments();
  const postsDoc = await Post.find({})
    .populate("user")
    .limit(limit * page)
    .sort({ createdAt: -1 });

  res.json({
    posts: postsDoc,
    currentPage: page,
    totalPages: Math.ceil(postsTotalCount / limit),
    totalCount: postsTotalCount,
  });
});

const getSinglePost = tryCatch(async (req, res, next) => {
  const id = req.params.id;
  const singlePost = await Post.findOne({ _id: id })
    .populate("user", "username profilePicture verified")
    .populate("comments");

  if (!singlePost) {
    res.status(404);
    throw new Error("Post not found");
  }
  res.json(singlePost);
});

const createPost = tryCatch(async (req, res, next) => {
  const authId = req.userDoc._id;
  let postFile = req?.files.file;

  if (!postFile || !req.body.caption) {
    res.status(400);
    throw new Error("Invalid request");
  }

  const tempFilePath = postFile.tempFilePath;
  const mimetype = postFile.mimetype;
  const _mimeType = mimetype.split("/")[0];
  const postType = _mimeType === "image" ? "post" : "reel";

  // Upload the file to cloudinary
  const newPath = await uploader(
    tempFilePath,
    "instagram",
    postType === "post" ? "image" : "video"
  );

  // Check new post 👇🏼
  const newPost = await Post.create({
    user: authId,
    caption: req.body.caption,
    type: postType === "post" ? "post" : "reel",
    src: newPath.secure_url,
  });

  console.log("newPost", newPost);

  // Pushing new post to user account
  await User.findByIdAndUpdate(authId, { $push: { posts: newPost._id } });

  // Check is user post 3 posts give verified tag 👇🏼
  const UserDoc = await User.findById(authId).select("posts verified");
  const userPostsLength = UserDoc.posts.length;
  if (userPostsLength >= 3 && UserDoc.verified === false) {
    await User.findByIdAndUpdate(authId, { $set: { verified: true } });
    res.status(201).json({ message: "You have verified account" });
    return;
  }
  res.status(201).json({ message: "Post Created Successfully" });
});

const updatePost = tryCatch(async (req, res, next) => {
  res.json({ message: "Update Post Router" });
});

const deletePost = tryCatch(async (req, res, next) => {
  const postId = req.params.id;
  const authId = req.userDoc._id;

  // Get Current Post Data for checking 👇🏼
  const postDoc = await Post.findById(postId);
  if (!postDoc) {
    res.status(400);
    throw new Error("Post Not Found!");
  }

  // Check if User is author for this post before deleting Post👇🏼
  if (postDoc.user.toString() !== authId.toString()) {
    console.log("Not Author");
    res.status(400);
    throw new Error("You are not author you, Can't access this post!");
  }

  // Remove Post and Unlink File 👇🏼
  Post.findByIdAndDelete(postId)
    .then(async (data) => {
      await User.findByIdAndUpdate(data.user, { $pull: { posts: data._id } });
      await deleteSingleFile(data.src);
      res.json({ status: "success", message: "Post Deleted Successfull" });
    })
    .catch((error) => {
      return next(error.message);
    });
});

const getMyPosts = tryCatch(async (req, res, next) => {
  const authId = req.userDoc._id;
  const data = await User.findById(authId)
    .select("posts -_id")
    .populate("posts")
    .sort({ createdAt: -1 });

  res.json(data.posts);
});

const getUserPosts = tryCatch(async (req, res, next) => {
  const username = req.params.username;
  const data = await User.findOne({ username })
    .select("posts -_id")
    .populate("posts")
    .sort({ createdAt: -1 });

  res.json(data.posts);
});

const toggleLike = tryCatch(async (req, res, next) => {
  const postId = req.params.postId;
  const authId = req.userDoc._id;

  const postDoc = await Post.findById(postId);
  const isUserLikeThisPost = postDoc.likes.some((userId) => {
    return userId.toString() === authId.toString();
  });

  // If user not liked make like and push user id to post likes
  if (!isUserLikeThisPost) {
    await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: authId },
      },
      { new: true }
    );

    // Don't push notification if owner like his/her own post!
    if (postDoc.user.toString() !== authId.toString()) {
      await pushNewNotification(authId, "post_like", postDoc.user, postDoc._id);
    }

    res.json({ success: true });
    return;
  }

  // else user liked remove user like from the post
  await Post.findByIdAndUpdate(
    postId,
    {
      $pull: { likes: authId },
    },
    { new: true }
  );
  res.json({ success: true });
});

const getAllReels = tryCatch(async (req, res, next) => {
  const allReels = await Post.find({ type: "reel" })
    .populate("user", "username verified profilePicture followers")
    .sort({ createdAt: -1 });
  res.json(allReels);
});

const postController = {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
  getUserPosts,
  toggleLike,
  getAllReels,
};
export default postController;
