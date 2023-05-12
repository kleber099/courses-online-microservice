import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface GetByCoursesAndStudentsIdParams {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  listAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: { canceledAt: null },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  listEnrollmentsByStudent(studentId) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  getByCoursesAndStudentId({
    courseId,
    studentId,
  }: GetByCoursesAndStudentsIdParams) {
    return this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null,
      },
    });
  }
}
