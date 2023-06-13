export class Administrador {
  nombre?:string;
  apellido?:string;
  edad?:number;
  dni?:number;
  email?:string;
  password?:string;
  imagen1?:string;
  isAdmin:boolean=true;
  isEspecialista:boolean=false;

  constructor(nombre:string, apellido:string, edad:number, dni:number, email:string, password:string,
    obraSocial:string, imagen1:string, imagen2:string, isAdmin:boolean=true, isEspecialista:boolean=false){
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.dni = dni;
      this.email = email;
      this.password = password;
      this.imagen1 = imagen1;
  }
}
