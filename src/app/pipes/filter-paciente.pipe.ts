import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPaciente'
})
export class FilterPacientePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];

    if(arg != null){

      for (const post of value) {
        if (post.especialidad.indexOf(arg) > -1 || post.especialista.indexOf(arg) > -1)
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
