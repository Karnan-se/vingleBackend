import multer from "multer";
import path from "path";

const memoryStorage = multer.memoryStorage();

const upload = multer({
    storage: memoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024, 
    },
});

export const uploadFile = upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "certificateUrl", maxCount: 10 },
]);

console.log("Multer configured with memory storage");