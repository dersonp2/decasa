import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Md5} from 'ts-md5';
import {Usuario} from '../../../../../../../model/usuario.module';
import {AuthService} from '../../../../../../../services/auth.service';
import {ClienteService} from '../../../../../../../services/cliente.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogLoginComponent} from '../../../../../blocos/dialog/dialog-login/dialog-login.component';
import {MatDialog} from '@angular/material/dialog';

// Validação da senha
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}


@Component({
  selector: 'app-senha',
  templateUrl: './senha.component.html',
  styleUrls: ['./senha.component.css']
})
export class SenhaComponent implements OnInit {

  myForm: FormGroup;
  user: Usuario;
  matcher = new MyErrorStateMatcher();
  loading = false;

  // tslint:disable-next-line:variable-name
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private authService: AuthService, private _snackBar: MatSnackBar, private clienteService: ClienteService) {
    this.myForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, {validator: this.checkPasswords});

  }

  ngOnInit(): void {
    if (!this.authService.check()) {
      this.openModal();
    }
  }

  // Abre a dialog de login
  openModal() {
    const dialogRef = this.dialog.open(DialogLoginComponent, {
      disableClose: true
    });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : {notSame: true};
  }

  alterPassword() {
    this.loading = true;
    // TODO: alterar o getUser
    const cliente = this.authService.getUser();
    const user = new Usuario();
    user.email = cliente.email;
    user.senha = new Md5().appendStr(this.myForm.get('password').value).end().toString();
    const oldPassword = new Md5().appendStr(this.myForm.get('oldPassword').value).end();
    console.log(oldPassword);
    console.log(user);

    this.clienteService.alterPassword(user, oldPassword).subscribe(
      (data) => {
        this.showSnackBar('Senha alterada com sucesso!!!', 'blue-snackbar');
        console.log(data);
        this.loading = false;
        this.myForm.reset();
      },
      (error) => {
        if (error.status === 406) {
          this.showSnackBar('Senha atual incorreta!!!', 'orange-snackbar');
        }
        this.loading = false;
      }
    );
  }

  showSnackBar(mensagem, cor) {
    this._snackBar.open(mensagem, '', {
        duration: 3000,
        panelClass: [cor]
      }
    );
  }
}
