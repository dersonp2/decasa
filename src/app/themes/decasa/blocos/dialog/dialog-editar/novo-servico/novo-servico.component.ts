import {Component, Input, OnInit} from '@angular/core';
import {ServicoService} from '../../../../../../services/servico.service';
import {ClienteOrcamento} from '../../../../../../model/response/cliente-orcamento.module';
import {Servico} from '../../../../../../model/servico.module';
import {CarrinhoEvent} from '../../../../../../events/carrinho-event';


export class ClasseServico {
  descricao: string;
  servico?: Servico[];

  constructor(descricao, servicos: Servico[]) {
    this.descricao = descricao;
    this.servico = servicos;
  }
}

@Component({
  selector: 'app-novo-servico',
  templateUrl: './novo-servico.component.html',
  styleUrls: ['./novo-servico.component.css']
})
export class NovoServicoComponent implements OnInit {

  classeServico: ClasseServico[] = [];
  showServices = false;

  @Input() orcamento: ClienteOrcamento;

  constructor(private servicoService: ServicoService, private carrinhoEvent: CarrinhoEvent) {

  }

  ngOnInit(): void {
    this.getServicesByBudget();
  }


  getServicesByBudget() {
    this.servicoService.getServicoByOrcamento(this.orcamento.id).subscribe(
      (data) => {
        // console.log(data);
        this.fillClasseServicos(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Mostrar só classe
  fillClasseServicos(data) {
    this.classeServico = [];
    Object.keys(data).forEach(key => {
      // console.log(key, data[key]);
      this.classeServico.push(new ClasseServico(key, data[key]));
    });
    // console.log(this.classeServico);
  }

  addService(service) {
    this.carrinhoEvent.addService(service);
    // console.log('Emitiu');
  }

}
