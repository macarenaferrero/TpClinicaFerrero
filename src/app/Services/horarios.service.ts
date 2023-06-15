import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, doc, setDoc } from 'firebase/firestore';
import { Horarios } from '../Clases/horarios';
import { Observable } from 'rxjs';
import { collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  coleccionHorarios: CollectionReference<DocumentData> = collection(this.firestore, 'horarios');


  constructor(private firestore: Firestore) {
  }


  crearHorario(horarioDato: Horarios): Promise<void> {
    return new Promise((resolve, reject) => {
      const horarios = doc(this.coleccionHorarios);
      setDoc(horarios, {
        id: horarios.id,
      ...horarioDato // Spread operator para agregar las propiedadesrepartidor al objeto
      })
        .then(() => {
          resolve(); // Se resuelve la promesa si la operación se completa correctamente
        })
        .catch((error) => {
          reject(error); // Se rechaza la promesa si ocurre un error durante la operación
        });
    });
  }

  getListadoHorarios(): Observable<any>{
    const observable = collectionData(this.coleccionHorarios);
    return observable;
  }}
