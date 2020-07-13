import {Component, Input, OnInit} from '@angular/core';
import {ServicosOrcamento} from '../../../../../../model/servico-orcamento.module';
import {ServicoOrcamentoResponse} from '../../../../../../model/response/servico-orcamento-response.module';
import {CarrinhoEvent} from '../../../../../../events/carrinho-event';
import {Servico} from '../../../../../../model/servico.module';
import {ServicoResponse} from '../../../../../../model/response/servico-response.module';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-tabela-servicos',
  templateUrl: './tabela-servicos.component.html',
  styleUrls: ['./tabela-servicos.component.css']
})
export class TabelaServicosComponent implements OnInit {

  total: number;
  displayedColumns: string[] = ['descricao', 'qntd', 'unidade', 'delete'];
  dataSource = new MatTableDataSource();
  @Input() orcamento;

  constructor(private carrinhoEvento: CarrinhoEvent) {
    carrinhoEvento.addService$.subscribe(
      (data: Servico) => {
        this.insertService(data);
      }
    );
  }

  ngOnInit(): void {
    // Preenche com os serviços já comprado
    this.dataSource.data = this.orcamento.servicosOrcamentos;
    // console.log(this.dataSource.data);
    this.calculateTotal();
  }

  onSearchChange(qnt: number, servico: ServicosOrcamento): void {
    console.log(qnt);
    console.log(servico);
  }

  insertService(service: Servico) {
    const servico = new ServicoResponse();
    servico.id = service.id;
    servico.composicao = service.composicao;
    servico.valor = service.valor;
    servico.descricao = service.descricao;
    servico.nomeArquivo = service.nomeImagem;

    const servicoOrcamentoResponse = new ServicoOrcamentoResponse();
    servicoOrcamentoResponse.quantidade = 1;
    servicoOrcamentoResponse.servico = servico;
    servicoOrcamentoResponse.unidadeMedida = service.unidadeMedida;
    servicoOrcamentoResponse.valor = service.valor;

    const servicoOrcamentos = this.dataSource.data;
    servicoOrcamentos.push(servicoOrcamentoResponse);
    this.dataSource.data = servicoOrcamentos;
    this.calculateTotal();

  }

  deleteFunction(item) {
    // find item and remove list
    const servicoOrcamentos = this.dataSource.data;
    servicoOrcamentos.splice(servicoOrcamentos.indexOf(item), 1);
    this.dataSource.data = servicoOrcamentos;
    this.calculateTotal();
  }

  calculateTotal() {
    // Calcula o total dos serviços a serem contratados
    this.total = 0;
    this.dataSource.data.forEach(servico => {
      // @ts-ignore
      if (!servico.id) {
        // @ts-ignore
        this.total += servico.valor;
        // @ts-ignore
        console.log(servico);
      }
    });
    console.log(this.total);
  }
}
