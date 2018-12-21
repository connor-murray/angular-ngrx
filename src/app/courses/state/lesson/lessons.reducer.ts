import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Lesson} from '../../model/lesson';
import {LessonActions, LessonActionTypes} from './lesson.actions';

export interface LessonsState extends EntityState<Lesson> {
  loading: boolean;
}

function sortByCourseAndSeqNo(lessonOne: Lesson, lessonTwo: Lesson): number {
  const courseIdComparison: number = lessonOne.courseId - lessonTwo.courseId;
  return courseIdComparison !== 0 ? courseIdComparison : lessonOne.seqNo - lessonTwo.seqNo;
}

export const adapter: EntityAdapter<Lesson> = createEntityAdapter<Lesson>({sortComparer: sortByCourseAndSeqNo});

export const initialLessonsState: LessonsState = adapter.getInitialState({loading: false});

export function lessonsReducer(state = initialLessonsState, action: LessonActions): LessonsState {
  switch (action.type) {
    case LessonActionTypes.LessonsPageRequested:
      return {...state, loading: true};
    case LessonActionTypes.LessonsPageLoaded:
      return adapter.addMany(action.lessons, {...state, loading: false});
    case LessonActionTypes.LessonsPageCancelled:
      return {...state, loading: false};
    default:
      return state;
  }
}

export const {selectAll} = adapter.getSelectors();
