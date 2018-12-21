import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatPaginator} from '@angular/material';
import {Course} from '../model/course';
import {CoursesService} from '../services/courses.service';
import {takeUntil, tap} from 'rxjs/operators';
import {LessonsDataSource} from '../services/lessons.datasource';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {Observable, Subject} from 'rxjs';
import {selectLessonsLoading} from '../state/lesson/lesson.selectors';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit, AfterViewInit, OnDestroy {

  course: Course;
  dataSource: LessonsDataSource;
  displayedColumns = ['seqNo', 'description', 'duration'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  loading$: Observable<boolean>;
  private destroy$ = new Subject();

  constructor(private route: ActivatedRoute, private coursesService: CoursesService, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];
    this.dataSource = new LessonsDataSource(this.store);
    this.dataSource.loadLessons(this.course.id, {pageIndex: 0, pageSize: 3});
    this.loading$ = this.store.pipe(select(selectLessonsLoading));
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.dataSource.loadLessons(this.course.id, {pageIndex: this.paginator.pageIndex, pageSize: this.paginator.pageSize})),
        takeUntil(this.destroy$),
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
