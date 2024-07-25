import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class UploadService {
  static imageFileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(
        new HttpException(
          'Only image files are allowed!',
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
    callback(null, true);
  }

  static editFileName(req, file, callback) {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
  }

  static getMulterOptions() {
    return {
      storage: diskStorage({
        destination: './assets',
        filename: this.editFileName,
      }),
      fileFilter: this.imageFileFilter,
      limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
    };
  }
}
