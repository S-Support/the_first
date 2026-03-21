const express = require("express");
const router = express.Router();

const institutionService = require("../services/institution_service");

router.get("/institutions/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await institutionService.findById(id);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "서버 오류" });
  }
});

module.exports = router;
