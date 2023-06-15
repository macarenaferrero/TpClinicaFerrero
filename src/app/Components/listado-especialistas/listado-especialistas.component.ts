import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Especialista } from 'src/app/Clases/especialista';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-listado-especialistas',
  templateUrl: './listado-especialistas.component.html',
  styleUrls: ['./listado-especialistas.component.css']
})
export class ListadoEspecialistasComponent {
  @Input()  listadoEspecialistas?:Especialista[]=[];
  @Output() especialistaSeleccionado = new EventEmitter<Especialista>();
  isSolicitarTurno:boolean=true;
  especialista!:Especialista;

  constructor(private afAuth:AngularFireAuth,public especilistaModificado:UsuariosService, private toastr:ToastrService, private router:Router) {
    const currentUrl = this.router.url;
    console.log(currentUrl);
    if(currentUrl == '/solicitar-turno'){
      this.isSolicitarTurno=true;
    }
  }

  enviarEspecialista(especialista:Especialista){
    console.log(especialista);

    this.especialistaSeleccionado.emit(especialista);
  }




  updateEspecialista(especialista:Especialista){
    const datoGrabar: Especialista = {
      id: especialista.id,
      nombre: especialista.nombre,
      apellido: especialista.apellido,
      edad: especialista.edad,
      dni: especialista.dni,
      email: especialista.email,
      password: especialista.password,
      imagen1: especialista.imagen1,
      especialidades: especialista.especialidades,
      isHabilitado: !especialista.isHabilitado,
      isAdmin: especialista.isAdmin,
      isEspecialista: especialista.isEspecialista
    }
    this.especilistaModificado.updateEspecialista(datoGrabar).then(() => {
      this.toastr.success("Especialista modificado","Guardado", { timeOut: 1000 });
    }).catch((error: string) => {
      this.toastr.error("Detalle "+ error, "Error");
    });
  }
}
