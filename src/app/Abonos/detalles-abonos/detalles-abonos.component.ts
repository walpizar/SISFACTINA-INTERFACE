import { Component, OnInit } from '@angular/core';
import { DataAbonosService } from '../data-abonos.service';
import { DataDetalleDocService } from '../data-detalle-doc.service';
import { Documento } from '../Models/Documento';
import { DataProductoService } from '../data-producto.service';
import { DataPersonaService } from '../data-persona.service';
import { Persona } from '../Models/Persona';

@Component({
  selector: 'app-detalles-abonos',
  templateUrl: './detalles-abonos.component.html',
  styleUrls: ['./detalles-abonos.component.css']
})
export class DetallesAbonosComponent implements OnInit {

  constructor(private dataDetallesAbono: DataAbonosService, private Datadocumento: DataDetalleDocService,
    private dataproducto:DataProductoService,private personaservice:DataPersonaService) { }

  DocumentoDetalles=new Documento();
  listaProductos= new Array();
  listaAbono = new Array();
  idclien:number;
  tipoid:number=1;
  totalpendiente:number=0;
  totalfactura:number=0;
  montototalabono:number=0;
  Persona=new Persona();
  ngOnInit() {
    this.crearDetalleDoc();
    this.consultarAbonos();
    this.consultarProductos();
    this.AgregarPersona();
    
  }
  AgregarPersona() {
    this.idclien=parseInt(this.DocumentoDetalles.IdCliente);  
    this.personaservice.getDataID(this.idclien,this.tipoid).subscribe(data=>{this.Persona=data    
    })
  }
  AgregarProducto() {
    for (const detalle of this.DocumentoDetalles.TbDetalleDocumento) {
      console.log(this.listaProductos);
      for (const producto of this.listaProductos) {
        if (detalle.IdProducto==producto.IdProducto) {
          detalle.IdProductoNavigation=producto;
          console.log(producto);
        }
      }
    };
    console.log("ENTIDAD CON PRODUCTO");
    console.log(this.DocumentoDetalles);
  }
 
  consultarProductos() {
    this.dataproducto.getData().subscribe(data=>{this.listaProductos=data
      this.AgregarProducto();
    })
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
    })
  }
  
  
}
