import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FilterPipe} from './../../../../../pipes/filter.pipe';
import {MatCardModule} from '@angular/material/card';
import {environment} from './../../../../../../environments/environment';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {TextMaskModule} from 'angular2-text-mask';
import {AgmCoreModule} from '@agm/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {CreditCardDirectivesModule} from 'angular-cc-library';
import {PopoverModule} from 'ngx-smart-popover';


import {OrcamentoComponent} from './orcamento/orcamento.component';
import {TabelaComponent} from './orcamento/tabela-orcamento/tabela.component';
import {PagamentoComponent} from './pagamento/pagamento.component';
import {QuantidadeComponent} from './quantidade/quantidade.component';
import {PropostaComponent} from './proposta/proposta.component';
import {MapPropostaComponent} from './proposta/map-proposta/map-proposta.component';
import {NavPagamentoComponent} from './pagamento/nav-pagamento/nav-pagamento.component';
import {TabelaPropostaComponent} from './proposta/tabela-proposta/tabela-proposta.component';
import {TabelaQuantidadeComponent} from './quantidade/tabela-quantidade/tabela-quantidade.component';

import {BlocosModule} from './../../../blocos/blocos.module';

@NgModule({
  declarations: [
    OrcamentoComponent,
    TabelaComponent,
    PagamentoComponent,
    NavPagamentoComponent,
    QuantidadeComponent,
    TabelaQuantidadeComponent,
    PropostaComponent,
    TabelaPropostaComponent,
    MapPropostaComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    TextMaskModule,
    MatDatepickerModule,
    MatNativeDateModule,
    PopoverModule,
    MatInputModule,
    NgxMaterialTimepickerModule,
    MatCheckboxModule,
    MatCardModule,
    MatSnackBarModule,
    CreditCardDirectivesModule,
    AgmCoreModule.forRoot({
      apiKey: environment.API_MAPS
    }),

    BlocosModule
  ],
  exports: [FilterPipe]
})
export class ComprarServicosModule { }
