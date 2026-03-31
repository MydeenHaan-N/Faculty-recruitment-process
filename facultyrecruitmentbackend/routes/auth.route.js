import express from 'express';
import { register, login ,updateUserSubmission,getUserStatus} from '../controllers/auth.controller.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.put('/submission/:userId',updateUserSubmission);
router.get('/user/:userId', getUserStatus);

export default router;