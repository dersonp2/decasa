import {Component, OnDestroy} from '@angular/core';
import {OrcamentoEvent} from '../../../../../../../events/orcamento-event';
import {PrestadorFeedService} from '../../../../../../../services/prestador-feed.service';
import {ClienteOrcamento} from '../../../../../../../model/response/cliente-orcamento.module';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PrestadorService} from '../../../../../../../services/prestador.service';
import {Router} from '@angular/router';

export class PrestadorFeed {
  constructor(public nome: string, public avaliacao: number, public time: Date) {
    this.nome = nome;
    this.avaliacao = avaliacao;
    this.time = time;
  }
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnDestroy {
  prestadores = new Set();
  private notificacaoSubscription: Subscription;

  constructor(private orcamentoEvent: OrcamentoEvent, private prestadorService: PrestadorService,
              private prestadoFeed: PrestadorFeedService, private router: Router, private _snackBar: MatSnackBar) {

    orcamentoEvent.escolher$.subscribe(
      (orcamento: ClienteOrcamento) => {
        this.getNotificacao(orcamento.id);
      }
    );
  }

  // Pega os dados da api e depois que se inscreve para receber novas notificações
  getNotificacao(orcamentoId) {
    this.prestadores.clear();
    this.prestadorService.getPrestadoresByOrcamento(orcamentoId)
      .subscribe(
        (data) => {
          console.log(data);
          this.notificacaoSubscription = this.prestadoFeed
            .getNotificacaoPrestador(orcamentoId)
            .subscribe((prestadorFeed: PrestadorFeed) => {
              console.log(data);
              this.prestadores.add(prestadorFeed);
              this.showSnackBar();
            });
        }
      );
  }

  getDetails(prestadorId) {
    this.orcamentoEvent.detalhes(prestadorId);
  }

  showSnackBar() {
    const snackBarRef = this._snackBar.open('Temos um novo prestador de serviço para você!', 'Visualizar', {
        duration: 6000,
        panelClass: ['blue-snackbar']
      }
    );
    snackBarRef.onAction().subscribe(() =>
      this.router.navigate(['/escolher'])
  );
  }

  ngOnDestroy() {
    // this.notificacaoSubscription.unsubscribe();
  }
}
