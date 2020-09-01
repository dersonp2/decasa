import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from './../../../../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.css']
})
export class DialogLoginComponent implements OnInit {

  email: string;
  senha: string;
  loginForm: FormGroup;
  invalido = true;

  constructor(public authService: AuthService, private router: Router, private fb: FormBuilder, public dialogRef: MatDialogRef<DialogLoginComponent>) {
    this.loginForm = fb.group(
      {
        email: ['', [Validators.email, Validators.required]],
        senha: ['', [Validators.required, Validators.minLength(5)]]
      }
    );
  }

  ngOnInit(): void {
  }

  fazerLogin() {
    // this.senha
    this.authService.login(this.loginForm.value).subscribe(
      (resp) => {
        localStorage.setItem('user', btoa(JSON.stringify(resp)));
        this.invalido = true;
        this.dialogRef.close();
        window.location.reload();
      },
      (error) => {
        console.log('Deu erro' + error);
        this.invalido = false;
      }
    );
  }

  criarConta() {
    this.dialogRef.close();
    this.router.navigate(['/criar-conta/cliente']);
  }
}
