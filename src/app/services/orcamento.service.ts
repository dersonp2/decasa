import {Orcamento} from '../model/orcamento.module';
import {ClienteOrcamento} from '../model/response/cliente-orcamento.module';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {take} from 'rxjs/operators';
import {OrcamentoResponse} from '../model/orcamento-response.module';
import {ResponseMessage} from '../model/response-message.module';
import {TotalOrcamento} from '../model/response/total-orcamento-response.module';
import {Avaliacao} from '../model/avalicao.module';
import {ReagendamentoAuxiliar} from '../themes/decasa/blocos/dialog/dialog-reagendar/dialog-reagendar.component';
import {AditamentoAuxiliar} from '../themes/decasa/blocos/dialog/dialog-editar/tabela-servicos/tabela-servicos.component';

export interface RatingDTO {
  id: number;
  tipoNota: { [key: string]: number };
}

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {

  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {
  }

  // Salva um orcamento e retorna um oramento response
  salvarOrcamento(orcamento: Orcamento): Observable<OrcamentoResponse> {
    return this.http.post<OrcamentoResponse>(`${this.apiUrl}/solicitarOrcamento`, orcamento);
  }

  // Busca orcamentos dos clientes
  buscarClienteOrcamentosEscolher(clienteId): Observable<ClienteOrcamento[]> {
    return this.http.get<ClienteOrcamento[]>
    (`${this.apiUrl}/clienteOrcamentosEscolher/${clienteId}`)
      .pipe(take(1));
  }

  buscarClienteOrcamentosAgendados(clienteId): Observable<ClienteOrcamento[]> {
    return this.http.get<ClienteOrcamento[]>
    (`${this.apiUrl}/clienteOrcamentosAgendados/${clienteId}`)
      .pipe(take(1));
  }

  buscarClienteOrcamentosExecucao(clienteId): Observable<ClienteOrcamento[]> {
    return this.http.get<ClienteOrcamento[]>
    (`${this.apiUrl}/clienteOrcamentosExecucao/${clienteId}`)
      .pipe(take(1));
  }

  buscarClienteOrcamentosFinalizados(clienteId): Observable<ClienteOrcamento[]> {
    return this.http.get<ClienteOrcamento[]>
    (`${this.apiUrl}/clienteOrcamentosFinalizados/${clienteId}`)
      .pipe(take(1));
  }

  // Gerar multa
  generateFine(budgetId): Observable<ResponseMessage> {
    return this.http.get<ResponseMessage>
    (`${this.apiUrl}/geraMulta/${budgetId}`)
      .pipe(take(1));
  }

  // Cancelar orcamento
  cancelBudget(budgetId, fine): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>
    (`${this.apiUrl}/cancelarOrcamento/${budgetId}/${fine}`, '')
      .pipe(take(1));
  }

//  Retorna as quantidades de orcamento
  getTotalBudget(clientId): Observable<TotalOrcamento> {
    return this.http.get<TotalOrcamento>
    (`${this.apiUrl}/orcamentos/totais/cliente/${clientId}`)
      .pipe(take(1));
  }

  //  Autorizar início
  confirmStart(budgetId): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>
    (`${this.apiUrl}/confirmarInicio/${budgetId}`, '')
      .pipe(take(1));
  }

  // Autorizar pagamento e o fim
  confirmEnd(avaliacao: Avaliacao): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>
    (`${this.apiUrl}/confirmarFim`, avaliacao)
      .pipe(take(1));
  }

  // Obter avaliacoes de um orcamento
  getRatings(budgetId): Observable<RatingDTO[]> {
    return this.http.get<RatingDTO[]>
    (`${this.apiUrl}/avaliacoes/prestadores/orcamento/${budgetId}`)
      .pipe(take(1));
  }

  // Reagendar o orcamento
  // reschedule(reagendamento: ReagendamentoAuxiliar): Observable<any> {
  //   console.log(reagendamento);
  //   return this.http.post<any>
  //   (`${this.apiUrl}/reagendamento`, reagendamento)
  //     .pipe(take(1));
  // }

  // Salva um orcamento e retorna um oramento response
  reschedule(reagendamentoAux: ReagendamentoAuxiliar): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reagendamento`, reagendamentoAux).pipe(take(1));
  }

  addAuxiliaryService(aditamentoAuxiliar: AditamentoAuxiliar): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/aditamento`, aditamentoAuxiliar).pipe(take(1));
  }

}
