//necfacultyrecruitment\facultyrecruitmentbackend\controllers\specializationController.js

import { db } from '../config/db.js';


export const fetchCourses = (req, res) => {
    const {dept_name} = req.params;
   // console.log(dept_name)
    db.query(
        "SELECT courses from specialization WHERE dept_name= ?",
        [dept_name],
        (err,results)=>{
            if (err) return res.status(500).json({ error: err.message });
           // console.log("Courses:", results?.[0]?.courses);
            res.json({ 
                message: "Courses retrived successfully",
                courses: results?.[0]?.courses
            });
        }
    )
};


// 1. Fetch all distinct department names
export const fetchDepartments = (req, res) => {
    db.query(
        "SELECT DISTINCT dept_name FROM specialization",
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        }
    );
};

// 2. Fetch specializations for a particular department
export const fetchCoursesByDept = (req, res) => {
    const { dept_name } = req.params;
    db.query(
        "SELECT courses FROM specialization WHERE dept_name = ?",
        [dept_name],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length === 0) return res.status(404).json({ message: "Department not found" });
            res.json({ courses: results[0].courses });
        }
    );
};