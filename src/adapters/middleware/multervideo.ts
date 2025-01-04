import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "./uploads")
    },
    filename:(req, file, cb)=>{
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, "k");
        cb(null, `${name}-${Date.now()}.${ext}`)
    }
})

const upload = multer({storage});

export const uploadVideo_thumbnail = upload.fields([
    { name: "fileUrl", maxCount: 10},
    { name: "thumbnail", maxCount: 1 }, 
])

