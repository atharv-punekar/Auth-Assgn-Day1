const express = require("express");
const { generateToken, validateToken } = require("../utils/jwt");

const router = express.Router();

// Create token
router.post("/generate", (req, res) => {
  const { userId } = req.body;

  if (!userId)
    return res.status(400).json({ message: "userId is required" });

  const token = generateToken(userId);

  return res.json({ token });
});

// Validate token
router.post("/validate", (req, res) => {
  const { token } = req.body;

  if (!token)
    return res.status(400).json({ message: "Token required" });

  const result = validateToken(token);

  if (!result.valid)
    return res.status(400).json({ message: "Token Invalid", error: result.error });

  return res.json({
    message: "Token Valid",
    claims: result.decoded,
  });
});

module.exports = router;
