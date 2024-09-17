import { NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export const textToAudioGetterUseCase = async (fileName: string) => {
  const audiosPath = path.resolve(__dirname, '../../../generated/audios/');
  const filePath = `${audiosPath}/${fileName}.mp3`;

  if (!fs.existsSync(filePath))
    throw new NotFoundException('The file name does not exists');

  return filePath;
};
