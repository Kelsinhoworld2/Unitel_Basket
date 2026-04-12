const express = require("express");
const router = express.Router();
const Team = require("../models/Team");

// GET all teams
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find().sort({ rank: 1 });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
