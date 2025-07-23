const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: err.message || "An unexpected error occurred",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

const errorResponse = (
  res,
  statusCode = 500,
  message = "Something went wrong"
) => {
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  });
};

const successResponse = (res, statusCode = 200, data = null, message = "") => {
  res.status(statusCode).json({
    success: true,
    status: statusCode,
    message,
    data,
  });
};
export { errorHandler, successResponse, errorResponse };
