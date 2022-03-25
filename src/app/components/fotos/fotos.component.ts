import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

// exportamos según documentación de AngularFire2
export interface Item { nombre: string; url: string; }

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styles: [
  ]
})
export class FotosComponent implements OnInit {

  // copiamos los parámetros según documentación de AngularFire2
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  // inyectamos según documentación de AngularFire2
  constructor(private afs: AngularFirestore) { 

    // asignamos según documentación de AngularFire2
    this.itemsCollection = afs.collection<Item>('img');
    this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit(): void {
  }

}
