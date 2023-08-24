import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error("error");
    }
    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
