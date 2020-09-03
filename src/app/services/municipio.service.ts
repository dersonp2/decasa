import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Municipio } from '../model/municipio.module';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  apiUrl = environment.API_URL;
  apiUrlPrestador = environment.API_PRESTADOR_URL;
  constructor(private http: HttpClient) { }

  // Retorna Todos os municipios ativos
  buscarMunicipiosAtivos(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${this.apiUrl}/municipios`).pipe(take(1));
  }

  // Retorna todos os municipios ATIVOS pelo UF id
  buscarMunicipiosUfAtivos(ufId): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${this.apiUrl}/municipios/${ufId}`).pipe(take(1));
  }

  buscarMunicipioPorId(municipioId): Observable<Municipio> {
    return this.http.get<Municipio>(`${this.apiUrl}/municipio/${municipioId}`).pipe(take(1));
  }

  // Retorna todos os municipios pelo UF id
  buscarMunicipiosUf(ufId): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${this.apiUrlPrestador}/util/municipios/${ufId}`).pipe(take(1));
  }
}
