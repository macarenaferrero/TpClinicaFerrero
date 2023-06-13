import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from 'src/app/Clases/usuario';
import { UsuariosService } from 'src/app/Services/usuarios.service';
import { Especialista } from 'src/app/Clases/especialista';
import { Paciente } from 'src/app/Clases/paciente';
import { Administrador } from 'src/app/Clases/administrador';

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
administradores:Administrador[]=[];
isHabilitado:boolean=true;
usuarioAIngresar:any;

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
    if(user.user.emailVerified){
        this.especialistas.forEach(especialista => {
          if(especialista.email == user.user.email){
            this.usuarioAIngresar = especialista;
          }
        });
        if(this.usuarioAIngresar != null){
          if(this.usuarioAIngresar.isHabilitado){
            this.toastr.success("Ingreso satisfactorio", "Bienvenido", {timeOut: 500});
            this.router.navigate(['/home']);
          }else{
            this.toastr.error("Usuario inhabilitado", "Error", {timeOut: 1000});
            this.loading = false;
            this.usuarioAIngresar = null;
            this.router.navigate(['/bienvenida']);
            this.afAuth.signOut();
          }
        }else{
          this.toastr.success("Ingreso satisfactorio", "Bienvenido", {timeOut: 500});
          this.router.navigate(['/home']);
        }
    }else{
      this.loading = false;
      this.router.navigate(['/bienvenida']);
      this.toastr.error("Verifique su casilla de mail", "Error", {timeOut: 1000});
      this.afAuth.signOut();
    }

  }).catch((error) => {
    this.loading = false;
      this.toastr.error(error, "Error");
  });
}

accesoRapido(){
  this.inicioSesion.setValue({
    email: "tkd05413@omeie.com",
    password:"123456"
  });
}

registrar(){
  this.loading = true;
  this.afAuth
  .createUserWithEmailAndPassword(this.Usuario.email, this.Usuario.pass)
  .then((credential) => {
    credential.user?.sendEmailVerification();
    this.toastr.success("Usuario creado con exito, luego de completar el registro, debe verificar su casilla de mail", 'Usuario creado');
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
