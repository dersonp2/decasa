import {Component, OnInit} from '@angular/core';
import {ClienteService} from '../../../../../../../services/cliente.service';
import {AuthService} from '../../../../../../../services/auth.service';
import {MatDialog} from "@angular/material/dialog";
import {DialogLoginComponent} from "../../../../../blocos/dialog/dialog-login/dialog-login.component";

@Component({
  selector: 'app-dados-cadastrais',
  templateUrl: './dados-cadastrais.component.html',
  styleUrls: ['./dados-cadastrais.component.css']
})
export class DadosCadastraisComponent implements OnInit {

  public phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  cnpjMask = [/[1-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  constructor(private clienteService: ClienteService, private authService: AuthService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (!this.authService.check()) {
      this.openModal();
    } else {
      this.getCompany();
    }
  }

  // Abre a dialog de login
  openModal() {
    const dialogRef = this.dialog.open(DialogLoginComponent, {
      disableClose: true
    });
  }

  getCompany() {
    this.clienteService.getClienteEmpresaDetalhes(this.authService.getUser().id).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
