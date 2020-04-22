import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'src/app/app.routing.module';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

import { NavHorizontalComponent } from './nav-horizontal/nav-horizontal.component';
import { NavVerticalComponent } from './nav-vertical/nav-vertical.component';
import { NavVerticalPerfilComponent } from './nav-vertical-perfil/nav-vertical-perfil.component';
import { NavVerticalUsuarioComponent } from './nav-vertical-usuario/nav-vertical-usuario.component';

@NgModule({
  declarations: [
    NavHorizontalComponent,
    NavVerticalComponent,
    NavVerticalPerfilComponent,
    NavVerticalUsuarioComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  exports: [
    NavHorizontalComponent,
    NavVerticalComponent,
    NavVerticalPerfilComponent,
    NavVerticalUsuarioComponent
  ]
})
export class NavModule { }
