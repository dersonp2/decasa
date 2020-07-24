import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AnexoEvent {

  // tslint:disable-next-line:variable-name
  private _alteracao = new Subject();
  alteracao$ = this._alteracao.asObservable();

  constructor() { }

  // tslint:disable-next-line:variable-name
  alteracao(number) {
    this._alteracao.next(number);
  }

}
