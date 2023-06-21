import { Horarios } from "./horarios";

export class Especialista {
  id?:string;
  nombre?:string;
  apellido?:string;
  edad?:number;
  dni?:number;
  email!:string;
  password!:string;
  especialidades:string[];
  imagen1?:string;
  isHabilitado:boolean=false;
  isAdmin:boolean=false;
  isEspecialista:boolean=true;
  horarios?: any;

  constructor(id:string,nombre:string, apellido:string, edad:number, dni:number, email:string, password:string,
    especialidades:string[], imagen1:string,isHabilitado:boolean=false, isAdmin:boolean=false, isEspecialista:boolean=true, horarios:any){
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.dni = dni;
      this.email = email;
      this.password = password;
      this.especialidades = especialidades;
      this.imagen1 = imagen1;
      this.isHabilitado = isHabilitado;
      this.horarios = horarios;
    }
}
