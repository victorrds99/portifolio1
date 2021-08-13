import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastrarComponent } from './componentes/cadastrar/cadastrar.component';
import { InicialComponent } from './componentes/inicial/inicial.component';
import { EditarComponent } from './componentes/editar/editar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalConfirmacaoComponent } from './componentes/modal-confirmacao/modal-confirmacao.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastrarComponent,
    InicialComponent,
    EditarComponent,
    ModalConfirmacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
