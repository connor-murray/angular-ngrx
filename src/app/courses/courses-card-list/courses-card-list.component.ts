import {Component, Input} from '@angular/core';
import {Course} from '../model/course';
import {MatDialog} from '@angular/material';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent {

  @Input()
  courses: Course[];

  constructor(private dialog: MatDialog) {
  }

  editCourse(course: Course) {
    this.dialog.open(CourseDialogComponent, {autoFocus: true, disableClose: true, width: '400px', data: course});
  }
}
