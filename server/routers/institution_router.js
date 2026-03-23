const express = require("express");
const router = express.Router();

const institutionService = require("../services/institution_service");

// 기관정보 조회
router.get("/institutioninfo", async (req, res) => {
  let result = await institutionService.findAll();
  res.send(result);
});

// 기관정보 수정
router.put("/iinstitutioninfo", async (req, res) => {
  let target = req.body;
  let result = await institutionService.modifyInfo(target);
  res.send(result);
});

module.exports = router;
