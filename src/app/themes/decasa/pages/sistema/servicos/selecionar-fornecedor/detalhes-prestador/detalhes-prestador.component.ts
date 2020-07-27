import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PrestadorDetalhesResponse} from '../../../../../../../model/response/prestador-detalhes-response.module';
import {ListaGruposComponent} from "../../../../index/lista-grupos/lista-grupos.component";
import {ComentariosComponent} from "./comentarios/comentarios.component";

@Component({
  selector: 'app-detalhes-prestador',
  templateUrl: './detalhes-prestador.component.html',
  styleUrls: ['./detalhes-prestador.component.css']
})
export class DetalhesPrestadorComponent implements OnInit {
  displayCertificados = false;
  displayPortifolio = false;
  displayComentario = false;
  @Input() prestador: PrestadorDetalhesResponse;

  @ViewChild(ComentariosComponent) comentariosComponent: ComentariosComponent;

  constructor() { }

  ngOnInit(): void {
  }


  setDisplayCertificados() {
    this.displayCertificados = !this.displayCertificados;
  }

  setDisplayPortifolio() {
    this.displayPortifolio = !this.displayPortifolio;
  }

  setDisplayComentario() {
    this.displayComentario = !this.displayComentario;
    if (this.displayComentario) {
      this.comentariosComponent.getAvaliacoes(this.prestador.id);
    }
  }
}
