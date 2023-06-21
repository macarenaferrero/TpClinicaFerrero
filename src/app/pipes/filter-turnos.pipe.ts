import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTurnos'
})
export class FilterTurnosPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];

    if(arg != null){

      for (const post of value) {
        if (post.especialidad && post.especialidad.indexOf(arg) > -1 ||
          post.paciente && post.paciente.indexOf(arg) > -1 ||
          post.estado && post.estado.indexOf(arg) > -1 ||
          post.fecha && post.fecha.indexOf(arg) > -1 ||
          post.hora && post.hora.indexOf(arg) > -1 ||
          post.comentariosPaciente && post.comentariosPaciente.indexOf(arg) > -1 ||
          post.comentariosEspecialista && post.comentariosEspecialista.indexOf(arg) > -1 ||
          post.comentariosAdmin && post.comentariosAdmin.indexOf(arg) > -1 ||
          post.historiaClinica && (
          post.historiaClinica.temperatura && post.historiaClinica.temperatura ===arg ||
          post.historiaClinica.presion && post.historiaClinica.presion  ===arg ||
          post.historiaClinica.peso && post.historiaClinica.peso  ===arg ||
          post.historiaClinica.altura && post.historiaClinica.altura  ===arg ||
          post.historiaClinica.clave1 && post.historiaClinica.clave1.indexOf(arg) > -1 ||
          post.historiaClinica.valor1 && post.historiaClinica.valor1.indexOf(arg) > -1 ||
          post.historiaClinica.clave2 && post.historiaClinica.clave2.indexOf(arg) > -1 ||
          post.historiaClinica.valor2 && post.historiaClinica.valor2.indexOf(arg) > -1 ||
          post.historiaClinica.clave3 && post.historiaClinica.clave3.indexOf(arg) > -1 ||
          post.historiaClinica.valor3 && post.historiaClinica.valor3.indexOf(arg) > -1))
       {


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
