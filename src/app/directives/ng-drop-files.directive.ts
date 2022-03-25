/* Directivas del DropZone de Archivos (una Directiva nos permite personalizar el funcionamiento de dicho elemento HTML) */
import { Directive, HostListener, Output, EventEmitter, Input } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  // creación de las propiedades
  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  // cuando se esta posicionando el puntero sobre el DropZone
  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    
    this.mouseSobre.emit(true);

    this._prevenirDetener(event);
  }

  // cuando no se esta posicionado el puntero sobre el DropZone 
  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    
    this.mouseSobre.emit(false);
  }

  // cuando se soltó algo sobre el DropZone
  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    
    const transferencia = this._getTransferencia(event);

    if(!transferencia) {
      return;
    }

    this._extraerArchivos(transferencia.files);

    this._prevenirDetener(event);

    this.mouseSobre.emit(false);
  }

  // método para extender la compatibilidad de los navegadores (en el envío de información)
  private _getTransferencia ( event: any ) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  // método para extraer la información de la transferencia (es decir en el envío de información, al soltar un archivo en el DropZone)
  private _extraerArchivos(archivosLista: FileList) {

    // hacemos un ciclo FOR para barrer las propiedades del objeto (es decir de una transferencia)
    for ( const propiedad in Object.getOwnPropertyNames(archivosLista)) {

      const archivoTemporal = archivosLista[propiedad];

      // si pasa la validación lo transformamos en un arreglo (arreglo de la cantidad de archivos que soltamos en el DropZone)
      if ( this._archivoPuedeSerCargado(archivoTemporal) ) {

        const nuevoArchivo = new FileItem (archivoTemporal);
        this.archivos.push(nuevoArchivo);
      }
    }
  }    
  
  // validación para que el navegador no abra la imagen por defecto (es decir cuando hacemos el drop, no abra la imagen)
  private _prevenirDetener( event: any ) {
    event.preventDefault();
    event.stopPropagation();
  }

  // validación para verificar que el archivo dropeado ya no exista
  private _archivoYaDroppeado( nombreArchivo: string ): boolean {
    for(const archivo of this.archivos) {
      if(archivo.nombreArchivo === nombreArchivo) {
        console.log('El archivo ' + nombreArchivo + ' ya está agregado');
        return true;
      }
    }
    return false;
  }

  // validación para aceptar sólo imágenes y no otro tipo de archivos
  private _esImagen( tipoArchivo: string): boolean {
    return ( tipoArchivo === '' || tipoArchivo === undefined ) ? false : tipoArchivo.startsWith('image');
  }

  // validación para comprobar si el archivo puede ser cargado
  private _archivoPuedeSerCargado( archivo: File ): boolean {
    if(  !this._archivoYaDroppeado(archivo.name) && this._esImagen(archivo.type)){
      return true;
    }else {
      return false;
    }
  }
}
