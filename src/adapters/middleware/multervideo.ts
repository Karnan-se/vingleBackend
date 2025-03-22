import multer, { StorageEngine } from "multer";
import path from "path";
import { Request } from "express";

const storage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        try {
            cb(null, "./uploads"); // Ensure the "uploads" directory exists
        } catch (error) {
            cb(new Error("Failed to set destination for uploads"), "");
        }
    },
    filename: (req: Request, file, cb) => {
        try {
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext); // Fixing extension stripping
            cb(null, `${name}-${Date.now()}${ext}`);
        } catch (error) {
            cb(new Error("Failed to generate filename"), "");
        }
    }
});

const upload = multer({ 
    storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // Optional: Limit file size to 100MB
    fileFilter: (req: Request, file, cb) => {
        try {
            if (!file.mimetype.startsWith("video/") && !file.mimetype.startsWith("image/")) {
                return cb(new Error("Only video and image files are allowed"));
            }
            cb(null, true);
        } catch (error) {
            cb(new Error("File validation error"));
        }
    }
});

export const uploadVideo_thumbnail = (req: Request, res: any, next: any) => {
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
