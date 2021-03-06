import { FilterPipe } from './pipes/filter.pipe';
import { LoadComponent } from './shared/load/load.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { NgModule, LOCALE_ID, Component } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);

// Modulos
import { BlocosModule } from './themes/decasa/blocos/blocos.module';
import { PagesModule } from './themes/decasa/pages/pages.module';
import { CoreModule } from './themes/decasa/core/core.module';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatBadgeModule} from '@angular/material/badge';

// Interceptor
import { TokenInterceptor } from './events/http/intercepters/token.interceptor';


// TODO: Apagar depois
// Angular material
// import { HttpClientModule } from '@angular/common/http';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatButtonModule} from '@angular/material/button';
// import {MatTableModule} from '@angular/material/table';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import { MatSelectModule } from '@angular/material/select';
// import {MatRadioModule} from '@angular/material/radio';
// import {MatCardModule} from '@angular/material/card';
// import {MatChipsModule} from '@angular/material/chips';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import { MatInputModule } from '@angular/material/input';
// import { MatStepperModule } from '@angular/material/stepper';
// import {MatTooltipModule} from '@angular/material/tooltip';
// import { StarRatingModule } from '@sreyaj/ng-star-rating';
// import { TextMaskModule } from 'angular2-text-mask';
// import { CarouselModule } from 'ngx-owl-carousel-o';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
// import { CoreModule } from './themes/decasa/core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    LoadComponent,
  ],
  imports: [
    BrowserModule,
    MatBadgeModule,
    // Modules,
    BlocosModule,
    PagesModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    MatButtonModule,
    MatStepperModule,


    // TODO: apagar
    // HttpClientModule,
    // MatInputModule,
    // MatTableModule,
    // MatCheckboxModule,
    // MatTooltipModule,
    // MatFormFieldModule,
    // MatSelectModule,
    // MatRadioModule,
    // TextMaskModule,
    // MatCardModule,
    // CarouselModule,
    // StarRatingModule,
    // MatChipsModule,
    // FormsModule,
    // ReactiveFormsModule,
    // MatAutocompleteModule,
    // MatToolbarModule,
    // ScrollToModule.forRoot()
  ],
  entryComponents: [],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
