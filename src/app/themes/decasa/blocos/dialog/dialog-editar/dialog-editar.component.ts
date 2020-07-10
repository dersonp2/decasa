import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ClienteOrcamento} from '../../../../../model/response/cliente-orcamento.module';

@Component({
  selector: 'app-dialog-editar',
  templateUrl: './dialog-editar.component.html',
  styleUrls: ['./dialog-editar.component.css']
})
export class DialogEditarComponent  {

  novoServico = false;
  orcamento: ClienteOrcamento;
  showNovoServico() {
    this.novoServico = !this.novoServico;
  }
  constructor(public dialogRef: MatDialogRef<DialogEditarComponent>, @Inject(MAT_DIALOG_DATA) public data) {
    this.orcamento = data;
  }

  close(): void {
    this.dialogRef.close();
  }

}
