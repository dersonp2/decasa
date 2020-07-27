import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogLoginComponent} from '../../../blocos/dialog/dialog-login/dialog-login.component';

export interface PeriodicElement {
  mes: string;
  total: string;
  valorPago: string;
  valorPagar: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {mes: 'jan/2020', total: 'R$ 99.000,00', valorPago: '95.000,00', valorPagar: 'R$ 3.000,00', status: 'OK'},
  {mes: 'fev/2020', total: 'R$ 99.000,00', valorPago: '95.000,00', valorPagar: 'R$ 3.000,00', status: 'Pend'},
  {mes: 'mar/2020', total: '', valorPago: '', valorPagar: '', status: ''},
  {mes: 'abr/2020', total: '', valorPago: '', valorPagar: '', status: ''},
  {mes: 'maio/2020', total: '', valorPago: '', valorPagar: '', status: ''},
  {mes: 'jun/2020', total: '', valorPago: '', valorPagar: '', status: ''},
  {mes: 'jul/2020', total: '', valorPago: '', valorPagar: '', status: ''},
  {mes: 'ago/2020', total: '', valorPago: '', valorPagar: '', status: ''},
  {mes: 'set/2020', total: '', valorPago: '', valorPagar: '', status: ''},
  {mes: 'out/2020', total: '', valorPago: '', valorPagar: '', status: ''},
  {mes: 'nov/2020', total: '', valorPago: '', valorPagar: '', status: ''},
  {mes: 'dez/2020', total: '', valorPago: '', valorPagar: '', status: ''},
];

@Component({
  selector: 'app-boletos-notas',
  templateUrl: './boletos-notas.component.html',
  styleUrls: ['./boletos-notas.component.css']
})
export class BoletosNotasComponent implements OnInit {

  displayedColumns: string[] = ['mes', 'total', 'valorPago', 'valorPagar', 'status', 'nfe', 'extrato'];
  dataSource = ELEMENT_DATA;

  constructor(private authService: AuthService, public dialog: MatDialog) {
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
