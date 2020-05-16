import { ModalComponent } from './index/modal/modal.component';
import { BlocosModule } from './../blocos/blocos.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverModule } from "ngx-smart-popover";

import { SistemaModule } from './sistema/sistema.module';
import { IndexComponent } from './index/index.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PageTestComponent } from './page-test/page-test.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from 'src/app/app.routing.module';
import { ListaGruposComponent } from './index/lista-grupos/lista-grupos.component';



@NgModule({
  declarations: [
    IndexComponent,
    NotFoundComponent,
    PageTestComponent,
    ModalComponent,
    ListaGruposComponent
  ],
  imports: [
    CommonModule,
    SistemaModule,
    PopoverModule,

    BlocosModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule
  ]
})
export class PagesModule { }
