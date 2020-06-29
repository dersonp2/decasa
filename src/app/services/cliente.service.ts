import { Cliente } from './../model/cliente.module';
import { ClienteEmpresaResponse } from './../model/response/cliente-empresa-response.module';
import { ClienteDetalhesResponse } from 'src/app/model/response/cliente-detalhes-response.module';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Servico } from '../model/servico.module';
import {ResponseMessage} from '../model/response-message.module';
import {Md5} from 'ts-md5';
import {User} from '../model/response/user.response.module';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  apiUrl = environment.API_URL;
  constructor(private http: HttpClient) { }

  // Recebe o cliente para mostrar na tela /dados-pessoais
  getClienteDetalhes(clienteId: number): Observable<ClienteDetalhesResponse> {
    return this.http.get<ClienteDetalhesResponse>(`${this.apiUrl}/cliente/${clienteId}/details`).pipe(take(1));
  }

  // Recebe as informações da empresa pelo id do cliente
  getClienteEmpresaDetalhes(clienteId: number): Observable<ClienteEmpresaResponse> {
    return this.http.get<ClienteEmpresaResponse>(`${this.apiUrl}/empresa/${clienteId}/details`).pipe(take(1));
  }

//  Alterar a senha:
  alterPassword(user: User, oldpass): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(`${this.apiUrl}/updatePass/${oldpass}`, user).pipe(take(1));
  }

}
