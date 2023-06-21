import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Paciente } from 'src/app/Clases/paciente';

@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.component.html',
  styleUrls: ['./listado-pacientes.component.css']
})
export class ListadoPacientesComponent {
  paciente!:Paciente;
  @Input()  listadoPacientes?:Paciente[]=[];
  @Output() pacienteSeleccionado = new EventEmitter<Paciente>();

  enviarPaciente(paciente: Paciente){
    this.pacienteSeleccionado.emit(paciente);
  }
}
