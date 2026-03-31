import express from 'express';
import { getCount, getData } from '../controllers/adminController.js';

const router = express.Router();
router.post('/', getCount);
router.post('/applicantdata', getData);
export default router;
