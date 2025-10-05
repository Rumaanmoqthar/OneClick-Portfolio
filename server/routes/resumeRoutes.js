import express from 'express';
import multer from 'multer';
import { uploadToParseur, receiveParseurWebhook, getResumeById, generatePortfolioZip } from '../controllers/resumeController.js';

const router = express.Router();

// Use memory storage for serverless environment (Vercel)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload-resume', upload.single('resume'), uploadToParseur);
router.post('/parseur-webhook', receiveParseurWebhook);
router.get('/resume/:id', getResumeById);
router.get('/portfolio/:id/download', generatePortfolioZip);

export default router;

