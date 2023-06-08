import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from 'src/app/Clases/usuario';

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

constructor(private fb:FormBuilder, private afAuth:AngularFireAuth, private router:Router, private toastr:ToastrService) {
  this.createAccount = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]],
    name:['',[Validators.required,Validators.minLength(3)]],
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
    console.log(user);
    console.log("Ingreso satisfactorio");
      this.toastr.success("Ingreso satisfactorio","Sesión iniciada",{timeOut: 1000});
      this.router.navigate(['/home']);
  }).catch((error:any) => {
    this.loading = false;
    this.toastr.error(error, "Error");
  })
}

accesoRapido(){
  this.inicioSesion.setValue({
    email: "macarenaferrero@gmail.com",
    password:"123456"
  });
}

registrar(){
  this.loading = true;
  this.afAuth
  .createUserWithEmailAndPassword(this.Usuario.email, this.Usuario.pass)
  .then(() => {
    console.log("Usuario creado con exito");
    this.toastr.success("Usuario creado con exito", 'Usuario exitoso',{timeOut: 1000});
    this.router.navigate(['/completeProfile']);
  }).catch((error) => {
    this.loading = false;
      this.toastr.error(error, "Error");
  });
}
}
