import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
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
    switchMap(action => this.coursesService.findCourseById(action.courseId).pipe(
      map(course => new CourseLoadedAction(course))
    ))
  );

  @Effect()
  loadAllCourses$ = this.actions$
    .pipe(
      ofType<AllCoursesRequested>(CourseActionTypes.AllCoursesRequested),
      withLatestFrom(this.store.pipe(select(selectTotalCourses))),
      filter(([action, totalCourses]) => totalCourses === 0),
      switchMap(() => this.coursesService.findAllCourses().pipe(
        map(courses => new AllCoursesLoaded(courses))
      ))
    );

  constructor(private actions$: Actions, private coursesService: CoursesService, private store: Store<AppState>) {
  }
}
