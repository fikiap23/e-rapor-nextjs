import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubjectDto } from './dto/subject.dto';

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.subject.findMany();
  }

  async findOne(id: string) {
    return this.prisma.subject.findUnique({
      where: {
        id,
      },
    });
  }

  async create(dto: CreateSubjectDto) {
    return this.prisma.subject.create({
      data: {
        name: dto.name,
        shortName: dto.shortName,
        code: dto.code,
      },
    });
  }
}
