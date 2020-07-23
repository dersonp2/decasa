import {DialogCartaoComponent} from '../../../../blocos/dialog/dialog-cartao/dialog-cartao.component';
import {DialogCreditoComponent} from '../../../../blocos/dialog/dialog-credito/dialog-credito.component';
import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogComprovanteComponent} from '../../../../blocos/dialog/dialog-comprovante/dialog-comprovante.component';
import {AuthService} from '../../../../../../services/auth.service';
import {DialogLoginComponent} from '../../../../blocos/dialog/dialog-login/dialog-login.component';

@Component({
  selector: 'app-meio-de-pagamento',
  templateUrl: './meio-de-pagamento.component.html',
  styleUrls: ['./meio-de-pagamento.component.css']
})
export class MeioDePagamentoComponent implements OnInit {

  constructor(public dialog: MatDialog, private  authService: AuthService) {
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

  openDialogCartao() {
    this.dialog.open(DialogCartaoComponent, {
      width: '50%',
      data: {cadastrar: 1} // Abrir diretamente na tela de cadastrado
    });
  }

  openDialogComprovante() {
    this.dialog.open(DialogComprovanteComponent, {
      width: '50%',
    });
  }

  openDialogCredito() {
    this.dialog.open(DialogCreditoComponent, {
      width: '50%',
    });
  }


}
