import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ApiConsumes, ApiOperation, ApiBody, ApiTags } from '@nestjs/swagger';
import { getFilePath } from 'src/shared/utils/getFilePath';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({ summary: 'Upload a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post()
  @UseInterceptors(FileInterceptor('file', UploadService.getMulterOptions()))
  uploadFile(@UploadedFile() file) {
    if (!file) {
      throw new HttpException('File upload failed!', HttpStatus.BAD_REQUEST);
    }
    return {
      message: 'File uploaded successfully!',
      filePath: getFilePath(file.filename),
    };
  }
}
