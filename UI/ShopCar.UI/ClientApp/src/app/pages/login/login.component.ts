import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, NotificationsService } from '../../shared/_services';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private notificationService: NotificationsService) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get getControls() { return this.form.controls; }

  login() {

    let username = this.getControls.username.value;
    let password = this.getControls.password.value;

    var user = {username, password};

    this.authService.login(user)
      .pipe(catchError((error)=>{
         this.notificationService.onWarning(error.error)
        return Observable.create();
      }))
      .subscribe(
        data => {
          this.router.navigate(['']);
        }
      );
  }
}