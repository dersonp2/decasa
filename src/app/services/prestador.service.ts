import {environment} from '../../environments/environment';

import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {take} from 'rxjs/operators';
import {PrestadorDetalhesResponse} from '../model/response/prestador-detalhes-response.module';
import {PrestadorDTO} from '../model/prestador-dto.module';
import {NivelFormacao} from '../model/nivel-formacao.module';
import {Profissao} from '../model/profissao.module';

@Injectable({
  providedIn: 'root'
})
export class PrestadorService {
  apiUrl = environment.API_PRESTADOR_URL;


  constructor(private http: HttpClient) {
  }

  getPrestadoresByOrcamento(orcamentoId): Observable<PrestadorDetalhesResponse[]> {
    return this.http.get<PrestadorDetalhesResponse[]>(`${this.apiUrl}/prestadores/orcamento/${orcamentoId}`).pipe(take(1));
  }

  // Recebe o cliente para mostrar na tela /dados-pessoais
  getPrestadorDetalhes(prestadorId: number): Observable<PrestadorDetalhesResponse> {
    return this.http.get<PrestadorDetalhesResponse>(`${this.apiUrl}/prestador/${prestadorId}`).pipe(take(1));
  }

  savePrestador(prestador: PrestadorDTO): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/prestador/`, prestador).pipe(take(1));
  }

  getFormacao(): Observable<NivelFormacao[]> {
    return this.http.get<NivelFormacao[]>(`${this.apiUrl}/util/formacao`).pipe(take(1));
  }

  getProfissoes(): Observable<Profissao[]> {
    return this.http.get<Profissao[]>(`${this.apiUrl}/util/profissao`).pipe(take(1));
  }
}
