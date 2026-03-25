const express = require("express");
const router = express.Router();

const listService = require("../services/list_service");

router.get("/list/:no", async (req, res) => {
  let userNo = req.params.no;
  let result = await listService.listInfoService(userNo);
  console.log(result);
  res.send(result);
});

module.exports = router;
