/* Archivo enrutador, contiene las definición de las rutas de la APP */
import { RouterModule, Routes } from "@angular/router";
import { FotosComponent } from './components/fotos/fotos.component';
import { CargaComponent } from './components/carga/carga.component';

// definimos las rutas
const RUTAS: Routes = [
    {path: 'fotos', component: FotosComponent},
    {path: 'carga', component: CargaComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'fotos'},
];

// permitimos la exportación para usarlo en el proyecto
export const APP_ROUTES = RouterModule.forRoot(RUTAS);