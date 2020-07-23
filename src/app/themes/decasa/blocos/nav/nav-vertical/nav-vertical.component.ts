import { ClasseEvent } from '../../../../../events/classe-event';
import { TodosOsGruposEClassesResponse } from './../../../../../model/response/todos-os-grupos-classes-response.module';
import { GrupoService } from './../../../../../services/grupo.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav-vertical',
  templateUrl: './nav-vertical.component.html',
  styleUrls: ['./nav-vertical.component.css']
})
export class NavVerticalComponent implements OnInit {

  @Input() municipioId: number;
  menuId;
  gruposClasses: TodosOsGruposEClassesResponse[];

  constructor(private grupoService: GrupoService, private classeService: ClasseEvent) {
  }

  ngOnInit(): void {
    this.getGruposClassesByMunicipio();
  }

  // Grupos e classes por municipio
  public getGruposClassesByMunicipio() {
    if (this.municipioId !== undefined) {
      this.grupoService.getGruposClassesByMunicipio(this.municipioId).subscribe(
        (data) => { this.gruposClasses = data; console.log(this.gruposClasses); },
        (error) => console.log(error)
      );
    }
  }

  // Carregar os serviços de acordo com a classe (tabela serviços)
  loadServicos(classeId) {
    this.classeService.alteracao(classeId);
    localStorage.setItem('classeId', classeId );
  }

  abriSubMenu(id) {
    console.log(id);
    if (this.menuId === id) {
      this.menuId = 0;
    } else {
      this.menuId = id;
    }
  }

}
