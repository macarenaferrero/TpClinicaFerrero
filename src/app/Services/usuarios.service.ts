import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, collectionData, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Paciente } from '../Clases/paciente';
import { Observable, map } from 'rxjs';
import { Especialista } from '../Clases/especialista';
import { Usuario } from '../Clases/usuario';
import { Administrador } from '../Clases/administrador';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
coleccionPacientes: CollectionReference<DocumentData> = collection(this.firestore, 'pacientes');
coleccionEspecialistas: CollectionReference<DocumentData> = collection(this.firestore, 'especialistas');
coleccionEspecialidades: CollectionReference<DocumentData> = collection(this.firestore, 'especialidades');
coleccionAdministradores: CollectionReference<DocumentData> = collection(this.firestore, 'administradores');
especialidades!: Observable<any[]>;
especialistas!: Observable<any[]>;
pacientes!: Observable<any[]>;
administradores!: Observable<Administrador>;
especialistasPorEspecialidad!: Array<any>;

constructor(private firestore: Firestore) {
  this.especialidades = collectionData(this.coleccionEspecialidades);
  this.especialistas = collectionData(this.coleccionEspecialistas);
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

updateEspecialista(especialistaModificado: Especialista): Promise<void> {
  return new Promise((resolve, reject) => {
    const especialista = doc(this.coleccionEspecialistas, especialistaModificado.id);
    updateDoc(especialista, {
      isHabilitado: especialistaModificado.isHabilitado
    })
      .then(() => {
        resolve(); // Se resuelve la promesa si la operación se completa correctamente
      })
      .catch((error) => {
        reject(error); // Se rechaza la promesa si ocurre un error durante la operación
      });
  });
}

getListadoEspecialistas(): Observable<any>{
  const observable = collectionData(this.coleccionEspecialistas);
  return observable;
}

getEspecialistasPorEspecialidad(especialidad: string): Array<any>{
  this.especialistas.forEach((item:any) => {
    if (item.especialidades === especialidad) {
      this.especialistasPorEspecialidad.push(item);
    }
  });
  return this.especialistasPorEspecialidad;
}


verificarAprobacionAdmin(especialista: Especialista) {
  this.especialistas.forEach((item:any) => {
    if (item.email === especialista.email) {
      if (item.isHabilitado) {
        return true;
      }
      else {
        return false;
      }
    }
    return false;
  });
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

crearAdministrador(administradorDato: Paciente): Promise<void> {
  return new Promise((resolve, reject) => {
    const administradores = doc(this.coleccionAdministradores);
    setDoc(administradores, {
      id: administradores.id,
    ...administradorDato // Spread operator para agregar las propiedadesrepartidor al objeto
    })
      .then(() => {
        resolve(); // Se resuelve la promesa si la operación se completa correctamente
      })
      .catch((error) => {
        reject(error); // Se rechaza la promesa si ocurre un error durante la operación
      });
  });
}

getListadoAdministradores(): Observable<any>{
  const observable = collectionData(this.coleccionAdministradores);
  return observable;
}


updateEspecialistaHorarios(especialistaModificado: Especialista): Promise<void> {
  return new Promise((resolve, reject) => {
    const especialistas = doc(this.coleccionEspecialistas, especialistaModificado.id);
    updateDoc(especialistas, {
      horarios: Object.assign({}, especialistaModificado.horarios)
    })
    .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

getPacienteByMail(email:string){
  let paciente: any;
  this.pacientes.forEach((item:any) => {
    if (item.email === email) {
      paciente = item;
    }
  });
  return paciente;
}

getEspecialistaByMail(email:string){
  let especialista: any;
  this.especialistas.forEach((item:any) => {
    if (item.email === email) {
      especialista = item;
    }
  });
  return especialista;
}

getAdministradorByMail(email:string){
  let administrador: any;

  this.administradores.forEach((item:Administrador) => {
    if (item.email === email) {
      administrador = item;
    }
  });
  return administrador;
}


}
