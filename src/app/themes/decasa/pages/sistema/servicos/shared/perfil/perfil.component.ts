import {Component, OnInit} from '@angular/core';
import {PrestadorService} from '../../../../../../../services/prestador.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private prestadorService: PrestadorService) {
  }

  ngOnInit(): void {
    this.getPrestadoresOcarmento();
  }

  getPrestadoresOcarmento() {
    this.prestadorService.getPrestadoresOrcamento(1).subscribe(
      (data) => {console.log(data); },
      (error) => {console.log(error); }
    );
  }
}
