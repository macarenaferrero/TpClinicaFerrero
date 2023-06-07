import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, collectionData, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Paciente } from '../Clases/paciente';
import { Observable, map } from 'rxjs';
import { Especialista } from '../Clases/especialista';
import { Usuario } from '../Clases/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
coleccionPacientes: CollectionReference<DocumentData> = collection(this.firestore, 'pacientes');
coleccionEspecialistas: CollectionReference<DocumentData> = collection(this.firestore, 'especialistas');
coleccionEspecialidades: CollectionReference<DocumentData> = collection(this.firestore, 'especialidades');
especialidades!: Observable<any[]>;

constructor(private firestore: Firestore) {
  this.especialidades = collectionData(this.coleccionEspecialidades);
}


crearPaciente(pacienteDato: Paciente): Promise<void> {
  return new Promise((resolve, reject) => {
    const pacientes = doc(this.coleccionPacientes);
    setDoc(pacientes, {
      id: pacientes.id,
    ...pacienteDato // Spread operator para agregar las propiedadesrepartidor al objeto
    })
      .then(() => {
        resolve(); // Se resuelve la promesa si la operación se completa correctamente
      })
      .catch((error) => {
        reject(error); // Se rechaza la promesa si ocurre un error durante la operación
      });
  });
}

getListadoPacientes(): Observable<any>{
  const observable = collectionData(this.coleccionPacientes);
  return observable;
}

crearEspecialista(especialistaDato: Especialista): Promise<void> {
  return new Promise((resolve, reject) => {
    const especialistas = doc(this.coleccionEspecialistas);
    setDoc(especialistas, {
      id: especialistas.id,
    ...especialistaDato
    })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

getListadoEspecialistas(): Observable<any>{
  const observable = collectionData(this.coleccionEspecialistas);
  return observable;
}

addEspecilidad(especialidadData: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const especialidades = doc(this.coleccionEspecialidades);
    setDoc(especialidades, {
      id: especialidades.id,
    especialidadData
    })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

getEspecialidades() {
  return this.especialidades;
}

cargarEspecialidades(especialistaModificado: Especialista): Promise<void> {
  return new Promise((resolve, reject) => {
    const especialista = doc(this.coleccionEspecialistas, especialistaModificado.id);
    updateDoc(especialista, {
      especialidades: especialistaModificado.especialidades
    })
      .then(() => {
        resolve(); // Se resuelve la promesa si la operación se completa correctamente
      })
      .catch((error) => {
        reject(error); // Se rechaza la promesa si ocurre un error durante la operación
      });
  });
}


}
