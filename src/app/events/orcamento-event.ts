import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoEvent {

  // tslint:disable-next-line:variable-name
  private _escolher = new Subject();
  // tslint:disable-next-line:variable-name
  private _agendado = new Subject();
  // tslint:disable-next-line:variable-name
  private _execucao = new Subject();
  // tslint:disable-next-line:variable-name
  private _finalizado = new Subject();
  // tslint:disable-next-line:variable-name
  private _detalhes = new Subject();

  escolher$ = this._escolher.asObservable();
  finalizado$ = this._finalizado.asObservable();
  agendado$ = this._agendado.asObservable();
  execucao$ = this._execucao.asObservable();
  detalhes$ = this._detalhes.asObservable();

  constructor() {
  }

  escolher(e) {
    this._escolher.next(e);
  }

  agendado(e) {
    this._agendado.next(e);
  }

  execucao(e) {
    this._execucao.next(e);
  }

  finalizado(e) {
    this._finalizado.next(e);
  }

  detalhes(prestadorId) {
    this._detalhes.next(prestadorId);
  }

}
