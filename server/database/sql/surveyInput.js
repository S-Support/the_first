const { pool } = require("../DAO");

// 신청할 사용자 선택 -> 조사지 답변 -> 확인

// 보호자에대한 지원대상자 SLECET
const beneficiariesList = `
SELECT b.beneficiaries_name as beneficiaries_name
		,b.beneficiaries_no as beneficiaries_no
FROM beneficiaries b
LEFT JOIN user g 
    ON b.guardian_no = g.user_no
WHERE b.guardian_no = ?;
`;

// -> 지원대상자에대한 정보 불러오기 SELECT
const beneficiariesInfo = `
SELECT beneficiaries_name
		, disability_type
    ,DATE_FORMAT(birth, '%Y-%m-%d') as birth
    , gender
FROM beneficiaries 
WHERE beneficiaries_no = ?;
`;

const surveyQuestion = `
SELECT 
  m.main_no,
  m.main_title,
  s.sub_no,
  s.sub_title,
  q.question_no,
  q.question_text
FROM survey_main m
JOIN survey_sub s ON s.main_no = m.main_no
JOIN survey_question q ON q.sub_no = s.sub_no
ORDER BY m.main_no, s.sub_no, q.question_no;
`;

// -> 새조사지생성 INSERT

const createSurvey = `
INSERT INTO survey_input(version_no,beneficiaries_no)
VALUES (1,?);
`;

// -> 조사지 답변 저장 INSERT

const createSurveyInput = `
INSERT INTO survey_answer(survey_no,question_no,choice_value )
VALUES ?;
`;

module.exports = {
  beneficiariesList,
  beneficiariesInfo,
  createSurvey,
  createSurveyInput,
  surveyQuestion,
};
