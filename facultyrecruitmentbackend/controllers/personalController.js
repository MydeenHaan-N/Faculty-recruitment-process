import { db } from '../config/db.js'; // Adjust path as needed

export const savePersonal = (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  const photoBuffer = req.file ? req.file.buffer : null;

  const getDeptQuery = `SELECT department FROM personal WHERE userId = ?`;

  db.query(getDeptQuery, [userId], (err, results) => {
    if (err) {
      console.error('Fetch Error:', err);
      return res.status(500).json({ error: 'Error fetching existing department' });
    }

    const existingDepartment = results.length > 0 ? results[0].department : null;
    const isDeptChanged = existingDepartment && existingDepartment !== data.department;

    const insertQuery = `
      INSERT INTO personal (
        userId, fullName, dateOfBirth, age, gender,
        communicationAddress, permanentAddress, religion, community, caste,
        email, mobileNumber, post, department, appliedDate, photo
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        fullName = VALUES(fullName),
        dateOfBirth = VALUES(dateOfBirth),
        age = VALUES(age),
        gender = VALUES(gender),
        communicationAddress = VALUES(communicationAddress),
        permanentAddress = VALUES(permanentAddress),
        religion = VALUES(religion),
        community = VALUES(community),
        caste = VALUES(caste),
        email = VALUES(email),
        mobileNumber = VALUES(mobileNumber),
        post = VALUES(post),
        department = VALUES(department),
        appliedDate = VALUES(appliedDate),
        photo = VALUES(photo)
    `;

    db.query(insertQuery, [
      userId,
      data.fullName,
      data.dateOfBirth,
      data.age,
      data.gender,
      data.communicationAddress,
      data.permanentAddress,
      data.religion,
      data.community,
      data.caste,
      data.email,
      data.mobileNumber,
      data.post,
      data.department,
      data.appliedDate,
      photoBuffer
    ], (err) => {
      if (err) {
        console.error('Insert Error:', err);
        return res.status(500).json({ error: 'Database insert error' });
      }

      if (isDeptChanged) {
        const updateEduQuery = `UPDATE user_education SET pg_specialization = NULL, ug_specialization = ? WHERE user_id = ?`;

        db.query(updateEduQuery, [data.department, userId], (eduErr) => {
          if (eduErr) {
            console.error('Education Update Error:', eduErr);
            return res.status(500).json({ error: 'Error updating education data' });
          }
          return res.json({ message: 'Personal Data Saved and Education Reset ✅' });
        });

      } else {
        return res.json({ message: 'Personal Data Saved ✅' });
      }
    });
  });
};


// ✅ Get Personal Data with Image (BLOB converted to base64)
export const getPersonal = (req, res) => {
  const userId = req.params.userId;

  const sql = `SELECT * FROM personal WHERE userId = ?`;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Fetch Error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.length === 0) {
      // return res.status(404).json({ message: 'No personal data found' });
      return res.status(200).json({});
    }

    const personalData = result[0];

    // ✅ Convert photo BLOB to base64 for frontend image rendering
    if (personalData.photo) {
      personalData.photo = personalData.photo.toString('base64');
    }

    res.json(personalData);
  });
};
