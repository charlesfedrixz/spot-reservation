import jwt from "jsonwebtoken";

const isAdmin = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // Add admin data to request object
    next();
  } catch (error) {
    console.log("Invaid token : ", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default isAdmin;
