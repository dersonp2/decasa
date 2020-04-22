import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TextMaskModule } from 'angular2-text-mask';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

import { DialogAnexarComponent } from './dialog-anexar/dialog-anexar.component';
import { DialogCartaoComponent } from './dialog-cartao/dialog-cartao.component';
import { DialogCreditoComponent } from './dialog-credito/dialog-credito.component';
import { DialogMembrosComponent } from './dialog-membros/dialog-membros.component';
import { DialogServicosComponent } from './dialog-servicos/dialog-servicos.component';
import { DialogComprovanteComponent } from './dialog-comprovante/dialog-comprovante.component';

@NgModule({
  declarations: [
    DialogAnexarComponent,
    DialogCartaoComponent,
    DialogComprovanteComponent,
    DialogCreditoComponent,
    DialogMembrosComponent,
    DialogServicosComponent
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
    MatButtonModule
  ],
  exports: [
    DialogAnexarComponent,
    DialogCartaoComponent,
    DialogComprovanteComponent,
    DialogCreditoComponent,
    DialogMembrosComponent,
    DialogServicosComponent
  ],
  entryComponents: [DialogMembrosComponent,
    DialogAnexarComponent, DialogServicosComponent,
    DialogComprovanteComponent,
    DialogCreditoComponent, DialogCartaoComponent],
})
export class DialogModule { }
