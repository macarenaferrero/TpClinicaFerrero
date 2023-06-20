import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-listado-especialidades-fotos',
  templateUrl: './listado-especialidades-fotos.component.html',
  styleUrls: ['./listado-especialidades-fotos.component.css']
})
export class ListadoEspecialidadesFotosComponent {
  @Output() especialidadSeleccionada: EventEmitter<any> = new EventEmitter<any>();
  @Input() especialidades: any[] = [];
  especialidad: any;
  constructor(private usuariosService:UsuariosService) {}

  ngOnInit(): void {
    //this.cargarEspecialidades()
  }


  asignarEspecialidad(especialidad: any){
    console.log(especialidad);

    this.especialidadSeleccionada.emit(especialidad);
  }
}
