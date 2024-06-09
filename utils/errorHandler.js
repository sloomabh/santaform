const handleCustomError = (res, statusCode, errorMessage) => {
  res.status(statusCode).render("error", { errorMessage });
};

module.exports = handleCustomError;
