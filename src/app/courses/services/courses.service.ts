import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Course} from '../model/course';
import {catchError} from 'rxjs/operators';
import {Lesson} from '../model/lesson';

@Injectable()
export class CoursesService {

  constructor(private http: HttpClient) {
  }

  findCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`/api/courses/${courseId}`).pipe(
      catchError(this.handleError)
    );
  }

  findAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/courses')
      .pipe(
        catchError(this.handleError)
      );
  }

  findLessons(courseId: number, pageNumber = 0, pageSize = 3): Observable<Lesson[]> {
    return this.http.get<Lesson[]>('/api/lessons', {
      params: new HttpParams()
        .set('courseId', courseId.toString())
        .set('filter', '')
        .set('sortOrder', 'asc')
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    }).pipe(
      catchError(this.handleError)
    );
  }

  saveCourse(courseId: number, changes: Partial<Course>) {
    return this.http.put(`/api/courses/${courseId}`, changes).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error(`Error: ${JSON.stringify(error)}`);
    return throwError(error);
  }
}
