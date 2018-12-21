import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Page} from '../../model/page';
import * as fromLessons from '../lesson/lessons.reducer';
import {LessonsState} from './lessons.reducer';

export const selectLessonsState = createFeatureSelector<LessonsState>('lessons');
export const selectAllLessons = createSelector(selectLessonsState, fromLessons.selectAll);
export const selectLessonsLoading = createSelector(selectLessonsState, lessonsState => lessonsState.loading);
export const selectLessonsPage = (courseId: number, page: Page) => createSelector(selectAllLessons, allLessons => {
  const start: number = page.pageIndex * page.pageSize;
  const end: number = start + page.pageSize;
  return allLessons.filter(lesson => lesson.courseId === courseId).slice(start, end);
});
