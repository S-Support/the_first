const listMapper = require("../database/mappers/list_mapper");

const listlInfoService = async (userNo) => {
  let list = await listMapper.list(userNo);
  return list;
};

module.exports = { listlInfoService };
