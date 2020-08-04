import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class PrestadorFeedService {
  apiUrl = environment.API_URL;
  private _subject = new Subject<any>();


  private pusherClient: Pusher;

  constructor() {
    this.pusherClient = new Pusher(environment.APP_KEY, {cluster: environment.CLUSTER});
  }

  getNotificacaoPrestador(orcamentoId: number): Observable<any> {
    console.log('Channel: ' + orcamentoId);
    const channel = this.pusherClient.subscribe(orcamentoId.toString());
    channel.bind(
      'accept',
      (data: { nome: string; avaliacao: number; time: string }) => {
        this._subject.next(data);
      }
    );

    return this._subject.asObservable();
  }

}
