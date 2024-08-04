import path from "path";
import cloudinary from "../config/cloudinary.js";
import url from "url";

export const uploader = async (path, folder, resource_type) =>
  await cloudinary.uploader.upload(path, {
    folder,
    resource_type: resource_type || "image",
  });

// Function to extract public_id from secure_url
export const extractPublicIdFromUrl = (secureUrl, folderName) => {
  const parsedUrl = url.parse(secureUrl);
  const pathComponents = parsedUrl.pathname.split("/");
  // The public_id in Cloudinary is typically the second last component in the path
  if (pathComponents.length >= 2) {
    const witouthExt = path.basename(
      pathComponents[pathComponents.length - 1],
      path.extname(pathComponents[pathComponents.length - 1])
    );
    return folderName + "/" + witouthExt;
  } else {
    return null;
  }
};

export const deleteSingleFile = async (url) => {
  // recive secure_url and change to public id
  const publicId = extractPublicIdFromUrl(url, "instagram");
  await cloudinary.uploader.destroy(publicId);
};

export const deleteManyFile = async (urls) => {
  // recive secure_url and change to public id
  const publicId = extractPublicIdFromUrl([...urls], "instagram");
  await cloudinary.uploader.delete_resources(publicId);
};
