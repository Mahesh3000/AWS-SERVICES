import { Request, Response } from "express";
import { uploadFile } from "../services/s3Service";
import { sendEmail } from "../services/sesService";
import logger from "../utils/logger";

const uploadToS3 = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const fileUrl = await uploadFile(req.file);
    logger.info(`File uploaded successfully: ${fileUrl}`);

    res.status(200).json({ message: "File uploaded successfully", fileUrl });
  } catch (error: any) {
    logger.error(`File upload failed: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

// Send an email using SES
const sendEmailHandler = async (req: Request, res: Response): Promise<void> => {
  const { toAddress, subject, body } = req.body;
  try {
    const result = await sendEmail(toAddress, subject, body);
    logger.info(`Email sent successfully to ${toAddress}`);

    res.status(200).json({ message: "Email sent successfully", result });
  } catch (error: any) {
    logger.error(`Email sending failed: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

export { uploadToS3, sendEmailHandler };
