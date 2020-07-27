import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Servico } from '../model/servico.module';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  apiUrl = environment.API_URL;
  constructor(private http: HttpClient) {}

  // Lista todos os serviços ativos por classe e municipio
  getServicoByClasseAndMunicipio(classeId: number, municipioId: number): Observable<Servico[]> {
    return this.http.get<Servico[]>(`${this.apiUrl}/searchServices/${classeId}/${municipioId}`).pipe(take(1));
  }

//  Lista todos os serviços disponível em um orçamento
  getServicoByOrcamento(orcamentoId): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/buscarServicosPrestadoresComClasse/${orcamentoId}`).pipe(take(1));
  }
}
