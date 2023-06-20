import { Injectable } from '@angular/core';
import { Turno } from '../Clases/turno';
import { Observable } from 'rxjs';
import { CollectionReference, DocumentData, Firestore, collection, collectionData, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Paciente } from '../Clases/paciente';
import { Especialista } from '../Clases/especialista';
import { HistoriaClinica } from '../Clases/historia-clinica';


@Injectable({
  providedIn: 'root'
})
export class TurnoService {


  coleccionTurnos: CollectionReference<DocumentData> = collection(this.db, 'turnos');

  turnos!: Observable<any>;
  turnosPorEspecialidad: Array<any> = [];
  turnosPorDia: Array<any> = [];
  turnosPorPaciente: Array<any> = [];
  turnosPorEspecialista: Array<any> = [];
  cantTurnosPorEspecialidad: any;
  historiasClinicas!: Array<any>;

  constructor(public db: Firestore) {
    this.turnos = this.getListadoTurnos()
    console.log("turnos desde constructor service "+this.turnos);
  }

  getListadoTurnos(): Observable<any>{
    const observable = collectionData(this.coleccionTurnos);
    return observable;
  }

  // getHistoriaClinica(idPaciente: string){
  //   console.log("id paciente desde service "+idPaciente);
  //   console.log("turnos desde service "+this.turnos);
  //   this.turnos.subscribe((turnos: Turno) => {
  //     console.log("turnos desde service "+turnos);
  //     if(turnos.idPaciente == idPaciente){
  //       this.historiasClinicas.push(turnos.historiaClinica)
  //     }
  //   });
  //   console.log("historia clinica desde service "+this.historiasClinicas);
  //   return this.historiasClinicas;
  // }



  addTurno(turnoData: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const turnos = doc(this.coleccionTurnos);
      setDoc(turnos, {
        id: turnos.id,
      ...turnoData
      })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }


  updateTurno(turnoAModificar: Turno): Promise<void> {
    return new Promise((resolve, reject) => {
      const turnos = doc(this.coleccionTurnos, turnoAModificar.id);
      updateDoc(turnos, {
        paciente: turnoAModificar.paciente,
        especialista: turnoAModificar.especialista,
        especialidad: turnoAModificar.especialidad,
        fecha: turnoAModificar.fecha,
        hora: turnoAModificar.hora,
        estado: turnoAModificar.estado,
        comentariosPaciente: turnoAModificar.comentariosPaciente,
        comentariosEspecialista: turnoAModificar.comentariosEspecialista,
        historiaClinica: turnoAModificar.historiaClinica
      })
        .then(() => {
          resolve(); // Se resuelve la promesa si la operación se completa correctamente
        })
        .catch((error) => {
          reject(error); // Se rechaza la promesa si ocurre un error durante la operación
        });
    });
  }


  updateTurnoEstado(turnoAModificar: Turno): Promise<void> {
    return new Promise((resolve, reject) => {
      const turno = doc(this.coleccionTurnos, turnoAModificar.id);
      updateDoc(turno, {
        estado: turnoAModificar.estado,
      })
        .then(() => {
          resolve(); // Se resuelve la promesa si la operación se completa correctamente
        })
        .catch((error) => {
          reject(error); // Se rechaza la promesa si ocurre un error durante la operación
        });
    });
  }



  updateTurnoEstadoComentariosPaciente(turnoAModificar: Turno): Promise<void> {
    return new Promise((resolve, reject) => {
      const turno = doc(this.coleccionTurnos, turnoAModificar.id);
      updateDoc(turno, {
        estado: turnoAModificar.estado,
        comentariosPaciente: turnoAModificar.comentariosPaciente
      })
        .then(() => {
          resolve(); // Se resuelve la promesa si la operación se completa correctamente
        })
        .catch((error) => {
          reject(error); // Se rechaza la promesa si ocurre un error durante la operación
        });
    });
  }



  updateTurnoEstadoComentariosEspecialista(turnoAModificar: Turno): Promise<void> {
    return new Promise((resolve, reject) => {
      const turno = doc(this.coleccionTurnos, turnoAModificar.id);
      updateDoc(turno, {
        estado: turnoAModificar.estado,
        comentariosEspecialista: turnoAModificar.comentariosEspecialista
      })
        .then(() => {
          resolve(); // Se resuelve la promesa si la operación se completa correctamente
        })
        .catch((error) => {
          reject(error); // Se rechaza la promesa si ocurre un error durante la operación
        });
    });
  }



  updateTurnoEstadoComentariosAdmin(turnoAModificar: Turno): Promise<void> {
    return new Promise((resolve, reject) => {
      const turno = doc(this.coleccionTurnos, turnoAModificar.id);
      updateDoc(turno, {
        estado: turnoAModificar.estado,
        comentariosAdmin: turnoAModificar.comentariosAdmin
      })
        .then(() => {
          resolve(); // Se resuelve la promesa si la operación se completa correctamente
        })
        .catch((error) => {
          reject(error); // Se rechaza la promesa si ocurre un error durante la operación
        });
    });
  }



  updateTurnoHistoriaClinica(historiaClinica: HistoriaClinica, turnoId:string): Promise<void> {
     return new Promise((resolve, reject) => {
      const turno = doc(this.coleccionTurnos, turnoId);
      updateDoc(turno, {
        historiaClinica: Object.assign({}, historiaClinica)
      })
        .then(() => {
          resolve(); // Se resuelve la promesa si la operación se completa correctamente
        })
        .catch((error) => {
          reject(error); // Se rechaza la promesa si ocurre un error durante la operación
        });
    });
  }


  getTurnosByEspecialidad(especialidad: string){
    this.turnos.forEach(turno => {
      if(turno.especialidad == especialidad){
        this.turnosPorEspecialidad.push(turno);
      }
    });
  }

  getTurnosPorDia(fecha:string){
    // return this.db.collection<any>("turnos").valueChanges({idField: "id"});
    this.turnos.forEach(turno => {
      if(turno.fecha == fecha){
        this.turnosPorDia.push(turno);
      }
    });
    return this.turnosPorDia;
  }

  getTurnosPorPaciente(paciente:Paciente): Array<any>{
    console.log("Dentro turno service, turnos: "+ this.turnos);
    this.turnos.forEach(turno => {
      if(turno.idPaciente == paciente.id){
        this.turnosPorPaciente.push(turno);
      }
    });
    return this.turnosPorPaciente;
  }

  getTurnosPorEspecialista(especialista:Especialista){
    // return this.db.collection<any>("turnos").valueChanges({idField: "id"});
    this.turnos.forEach(turno => {
      if(turno.idEspecialista == especialista.id){
        this.turnosPorEspecialista.push(turno);
      }
    });
    return this.turnosPorEspecialista;
  }


}
