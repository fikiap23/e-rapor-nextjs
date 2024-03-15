import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeacherDto, UpdateTeacherDto } from './dto/teacher.dto';
import * as bcrypt from 'bcrypt';
import { Prisma, Teacher } from '@prisma/client';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  async findAllTeacher() {
    return this.prisma.teacher.findMany();
  }

  async findOneTeacher(id: string) {
    return this.prisma.teacher.findUnique({
      where: {
        id,
      },
    });
  }

  async createTeacher(dto: CreateTeacherDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(dto.password, salt);
    return this.prisma.teacher.create({
      data: {
        name: dto.name,
        nuptk: dto.nuptk,
        email: dto.email,
        password: hash,
        avatar: dto.avatar,
      },
    });
  }

  async updateTeacher(id: string, dto: UpdateTeacherDto): Promise<Teacher> {
    try {
      const updatedTeacher = await this.prisma.teacher.update({
        where: { id },
        data: dto,
      });
      return updatedTeacher;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Teacher with id ${id} not found.`);
      }
      throw error;
    }
  }

  async deleteTeacher(id: string): Promise<void> {
    await this.prisma.teacher.delete({
      where: { id },
    });
  }
}
