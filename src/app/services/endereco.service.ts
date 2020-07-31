import {environment} from './../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Municipio} from '../model/municipio.module';
import {take} from 'rxjs/operators';
import {EnderecoCliente} from '../model/endereco-cliente.module';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {
  }


  getPrincipalAddress(clientId): Observable<EnderecoCliente> {
    return this.http.get<EnderecoCliente>(`${this.apiUrl}/enderecos/clientes/principal/${clientId}`).pipe(take(1));
  }

  getAddressClientId(clientId): Observable<EnderecoCliente[]> {
    return this.http.get<EnderecoCliente[]>(`${this.apiUrl}/clientAddress/${clientId}`).pipe(take(1));
  }

  getExisteEnderecoCliente(endereco: EnderecoCliente): Observable<EnderecoCliente> {
    return this.http.post<EnderecoCliente>(`${this.apiUrl}/enderecos/clientes/exist`, endereco).pipe(take(1));
  }

  saveAddress(endereco: EnderecoCliente): Observable<EnderecoCliente> {
    return this.http.post<EnderecoCliente>(`${this.apiUrl}/saveAddress`, endereco).pipe(take(1));
  }

  defineAddressPrincipal(clientId, addressId): Observable<EnderecoCliente> {
    return this.http.put<EnderecoCliente>(`${this.apiUrl}/definePrincipalAddress/${clientId}/${addressId}`, '').pipe(take(1));
  }
}
