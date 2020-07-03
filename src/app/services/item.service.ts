import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import {Item} from '../model/item.module';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  apiUrl = environment.API_URL;
  constructor(private http: HttpClient) {}

  // Retorna Todos os municipios ativos
  getItens(typeItem): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/itens/${typeItem}`).pipe(take(1));
  }
}
