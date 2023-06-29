import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/Services/usuarios.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-log-ingresos',
  templateUrl: './log-ingresos.component.html',
  styleUrls: ['./log-ingresos.component.css']
})
export class LogIngresosComponent {
  logs:Array<any> = [];

  constructor(private userService:UsuariosService) {
    this.userService.getLogs().subscribe((logs)=>{
    this.logs = logs;
    console.log(this.logs);
    });
  }


  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, "logsUsuarios.xlsx");
  }

}
