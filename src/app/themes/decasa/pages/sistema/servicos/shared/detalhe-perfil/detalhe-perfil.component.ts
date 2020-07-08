import {ClienteOrcamento} from '../../../../../../../model/response/cliente-orcamento.module';
import {Component, OnInit, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {DialogRastrearComponent} from 'src/app/themes/decasa/blocos/dialog/dialog-rastrear/dialog-rastrear.component';
import {DialogAvaliacaoComponent} from '../../../../../blocos/dialog/dialog-avaliacao/dialog-avaliacao.component';
import {OrcamentoService} from '../../../../../../../services/orcamento.service';

@Component({
  selector: 'app-detalhe-perfil',
  templateUrl: './detalhe-perfil.component.html',
  styleUrls: ['./detalhe-perfil.component.css']
})
export class DetalhePerfilComponent implements OnInit {

  // 1 - Escolher | 2-Agendado | 3 - Andamento | Finalizados
  @Input() displayBtn;
  @Input() orcamentoSelected: ClienteOrcamento = new ClienteOrcamento();

  displayCertificados = false;
  displayPortifolio = false;
  displayComentario = false;
  displayFuncionarios = false;

  constructor(public dialog: MatDialog, private orcamentoService: OrcamentoService) {
  }

  confirmStart() {
    this.orcamentoService.confirmStart(this.orcamentoSelected.id).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openDialogRastrear() {
    this.dialog.open(DialogRastrearComponent, {
      width: '50%',
    });
  }

  ngOnInit(): void {
  }

  setDisplayCertificados() {
    this.displayCertificados = !this.displayCertificados;
  }

  setDisplayPortifolio() {
    this.displayPortifolio = !this.displayPortifolio;
  }

  setDisplayComentario() {
    this.displayComentario = !this.displayComentario;
  }

  setDisplayFuncionarios() {
    this.displayFuncionarios = !this.displayFuncionarios;
  }

  openDialogAvaliacao(p) {
    this.dialog.open(DialogAvaliacaoComponent, {
      width: '50%',
      data: {orcamento: this.orcamentoSelected, prestador: p}
    });
  }
}
