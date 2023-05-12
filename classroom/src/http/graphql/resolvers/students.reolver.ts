import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Student } from '../models/student';
import { StudentsService } from '../services/students.service';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuardGraphQL } from 'src/http/auth/authorization_graphql.guard';
import { EnrollmentsService } from '../services/enrollments.service';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => Student)
  @UseGuards(AuthorizationGuardGraphQL)
  me(@CurrentUser() user: AuthUser) {
    return this.studentsService.getStudentMyAuthUserId(user.sub);
  }

  @Query(() => [Student])
  @UseGuards(AuthorizationGuardGraphQL)
  students() {
    return this.studentsService.listAllStudents();
  }

  @ResolveField()
  enrollements(@Parent() student: Student) {
    return this.enrollmentsService.listEnrollmentsByStudent(student.id);
  }
}
