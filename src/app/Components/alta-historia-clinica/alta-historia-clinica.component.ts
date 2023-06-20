import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HistoriaClinica } from 'src/app/Clases/historia-clinica';
import { HistoriaClinicaService } from 'src/app/Services/historia-clinica.service';
import { TurnoService } from 'src/app/Services/turno.service';

@Component({
  selector: 'app-alta-historia-clinica',
  templateUrl: './alta-historia-clinica.component.html',
  styleUrls: ['./alta-historia-clinica.component.css']
})
export class AltaHistoriaClinicaComponent {

  @Input() turno: any;
  formulario: FormGroup;

  @Input() TurnoAMostrar: any = "";

  constructor(public fb: FormBuilder, public routeActivate: ActivatedRoute, public historiaClinicaService: HistoriaClinicaService, public route: Router,
     private turnoSvc: TurnoService, private toastr: ToastrService) {
    this.formulario = fb.group({
      Altura: ["", Validators.required],
      Peso: ["", Validators.required],
      Temperatura: ["", [Validators.required, Validators.min(34), Validators.max(45)]],
      Presion: ["", [Validators.required]],
      Clave1: ["", Validators.required],
      Valor1: ["", Validators.required],
      Clave2: ["", Validators.required],
      Valor2: ["", Validators.required],
      Clave3: [""],
      Valor3: [""],
      Clave4: [""],
      Valor4: [""],
      Clave5: [""],
      Valor5: [""],
      Clave6: [""],
      Valor6: [""],

    });
  }

  ngOnInit(): void {
  }

  aceptar() {
    const historia = new HistoriaClinica();
    historia.altura = this.formulario.controls['Altura'].value;
    historia.peso = this.formulario.controls['Peso'].value;
    historia.temperatura = this.formulario.controls['Temperatura'].value;
    historia.presion = this.formulario.controls['Presion'].value;
    historia.clave1 = this.formulario.controls['Clave1'].value;
    historia.valor1 = this.formulario.controls['Valor1'].value;
    historia.clave2 = this.formulario.controls['Clave2'].value;
    historia.valor2 = this.formulario.controls['Valor2'].value;
    historia.clave3 = this.formulario.controls['Clave3'].value;
    historia.valor3 = this.formulario.controls['Valor3'].value;

    this.formulario.reset();
    this.turnoSvc.updateTurnoHistoriaClinica(historia, this.turno.id);
    this.toastr.success('Historia clinica cargada con exito', 'Historia clinica');
    this.route.navigate(['/home']);
    window.scrollTo(0, 0);
  }


}
