import {ClienteService} from '../../../../../../../services/cliente.service';
import {Component, OnInit} from '@angular/core';
import {ClienteDetalhesResponse} from 'src/app/model/response/cliente-detalhes-response.module';
import {AuthService} from '../../../../../../../services/auth.service';
import {DialogLoginComponent} from '../../../../../blocos/dialog/dialog-login/dialog-login.component';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ValidateBrService } from 'angular-validate-br';


@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.css']
})
export class DadosPessoaisComponent implements OnInit {

  public dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  public phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cpfMask = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  disabled = true;
  cliente: ClienteDetalhesResponse = new ClienteDetalhesResponse();
  cadastroForm: FormGroup;


  constructor(private validateBrService: ValidateBrService, private fb: FormBuilder, private clienteService: ClienteService, public dialog: MatDialog, private  authService: AuthService) {
    this.cadastroForm = fb.group(
      {
        nome: ['', [Validators.minLength(5), Validators.required]],
        cpf: ['', [Validators.required, this.validateBrService.cpf]],
        email: ['', [Validators.email, Validators.required]],
        telefone: ['', [Validators.required]],
        dataNascimento: ['', [Validators.required, Validators.minLength(5)]]
      });
  }

  ngOnInit(): void {
    if (!this.authService.check()) {
      this.openModal();
    } else {
      this.getDadosCliente();
    }
  }

  // Abre a dialog de login
  openModal() {
    const dialogRef = this.dialog.open(DialogLoginComponent, {
      disableClose: true
    });
  }

  getDadosCliente() {
    this.clienteService.getClienteDetalhes(this.authService.getUser().id).subscribe(
      (data) => {
        this.cliente = data;
        console.log(this.cliente);
        this.cadastroForm.get('nome').setValue(data.nome);
        this.cadastroForm.get('email').setValue(data.email);
        this.cadastroForm.get('cpf').setValue(data.cpf);
        this.cadastroForm.get('telefone').setValue(data.telefone);
        this.cadastroForm.get('dataNascimento').setValue(data.dataNascimento);
      }
    );
  }

  save() {
    this.disabled = true;
    this.cliente = this.cadastroForm.value;
    console.log(this.cliente);
  }
}
