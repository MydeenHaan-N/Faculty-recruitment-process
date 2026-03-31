//necfacultyrecruitment\facultyrecruitmentbackend\routes\specializationRoutes.js

import express from 'express';
import { fetchCourses,fetchDepartments, fetchCoursesByDept } from '../controllers/specializationController.js';

const router = express.Router();

router.get('/departments', fetchDepartments);
router.get('/:dept_name', fetchCoursesByDept);
router.get('/:dept_name', fetchCourses);

export default router;