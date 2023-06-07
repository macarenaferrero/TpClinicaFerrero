import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-lista-especialidades',
  templateUrl: './lista-especialidades.component.html',
  styleUrls: ['./lista-especialidades.component.css']
})
export class ListaEspecialidadesComponent {


  @Output() especialidadSeleccionada: EventEmitter<any> = new EventEmitter<any>();
  @Input() especialidades: any[] = [];
  especialidad: any;
  especialidadesCargadas: Observable<any[]> | undefined;

  constructor(public usuarioSvc: UsuariosService) { }

  ngOnInit(): void {
    this.especialidadesCargadas = this.usuarioSvc.getEspecialidades();
    this.especialidadesCargadas.subscribe(especialidades => {
      this.especialidades = especialidades;
    });
  }


  asignarEspecialidad(especialidad: any){
    console.log(especialidad);

    this.especialidadSeleccionada.emit(especialidad);
  }

}
