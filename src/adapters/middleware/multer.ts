
import multer from "multer"
import path from  "path"

const storage  = multer.diskStorage({
    destination:(req,file, cb)=>{
        cb(null, "uploads/")
    },
    filename :(req, file, cb)=>{
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
       cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);

    }

})
console.log("reached here in multer")


const upload = multer({storage});
export  const uploadFile = upload.fields([
    {name: "resume", maxCount: 1},
    { name: "certificateUrl", maxCount: 10 },
])