import { v2 as cloudinary } from "cloudinary";
import { configKeys } from "../../../config.ts";



cloudinary.config({
    cloud_name:configKeys.CLOUDINARY_CLOUD_NAME,
    api_key:configKeys.CLOUDINARY_API_KEY,
    api_secret:configKeys.CLOUDINARY_API_SECRET
})

export class CloudinaryService {
    async uploadImage(file: Express.Multer.File): Promise<string> {

        return new Promise((resolve, reject)=>{
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "tutor/resume",
                    use_filename:true,
                    unique_filename:true,
                    resource_type:"auto"
                },
                (error, result) =>{
                    if(error){
                        return reject(new Error("cloudinary upload Failed"))
                    }
                    if(result){
                        return resolve(result.secure_url)
                    }
                }

            )
            uploadStream.end(file.buffer)
        });

    }



    async deleteImage(publicId: string):Promise<void> {

        try {
            await cloudinary.uploader.destroy(publicId)
            
        } catch (error) {
            console.error("Error deleting the Image", error)
            throw new Error("Error deleting The Image")
            
        }
    
    }
    async updateImage(file:Express.Multer.File, oldPublicId : string) : Promise<string> {
        try {
            await cloudinary.uploader.destroy(oldPublicId);
            const result  = await this.uploadImage(file);
            return result
            
        } catch (error) {
            console.error("EError updating The Image: " , error);
            throw new Error("Error Updating The Image")
            
        }
    }

    async uploadPDF(file:Express.Multer.File) : Promise<string> {
        return new Promise((resolve, reject) => {
            const uploaodStream = cloudinary.uploader.upload_stream(
                {
                    folder :"Pdf_uploads",
                    resource_type:"raw",
                    use_filename:true,
                    unique_filename:true,
                    format:"pdf"
                },
                (error, result) =>{
                    if(error){
                        return reject(
                            new Error("Cloudinary PDF Upload failed" +error.message)
                        )
                    }
                    if(result) {
                        return resolve(result.secure_url)
                    }
                }
            )
            uploaodStream.end(file.buffer);
        })
    }
}




