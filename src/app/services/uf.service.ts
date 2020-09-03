import { Uf } from './../model/uf.module';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Municipio } from '../model/municipio.module';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UfService {

  apiUrl = environment.API_URL;
  apiUrlPrestador = environment.API_PRESTADOR_URL;
  constructor(private http: HttpClient) {}

  // Retorna Todos os municipios ativos
  // getAllUf(): Observable<Uf[]> {
  //   return this.http.get<Uf[]>(`${this.apiUrl}/ufs`).pipe(take(1));
  // }

  getUF(): Observable<Uf[]> {
    return this.http.get<Uf[]>(`${this.apiUrlPrestador}/util/uf`).pipe(take(1));
  }
}
