import { error } from 'console';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import { IFfmpegService } from '../../../entitties/interfaces/ffmpeg/IFfmpeg';





export class FfmpegService  implements IFfmpegService{
  constructor() {}

  async compressUsingFFmpeg(inputPath: string, outputPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .outputOptions([
          '-vcodec libx264',  
          '-crf 28',          
          '-preset medium',   
          '-b:v 1000k',       
          '-acodec aac',     
          '-b:a 128k'         
        ])
        .on("end", () => {
          console.log("Compression finished", outputPath);
          resolve(outputPath) 
        })
        .on("error", (error) => {
          console.error("Compression error:", error)
          reject(error); 
        })
        .save(outputPath);
    });
  }
}


