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
import {TipoAnexo} from '../model/tipo-anexo.module';
import {ArquivoOrcamento} from '../model/arquivo-orcamento.module';

export interface RatingDTO {
  id: number;
  tipoNota: { [key: string]: number };
}

@Injectable({
  providedIn: 'root'
})
export class ArquivoOrcamentoService {

  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {
  }

  // Lista os tipos de anexos
  getTipoAnexo(): Observable<TipoAnexo[]> {
    return this.http.get<TipoAnexo[]>
    (`${this.apiUrl}/tipoAnexos`)
      .pipe(take(1));
  }

  getArquivosByOrcamento(orcamentoId): Observable<ArquivoOrcamento[]> {
    return this.http.get<ArquivoOrcamento[]>
    (`${this.apiUrl}/arquivos/orcamento/${orcamentoId}`)
      .pipe(take(1));
  }

  salvarArquivoOrcamento(arquivoOrcamento): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>
    (`${this.apiUrl}/arquivo/orcamento`, arquivoOrcamento)
      .pipe(take(1));
  }

  atualizarArquivoOrcamento(arquivoOrcamento): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>
    (`${this.apiUrl}/arquivo/orcamento`, arquivoOrcamento)
      .pipe(take(1));
  }

}
