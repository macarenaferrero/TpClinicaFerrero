export class Especialidad {
  nombre!: string;
  imgEspecialidadUrl!: string;

  constructor(nombre: string) {
    this.nombre = nombre;
    this.imgEspecialidadUrl = "../../assets/imagenNoEncontrada.jpg";
  }

}
