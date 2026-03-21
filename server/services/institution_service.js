const institutionMapper = require("../database/mappers/institution_mapper.js");

const findById = async (id) => {
  return await institutionMapper.selectInstitutionById(id);
};

module.exports = { findById };
