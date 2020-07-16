import {Component, Input, OnInit} from '@angular/core';
import {ServicosOrcamento} from '../../../../../../model/servico-orcamento.module';
import {ServicoOrcamentoResponse} from '../../../../../../model/response/servico-orcamento-response.module';
import {CarrinhoEvent} from '../../../../../../events/carrinho-event';
import {Servico} from '../../../../../../model/servico.module';
import {ServicoResponse} from '../../../../../../model/response/servico-response.module';
import {MatTableDataSource} from '@angular/material/table';
import {CartaoCliente} from '../../../../../../model/cartao-cliente.module';
import {Orcamento} from '../../../../../../model/orcamento.module';
import {DialogCartaoComponent} from '../../dialog-cartao/dialog-cartao.component';
import {CartaoClienteService} from '../../../../../../services/cartao-cliente.service';
import {AuthService} from '../../../../../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {Pagamento} from '../../../../../../model/pagamento.module';
import {FormaPagamento} from '../../../../../../model/forma-pagamento.module';
import {Financeira} from '../../../../../../model/financeira.module';
import {ClienteOrcamento} from '../../../../../../model/response/cliente-orcamento.module';
import {OrcamentoService} from '../../../../../../services/orcamento.service';

export class AditamentoAuxiliar {
  pagamento: Pagamento;
  servicos: ServicosOrcamento[];

  constructor(pagamento, servico) {
    this.pagamento = pagamento;
    this.servicos = servico;
  }
}

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
  // Pagamento
  cartao: CartaoCliente = new CartaoCliente();
  cvc = null;
  showPay = false;

  constructor(private orcamentoService: OrcamentoService, private carrinhoEvento: CarrinhoEvent, private cartaoClienteService: CartaoClienteService, private authService: AuthService, public dialog: MatDialog) {
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
    servico.valor = servico.servico.valor * qnt;
    this.calculateTotal();
  }

  insertService(service: Servico) {
    const servico = new ServicoResponse();
    servico.id = service.id;
    servico.composicao = service.composicao;
    servico.valor = service.valor;
    servico.descricao = service.descricao;
    servico.nomeArquivo = service.nomeImagem;
    servico.classe = service.classe;

    const servicoOrcamentoResponse = new ServicoOrcamentoResponse();
    servicoOrcamentoResponse.quantidade = 1;
    servicoOrcamentoResponse.servico = servico;
    servicoOrcamentoResponse.unidadeMedida = service.unidadeMedida;
    servicoOrcamentoResponse.valor = service.valor;
    console.log(servicoOrcamentoResponse);
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
        this.total += servico.valor * servico.quantidade;
        // @ts-ignore
        console.log(servico);
      }
    });
    if (this.total === 0) {
      this.showPay = false;
    }
    console.log(this.total);
  }

  getCartaoPrincipal() {
    this.showPay = true;
    this.cartaoClienteService.buscarCartaoPrincipal(this.authService.getUser().id).subscribe(
      (data) => {
        this.cartao = data;
      },
      (error) => {
        this.openModal();
      }
    );
  }


  openModal() {
    const dialogRef = this.dialog.open(DialogCartaoComponent, {
      width: '50%',
      data: {cartao: this.cartao}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.cartao = result;
      }
    });
  }


//  Salvar aaditamento
  saveAdiamento() {
    const pagamento: Pagamento = new Pagamento();
    const orcamento = new Orcamento();
    orcamento.id = this.orcamento.id;
    this.cartao.codigoSegurancaCartao = Number(this.cvc);
    // Orcamento
    pagamento.orcamento = orcamento;
    pagamento.cartaoCliente = this.cartao;
    pagamento.formaPagamento = new FormaPagamento(1);
    pagamento.numeroParcela = 1;
    // TODO: mudar o valor para this.orcamento.valor
    pagamento.valorParcela = this.total;
    pagamento.financeira = new Financeira(2);

    const servicos: ServicosOrcamento[] = [];

    this.dataSource.data.forEach(servico => {
      // @ts-ignore
      if (!servico.id) {
        // @ts-ignore
        servicos.push(this.changeToServicoOrcamento(servico));
      }
    });
    const aditamentoAuxiliar = new AditamentoAuxiliar(pagamento, servicos);
    console.log(JSON.stringify(aditamentoAuxiliar));

    this.orcamentoService.addAuxiliaryService(aditamentoAuxiliar).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  changeToServicoOrcamento(servicoResponse: ServicoOrcamentoResponse): ServicosOrcamento {
    console.log(servicoResponse);
    const servico: Servico = new Servico();
    servico.valor = servicoResponse.servico.valor;
    servico.id = servicoResponse.servico.id;
    servico.classe = servicoResponse.servico.classe;

    return new ServicosOrcamento(servicoResponse.quantidade, servico);
  }

}
