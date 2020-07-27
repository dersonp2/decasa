import { environment } from './../../environments/environment';
import { TodosOsGruposEClassesResponse } from '../model/response/todos-os-grupos-classes-response.module';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import {Avaliacao} from "../model/avalicao.module";

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  // Retorna Todas as avaliações por avaliado
  getAvaliacaoByAvaliado(avaliadoId): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>
    (`${this.apiUrl}/avaliacoes/${avaliadoId}`).pipe(take(1));
  }
}
