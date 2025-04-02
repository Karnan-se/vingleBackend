import { EfficientVideoUploads } from "../../../usecases/EfficientVideoUploader";
import { CloudinaryService } from "../../web/utils/cloudinary";
import { VideoUploaderController } from "../../../adapters/controller/EfficientVideoUploader";




    const service ={
        cloudinary: new CloudinaryService()
    }


const efficientVideoUploader = new EfficientVideoUploads({service})
export const videoUploaderController = new VideoUploaderController(efficientVideoUploader)


