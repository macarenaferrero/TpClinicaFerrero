import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Especialista } from 'src/app/Clases/especialista';
import { Paciente } from 'src/app/Clases/paciente';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.css']
})
export class CompleteProfileComponent implements OnInit{
isEspecialista:boolean= false;
isPaciente:boolean= false;
registro:FormGroup;
usuario:any;
paciente?:Paciente;
especialidades: any = [];
especialidadSeleccionada: any = [];
especialidadesSeleccionadas: any = [];

constructor(private fb:FormBuilder, private toastr: ToastrService, private router: Router,
  private afAuth:AngularFireAuth, public usuarioService : UsuariosService) {
    this.registro = this.fb.group({
      tipo:['',[Validators.required]],
      nombre:['',[Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      apellido:['',[Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      edad:['',[Validators.required, Validators.pattern('^[0-9]*$')]],
      dni:['',[Validators.required, Validators.pattern('^[0-9]*$')]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]],
      imagen1:['',[Validators.required]],
    });

}
ngOnInit(){
  this.isEspecialista = false;
  this.isPaciente = false;

}

DatosEspecialista(){
  this.isEspecialista=true;
  this.isPaciente =false;
  this.registro.addControl('especialidades', new FormControl(''));
}

DatosPaciente(){
  this.isEspecialista=false;
  this.isPaciente =true;
  this.registro.addControl('obraSocial', new FormControl('', Validators.required));
  this.registro.addControl('imagen2', new FormControl('', Validators.required));
}

RegistrarPaciente(){
console.log("guardando paciente");
const datoGrabar: Paciente = {
  nombre: this.registro.get('nombre')?.value,
  apellido: this.registro.get('apellido')?.value,
  edad: this.registro.get('edad')?.value,
  dni: this.registro.get('dni')?.value,
  email: this.registro.get('email')?.value,
  password: this.registro.get('password')?.value,
  imagen1: this.registro.get('imagen1')?.value,
  obraSocial: this.registro.get('obraSocial')?.value,
  imagen2: this.registro.get('imagen2')?.value
}
this.usuarioService.crearPaciente(datoGrabar).then(()=>{
  this.toastr.success('El paciente se registro con exito', 'Paciente Registrado');
  this.router.navigate(['/home']);
}).catch(error=>{
  this.toastr.error('Error al registrarse: ' + error, 'Error');
  console.log(error);
  this.router.navigate(['/bienvenida']);
});
}


RegistrarEspecialista(){


  console.log("guardando especialista");
  const datoGrabar: Especialista = {
    nombre: this.registro.get('nombre')?.value,
    apellido: this.registro.get('apellido')?.value,
    edad: this.registro.get('edad')?.value,
    dni: this.registro.get('dni')?.value,
    email: this.registro.get('email')?.value,
    password: this.registro.get('password')?.value,
    imagen1: this.registro.get('imagen1')?.value,
    especialidades: this.especialidadesSeleccionadas
  }
  this.usuarioService.crearEspecialista(datoGrabar).then(()=>{
    this.toastr.success('El especialista se registro con exito', 'Especialista Registrado');
    this.router.navigate(['/home']);
  }).catch(error=>{
    this.toastr.error('Error al registrarse: ' + error, 'Error');
    console.log(error);
    this.router.navigate(['/bienvenida']);
  });
  }

  asignarEspecialidadSeleccionada(especialidad: any){

    this.especialidadSeleccionada = especialidad;
    this.especialidadesSeleccionadas.push(this.especialidadSeleccionada.especialidadData);
    this.registro.controls['especialidades'].setValue(this.especialidadesSeleccionadas);
    console.log(this.especialidadesSeleccionadas);
  }

}
