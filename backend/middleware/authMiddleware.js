import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("AUTH HEADER:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  // Expect header like: Bearer token_here
  const token = authHeader.split(" ")[1];
  console.log("TOKEN:", token);

  if (!token) {
    return res.status(401).json({ message: "Token missing or malformed" });
  }

console.log("JWT SECRET:", process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED:", decoded);

    req.user = decoded; // attach user info
    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
