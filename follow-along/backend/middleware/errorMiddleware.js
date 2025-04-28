module.exports = (err, req, res, next) => {
      // Log the error for debugging
      console.error(err);
    
      // Set default status code and message if not provided
      err.statusCode = err.statusCode || 500;
      err.message = err.message || "Internal Server Error";
    
      // Handle specific error types (optional, based on your application needs)
      if (err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = Object.values(err.errors).map((val) => val.message).join(", ");
      }
    
      if (err.name === "CastError") {
        err.statusCode = 400;
        err.message = `Invalid ${err.path}: ${err.value}`;
      }
    
      // Send the error response
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
    };