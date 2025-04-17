// Importações principais do Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Importação do componente raiz
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent  // Componentes que pertencem a este módulo
  ],
  imports: [
    BrowserModule,         // O módulo necessário para rodar no navegador
    FormsModule,           // Para formulários baseados em template
    ReactiveFormsModule,   // Para formulários reativos
    HttpClientModule       // Para requisições HTTP
  ],
  providers: [],           // Pode-se adicionar serviços ou providers aqui
  bootstrap: [AppComponent] // Componente principal da aplicação
})
export class AppModule { }
