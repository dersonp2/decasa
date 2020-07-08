import {MunicipioService} from './../../../../../../services/municipio.service';
import {Municipio} from './../../../../../../model/municipio.module';
import {element} from 'protractor';
import {ClienteOrcamento} from './../../../../../../model/response/cliente-orcamento.module';
import {OrcamentoService} from './../../../../../../services/orcamento.service';
import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../../../../../../services/auth.service';
import {OrcamentoEvent} from '../../../../../../events/orcamento-event';
import {MatDialog} from '@angular/material/dialog';
import {DialogLoginComponent} from '../../../../blocos/dialog/dialog-login/dialog-login.component';

export interface PeriodicElement {
  pedido: string;
}

export class Pedido {
  pedido: string;

  constructor(pedido) {
    this.pedido = pedido;
  }
}

@Component({
  selector: 'app-selecionar-fornecedor',
  templateUrl: './selecionar-fornecedor.component.html',
  styleUrls: ['./selecionar-fornecedor.component.css']
})
export class SelecionarFornecedorComponent implements OnInit {

  displayedColumns: string[] = ['pedidos'];
  dataSource = new MatTableDataSource<Pedido>();
  clienteOrcamento: ClienteOrcamento[];
  pedidos: Pedido[] = [];
  municipio: Municipio;
  orcamentoSelected: ClienteOrcamento = new ClienteOrcamento();

  constructor(private orcamentoService: OrcamentoService, private municipioService: MunicipioService,
              private authService: AuthService, private orcamentoEvent: OrcamentoEvent, public dialog: MatDialog) {
    orcamentoEvent.escolher$.subscribe(
      (data: ClienteOrcamento) => {
        (this.orcamentoSelected = data);
        console.log(this.orcamentoSelected);
      }
    );
  }

  ngOnInit(): void {
    if (!this.authService.check()) {
      this.openModal();
    } else {
      this.buscarMunicipio();
      this.getOrcamentosPendentes();
    }
  }

  buscarMunicipio() {
    const municipioId = localStorage.getItem('municipioId');
    this.municipioService.buscarMunicipioPorId(municipioId).subscribe(
      (data) => {
        this.municipio = data;
      },
      (error) => (console.log(error))
    );
  }

  getOrcamentosPendentes() {
    this.orcamentoService.buscarClienteOrcamentosEscolher(this.authService.getUser().id).subscribe(
      (data) => {
        this.clienteOrcamento = data;
        this.setPedidos();
      }
    );
  }

  setPedidos() {
    console.info(this.clienteOrcamento);
    this.clienteOrcamento.forEach(e => {
      const pedido = `BRA${e.id}${e.cidade.substring(0, 3)}`;
      this.pedidos.push(new Pedido(pedido));
    });
    this.dataSource.data = this.pedidos;
    console.log(this.pedidos);
  }

  // Abre a dialog de login
  openModal() {
    const dialogRef = this.dialog.open(DialogLoginComponent, {
      disableClose: true
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
