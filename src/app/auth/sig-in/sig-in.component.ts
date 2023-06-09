import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from 'src/app/Clases/usuario';
import { UsuariosService } from 'src/app/Services/usuarios.service';
import { Especialista } from 'src/app/Clases/especialista';
import { Paciente } from 'src/app/Clases/paciente';
import { Administador } from 'src/app/Clases/administrador';

@Component({
  selector: 'app-sig-in',
  templateUrl: './sig-in.component.html',
  styleUrls: ['./sig-in.component.css']
})
export class SigInComponent {
createAccount:FormGroup;
inicioSesion:FormGroup;
isSignIn:boolean = false;
Usuario:Usuario=new Usuario;
loading: boolean=false;
especialistas:Especialista[]=[];
pacientes:Paciente[]=[];
administradores:Administador[]=[];
isHabilitado:boolean=true;

constructor(private fb:FormBuilder, private afAuth:AngularFireAuth, private router:Router, private toastr:ToastrService,private usuariosService:UsuariosService) {
  this.createAccount = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]],
    name:['',[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z ]*$')]],
  });

  this.inicioSesion = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]],
  });
}

SignInActive(){
  this.isSignIn = true;
}

SignUpActive(){
  this.isSignIn = false;
}

login(){
  const email = this.inicioSesion.value.email;
  const pass = this.inicioSesion.value.password;
  this.loading = true;
  this.afAuth.signInWithEmailAndPassword(email, pass)
  .then((user:any) => {
    console.log(user.user.displayName);
    if(user.user.displayName == "Especialista"){
      this.especialistas.forEach(especialista => {
        if(especialista.email == user.user.email){
          if(especialista.isHabilitado =false){
            this.toastr.error("El usuario no esta habilitado", "Error",{timeOut: 500});
            this.loading = false;
          }else{
            this.toastr.success("Bienvenido", "Usuario exitoso",{timeOut: 500});
            this.router.navigate(['/home']);
            this.loading = false;
          }
        }
      });
    }else{
      this.toastr.success("Bienvenido", "Usuario exitoso",{timeOut: 500});
            this.router.navigate(['/home']);
            this.loading = false;
    }
  }).catch((error) => {
    this.loading = false;
      this.toastr.error(error, "Error");
  });
}

accesoRapido(){
  this.inicioSesion.setValue({
    email: "verolozano@gmail.com",
    password:"123456"
  });
}

registrar(){
  this.loading = true;
  this.afAuth
  .createUserWithEmailAndPassword(this.Usuario.email, this.Usuario.pass)
  .then(() => {
    this.toastr.success("Usuario creado con exito", 'Usuario exitoso',{timeOut: 500});
    this.router.navigate(['/completeProfile']);
  }).catch((error) => {
    this.loading = false;
      this.toastr.error(error, "Error");
  });
}

ngOnInit(){
  this.usuariosService.getListadoEspecialistas().subscribe((especialistas:any)=>{
  this.especialistas=especialistas;
  });
}
}
