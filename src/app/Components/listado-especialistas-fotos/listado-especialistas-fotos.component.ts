import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Especialista } from 'src/app/Clases/especialista';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-listado-especialistas-fotos',
  templateUrl: './listado-especialistas-fotos.component.html',
  styleUrls: ['./listado-especialistas-fotos.component.css']
})
export class ListadoEspecialistasFotosComponent {
  @Input()  listadoEspecialistas?:Especialista[]=[];
  @Output() especialistaSeleccionado = new EventEmitter<Especialista>();
  especialista!:Especialista;
  especialidades: any = [];

constructor(){}

  enviarEspecialista(especialista:Especialista){
    this.especialistaSeleccionado.emit(especialista);
  }


}
