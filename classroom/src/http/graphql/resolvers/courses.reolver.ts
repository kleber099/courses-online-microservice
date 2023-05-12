import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Course } from '../models/course';
import { CoursesService } from '../services/courses.service';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthorizationGuardGraphQL } from 'src/http/auth/authorization_graphql.guard';
import { CreateCourseInput } from '../inputs/create-course-input';
import { StudentsService } from '../services/students.service';
import { EnrollmentsService } from '../services/enrollments.service';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuardGraphQL)
  courses() {
    return this.coursesService.listAllCourses();
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuardGraphQL)
  async course(@Args('id') id: string, @CurrentUser() user: AuthUser) {
    const student = await this.studentsService.getStudentMyAuthUserId(user.sub);

    if (!student) {
      throw new Error('Student not found');
    }

    const enrollment = await this.enrollmentsService.getByCoursesAndStudentId({
      courseId: id,
      studentId: student.id,
    });

    if (!enrollment) {
      throw new UnauthorizedException();
    }

    return this.coursesService.getCourseById(id);
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuardGraphQL)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.coursesService.createCourse(data);
  }
}
