import { v2 as cloudinary } from "cloudinary";
import { configKeys } from "../../../config.ts";
import dotenv from 'dotenv';
dotenv.config(); 



cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

export class CloudinaryService {
    async uploadImage(file: Express.Multer.File): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!file || !file.buffer) {
                return reject(new Error("No file or buffer provided"));
            }
    
            const uploadStream = cloudinary.uploader.upload_stream(
                {   
                    upload_preset: "securePreset", // Replace with your preset
                    folder: "tutor/resume", 
                    resource_type: "auto",
                },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error); // Log error details
                        return reject(new Error(`Cloudinary upload failed: ${error.message}`));
                    }
                    if (result) {
                        console.log("Cloudinary upload result:", result); // Log result
                        return resolve(result.secure_url);
                    }
                }
            );
    
            try {
                console.log("Uploading file with buffer size:", file.buffer.length);
                uploadStream.end(file.buffer);
            } catch (err) {
                console.error("Stream error:", err);
                reject(new Error("File buffer upload failed"));
            }
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




