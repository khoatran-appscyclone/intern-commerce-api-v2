// csv.service.ts

import { Injectable } from '@nestjs/common';
import { createObjectCsvWriter } from 'csv-writer';
// import * as fs from 'fs';

@Injectable()
export class CsvService {
  async exportToCsv(data: any[], filePath: string) {
    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: Object.keys(data[0]).map((key) => ({ id: key, title: key })),
    });

    await csvWriter.writeRecords(data);
  }
}
