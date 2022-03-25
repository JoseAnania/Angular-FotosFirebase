import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FotosComponent } from './components/fotos/fotos.component';
import { CargaComponent } from './components/carga/carga.component';
import { APP_ROUTES } from './app.routes';
import { CargaImagenesService } from './services/carga-imagenes.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';



@NgModule({
  declarations: [
    AppComponent,
    FotosComponent,
    CargaComponent,
    NgDropFilesDirective
  ],
  imports: [
    BrowserModule,
    APP_ROUTES, // importamos el enrutador para poder usar las Rutas en cualquier Componente
    AngularFireModule.initializeApp(environment.firebase) // importamos el Firebase que nos servirá como BD  
  ],
  providers: [
    CargaImagenesService, // importamos el Servicio para poder usarlo en cualquier Componente
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
