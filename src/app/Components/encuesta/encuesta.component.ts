import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/Clases/usuario';
import { EncuestaService } from 'src/app/Services/encuesta.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent {

  @Input() turno!: any;
  formulario!: FormGroup;
  usuario: Usuario = new Usuario();
  public usuario$: Observable<any> = this.auth.user;

  constructor(public fv: FormBuilder, public auth: AngularFireAuth, public encuestaSvc: EncuestaService, public router: Router) {
    //this.usuario = JSON.parse(this.ls.get('usuarioLs'));
    this.usuario$.subscribe((result: any) => {
      this.usuario.email = result['email'];
      this.usuario.id = result['uid'];
    });


    this.formulario = fv.group({
      // nombre:["", [Validators.required, this.validarNombre]],
      // apellido:["", Validators.required],
      // edad:["", [Validators.required, Validators.min(18), Validators.max(99)]],
      // telefono:["", [Validators.required, Validators.maxLength(10), this.validarTelefono, this.validarTelefonoLenth]],
      pregUno:["", Validators.required],
      pregDos:["", Validators.required],
      pregTres:["", Validators.required]

    });
   }

  ngOnInit(): void {
  }

  enviar(){
    const pregUno = this.formulario.controls['pregUno'].value;
    const pregDos = this.formulario.controls['pregDos'].value;
    const pregTres = this.formulario.controls['pregTres'].value;

    this.encuestaSvc.addEncuesta(this.turno, pregUno, pregDos, pregTres);
    this.router.navigate(['home']);
  }
}
