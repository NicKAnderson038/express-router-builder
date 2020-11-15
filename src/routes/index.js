const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "TEST MULTIPLE ROUTES - 👋🌎🌍🌏",
  });
});

module.exports = router;
