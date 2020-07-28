import {ServicosOrcamento} from './../../../../../model/servico-orcamento.module';
import {CarrinhoEvent} from './../../../../../events/carrinho-event';
import {ServicoElement} from './../../../../../model/element/servico.element';
import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-nav-carrinho',
  templateUrl: './nav-carrinho.component.html',
  styleUrls: ['./nav-carrinho.component.css']
})
export class NavCarrinhoComponent implements OnInit {
  @Input() exibirMenu;
  displayedColumns: string[] = ['descricao', 'qntd', 'unidade', 'opc'];
  servicosSelecionados: ServicosOrcamento[] = [];
  dataSource: ServicosOrcamento[];

  constructor(private carrinhoService: CarrinhoEvent) {
    carrinhoService.alteracao$.subscribe(
      (data) => {
        this.getServicosElement();
      }
    );
  }

  ngOnInit(): void {
    this.getServicosElement();
  }

  getServicosElement() {
    if (localStorage.hasOwnProperty('servicosSelecionados')) {
      this.servicosSelecionados = JSON.parse(localStorage.getItem('servicosSelecionados'));
      this.dataSource = this.servicosSelecionados;
    }
  }

  onSearchChange(qnt: number, servico: ServicosOrcamento): void {
    console.log(qnt);
    console.log(servico);
    const pos = this.servicosSelecionados.indexOf(servico);
    this.servicosSelecionados[pos].quantidade = Number(qnt);
    localStorage.setItem('servicosSelecionados', JSON.stringify(this.servicosSelecionados));

  }

  deleteElement(servico) {
    // Remove
    this.servicosSelecionados.splice(this.servicosSelecionados.indexOf(servico), 1);
    //
    localStorage.setItem('servicosSelecionados', JSON.stringify(this.servicosSelecionados));
    this.carrinhoService.alteracao();
  }

}
