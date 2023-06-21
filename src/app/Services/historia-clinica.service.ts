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

}
