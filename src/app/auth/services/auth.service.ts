import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User} from '../../model/user.model';
import {catchError} from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/login', {email, password})
      .pipe(
        catchError(error => {
          console.error(`Error: ${JSON.stringify(error)}`);
          return throwError(error);
        })
      );
  }
}
