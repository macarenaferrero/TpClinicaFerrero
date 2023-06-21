import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEspecialista'
})
export class FilterEspecialistaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];

    if(arg != null){
      for (const post of value) {
        if (post.especialidad.indexOf(arg) > -1 || post.paciente.indexOf(arg) > -1
        || post.estado.indexOf(arg) > -1 || post.fecha.indexOf(arg) > -1 || post.hora.indexOf(arg) > -1 || post.comentariosPaciente.indexOf(arg) > -1 || post.comentariosEspecialista.indexOf(arg) > -1 || post.comentariosAdmin.indexOf(arg) > -1
        || post.historiaClinica.temperatura.indexOf(arg) > -1 || post.historiaClinica.presion.indexOf(arg) > -1 || post.historiaClinica.peso.indexOf(arg) > -1 || post.historiaClinica.altura.indexOf(arg) > -1 || post.historiaClinica.clave1.indexOf(arg) > -1
        || post.historiaClinica.valor1.indexOf(arg) > -1 || post.historiaClinica.clave2.indexOf(arg) > -1 || post.historiaClinica.valor2.indexOf(arg) > -1 || post.historiaClinica.clave3.indexOf(arg) > -1 || post.historiaClinica.valor3.indexOf(arg) > -1)  {
          resultPosts.push(post);
        };
      };
      return resultPosts;
    }
    else{
      return value;
    }

  }

}
