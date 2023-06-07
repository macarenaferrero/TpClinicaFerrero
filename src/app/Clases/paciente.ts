export class Paciente {
  nombre?:string;
  apellido?:string;
  edad?:number;
  dni?:number;
  email?:string;
  password?:string;
  obraSocial?:string;
  imagen1?:string;
  imagen2?:string;

  constructor(nombre:string, apellido:string, edad:number, dni:number, email:string, password:string,
    obraSocial:string, imagen1:string, imagen2:string){
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
