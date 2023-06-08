import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Administador } from 'src/app/Clases/administrador';
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
isAdministrador:boolean=false;
crearAdministrador:boolean=false;

constructor(private fb:FormBuilder, private toastr: ToastrService, private router: Router,
  private afAuth:AngularFireAuth, public usuarioService : UsuariosService, private route:ActivatedRoute) {
    this.registro = this.fb.group({
      tipo:['',[Validators.required]],
      nombre:['',[Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      apellido:['',[Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      edad:['',[Validators.required, Validators.pattern('^[0-9]*$')]],
      dni:['',[Validators.required, Validators.pattern('^[0-9]*$')]],
      email:[''],
      password:[''],
      imagen1:['',[Validators.required]],
    });

}
ngOnInit(){
  this.isEspecialista = false;
  this.isPaciente = false;

  const currentUrl = this.router.url;
  console.log('URL actual:', currentUrl);
  if(currentUrl == '/administrador'){
    this.isAdministrador = true;
    this.isEspecialista = false;
    this.isPaciente = false;
  }

  this.afAuth.currentUser.then(user=>{
    if(user){
      this.usuario = user;
      console.log(this.usuario['email']);
      console.log(this.usuario);
      this.registro.patchValue({email: this.usuario['email']});
    }
  })

}

DatosEspecialista(){
  this.isEspecialista=true;
  this.isPaciente =false;
  this.crearAdministrador=false;
  this.registro.addControl('especialidades', new FormControl(''));

}

DatosPaciente(){
  this.isEspecialista=false;
  this.isPaciente =true;
  this.crearAdministrador=false;
  this.registro.addControl('obraSocial', new FormControl('', Validators.required));
  this.registro.addControl('imagen2', new FormControl('', Validators.required));
}

DatosAdministrador(){
  this.crearAdministrador=true;
  this.isPaciente =false;
  this.isEspecialista=false;
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
  imagen2: this.registro.get('imagen2')?.value,
  isAdmin:false
}
this.usuarioService.crearPaciente(datoGrabar).then(()=>{
  this.afAuth.currentUser.then(user=>{()=>{
    user?.updateProfile({
      photoURL: "habilitado"
    }).then(() => {
      console.log(user.photoURL);
      return user;
    })
  }});
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
    especialidades: this.especialidadesSeleccionadas,
    isHabilitado:true,
    isAdmin:false
  }
  this.usuarioService.crearEspecialista(datoGrabar).then(()=>{
    this.afAuth.currentUser.then(user=>{()=>{
      user?.updateProfile({
        photoURL: "habilitado"
      }).then(() => {
        console.log(user.photoURL);
        return user;
      })
    }});



    this.toastr.success('El especialista se registro con exito', 'Especialista Registrado');
    this.router.navigate(['/home']);
  }).catch(error=>{
    this.toastr.error('Error al registrarse: ' + error, 'Error');
    console.log(error);
    this.router.navigate(['/bienvenida']);
  });
  }

  RegistrarAdministrador(){
    console.log("guardando administrador");
    const datoGrabar: Administador = {
      nombre: this.registro.get('nombre')?.value,
      apellido: this.registro.get('apellido')?.value,
      edad: this.registro.get('edad')?.value,
      dni: this.registro.get('dni')?.value,
      email: this.registro.get('email')?.value,
      password: this.registro.get('password')?.value,
      imagen1: this.registro.get('imagen1')?.value,
      isAdmin:this.isAdministrador
    }
    this.usuarioService.crearAdministrador(datoGrabar).then(()=>{
      this.afAuth
    .createUserWithEmailAndPassword(this.registro.get('email')?.value, this.registro.get('password')?.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      if(user != null){
      user.updateProfile({
        displayName: "Administrador"
      }).then(() => {
        console.log(user.displayName);
        return user;
      })
    }else {
      throw new Error("No se pudo obtener el usuario");
    }
    })
      this.toastr.success('El administrador se registro con exito', 'Administrador Registrado');
    }).catch(error=>{
      this.toastr.error('Error al registrarse el administrador: ' + error, 'Error');
    });
    this.router.navigate(['/home']);
    }

  asignarEspecialidadSeleccionada(especialidad: any){

    this.especialidadSeleccionada = especialidad;
    this.especialidadesSeleccionadas.push(this.especialidadSeleccionada.especialidadData);
    this.registro.controls['especialidades'].setValue(this.especialidadesSeleccionadas);
    console.log(this.especialidadesSeleccionadas);
  }

}
