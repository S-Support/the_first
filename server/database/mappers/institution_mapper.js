const { pool } = require("../DAO");
const institutionSql = require("../sql/institutions.js");

const selectInstitutionById = async (id) => {
  let conn = null;
  try {
    conn = await pool.getConnection();
    let [result] = await conn.query(institutionSql.selectInstitutionById, [id]);
    return result[0];
  } catch (err) {
    console.log(err);
    throw err; // <- 중요: 에러를 상위로 전달
  } finally {
    if (conn) conn.release();
  }
};

module.exports = { selectInstitutionById };
