import { BlocosModule } from '../../../blocos/blocos.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendadoComponent } from './agendado/agendado.component';
import { AndamentoComponent } from './andamento/andamento.component';
import { FinalizadosComponent } from './finalizados/finalizados.component';
import { AvaliacaoComponent } from './finalizados/avaliacao/avaliacao.component';
import { EscreverComentarioComponent } from './finalizados/escrever-comentario/escrever-comentario.component';
import { SelecionarFornecedorComponent } from './selecionar-fornecedor/selecionar-fornecedor.component';
import { SharedModule } from './shared/shared.module';

import { StarRatingModule } from '@sreyaj/ng-star-rating';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { NgxStarsModule } from 'ngx-stars';

@NgModule({
  declarations: [
    AgendadoComponent,
    AndamentoComponent,
    FinalizadosComponent,
    AvaliacaoComponent,
    EscreverComentarioComponent,
    SelecionarFornecedorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StarRatingModule,
    ScrollToModule.forRoot(),
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatCardModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    TextFieldModule,
    MatInputModule,
    NgxStarsModule,
    BlocosModule
  ]
})
export class ServicosModule { }
