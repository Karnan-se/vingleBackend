export interface IFfmpegService {
    compressUsingFFmpeg(inputPath: string, outputPath: string): Promise<string>;
  }