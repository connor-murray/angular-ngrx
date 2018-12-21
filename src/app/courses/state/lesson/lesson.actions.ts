import {Action} from '@ngrx/store';
import {Lesson} from '../../model/lesson';
import {Page} from '../../model/page';

export enum LessonActionTypes {
  LessonsPageRequested = '[Course Landing Page] Lessons Page Requested',
  LessonsPageLoaded = '[Courses API] Lessons Page Loaded',
  LessonsPageCancelled = '[Courses API] Lessons Page Cancelled'
}

export class LessonsPageRequestedAction implements Action {
  readonly type = LessonActionTypes.LessonsPageRequested;

  constructor(public courseId: number, public page: Page) {
  }
}

export class LessonsPageLoadedAction implements Action {
  readonly type = LessonActionTypes.LessonsPageLoaded;

  constructor(public lessons: Lesson[]) {
  }
}

export class LessonsPageCancelledAction implements Action {
  readonly type = LessonActionTypes.LessonsPageCancelled;
}

export type LessonActions =
  LessonsPageRequestedAction
  | LessonsPageLoadedAction
  | LessonsPageCancelledAction;
