import {Component, Inject, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OrcamentoService} from '../../../../../services/orcamento.service';

export interface Membros {
  n: string;
  data: string;
  descricao: string;
  prestador: string;
}
const ELEMENT_DATA: Membros[] = [
  {n: 'BRA15784UF', data: '21/01/2020', descricao: 'Serviço de instalação de ar-condicionado', prestador: '@joaoteimoso'},
  {n: 'BRA15785UF', data: '21/05/2020', descricao: 'Diária completa', prestador: '@leticiaclean'}
];

export class ServicoEndereco {
  id: number;
  dataEntrega: Date;
  nomeServico: string[];
  nomePrestador: string[];
}
@Component({
  selector: 'app-dialog-servicos',
  templateUrl: './dialog-servicos.component.html',
  styleUrls: ['./dialog-servicos.component.css']
})
export class DialogServicosComponent implements OnInit {

  displayedColumns: string[] = ['n', 'dt-entrega', 'descricao', 'prestador'];
  dataSource = new MatTableDataSource();

  constructor(public dialogRef: MatDialogRef<DialogServicosComponent>, @Inject(MAT_DIALOG_DATA) public data, private orcamentoService: OrcamentoService) { }

  ngOnInit(): void {
    console.log(this.data);
    this.orcamentoService.getServicesByAddress(this.data.client, this.data.address).subscribe(
      (data) => {console.log(data); this.dataSource.data = data; },
      (error) => { console.log(error); }
    );
  }

  close(): void {
    this.dialogRef.close();
  }


}
