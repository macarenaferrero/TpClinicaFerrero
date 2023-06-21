import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Especialista } from 'src/app/Clases/especialista';
import { Horarios } from 'src/app/Clases/horarios';
import { Paciente } from 'src/app/Clases/paciente';
import { Usuario } from 'src/app/Clases/usuario';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-mis-horarios',
  templateUrl: './mis-horarios.component.html',
  styleUrls: ['./mis-horarios.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('2000ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class MisHorariosComponent implements OnInit {

 formulario!: FormGroup;
 @Input() usuarioHorarios!: Especialista;
 especialidad!: string;
 horario!: Horarios;
 horarioAux!: Horarios;
 dia!: string;
 horarios!: any;
 usuario: Usuario = new Usuario();
 horariosUsuario!: any;
 captchaPropio:boolean = false;
 pacientes:any;
 paciente?:Paciente;
 especialista?:Especialista;
 especialidades:any;
 especialistas:any;

 constructor(public fv: FormBuilder, private usuarioSvc: UsuariosService,
   private toastr: ToastrService, private afAuth:AngularFireAuth) {
   this.formulario = fv.group({
     especialidad: ["", Validators.required],
     lunesHoraDesde: ["", [ this.validarMinutos, this.validarHora]],
     lunesHoraHasta: ["", [ this.validarMinutos, this.validarHora]],
     martesHoraDesde: ["", [ this.validarMinutos, this.validarHora]],
     martesHoraHasta: ["", [ this.validarMinutos, this.validarHora]],
     miercolesHoraDesde: ["", [ this.validarMinutos, this.validarHora]],
     miercolesHoraHasta: ["", [ this.validarMinutos, this.validarHora]],
     juevesHoraDesde: ["", [ this.validarMinutos, this.validarHora]],
     juevesHoraHasta: ["", [ this.validarMinutos, this.validarHora]],
     viernesHoraDesde: ["", [ this.validarMinutos, this.validarHora]],
     viernesHoraHasta: ["", [ this.validarMinutos, this.validarHora]],
     sabadoHoraDesde: ["", [ this.validarMinutos, this.validarSabadoHora]],
     sabadoHoraHasta: ["", [ this.validarMinutos, this.validarSabadoHora]]

   });

 }

 ngOnInit(): void {
    this.afAuth.currentUser.then(user=>{
      if(user){
         this.usuarioSvc.getListadoEspecialistas().subscribe((especialistas:any)=>{
            this.especialistas=especialistas;
            this.especialistas.forEach((especialista:any) => {
              if(especialista.email == user.email){
                this.especialista = especialista;
              }
            });
          });


        }
    });
}



 validarMinutos(control: AbstractControl) {
   const nombre = control.value;
   if(nombre != "" && nombre != null){
     var minutos = nombre.split(':')[1];
     var minCero = minutos.includes("00");
     var minTreinta = minutos.includes("30");

     if (minCero) {
       return null;
     }

     if (minTreinta) {
       return null;
     }

     if(!minCero && !minTreinta)
     return { minValido: true };

   }
   return null;
 }

 validarHora(control: AbstractControl) {
   const nombre = control.value;
   if(nombre != "" && nombre != null){
     var hora = nombre.split(':')[0];

     if (hora <= 8 || hora > 19) {
       return { horaValido: true };
     }
   }
   return null;
 }

 validarSabadoHora(control: AbstractControl) {
   const nombre = control.value;
   if(nombre != "" && nombre != null){
     var hora = nombre.split(':')[0];

     if (hora <= 8 || hora > 14) {
       return { horaValido: true };
     }
   }
   return null;

 }


 registrar() {
   this.horario = new Horarios();
   this.horario.horarioLunes = [{ desde: this.formulario.controls['lunesHoraDesde'].value, hasta: this.formulario.controls['lunesHoraHasta'].value }];
   this.horario.horarioMartes = [{ desde: this.formulario.controls['martesHoraDesde'].value, hasta: this.formulario.controls['martesHoraHasta'].value }];
   this.horario.horarioMiercoles = [{ desde: this.formulario.controls['miercolesHoraDesde'].value, hasta: this.formulario.controls['miercolesHoraHasta'].value }];
   this.horario.horarioJueves = [{ desde: this.formulario.controls['juevesHoraDesde'].value, hasta: this.formulario.controls['juevesHoraHasta'].value }];
   this.horario.horarioViernes = [{ desde: this.formulario.controls['viernesHoraDesde'].value, hasta: this.formulario.controls['viernesHoraHasta'].value }];
   this.horario.horarioSabado = [{ desde: this.formulario.controls['sabadoHoraDesde'].value, hasta: this.formulario.controls['sabadoHoraHasta'].value }];

   if (this.horario) {

    this.especialista!.horarios = this.horario;
    this.usuarioSvc.updateEspecialistaHorarios(this.especialista!)
      .then(() => {
        this.toastr.success('Horarios guardados exitosamente.', '¡Éxito!');
        this.formulario.reset();
        window.scroll(0, 0);
      })
      .catch((error) => {
        this.toastr.error('No se pudieron guardar los horarios.', '¡Error!');
      });
  } else {
    console.error('No se ha inicializado correctamente el objeto Horarios.');
  }
}



}

