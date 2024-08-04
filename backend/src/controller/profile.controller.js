import User from "../models/user.model.js";
import tryCatch from "../utils/tryCatch.js";
import { deleteSingleFile, uploader } from "../helper/cloudinary.js";

const currentProfile = tryCatch(async (req, res, next) => {
  const currentUser = req.userDoc;
  res.json(currentUser);
});

const userProfile = tryCatch(async (req, res, next) => {
  // Get req username from param 👇🏼
  const username = req.params.username;

  // Get query then make response 👇🏼
  const userDoc = await User.findOne({ username });
  if (!userDoc) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(userDoc);
});

const updateProfilePicture = tryCatch(async (req, res, next) => {
  const profilePicture = req.userDoc.profilePicture;
  let imageFile = req?.files.avatar;

  if (!imageFile) {
    res.json(400);
    throw new Error("Avatar is required");
  }

  if (profilePicture !== process.env.DEFAULT_PROFILE_IMAGE) {
    await deleteSingleFile(profilePicture);
  }

  const path = imageFile.tempFilePath;
  const newPath = await uploader(path, "instagram");

  await User.findByIdAndUpdate(req.userDoc._id, {
    $set: { profilePicture: newPath.secure_url },
  });

  res.json({
    status: "success",
    message: "Profile Picture Added Successfull",
  });
});

const removeProfilePic = tryCatch(async (req, res, next) => {
  const profilePicture = req.userDoc.profilePicture;
  const userId = req.userDoc._id;

  if (profilePicture !== process.env.DEFAULT_PROFILE_IMAGE) {
    await deleteSingleFile(profilePicture);
    await User.findByIdAndUpdate(userId, {
      $set: { profilePicture: process.env.DEFAULT_PROFILE_IMAGE },
    });
    
    res.json({
      status: "success",
      message: "Profile picture removed Successfully",
    });
    return;
  }
  res.status(400);
  throw new Error("You don't have profile picture");
});

const updateProfileInfo = tryCatch(async (req, res, next) => {
  const _id = req.userDoc._id;
  const updatedDoc = await User.findByIdAndUpdate(
    _id,
    { ...req.body },
    { new: true }
  );
  res.json({ message: "Profile info updated Successfull" });
});

const profleController = {
  currentProfile,
  userProfile,
  updateProfilePicture,
  updateProfileInfo,
  removeProfilePic,
};
export default profleController;
