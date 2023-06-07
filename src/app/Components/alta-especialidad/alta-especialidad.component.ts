import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-alta-especialidad',
  templateUrl: './alta-especialidad.component.html',
  styleUrls: ['./alta-especialidad.component.css']
})
export class AltaEspecialidadComponent {

  formulario!: FormGroup;
  especialidad!: string;

  constructor(public fv: FormBuilder, private usuarioSvc: UsuariosService) {
    this.formulario = fv.group({
      especialidad: [""]
    });
  }

  ngOnInit(): void {
  }

  guardar(){
    this.especialidad = this.formulario.controls['especialidad'].value;
    this.usuarioSvc.addEspecilidad(this.especialidad);
  }
}
