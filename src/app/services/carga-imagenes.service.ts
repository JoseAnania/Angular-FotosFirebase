/* Servicio creado para manejar la lógica de la carga de Archivos (Un servicio es usado para mantener lógica que es compartida por otros componentes u otros servicios.) */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from "firebase/compat/app";
import { FileItem } from '../models/file-item';
import "firebase/compat/storage"

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  // definimos las propiedades
  private CARPETA_IMAGENES = 'img';
  

  // inyectamos el Angular Firebase (servirá como BD)
  constructor( private bd: AngularFirestore ) { }

  // método para cargar las imágenes en Firebase (en el Storage de Firebase)
  cargarImágenesFirebase( imagenes: FileItem[] ) {

    // según documentación
    const storageRef = firebase.storage().ref();

    // hacemos un barrido de todas las imágenes cargadas
    for( const item of imagenes ) {

      //validamos
      item.estaSubiendo = true;
      if (item.progreso >= 100) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask =
                         storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`)
                                   .put(item.archivo);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot)=> item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100, 
                (error)=> console.error('Error al subir', error),
                ()=> {
                  console.log('Imagen cargada correctamente');
                  uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                    item.url = url;
                    item.estaSubiendo = false;
                    this.guardarImagen({
                      nombre: item.nombreArchivo,
                      url: item.url
                    })
                  });
                });
    }
  }

  // método para guardar las imágenes en Firebase
  private guardarImagen( imagen: {nombre: string, url: string} ) {

    this.bd.collection(`/${this.CARPETA_IMAGENES}`).add(imagen);
  }
}
