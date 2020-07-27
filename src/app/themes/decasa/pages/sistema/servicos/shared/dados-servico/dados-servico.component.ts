import {ClienteOrcamento} from '../../../../../../../model/response/cliente-orcamento.module';
import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {DialogAnexarComponent} from '../../../../../blocos/dialog/dialog-anexar/dialog-anexar.component';
import {DialogCancelarComponent} from 'src/app/themes/decasa/blocos/dialog/dialog-cancelar/dialog-cancelar.component';
import {DialogRescindirComponent} from '../../../../../blocos/dialog/dialog-rescindir/dialog-rescindir.component';
import {DialogReagendarComponent} from '../../../../../blocos/dialog/dialog-reagendar/dialog-reagendar.component';
import {DialogMembrosComponent} from '../../../../../blocos/dialog/dialog-membros/dialog-membros.component';
import {DialogEditarComponent} from '../../../../../blocos/dialog/dialog-editar/dialog-editar.component';
import {DialogAvaliacaoComponent} from '../../../../../blocos/dialog/dialog-avaliacao/dialog-avaliacao.component';
import {OrcamentoService} from '../../../../../../../services/orcamento.service';

@Component({
  selector: 'app-dados-servico',
  templateUrl: './dados-servico.component.html',
  styleUrls: ['./dados-servico.component.css']
})
export class DadosServicoComponent implements OnInit {

  // 1- Excolher | 3- Agendamento | 4 - Finalizar
  @Input() displayBtn;
  @Input() orcamentoSelected: ClienteOrcamento = new ClienteOrcamento();

  displayEmail = false;

  constructor(public dialog: MatDialog, private orcamentoService: OrcamentoService) {
  }

  ngOnInit(): void {
    console.log(this.orcamentoSelected);
  }

  downloadProposal() {
    this.orcamentoService.generateProposal(this.orcamentoSelected.id).subscribe(
      (data) => {
        console.log('Proposta gerada com sucesso');
        const file = new Blob([data], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      },
      (error) => {console.log(error); }
    );
  }

  openDialogMembros() {
    this.dialog.open(DialogMembrosComponent, {
      width: '50%',
    });
  }

  openDialogEditar() {
    this.dialog.open(DialogEditarComponent, {
      width: '100%',
      data: this.orcamentoSelected
    });
  }

  openDialogAnexar() {
    this.dialog.open(DialogAnexarComponent, {
      width: '50%',
      data: this.orcamentoSelected.id
    });
  }

  setDisplayEmail() {
    this.displayEmail = !this.displayEmail;
  }

  openDialogReagendar() {
    this.dialog.open(DialogReagendarComponent, {
      width: '50%',
      data: this.orcamentoSelected
    });
  }

  openDialogCancelar() {
    this.dialog.open(DialogCancelarComponent, {
      width: '50%',
      data: {budgetId: this.orcamentoSelected.id}
    });
  }

  openDialogRescindir() {
    this.dialog.open(DialogRescindirComponent, {
      width: '50%',
    });
  }

  openDialogAvaliacao() {
    this.dialog.open(DialogAvaliacaoComponent, {
      width: '50%',
      data: this.orcamentoSelected,
    });
  }
}
