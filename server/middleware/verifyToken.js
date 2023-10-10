import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  let token = req.headers.authorization.split(" ");

  if (token.length != 2 || token[0] != "Bearer") {
    res.status(401).json({ message: "invalid token" });
    return;
  }
  token = token[1];
  if (!token) {
    res.status(401).json({ message: "invalid token" });
    return;
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(401).json({ message: "invalid token" });
    return;
  }

  req.user = {
    id: decoded.id,
  };

  next();
}
