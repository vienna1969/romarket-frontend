const { jwtVerify } = require('jose');
require('dotenv').config()

const getJwtSecretKey = () => {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new Error("JWT_SECRET_KEY is not defined");
    }
    return new TextEncoder().encode(secretKey);
  };

async function verifyJwtToken(token) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}

module.exports = verifyJwtToken;