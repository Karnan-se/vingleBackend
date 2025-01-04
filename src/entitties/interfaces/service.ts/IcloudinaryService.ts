

export interface ICloudinaryService {
  uploadImage(file: Express.Multer.File): Promise<string>;
  deleteImage(publicId: string): Promise<void>;
  updateImage(file: Express.Multer.File, oldPublicId: string): Promise<string>;
  uploadPDF(file: Express.Multer.File): Promise<string>;
  uploadCompressedVideo(file: Express.Multer.File): Promise<string>
}
