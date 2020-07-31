import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../../../services/auth.service';
import {Router} from '@angular/router';
import {ClienteService} from '../../../../../../services/cliente.service';
import {Cliente} from '../../../../../../model/cliente.module';
import {TipoPessoa} from '../../../../../../model/tipo-pessoa.module';
import {Usuario} from '../../../../../../model/usuario.module';
import {Md5} from 'ts-md5';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  cadastroForm: FormGroup;
  invalido = true;
  erroMessage = null;

  constructor(private spinner: NgxSpinnerService, private clienteService: ClienteService, private router: Router, private fb: FormBuilder) {
    this.cadastroForm = fb.group(
      {
        nome: ['', [Validators.minLength(5), Validators.required]],
        email: ['', [Validators.email, Validators.required]],
        telefone: ['', [Validators.required]],
        senha: ['', [Validators.required, Validators.minLength(5)]],
        confirmaSenha: ['', [Validators.required, Validators.minLength(5)]],
        termos: ['', [Validators.required, Validators.minLength(5)]]
      }, {validator: this.checkPasswords});
  }

  ngOnInit(): void {
  }

  saveTest() {
    // TODO: rever isso com Pedro
    const cliente = new Cliente(null);
    cliente.nome = this.cadastroForm.value.nome;
    cliente.email = this.cadastroForm.value.email;
    cliente.telefone = this.cadastroForm.value.telefone;
    cliente.tipoPessoa = new TipoPessoa(1); // Pessoa fisíca

    const usuario = new Usuario();
    usuario.platformEnum = 1;
    usuario.email = this.cadastroForm.value.email;
    usuario.senha = new Md5().appendStr(this.cadastroForm.value.senha).end();


    cliente.usuario = usuario;
    this.spinner.show();
    this.clienteService.saveClient(cliente).subscribe(
      (data) => {
        console.log(data);
        if (data.id === 200) {
          this.spinner.hide();
          localStorage.setItem('user', btoa(JSON.stringify(data.cliente)));
          this.router.navigate(['/']);
        } else {
          this.erroMessage = data.message;
          this.spinner.hide();
        }
      },
      (error) => {
        console.log(error);
        this.erroMessage = error.message;
        this.spinner.hide();
      }
    );
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.senha.value;
    const confirmPass = group.controls.confirmaSenha.value;

    return pass === confirmPass ? null : {notSame: true};
  }

}
