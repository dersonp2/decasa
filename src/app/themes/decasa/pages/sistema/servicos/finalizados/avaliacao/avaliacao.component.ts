import {PrestadorResponse} from '../../../../../../../model/response/prestador-response.module';
import {Component, OnInit, Input} from '@angular/core';
import {OrcamentoService, RatingDTO} from '../../../../../../../services/orcamento.service';
import {ClienteOrcamento} from '../../../../../../../model/response/cliente-orcamento.module';
import {OrcamentoEvent} from '../../../../../../../events/orcamento-event';

export class RatingProvider {
  nome: string;
  ratings: RatingDTO;

  constructor(nome, ratings) {
    this.nome = nome;
    this.ratings = ratings;
  }
}

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit {

  ratings: RatingDTO[];
  ratingsProvider: RatingProvider[];
  orcamentoSelected: ClienteOrcamento;

  constructor(private orcamentoService: OrcamentoService, private orcamentoEvent: OrcamentoEvent) {
    orcamentoEvent.finalizado$.subscribe(
      (data: ClienteOrcamento) => {
        (this.orcamentoSelected = data);
        this.getRatings();
      }
    );
  }

  ngOnInit(): void {
  }

  getRatings() {
    console.log('getRating');
    this.orcamentoService.getRatings(this.orcamentoSelected.id).subscribe(
      (data) => {
        console.log(data);
        this.ratings = data;
        this.setNameprovider();
      }
    );
  }

  // Incluir o nome do prestador na lista de avaliações
  setNameprovider() {
    this.ratingsProvider = [];
    this.orcamentoSelected.prestadores.forEach(prestador => {
      this.ratings.forEach(value => {
        if (prestador.id === value.id) {
            this.ratingsProvider.push( new RatingProvider(prestador.nome, value));
        }
      });
    });
  }
}
