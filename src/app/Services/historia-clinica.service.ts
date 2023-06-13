import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CollectionReference, DocumentData, collection } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {
  coleccionHistorias: CollectionReference<DocumentData> = collection(this.firestore, 'historiaClinica');

  constructor(public router: Router, public firestore: Firestore) {

  }

//   guardarHistoriaClinica(historia: HistoriaClinica) :any{
//     console.log(historia);
//     this.firestore.collection('historiaClinica').add({
//       presion: historia.presion,
//       altura: historia.altura,
//       peso: historia.peso,
//       clave1: historia.clave1,
//       temperatura: historia.temperatura,
//       valor1: historia.valor1,
//       clave2: historia.clave2,
//       valor2: historia.valor2,
//       turnoId : historia.turnoId,
//       id: ""
//     });
//   }
//
}
