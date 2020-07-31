import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

import { CardFuncionarioComponent } from './card-funcionario/card-funcionario.component';
import { CertificadosComponent } from './certificados/certificados.component';
import { DadosServicoComponent } from './dados-servico/dados-servico.component';
import { DetalhePerfilComponent } from './detalhe-perfil/detalhe-perfil.component';
import { EmailComponent } from './email/email.component';
import { NPedidosComponent } from './n-pedidos/n-pedidos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PortifolioComponent } from './portifolio/portifolio.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { StarRatingModule } from '@sreyaj/ng-star-rating';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {NgxSpinnerModule} from 'ngx-spinner';


@NgModule({
  declarations: [
    CardFuncionarioComponent,
    CertificadosComponent,
    DadosServicoComponent,
    DetalhePerfilComponent,
    EmailComponent,
    NPedidosComponent,
    PerfilComponent,
    PortifolioComponent
  ],
  imports: [
    CommonModule,

    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    CarouselModule,
    StarRatingModule,
    ScrollToModule.forRoot(),
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    NgxSpinnerModule,
    MatAutocompleteModule
  ],
  exports: [
    CardFuncionarioComponent,
    CertificadosComponent,
    DadosServicoComponent,
    DetalhePerfilComponent,
    EmailComponent,
    NPedidosComponent,
    PerfilComponent,
    PortifolioComponent
  ]
})
export class SharedModule { }
