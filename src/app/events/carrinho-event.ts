import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoEvent {

  // tslint:disable-next-line:variable-name
  private _alteracao = new Subject();
  alteracao$ = this._alteracao.asObservable();
  // tslint:disable-next-line:variable-name
  private _addService = new Subject();
  addService$ = this._addService.asObservable();

  constructor() {
  }

  alteracao() {
    this._alteracao.next();
  }

  addService(e) {
    this._addService.next(e);
  }
}
