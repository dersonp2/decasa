import {CreditCardDirectivesModule} from 'angular-cc-library';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {TextMaskModule} from 'angular2-text-mask';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {AgmCoreModule} from '@agm/core';
import {MatExpansionModule} from '@angular/material/expansion';


import {DialogAnexarComponent} from './dialog-anexar/dialog-anexar.component';
import {DialogCartaoComponent} from './dialog-cartao/dialog-cartao.component';
import {DialogCreditoComponent} from './dialog-credito/dialog-credito.component';
import {DialogMembrosComponent} from './dialog-membros/dialog-membros.component';
import {DialogServicosComponent} from './dialog-servicos/dialog-servicos.component';
import {DialogComprovanteComponent} from './dialog-comprovante/dialog-comprovante.component';
import {DialogReagendarComponent} from './dialog-reagendar/dialog-reagendar.component';
import {DialogEditarComponent} from './dialog-editar/dialog-editar.component';
import {DialogRastrearComponent} from './dialog-rastrear/dialog-rastrear.component';
import {DialogRescindirComponent} from './dialog-rescindir/dialog-rescindir.component';
import {DialogCancelarComponent} from './dialog-cancelar/dialog-cancelar.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {TabelaServicosComponent} from './dialog-editar/tabela-servicos/tabela-servicos.component';
import {NovoServicoComponent} from './dialog-editar/novo-servico/novo-servico.component';
import {DialogLocalizacaoComponent} from './dialog-localizacao/dialog-localizacao.component';
import {DialogLoginComponent} from './dialog-login/dialog-login.component';
import {DiaologEnderecoComponent} from './diaolog-endereco/diaolog-endereco.component';
import {DialogExcluirComponent} from './dialog-excluir/dialog-excluir.component';
import {DialogAvaliacaoComponent} from './dialog-avaliacao/dialog-avaliacao.component';
import {StarRatingModule} from '@sreyaj/ng-star-rating';
import { NgxStarsModule } from 'ngx-stars';

@NgModule({
  declarations: [
    DialogAnexarComponent,
    DialogCartaoComponent,
    DialogComprovanteComponent,
    DialogCreditoComponent,
    DialogMembrosComponent,
    DialogServicosComponent,
    DialogReagendarComponent,
    DialogEditarComponent,
    DialogRastrearComponent,
    DialogRescindirComponent,
    DialogCancelarComponent,
    TabelaServicosComponent,
    NovoServicoComponent,
    DialogLocalizacaoComponent,
    DialogLoginComponent,
    DiaologEnderecoComponent,
    DialogExcluirComponent,
    DialogAvaliacaoComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    TextMaskModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatExpansionModule,
    CreditCardDirectivesModule,
    RouterModule,
    NgxStarsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAoVvj5lM77pVqV4EyRzJwIHoBK83MGumU'
    }),
    StarRatingModule,
  ],
  exports: [
    DialogAnexarComponent,
    DialogCartaoComponent,
    DialogComprovanteComponent,
    DialogCreditoComponent,
    DialogMembrosComponent,
    DialogServicosComponent,
    DiaologEnderecoComponent,
    DialogExcluirComponent,
    DialogAvaliacaoComponent
  ],
  entryComponents: [DialogAnexarComponent,
    DialogCartaoComponent,
    DialogComprovanteComponent,
    DialogCreditoComponent,
    DialogMembrosComponent,
    DialogServicosComponent,
    DialogReagendarComponent,
    DialogEditarComponent,
    DialogRastrearComponent,
    DialogRescindirComponent,
    DialogCancelarComponent,
    DialogLoginComponent,
    DiaologEnderecoComponent,
    DialogExcluirComponent,
    DialogAvaliacaoComponent
  ],
})
export class DialogModule {
}
