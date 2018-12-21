import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {CoursesService} from '../../services/courses.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import {of} from 'rxjs';
import {LessonActionTypes, LessonsPageCancelledAction, LessonsPageLoadedAction, LessonsPageRequestedAction} from './lesson.actions';

@Injectable()
export class LessonEffects {

  @Effect()
  loadLessons$ = this.actions$.pipe(
    ofType<LessonsPageRequestedAction>(LessonActionTypes.LessonsPageRequested),
    mergeMap(action => this.coursesService.findLessons(action.courseId, action.page.pageIndex, action.page.pageSize)
      .pipe(
        catchError(error => {
          console.log(`Error occurred loading lessons: ${error}`);
          this.store.dispatch(new LessonsPageCancelledAction());
          return of([]);
        }),
      )),
    map(lessons => new LessonsPageLoadedAction(lessons))
  );

  constructor(private actions$: Actions, private coursesService: CoursesService, private store: Store<AppState>) {
  }
}
