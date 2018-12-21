import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Course} from '../model/course';
import {CoursesService} from '../services/courses.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {CourseSaved} from '../state/course/courses.actions';
import {Update} from '@ngrx/entity';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent {

  form: FormGroup;

  constructor(private coursesService: CoursesService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<CourseDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public course: Course, private store: Store<AppState>) {

    this.form = formBuilder.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      longDescription: [course.longDescription, Validators.required],
      promo: [course.promo, []]
    });
  }

  save() {
    const changes = this.form.value;
    this.coursesService.saveCourse(this.course.id, changes)
      .subscribe(
        () => {
          const course: Update<Course> = {id: this.course.id, changes};
          this.store.dispatch(new CourseSaved(course));
          this.dialogRef.close();
        }
      );
  }

  close() {
    this.dialogRef.close();
  }
}
