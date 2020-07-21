import { BlocosModule } from './../../blocos/blocos.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicosModule } from './servicos/servicos.module';
import { PerfilUsuarioModule } from './perfil-usuario/perfil-usuario.module';
import { BoletosNotasComponent } from './boletos-notas/boletos-notas.component';
import { ComprarServicosModule } from './comprar-servicos/comprar-servicos.module';

import { TextMaskModule } from 'angular2-text-mask';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {PopoverModule} from 'ngx-smart-popover';


import { MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from 'src/app/app.routing.module';
import { ClienteComponent } from './cadastro/cliente/cliente.component';
import { ProfissionalComponent } from './cadastro/profissional/profissional.component';
import { BemVindoComponent } from './cadastro/profissional/bem-vindo/bem-vindo.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    BoletosNotasComponent,
    ClienteComponent,
    ProfissionalComponent,
    BemVindoComponent
  ],
  imports: [
    CommonModule,

    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    AppRoutingModule,
    TextMaskModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    PopoverModule,

    BlocosModule,
    ComprarServicosModule,
    ServicosModule,
    PerfilUsuarioModule
  ]
})
export class SistemaModule { }
