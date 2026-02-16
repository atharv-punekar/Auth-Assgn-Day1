const jwt = require("jsonwebtoken");

const SECRET = "MY_SUPER_SECRET_KEY"; // store in .env in real-world

// Generate JWT
function generateToken(userId) {
  return jwt.sign(
    {
      sub: userId,   // subject → who the token belongs to
      role: "user",
    },
    SECRET,
    { expiresIn: "1m" }  // token valid for 1 minute
  );
}

// Validate JWT
function validateToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET);  
    return { valid: true, decoded };
  } catch (err) {
    return { valid: false, error: err.message };
  }
}

module.exports = { generateToken, validateToken };
