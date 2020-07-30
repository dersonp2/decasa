import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import {AppRoutingModule} from 'src/app/app.routing.module';
import {SenhaComponent} from './meu-perfil/senha/senha.component';
import {TextMaskModule} from 'angular2-text-mask';

import {EnderecoComponent} from './endereco/endereco.component';
import {DadosCadastraisComponent} from './empresa/dados-cadastrais/dados-cadastrais.component';
import {OutrosMembrosComponent} from './empresa/outros-membros/outros-membros.component';
import {MeioDePagamentoComponent} from './meio-de-pagamento/meio-de-pagamento.component';
import {TabelaCartoesComponent} from './meio-de-pagamento/tabela-cartoes/tabela-cartoes.component';
import {DadosPessoaisComponent} from './meu-perfil/dados-pessoais/dados-pessoais.component';
import {TabelaMembroComponent} from './empresa/outros-membros/tabela-membro/tabela-membro.component';
import {TabelaPrepagoComponent} from './meio-de-pagamento/tabela-prepago/tabela-prepago.component';
import {TabelaPospagoComponent} from './meio-de-pagamento/tabela-pospago/tabela-pospago.component';
import {ListaEnderecosComponent} from './endereco/lista-enderecos/lista-enderecos.component';

import {BlocosModule} from './../../../blocos/blocos.module';
import {AngularValidateBrLibModule} from "angular-validate-br";


@NgModule({
  declarations: [
    DadosCadastraisComponent,
    OutrosMembrosComponent,
    TabelaMembroComponent,
    EnderecoComponent,
    ListaEnderecosComponent,
    MeioDePagamentoComponent,
    TabelaCartoesComponent,
    TabelaPospagoComponent,
    TabelaPrepagoComponent,
    DadosPessoaisComponent,
    SenhaComponent
  ],
  imports: [
    CommonModule,

    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    TextMaskModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    AngularValidateBrLibModule,

    BlocosModule,
    ReactiveFormsModule
  ]
})
export class PerfilUsuarioModule {
}
