import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Enrollment } from '../models/enrollment';
import { EnrollmentsService } from '../services/enrollments.service';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuardGraphQL } from 'src/http/auth/authorization_graphql.guard';
import { StudentsService } from '../services/students.service';
import { CoursesService } from '../services/courses.service';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
  ) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuardGraphQL)
  enrollments() {
    return this.enrollmentsService.listAllEnrollments();
  }

  @ResolveField()
  student(@Parent() enrollment: Enrollment) {
    return this.studentsService.getStudentById(enrollment.studentId);
  }

  @ResolveField()
  course(@Parent() enrollment: Enrollment) {
    return this.coursesService.getCourseById(enrollment.courseId);
  }
}
