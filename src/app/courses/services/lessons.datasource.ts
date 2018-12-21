import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable, BehaviorSubject, of, Subject} from 'rxjs';
import {Lesson} from '../model/lesson';
import {catchError, takeUntil, tap} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {Page} from '../model/page';
import {selectLessonsPage} from '../state/lesson/lesson.selectors';
import {LessonsPageRequestedAction} from '../state/lesson/lesson.actions';

export class LessonsDataSource implements DataSource<Lesson> {

  private lessonsSubject = new BehaviorSubject<Lesson[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private destroy$ = new Subject();

  constructor(private store: Store<AppState>) {
  }

  loadLessons(courseId: number, page: Page) {
    this.store.pipe(
      select(selectLessonsPage(courseId, page)),
      tap((lessons: void | Lesson[]) => {
        lessons && lessons.length > 0 ? this.lessonsSubject.next(lessons) :
          this.store.dispatch(new LessonsPageRequestedAction(courseId, page));
      }),
      takeUntil(this.destroy$),
      catchError(() => of([]))
    ).subscribe();
  }

  connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
    return this.lessonsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.lessonsSubject.complete();
    this.loadingSubject.complete();
  }
}
