import chalk from "chalk";
const errorHandler = (err, req, res, next) => {
  console.log(chalk.red(err.name));
  if (err.name === "ValidationError") {
    const validationErrors = err.details?.map((d) => d.message);
    res.status(400).json({
      type: "ValidationError",
      errors: validationErrors,
    });
    return;
  }

  if (err.name === "ReferenceError" || err.name === "TypeError") {
    console.log(err);
    return;
  }

  let statusCode = res.statusCode;
  statusCode ??= 500;
  res.statusCode = statusCode;

  switch (statusCode) {
    case 400:
      res.json({
        type: "BadRequest",
        message: err.message,
      });
      break;
    case 401:
      res.json({
        type: "AuthorizedError",
        message: err.message,
      });
      break;
    case 403:
      res.json({
        type: "PermissonRequired",
        message: err.message,
      });
      break;
    case 404:
      res.json({
        type: "NotFound",
        message: err.message,
      });
      break;
    case 409:
      res.json({
        type: "ConflictError",
        message: err.message,
      });
      break;
    case 500:
      res.json({
        type: "InternalServerError",
        message: err.message,
      });
      break;
    default:
      res.json({
        type: "UnknownError.",
        message: err.message,
      });
      break;
  }
  next();
};

export default errorHandler;
