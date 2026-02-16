const express = require("express");
const jwtRoutes = require("./routes/jwtRoutes");

const app = express();
app.use(express.json());

// Routes
app.use("/jwt", jwtRoutes);
app.use(express.static("public"));


app.listen(4000, () => {
  console.log("JWT Server running on http://localhost:4000");
});
