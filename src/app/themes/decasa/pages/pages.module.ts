import {PopoverModule} from 'ngx-smart-popover';
import {BlocosModule} from '../blocos/blocos.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {SistemaModule} from './sistema/sistema.module';
import {IndexComponent} from './index/index.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {PageTestComponent} from './page-test/page-test.component';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {AppRoutingModule} from 'src/app/app.routing.module';
import {ListaGruposComponent} from './index/lista-grupos/lista-grupos.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';


import {DragScrollModule} from 'ngx-drag-scroll';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ManutencaoComponent } from './manutencao/manutencao.component';
import {DpDatePickerModule} from 'ng2-date-picker';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
  declarations: [
    IndexComponent,
    NotFoundComponent,
    PageTestComponent,
    ListaGruposComponent,
    ManutencaoComponent
  ],
  imports: [
    DpDatePickerModule,
    CommonModule,
    SistemaModule,
    PopoverModule,
    CarouselModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,

    BlocosModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    DragScrollModule,
  ]
})
export class PagesModule {
}
