export class Paciente {
  id?:string;
  nombre?:string;
  apellido?:string;
  edad?:number;
  dni?:number;
  email?:string;
  password?:string;
  obraSocial?:string;
  imagen1?:string;
  imagen2?:string;
  isAdmin:boolean=false;
  isEspecialista:boolean=false;

  constructor(id:string,nombre:string, apellido:string, edad:number, dni:number, email:string, password:string,
    obraSocial:string, imagen1:string, imagen2:string, isAdmin:boolean=false, isEspecialista:boolean=false){
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.dni = dni;
      this.email = email;
      this.password = password;
      this.obraSocial = obraSocial;
      this.imagen1 = imagen1;
      this.imagen2 = imagen2;
  }
}
