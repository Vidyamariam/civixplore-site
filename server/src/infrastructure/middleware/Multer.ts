import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Resolve __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure base upload directories exist
const baseUploadDir = path.join(__dirname, "../uploads");
const engineerResumeDir = path.join(baseUploadDir, "engineers/resumes");
const customerProfileDir = path.join(baseUploadDir, "customers");

[baseUploadDir, engineerResumeDir, customerProfileDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Dynamically choose destination based on type or route
    if (req.baseUrl.includes("/engineer")) {
      cb(null, engineerResumeDir); // Upload to resumes folder under engineers
    } else if (req.baseUrl.includes("/client")) {
      cb(null, customerProfileDir); // Upload to profiles folder under customers
    } else {
      cb(null, baseUploadDir); // Default directory
    }
  },
  filename: (req, file, cb) => {
    // Sanitize and create unique file names
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});
