import {Component, Input, OnInit} from '@angular/core';
import {AvaliacaoService} from '../../../../../../../../services/avaliacao.service';
import {Avaliacao} from "../../../../../../../../model/avalicao.module";

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  @Input() display;
  avaliacoes: Avaliacao[] = [];

  foods: Food[] = [
    {value: '1', viewValue: 'Maior Avaliação'},
    {value: '2', viewValue: 'Menor Avaliação'},
    {value: '3', viewValue: 'Mais Recentes'}
  ];

  listComentarios = [
    {
      usuario: 'Carlos Silva',
      comentario: 'Muito bom',
      rating: 5
    },
    {
      usuario: 'Joana Costa',
      comentario: 'Atencioso',
      rating: 5
    },
    {
      usuario: 'Ulisses Pereira',
      comentario: 'Trabalho excelente',
      rating: 4
    },
  ];

  constructor(private avaliacaoService: AvaliacaoService) {
  }

  ngOnInit(): void {
  }

  getAvaliacoes(prestadorId) {
    this.avaliacaoService.getAvaliacaoByAvaliado(prestadorId).subscribe(
      (data) => {
        console.log(data);
        this.avaliacoes = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
