import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CollectionReference, DocumentData, Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  coleccionEncuesta: CollectionReference<DocumentData> = collection(this.firestore, 'encuestas');
  encuestas: any;

  constructor(public firestore: Firestore, public router: Router, public afAuth: AngularFireAuth) {
    this.encuestas = collectionData(this.coleccionEncuesta);
  }


   addEncuesta(turno: any, pregUno:string, pregDos:string, pregTres:string): Promise<void> {
    return new Promise((resolve, reject) => {
      const encuestas = doc(this.coleccionEncuesta);
      setDoc(encuestas, {
        turno: turno,
        pregUno: pregUno,
        pregDos: pregDos,
        pregTres: pregTres,
        fecha: new Date().toLocaleDateString()
      })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

}
