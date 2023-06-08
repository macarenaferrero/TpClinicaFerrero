import { Component, Input } from '@angular/core';
import { Paciente } from 'src/app/Clases/paciente';

@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.component.html',
  styleUrls: ['./listado-pacientes.component.css']
})
export class ListadoPacientesComponent {
  @Input()  listadoPacientes?:Paciente[]=[];
  pacienteAMostrar?: Paciente;
}
