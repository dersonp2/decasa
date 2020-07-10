import {Component, Input, OnInit} from '@angular/core';
import {ServicosOrcamento} from '../../../../../../model/servico-orcamento.module';
import {ClienteOrcamento} from '../../../../../../model/response/cliente-orcamento.module';
import {ServicoOrcamentoResponse} from '../../../../../../model/response/servico-orcamento-response.module';

export interface PeriodicElement {
  name: string;
  uni: string;
  qntd: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Ticket Passeio', uni: 'km', qntd: ''},
  {name: 'City Tour Personal 08h - Veículo Sedan', uni: 'km', qntd: ''},
  {name: '4 horas de City Tour Personal - Veículo Passeio', uni: 'km', qntd: ''},
];

@Component({
  selector: 'app-tabela-servicos',
  templateUrl: './tabela-servicos.component.html',
  styleUrls: ['./tabela-servicos.component.css']
})
export class TabelaServicosComponent implements OnInit {

  value = 'Clear me';
  displayedColumns: string[] = ['descricao', 'qntd', 'unidade'];
  dataSource: ServicoOrcamentoResponse[];
  @Input() orcamento;

  ngOnInit(): void {
    this.dataSource = this.orcamento.servicosOrcamentos;
    console.log(JSON.stringify(this.orcamento));
  }
  onSearchChange(qnt: number, servico: ServicosOrcamento): void {
    console.log(qnt);
    console.log(servico);
  }
}
