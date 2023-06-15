export class Imagen {
  key!: string;
  nombre!: string;
  url!: string;
  file: File;

  constructor(file: File) {
      this.file = file;
    }
}
