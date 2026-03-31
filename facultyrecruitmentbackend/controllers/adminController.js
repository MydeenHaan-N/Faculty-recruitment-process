import { db } from '../config/db.js';

export const getCount = (req, res) => {
  const { fromdate, todate, department } = req.body;
  const q =
    `SELECT 
  post, 
  IFNULL(SUM(MALE), 0) AS MALE, 
  IFNULL(SUM(FEMALE), 0) AS FEMALE 
FROM (
  SELECT 
    POST,
    CASE WHEN gender = 'Male' THEN CNT END AS MALE,
    CASE WHEN gender = 'Female' THEN CNT END AS FEMALE
  FROM (
    SELECT 
      post, 
      gender, 
      COUNT(gender) AS CNT 
    FROM personal 
    WHERE department = ? 
      AND appliedDate >= ? 
      AND appliedDate <= ? 
    GROUP BY POST, gender
  ) AS t
) AS tbl 
GROUP BY POST;

 ` ;



  const values = [department, fromdate, todate];

  db.query(q, values, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    //  console.log(result)
    return res.status(200).json(result);
  });
};


export const getData = (req, res) => {
  const { department } = req.body;

  db.query('DELETE FROM Cou', () => {
    db.query('DELETE FROM Exp', () => {
      db.query('DELETE FROM Pap', () => {
        db.query('INSERT INTO Cou (user_id, count) SELECT user_id, COUNT(*) FROM courses GROUP BY user_id', () => {
          db.query('INSERT INTO Exp (user_id, count) SELECT userid, COUNT(*) FROM experience GROUP BY userid', () => {
            db.query('INSERT INTO Pap (user_id, count) SELECT user_id, COUNT(*) FROM publications GROUP BY user_id', () => {
  
              const q = `
                SELECT 
                  a.*, b.*, c.*, d.*, e.*, f.*, g.*, h.*
                FROM personal a
                LEFT JOIN user_education b ON b.user_id = a.userid
                LEFT JOIN total_weight c ON c.user_id = a.userid
                LEFT JOIN Pap d ON d.user_id = a.userid
                LEFT JOIN Exp e ON e.user_id = a.userid
                LEFT JOIN phd f ON f.user_id = a.userid
                LEFT JOIN Cou g ON g.user_id = a.userid
                LEFT JOIN user_additional_info h ON h.user_id = a.userid
                WHERE a.department = ?;
              `;
  
              const values = [department];
  
              db.query(q, values, (err2, result) => {
                if (err2) {
                  console.error("Database error:", err2);
                  return res.status(500).json({ error: "Database query failed" });
                }
                return res.status(200).json(result);
              });
  
            });
          });
        });
      });
    });
  });
  



};
