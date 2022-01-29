const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/details.json");
const checkAuth = (context) => {
  if (context.req.headers && context.req.headers.authorization) {
    const token = context.req.headers.authorization.split("Bearer ")[1];
    if (token) {
      try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        context.user = decodedToken;
        return context;
      } catch (error) {
        throw new Error(` token must be in this format Bearer Token`);
      }
    }
  }
  return context;
};

module.exports = checkAuth;
