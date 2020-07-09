import {environment} from '../../environments/environment';

import {Observable, timer, Subscription, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {retry, switchMap, take, takeUntil, tap} from 'rxjs/operators';
import {PrestadorDetalhesResponse} from '../model/response/prestador-detalhes-response.module';

@Injectable({
  providedIn: 'root'
})
export class PrestadorService {
  apiUrl = environment.API_URL;

  private allProviders$: Observable<PrestadorDetalhesResponse[]>;
  private stopPolling = new Subject();

  constructor(private http: HttpClient) {
  }

  // Recebe a lista de prestadores que  atendem ao orcamento
  getBudgetProviders(orcamentoId: number): Observable<PrestadorDetalhesResponse[]> {
    return timer(1, 3000).pipe(
      switchMap(() => this.http.get<PrestadorDetalhesResponse[]>(`${this.apiUrl}/prestadores/orcamento/${orcamentoId}`)),
      retry(),
      takeUntil(this.stopPolling)
    ).pipe(
      tap(() => console.log('data sent to subscriber'))
    );
  }

  stop() {
    this.stopPolling.next();
  }
}
