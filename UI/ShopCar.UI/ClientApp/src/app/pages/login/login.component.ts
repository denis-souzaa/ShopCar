import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  get getControls() { return this.form.controls; }

  login() {

   
  let usuario = this.getControls.usuario.value;
  let senha = this.getControls.senha.value;

  console.log(usuario, senha)

    if(usuario === 'admin' && senha === '123'){
      this.authService.teste()
      this.router.navigate([''])
    }
    else{
      console.log('usuario senha invalido');
    }
  }
}