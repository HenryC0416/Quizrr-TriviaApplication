import jwt from "jsonwebtoken";

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({error: "Missing or invalid authorization"});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);

    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
}