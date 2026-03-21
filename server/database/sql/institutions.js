const { pool } = require("../DAO");

const selectInstitutionById = `
SELECT * FROM institution
WHERE institution_no = ?;
`;

module.exports = { selectInstitutionById };
