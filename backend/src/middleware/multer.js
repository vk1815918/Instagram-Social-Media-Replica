// unused for yet!
import multer from "multer";
import path from "path";
const avatarStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    const uniqueName = Date.now();
    cb(null, uniqueName + path.extname(file.originalname));
  },
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/profile");
  },
});

const postStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    const uniqueName = Date.now();
    cb(null, uniqueName + path.extname(file.originalname));
  },
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/post");
  },
});

const avatarUpload = multer({ storage: avatarStorage });
const postUpload = multer({ storage: postStorage });

const upload = { avatar: avatarUpload, post: postUpload };
export default upload;