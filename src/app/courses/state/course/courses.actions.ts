import {Action} from '@ngrx/store';
import {Course} from '../../model/course';
import {Update} from '@ngrx/entity';

export enum CourseActionTypes {
  CourseRequested = '[View Course Page] Course Requested',
  CourseLoaded = '[Courses API] Course Loaded',
  AllCoursesRequested = '[Course Home Page] All Courses Requested',
  AllCoursesLoaded = '[Courses API] All Courses Loaded',
  CourseSaved = '[Edit Course Dialog] Course Saved Action'
}

export class CourseRequestedAction implements Action {
  readonly type = CourseActionTypes.CourseRequested;

  constructor(public courseId: number) {
  }
}

export class CourseLoadedAction implements Action {
  readonly type = CourseActionTypes.CourseLoaded;

  constructor(public course: Course) {
  }
}

export class AllCoursesRequested implements Action {
  readonly type = CourseActionTypes.AllCoursesRequested;
}

export class AllCoursesLoaded implements Action {
  readonly type = CourseActionTypes.AllCoursesLoaded;

  constructor(public courses: Course[]) {
  }
}

export class CourseSaved implements Action {
  readonly type = CourseActionTypes.CourseSaved;

  constructor(public course: Update<Course>) {
  }
}

export type CourseActions =
  CourseRequestedAction
  | CourseLoadedAction
  | AllCoursesRequested
  | AllCoursesLoaded
  | CourseSaved;
