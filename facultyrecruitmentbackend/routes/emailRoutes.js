import express from "express";
import { db } from '../config/db.js';
import { sendApplyConfirmationEmail } from "../services/emailServices.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { userId } = req.body;

    console.log("Received userId:", userId);

    if (!userId) {
        return res.status(400).json({ error: 'Missing userId in request body' });
    }

    const getUserName = `SELECT fullName, email FROM personal WHERE userId = ?`;

    db.query(getUserName, [userId], async (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Error fetching user data' });
        }

        if (!results || results.length === 0) {
            console.warn(`No user found with userId: ${userId}`);
            return res.status(404).json({ error: 'User not found' });
        }

        const name = results[0]?.fullName ?? "User";
        const email = results[0].email;

        try {
            await sendApplyConfirmationEmail(email, name);
            console.log(`Confirmation email sent to ${email}`);
            return res.status(200).json({ message: 'Confirmation email sent successfully' });
        } catch (emailError) {
            console.error('Failed to send confirmation email:', emailError);
            return res.status(500).json({ error: 'Failed to send confirmation email' });
        }
    });
});

export default router;
