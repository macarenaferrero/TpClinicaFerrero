import { Component, Input, SimpleChanges } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Paciente } from 'src/app/Clases/paciente';
import { Turno } from 'src/app/Clases/turno';
import { TurnoService } from 'src/app/Services/turno.service';
import { UsuariosService } from 'src/app/Services/usuarios.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-excel-turnos',
  templateUrl: './excel-turnos.component.html',
  styleUrls: ['./excel-turnos.component.css']
})
export class ExcelTurnosComponent {
  fileName = 'ExcelSheet.xlsx';

  @Input() paciente!: any;
  listaTurnos: any = [];
  turnosLista: any= [];
  lista: any= [];
  public mostrar: boolean = false;
  usuarioLoggeado: any;
  pacientes: any;
  turnosPaciente: any[] = [];
  turnosOcupados: any;

  constructor(private turnoSvc: TurnoService, private afAuth:AngularFireAuth, private usuariosService:UsuariosService) {

  }

  ngOnInit(): void {
    console.log(this.paciente);
  }


  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    this.mostrar = true;
    this.afAuth.currentUser.then(user=>{
      if(user){
        this.usuarioLoggeado = user;
      }
    })


    this.turnoSvc.getListadoTurnos().subscribe((turnos) => {
      this.turnosOcupados = turnos;
      this.buscarHistoria();

    });
  }

  buscarHistoria() {
    this.turnosPaciente = [];
    this.turnosOcupados.forEach((element: any) => {
          if (element.paciente === this.paciente.nombre + " " + this.paciente.apellido) {
            this.turnosPaciente.push(element);
          }

    });
    console.log(this.turnosPaciente);

   }

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

}
