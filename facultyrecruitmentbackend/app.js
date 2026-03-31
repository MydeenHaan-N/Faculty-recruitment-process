import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/adminRoutes.js';
import personalRoutes from './routes/personalRoute.js';
import experienceRoutes from './routes/experienceRoutes.js';
import educationRoutes from './routes/educationRoutes.js';
import phdRoutes from './routes/phdRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import userinfoRoutes from './routes/userInfoRoutes.js';
import publicationRoutes from './routes/publicationRoutes.js';
import marksRoutes from './routes/marksRoutes.js';
import specializationRoutes from './routes/specializationRoutes.js';
import emailRoutes from './routes/emailRoutes.js';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 5400;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Faculty Recruitment Server is running" });
});


app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));
app.use('/facultyrecruitment/auth', authRoutes);
app.use('/facultyrecruitment/admin',adminRoutes)
app.use('/facultyrecruitment/personal', personalRoutes);
app.use('/facultyrecruitment/specialization',specializationRoutes);
app.use("/facultyrecruitment/education", educationRoutes);
app.use("/facultyrecruitment/phd", phdRoutes);
app.use('/facultyrecruitment/courses', courseRoutes);
app.use('/facultyrecruitment/user-info', userinfoRoutes);
app.use('/facultyrecruitment/publications',publicationRoutes);
app.use('/facultyrecruitment/experience', experienceRoutes);
app.use('/facultyrecruitment/marks', marksRoutes);  
app.use('/facultyrecruitment/sendemail',emailRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
