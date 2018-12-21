import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AuthService} from '../services/auth.service';
import {tap} from 'rxjs/operators';
import {noop} from 'rxjs';
import {Router} from '@angular/router';
import {AppState} from '../../reducers';
import {LoginAction} from '../state/auth.actions';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({email: ['test', [Validators.required]], password: ['test', [Validators.required]]});
  }

  login() {
    this.authService.login(this.form.value.email, this.form.value.password)
      .pipe(
        tap(user => {
          this.store.dispatch(new LoginAction(user));
          this.router.navigateByUrl('/courses');
        })
      ).subscribe(
      noop,
      () => alert(`Login Failed`)
    );
  }
}
