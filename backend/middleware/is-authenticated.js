const isAuthenticated = (request, response, next) => {
  if (request.session.user !== undefined) {
    next();
  } else {
    // Redirect to login page with a message
    response.redirect("/login?message=You need to log in to access this page");
  }
};

module.exports = { isAuthenticated };