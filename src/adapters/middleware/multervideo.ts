import multer, { StorageEngine } from "multer";
import path from "path";
import fs from "fs";
import { Request, Response, NextFunction } from "express";

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        if (!uploadDir) {
            return cb(new Error("Failed to set destination for uploads"), "");
        }
        cb(null, uploadDir); // ✅ Ensures two arguments are passed
    },
    filename: (req: Request, file, cb) => {
        try {
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);
            cb(null, `${name}-${Date.now()}${ext}`); // ✅ Ensures two arguments are passed
        } catch (error) {
            cb(new Error("Failed to generate filename"), "");
        }
    }
});

const upload = multer({ storage });

export const uploadVideo_thumbnail = (req: Request, res: Response, next: NextFunction) => {
    upload.fields([
        { name: "fileUrl", maxCount: 10 },
        { name: "thumbnail", maxCount: 1 }
    ])(req, res, (err: any) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        next();
    });
};
