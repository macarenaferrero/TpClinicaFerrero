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
        || post.paciente.indexOf(arg) > -1) {
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
