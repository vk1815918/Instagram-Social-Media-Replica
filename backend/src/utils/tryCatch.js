const tryCatch = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    return next(error);
  }
};

export default tryCatch;
