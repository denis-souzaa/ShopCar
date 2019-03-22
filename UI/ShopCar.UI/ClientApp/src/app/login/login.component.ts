import { Component, OnInit }                   from '@angular/core';
import { FormBuilder, FormGroup, Validators }  from '@angular/forms';
import { Router }                              from '@angular/router';
import {catchError} from 'rxjs/operators';
import { AlertService, AuthenticationService } from '../shared/_services';
import {Observable} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  error = '';

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router,
    private alertService: AlertService) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get getValues() { return this.form.controls; }

  login() {
    this.submitted = true;

    const form = new FormData;

    form.append('grant_type', 'password');
    form.append('username', this.getValues.username.value);
    form.append('password', `${encodeURIComponent(this.getValues.password.value)}`);

    this.authService.login(form)
      .pipe(catchError((error)=>{
          this.alertService.error(error && error.description_error || 'Usuário ou Senha inválido.');
        return Observable.create();
      }))
      .subscribe(
        data => {
          this.router.navigate(['']);
        }
      );
  }
}
