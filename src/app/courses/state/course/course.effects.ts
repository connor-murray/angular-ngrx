import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {filter, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {AllCoursesLoaded, AllCoursesRequested, CourseActionTypes, CourseLoadedAction, CourseRequestedAction} from './courses.actions';
import {CoursesService} from '../../services/courses.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import {selectTotalCourses} from './course.selectors';

@Injectable()
export class CourseEffects {

  @Effect()
  loadCourse$ = this.actions$.pipe(
    ofType<CourseRequestedAction>(CourseActionTypes.CourseRequested),
    mergeMap(action => this.coursesService.findCourseById(action.courseId)),
    map(course => new CourseLoadedAction(course))
  );

  @Effect()
  loadAllCourses$ = this.actions$
    .pipe(
      ofType<AllCoursesRequested>(CourseActionTypes.AllCoursesRequested),
      withLatestFrom(this.store.pipe(select(selectTotalCourses))),
      filter(([action, totalCourses]) => totalCourses === 0),
      mergeMap(() => this.coursesService.findAllCourses()),
      map(courses => new AllCoursesLoaded(courses))
    );

  constructor(private actions$: Actions, private coursesService: CoursesService, private store: Store<AppState>) {
  }
}
