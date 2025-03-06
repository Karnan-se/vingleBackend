import { v2 as cloudinary } from "cloudinary";
import { configKeys } from "../../../config.ts";
import dotenv from "dotenv";
import { rejects } from "assert";
import { error } from "console";
import { ICloudinaryService } from "../../../entitties/interfaces/service.ts/IcloudinaryService.ts";
import fs from "fs/promises";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class CloudinaryService implements ICloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file || !file.buffer) {
        return reject(new Error("No file or buffer provided"));
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          upload_preset: "securePreset",
          folder: "tutor/resume",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return reject(
              new Error(`Cloudinary upload failed: ${error.message}`)
            );
          }
          if (result) {
            console.log("Cloudinary upload result:", result);
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

  async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error("Error deleting the Image", error);
      throw new Error("Error deleting The Image");
    }
  }
  async updateImage(
    file: Express.Multer.File,
    oldPublicId: string
  ): Promise<string> {
    try {
      await cloudinary.uploader.destroy(oldPublicId);
      const result = await this.uploadImage(file);
      return result;
    } catch (error) {
      console.error("EError updating The Image: ", error);
      throw new Error("Error Updating The Image");
    }
  }

  async uploadPDF(file: Express.Multer.File | Buffer ): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "Pdf_uploads",
          upload_preset:"securePreset",
          resource_type: "raw",
          use_filename: true,
          unique_filename: true,
          format: "pdf",
        },
        (error, result) => {
          if (error) {
            return reject(
              new Error("Cloudinary PDF Upload failed" + error.message)
            );
          }
          if (result) {
            return resolve(result.secure_url);
          }
        }
      );
      if (Buffer.isBuffer(file)) {
        uploadStream.end(file); 
      } else {
        uploadStream.end(file.buffer);
      }
    });
  }
  async uploadCompressedVideo(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_large(
        file.path,
        {
          folder: "Video_uploads",
          resource_type: "video",
          use_filename: true,
          unique_filename: true,
          format: "mp4",
          chunk_size: 6000000,
        },
        (error, result) => {
          if (error) {
            return reject(
              new Error(
                "Cloudinary Video Upload and Compression failed: " +
                  error.message
              )
            );
          }
          if (result) {
            return resolve(result.secure_url);
          }
        }
      );
    });
  }

  async uploadVideo(file: string): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_large(
        file,
        {
          folder: "Video_uploads",
          resource_type: "video",
          use_filename: true,
          unique_filename: true,
          format: "mp4",
          chunk_size: 6000000,
        },
        (error, result) => {
          if (error) {
            return reject(
              new Error(
                "Cloudinary Video Upload and Compression failed: " +
                  error.message
              )
            );
          }
          if (result) {
            return resolve(result.secure_url);
          }
        }
      );
    });
  }



  async uploadThumbnail(file: Express.Multer.File): Promise<string> {
    if (!file || !file.path) {
      throw new Error("No file or file path provided");
    }

    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "course/thumbnails",
        resource_type: "image",
      });

      await fs.unlink(file.path);

      return result.secure_url;
    } catch (error: any) {
      console.error("Error during thumbnail upload:", error);

      try {
        await fs.unlink(file.path);
      } catch (fsError) {
        console.error("Error deleting local file after failure:", fsError);
      }

      throw new Error(`Failed to upload thumbnail: ${error.message}`);
    }
  }
}
