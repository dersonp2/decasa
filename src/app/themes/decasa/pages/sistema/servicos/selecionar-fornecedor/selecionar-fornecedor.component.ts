import {ClienteOrcamento} from '../../../../../../model/response/cliente-orcamento.module';
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../../../services/auth.service';
import {OrcamentoEvent} from '../../../../../../events/orcamento-event';
import {MatDialog} from '@angular/material/dialog';
import {DialogLoginComponent} from '../../../../blocos/dialog/dialog-login/dialog-login.component';
import {PrestadorService} from '../../../../../../services/prestador.service';
import {PrestadorDetalhesResponse} from '../../../../../../model/response/prestador-detalhes-response.module';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-selecionar-fornecedor',
  templateUrl: './selecionar-fornecedor.component.html',
  styleUrls: ['./selecionar-fornecedor.component.css']
})
export class SelecionarFornecedorComponent implements OnInit {

  orcamentoSelected: ClienteOrcamento = new ClienteOrcamento();
  prestador: PrestadorDetalhesResponse = new PrestadorDetalhesResponse();

  showList = false;

  constructor(private authService: AuthService, private orcamentoEvent: OrcamentoEvent, private prestadorService: PrestadorService,
              public dialog: MatDialog) {
    orcamentoEvent.escolher$.subscribe(
      (data: ClienteOrcamento) => {
        (this.orcamentoSelected = data);
        this.showList = true;
      }
    );

    orcamentoEvent.detalhes$.subscribe(
      (data) => {
        this.getPrestador(data);
      }
    );

  }

  ngOnInit(): void {
    // if (!this.authService.check()) {
    //   this.openModal();
    // }
  }

  getPrestador(prestadorId) {
    this.prestadorService.getPrestadorDetalhes(prestadorId).subscribe(
      (data) => {
        console.log(data);
        this.prestador = data;
      },
      (error) => {
        console.log(error);
      }
    )
    ;
  }

  // Abre a dialog de login
  openModal() {
    const dialogRef = this.dialog.open(DialogLoginComponent, {
      disableClose: true
    });
  }

}
