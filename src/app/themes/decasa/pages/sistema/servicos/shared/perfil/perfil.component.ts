import {Component, OnInit} from '@angular/core';
import {PrestadorService} from '../../../../../../../services/prestador.service';
import {OrcamentoEvent} from '../../../../../../../events/orcamento-event';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private prestadorService: PrestadorService, private orcamentoEvent: OrcamentoEvent) {
  }

  ngOnInit(): void {
    // this.getPrestadoresOcarmento();
  }

  getPrestadoresOcarmento() {
    this.prestadorService.getBudgetProviders(1).subscribe(
      (data) => {console.log(data); },
      (error) => {console.log(error); }
    );
  }

  getDetails(prestadorId) {
    console.log('Clicou em detalhes');
    this.orcamentoEvent.detalhes(prestadorId);
  }
}
