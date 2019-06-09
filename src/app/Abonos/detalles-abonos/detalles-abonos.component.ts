import { Component, OnInit } from '@angular/core';

import { TbPersona } from 'src/Models/Personas';
import { DataPersonaService } from 'src/Services/Persona/persona.service';
import { ProducserviceService } from 'src/Services/Producto/producservice.service';
import { TbDocumento } from 'src/Models/Documento';
import { DataDetalleDocService } from 'src/Services/DetallesDocumento/data-detalle-doc.service';
import { DataAbonosService } from 'src/Services/Abonos/abonos.service';


@Component({
  selector: 'app-detalles-abonos',
  templateUrl: './detalles-abonos.component.html',
  styleUrls: ['./detalles-abonos.component.css']
})
export class DetallesAbonosComponent implements OnInit {

  constructor(private dataDetallesAbono: DataAbonosService, private Datadocumento: DataDetalleDocService,
    private dataproducto:ProducserviceService) { }

  DocumentoDetalles=new TbDocumento(); 
  listaAbono = new Array();
  totalpendiente:number=0;
  totalfactura:number=0;
  montototalabono:number=0;
  
  ngOnInit() {
    this.crearDetalleDoc();
    this.consultarAbonos();     
    
  }
  
  crearDetalleDoc(){
    this.DocumentoDetalles=this.Datadocumento.Detalles
    
  }

  consultarAbonos(){
    this.dataDetallesAbono.getData(this.DocumentoDetalles.Id).subscribe(data=>{
      this.listaAbono=data;
      //Recorre la lista de abonos y almacena la suma de todos los abonos en montototalabono
    for (const iterator of this.listaAbono) {
      this.montototalabono=(this.montototalabono+iterator.Monto);     
    };
    //en totalfactura almacena la suma del total de linea de cada detalle de ese documento 
    
    for (const iterator of this.DocumentoDetalles.TbDetalleDocumento) {
      this.totalfactura=(this.totalfactura+iterator.TotalLinea);
    };
    //Almacena en totalpendiente la resta del totaldefactura menos el montototal de los abonos realizados
    this.totalpendiente=(this.totalfactura-this.montototalabono);
    },err=>{
      for (const iterator of this.DocumentoDetalles.TbDetalleDocumento) {
        this.totalfactura=(this.totalfactura+iterator.TotalLinea)
        this.totalpendiente=(this.totalpendiente+iterator.TotalLinea)
      }
    })
  }
  
  
}
