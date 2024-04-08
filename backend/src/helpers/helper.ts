import { BadRequestException } from "@nestjs/common";
import { createWriteStream, mkdirSync, unlink } from 'fs';
import { Readable } from 'stream';
import * as path from 'path';
import { extname } from 'path';

export enum RoleEnum {
  ADMIN = 'ADMIN',
  GURU = 'GURU',
}

export enum TokenType {
  FULL = 'FULL',
  BRANCH = 'BRANCH',
  OTP = 'OTP',
}

export enum kelompokUsiaEnum {
  DUA_TIGA_TAHUN = '2-3 TAHUN',
  TIGA_EMPAT_TAHUN = '3-4 TAHUN',
  LIMA_ENAM_TAHUN = '5-6 TAHUN',
}

export const _validateFile = (
  name: string,
  file: Express.Multer.File,
  type: string[],
  size: number,
) => {
  // check if file is exist
  if (!file) throw new BadRequestException(`Upload file ${name} anda`);

  // get property from file
  let ext = path.extname(file.originalname);
  let fileSize = 1024 * 1024 * size;

  // check ext file allow
  if (!type.includes(ext))
    throw new BadRequestException('Jenis file tidak didukung');

  // check if file size is allow
  if (file.size > fileSize)
    throw new BadRequestException('Ukuran file melebihi batas yang ditentukan');

  return;
};

export const getFilename = (type: string, file?: Express.Multer.File) => {
  let fileName: string;
  if (file) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    fileName = `${uniqueSuffix}${ext}`;
  }
  if (type == 'MURID') {
    fileName = `foto_murid_${fileName}`
  } else if (type == 'GURU') {
    fileName = `foto_guru_${fileName}`
  }

  return fileName;
};

export const getCustomFilename = (name: string, file?: Express.Multer.File) => {
  let fileName: string;
  if (file) {
    const ext = extname(file.originalname);
    fileName = `${name}${ext}`;
  }
  return fileName;
};

export const createFileImageHelper = async (imageFile, writePath, fileName) => {
  // create directory if not exists
  mkdirSync(writePath, { recursive: true });

  // write stream and waiting process
  const is = Readable.from(imageFile.buffer);
  const os = createWriteStream(`${writePath}/${fileName}`);
  is.pipe(os);

  return 'success';
};


export const deleteFileImageHelper = async (deletePath, fileName) => {
  try {
    await new Promise((resolve, reject) => {
      unlink(`${deletePath}/${fileName}`, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve('success');
        }
      });
    });
    return 'success';
  } catch (error) {
    throw new Error(error);
  }
};