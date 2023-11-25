import jwt from "jsonwebtoken";

function jwtTokens({ userId, userName, userEmail }) {
  const user = { userId, userName, userEmail };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "6h",
  });
  return { accessToken, refreshToken };
}

export { jwtTokens };
