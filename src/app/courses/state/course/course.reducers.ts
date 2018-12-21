import {CourseActions, CourseActionTypes} from './courses.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Course} from '../../model/course';

export interface CoursesState extends EntityState<Course> {
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialCoursesState: CoursesState = adapter.getInitialState();

export function coursesReducer(state = initialCoursesState, action: CourseActions): CoursesState {
  switch (action.type) {
    case CourseActionTypes.CourseLoaded:
      return adapter.addOne(action.course, state);
    case CourseActionTypes.AllCoursesLoaded:
      return adapter.addAll(action.courses, state);
    case CourseActionTypes.CourseSaved:
      return adapter.updateOne(action.course, state);
    default:
      return state;
  }
}

export const {selectAll, selectTotal} = adapter.getSelectors();
