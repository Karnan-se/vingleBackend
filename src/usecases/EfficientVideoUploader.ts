import { ICloudinaryService } from "../entitties/interfaces/service.ts/IcloudinaryService";
import AppError from "../framework/web/utils/appError";
import { v4 as uuidv4 } from 'uuid';




interface Dependency {
  service: {
    cloudinary: ICloudinaryService;
  };
}

export class EfficientVideoUploads {
  private cloudinary;
  constructor(dependency: Dependency) {
    this.cloudinary = dependency.service.cloudinary;
  }

  async requestSignedUrl(fileType: string) {
    try {
      let resourceType = "auto";
      if (fileType == "application/pdf") resourceType = "raw";
      if (fileType == "mp4") resourceType = "video";

      const publicId = `uploads/${uuidv4()}`;
      console.log(publicId);

      
      const timestamp = Math.floor(Date.now() / 1000) -2

      const requestSignedUrl = this.cloudinary.cloudinarySignedUrl(
        timestamp,
        publicId,
        resourceType
      );
      return requestSignedUrl;
    } catch (error) {
      console.log(error);
      throw AppError.conflict("Error requesting url");
    }
  }
}
