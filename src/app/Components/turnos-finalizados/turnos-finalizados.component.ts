import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { TurnoService } from 'src/app/Services/turno.service';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-turnos-finalizados',
  templateUrl: './turnos-finalizados.component.html',
  styleUrls: ['./turnos-finalizados.component.css']
})
export class TurnosFinalizadosComponent {

  especialistas: any = [];
  listaTurnos: any = [];
  turnosPorMedico: number = 0;
  dataTurnosXDia: any = [];
  medicos: any = [];
  cantidades: any = [];
  dias!:string;

  title = 'myHighchart';

  data: any = [
  {
    name: 'Médico',
    data: this.cantidades
  },

  ];

  highcharts = Highcharts;
  chartOptions: any = {
    chart: {
      type: "area"
    },
    title: {
      text: "Cantidad de turnos por Médico Finalizados"
    },
    xAxis: {
       categories: this.medicos
    },
    yAxis: {
      title: {
        text: "Cantidad de Turnos"
      },
      allowDecimals: false
    },
    series: this.data
  };

  constructor(private turnoSvc: TurnoService, private usuarioSvc: UsuariosService) {


    this.usuarioSvc.getListadoEspecialistas().subscribe(usuarios => {
      this.especialistas = usuarios;
      this.turnoSvc.getListadoTurnos().subscribe(turnos => {
        this.listaTurnos = turnos;
        this.contarTurnosPorMedico();
      });
    });

  }

  ngOnInit(): void {
  }

  contarTurnosPorMedico() {
    for (let i = 0; i < this.especialistas.length; i++) {
      var item = this.especialistas[i];
      var nombreYApellido = item.nombre + ' ' + item.apellido;
      this.medicos.push(nombreYApellido);

      var turnosPorMedico = this.listaTurnos.filter((element: any, index: any, array: any) => {
        return item.idEspecialista == element.especialista.idEspecialista && element.estado === 'FINALIZADO';
      });
      console.log("Turnos" + turnosPorMedico);

      this.cantidades.push(turnosPorMedico.length);
    }
    console.log(this.medicos);

    console.log(this.cantidades);
    Highcharts.chart('chart-line', this.chartOptions);

  }


  crearPdf() {
    let DATA = <HTMLElement>document.getElementById('pdfTable');

    html2canvas(DATA).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
      var nombreArchivo ='turnosxMedicoFinalizados.pdf';
      PDF.save(nombreArchivo);
    });
  }
}
