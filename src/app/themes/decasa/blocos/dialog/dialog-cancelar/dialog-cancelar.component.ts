import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogReagendarComponent} from '../dialog-reagendar/dialog-reagendar.component';
import {OrcamentoService} from '../../../../../services/orcamento.service';

@Component({
  selector: 'app-dialog-cancelar',
  templateUrl: './dialog-cancelar.component.html',
  styleUrls: ['./dialog-cancelar.component.css']
})
export class DialogCancelarComponent implements OnInit {
  // 1 - pergunta | 2 - Tem multa | 3 - Não pode cancelar OU erro no pagamento | 4 - Cancelamento com sucesso
  isFine = 1;
  cancel = false;
  erroMessage;

  constructor(public dialogRef: MatDialogRef<DialogCancelarComponent>, public dialog: MatDialog,
              private orcamentoServide: OrcamentoService, @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
    console.log(this.data.id);
  }

  close(): void {
    this.dialogRef.close();
  }

  openDialogReagendar() {
    this.close();
    this.dialog.open(DialogReagendarComponent, {
      width: '50%',
      data: this.data
    });
  }

  initialcancelBudget() {
    console.log(this.data);
    if (this.isFine === 1) {
      this.cancel = true;
      this.orcamentoServide.generateFine(this.data.id).subscribe(
        (data) => {
          console.log(data);
          switch (data.id) {
            case 1: // Cancelamento COM multa
              this.isFine = 2;
              this.cancel = false;
              break;
            case 2: // Cancelamento SEM multa
              this.cancelBuget(2);
              break;
            case 3: // Não foi possível realizar o cancelamento pois possui aditamento
              this.erroMessage = 'Não foi possível realizar o cancelamento pois possui aditamento';
              this.isFine = 3;
              this.cancel = false;
              break;
            case 200: // Orcamento não localizado
              this.erroMessage = 'Orçamento não localizado'; this.erroMessage = 'Erro interno';
              this.isFine = 3;
              this.cancel = false;
              break;
            case 500: // Erro interno
              this.erroMessage = 'Erro interno';
              this.isFine = 3;
              this.cancel = false;
              break;
          }
        },
        (error) => {
          this.erroMessage = 'Erro interno';
          this.isFine = 3;
          this.cancel = false;
          console.log(error);
        }
      );
    } else {
      // Cliente ciente da multa e deseja cancelar
      this.cancelBuget(1);
    }
  }

  cancelBuget(fineId) {
    console.log(this.data.id + ' ' + fineId);
    this.orcamentoServide.cancelBudget(1004, fineId).subscribe(
      (data) => {
        console.log(data);
        this.cancel = false;
        if (data.id === 500 || (data.id === 200 && data.nome === 'Ocorreu um erro no cancelamento do pagamento.')) {
          this.erroMessage = 'Ocorreu um erro no cancelamento do pagamento';
          this.isFine = 3;
        } else {
          this.isFine = 4;
        }
        console.log(this.data.id + ' ' + fineId);
      },
      (error) => {
        console.log(error);
        this.erroMessage = 'Erro interno';
        this.isFine = 3;
        this.cancel = false;
      }
    );
  }
}
