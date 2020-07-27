import { ClienteOrcamento } from '../../../../../../model/response/cliente-orcamento.module';
import { OrcamentoEvent } from './../../../../../../events/orcamento-event';
import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogLoginComponent} from '../../../../blocos/dialog/dialog-login/dialog-login.component';

@Component({
  selector: 'app-finalizados',
  templateUrl: './finalizados.component.html',
  styleUrls: ['./finalizados.component.css']
})
export class FinalizadosComponent implements OnInit {

  orcamentoSelected: ClienteOrcamento = new ClienteOrcamento();

  constructor(private orcamentoEvent: OrcamentoEvent, public authService: AuthService, public dialog: MatDialog) {
    orcamentoEvent.finalizado$.subscribe(
      (data: ClienteOrcamento) => { (this.orcamentoSelected = data);}
    );
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

}
