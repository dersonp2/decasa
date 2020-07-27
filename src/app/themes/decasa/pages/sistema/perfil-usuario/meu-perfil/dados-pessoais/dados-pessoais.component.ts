import {ClienteService} from '../../../../../../../services/cliente.service';
import {Component, OnInit} from '@angular/core';
import {ClienteDetalhesResponse} from 'src/app/model/response/cliente-detalhes-response.module';
import {AuthService} from '../../../../../../../services/auth.service';
import {DialogLoginComponent} from '../../../../../blocos/dialog/dialog-login/dialog-login.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.css']
})
export class DadosPessoaisComponent implements OnInit {

  public dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  public phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cpfMask = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];

  cliente: ClienteDetalhesResponse = new ClienteDetalhesResponse();

  constructor(private clienteService: ClienteService, public dialog: MatDialog, private  authService: AuthService) {
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
      }
    );
  }

}
