import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as moment from 'moment';
import {Pagamento} from '../../../../../model/pagamento.module';
import {ClienteOrcamento} from '../../../../../model/response/cliente-orcamento.module';
import {OrcamentoService} from '../../../../../services/orcamento.service';

export class ReagendamentoAuxiliar {
  orcamentoId: number;
  dataReagendamento: string;
  pagamento: Pagamento;

  constructor(orcamentoid, idPagamento) {
    const p = new Pagamento();
    p.id = idPagamento;
    this.pagamento = p;
    this.orcamentoId = orcamentoid;
  }
}

@Component({
  selector: 'app-dialog-reagendar',
  templateUrl: './dialog-reagendar.component.html',
  styleUrls: ['./dialog-reagendar.component.css']
})
export class DialogReagendarComponent implements OnInit {

  // Data minima para o calendário
  minDate = new Date();
  public dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  date: any = null;
  time: any = null;
  reagendamento: ReagendamentoAuxiliar;
  private mensagem: string;
  result: string;
  showResult = false;
  load = false;

  constructor(public dialogRef: MatDialogRef<DialogReagendarComponent>, private orcamentoService: OrcamentoService, @Inject(MAT_DIALOG_DATA) public data) {
    this.reagendamento = new ReagendamentoAuxiliar(data.id, data.pagamento);
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

//  Data e hora
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.date = moment(event.value).format('DD/MM/YYYY');
    console.log(this.date);
  }

  onOpeningOrClosingTimeChanged(event) {
    this.time = event;
    console.log(this.time);
  }

  // solicita o reagendamento do orçamento
  reschedule() {

    if (this.date != null && this.time != null) {
      this.load = true;
      this.reagendamento.dataReagendamento = this.date + ' ' + this.time;
      this.orcamentoService.reschedule(this.reagendamento).subscribe(
        (data) => {
          console.log(data);
          this.result = data.nome;
          this.load = false;
          this.showResult = true;
        },
        (error) => {
          console.log(error);
          this.result = error.message;
          this.load = false;
          this.showResult = true;
        }
      );
    } else {
      this.mensagem = 'Preencha todos os campos';
    }
  }


}
