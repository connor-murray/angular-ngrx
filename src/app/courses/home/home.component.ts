import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {Observable} from 'rxjs';
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {selectAdvancedCourses, selectBeginnerCourses, selectPromoTotal} from '../state/course/course.selectors';
import {AllCoursesRequested} from '../state/course/courses.actions';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  promoTotal$: Observable<number>;
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new AllCoursesRequested());
    this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));
    this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses));
    this.promoTotal$ = this.store.pipe(select(selectPromoTotal));
  }
}
