import jwt from "jsonwebtoken";

const isUser = (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // You can access user data via req.user in routes
    next();
  } catch (error) {
    console.error("JWT Error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default isUser;
