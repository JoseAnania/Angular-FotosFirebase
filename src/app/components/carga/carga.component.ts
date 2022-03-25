import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: [
  ]
})
export class CargaComponent implements OnInit {

  // propiedades
  archivos: FileItem[] = [];
  estaSobreDrop = false;

  // inyectamos el servicio
  constructor( public _cargaImagenes: CargaImagenesService ) { }

  ngOnInit(): void {
  }

  // método para cargar imágenes
  cargarImagenes() {

    this._cargaImagenes.cargarImágenesFirebase(this.archivos);
  }

  // método para limpiar imágenes
  limpiarArchivos() {

    this.archivos = [];
  }

}
