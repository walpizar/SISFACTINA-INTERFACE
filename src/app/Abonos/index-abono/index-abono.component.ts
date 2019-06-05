import { Component, OnInit } from '@angular/core';
import { DataDetalleDocService } from 'src/Services/DetallesDocumento/data-detalle-doc.service';

import { TbAbonos } from 'src/Models/Abonos';
import { FacturaService } from 'src/Services/Factura/factura.service';
import { TbDocumento } from 'src/Models/Documento';
import { DataAbonosService } from 'src/Services/Abonos/abonos.service';
import { ToastrService } from 'ngx-toastr';
import { DataPersonaService } from 'src/Services/Persona/data-persona.service';
import { TbClientes } from 'src/Models/Cliente';
import { TbPersona } from 'src/Models/Personas';
import * as moment from 'moment';
import * as dateformat from 'dateformat';
import { ProducserviceService } from 'src/Services/Producto/producservice.service';






@Component({
  selector: 'app-index-abono',
  templateUrl: './index-abono.component.html',
  styleUrls: ['./index-abono.component.css']
})
export class IndexAbonoComponent implements OnInit {

  constructor(private docService: FacturaService,
    private DetalleService: DataDetalleDocService, private abonoservice: DataAbonosService, private msj: ToastrService,private personaService:DataPersonaService,
    private dataproducto:ProducserviceService) { }

  ngOnInit() {
    this.consultarProductos();
    this.consultarTodos();
    this.ConsultarAbonos();
    
    
  }
 
  AgregarPersona() {
    for (const iterator of this.listaDoc) {
      this.personaService.getDataID(iterator.IdCliente,iterator.TipoIdCliente).subscribe(data=>{iterator.TbClientes.TbPersona=data})
    }
  }
  ConsultarAbonos() {
    this.abonoservice.consultaTodos().subscribe(data => {
      this.listaAbonos = data;
    })
  }

  detalle: boolean = false;
  listaDoc = new Array();
  listaDoc2 = new Array();
  AbonoData = new TbAbonos();
  listaDocumentosFechas = new Array(); //lista para almacenar los documentos de la base de datos ordenados por fecha de la mas antigua a la mas reciente.
  idEmpresa: string;
  listaAbonos = new Array();
  listaProductos = new Array();
  MontoTotalAbono: number = 0;
  MontoTotalLinea: number = 0;
  Monto_Abono: number = 0;
  resul: number = 0;
  buscar:string;
  consultarTodos() {
    this.idEmpresa = "603920529"
    this.docService.ConsultarTodosAbono(this.idEmpresa).subscribe(data => {
      this.listaDoc = data;
      for (const iterator of this.listaDoc) {
              
        iterator.TbClientes=new TbClientes();
        iterator.TbClientes.TbPersona=new TbPersona();
        console.log(iterator.IdCliente);
        this.personaService.getDataID(iterator.IdCliente,iterator.TipoIdCliente).subscribe(data=>{          
            iterator.TbClientes.TbPersona=data
        },err=>{
          iterator.TbClientes.TbPersona.Nombre="Sin Nombre";
          iterator.TbClientes.TbPersona.Apellido1="Sin Nombre";
          iterator.TbClientes.TbPersona.Apellido2="Sin Nombre";
        })
        iterator.mensaje=this.ValidarVencimientoCredito(iterator.Fecha,iterator.Plazo);
      }
      this.AgregarProducto();      
      
    }, error => { this.msj.error("No se encontraron registros") })

  }
  consultarProductos() {
    this.dataproducto.get().subscribe(data=>{this.listaProductos=data     
    })
  }

  AgregarProducto() { 
     
    for (const iterator of this.listaDoc) {
      for (const detalle of iterator.TbDetalleDocumento) {
        for (const itera of this.listaProductos) {          
          if (detalle.IdProducto==itera.IdProducto) {          
            detalle.IdProductoNavigation=itera;
                     
          }
        }
      }      
     
    }  
        
  }

  consultarDetalles(DocumentoDetails: TbDocumento) {

    this.DetalleService.recibirDetalles(DocumentoDetails);

  }
  abono(Documen: TbDocumento) {

    this.abonoservice.recibeDocumento(Documen);

  }
  ValidarVencimientoCredito(fechaparametro:Date,plazo:number):string{
    if (fechaparametro==null ) {
      return null;
  } else {
    var fechaFactura = moment(fechaparametro);
    //var dateformat=require('dateformat');
    var ahora= new Date();
    var date=dateformat(ahora,"isoDateTime");               
    var fechaActual = moment(date);
    var result=fechaActual.diff(fechaFactura, 'days');
    if (result>plazo) {
      return "Vencida";
    } else {
      return "Al Día";
    }
  }
  
  }

  AbonoGeneral(mont_abono: number) {
    this.msj.show("Realizando los abonos,espera unos minutos");
    this.docService.ConsultarPorFechas(this.idEmpresa).subscribe(data => {
      this.listaDocumentosFechas = data

      //recorre los documentos
      for (const iterator of this.listaDocumentosFechas) {
        // recorre la lista de detalles del documento
        for (const detalles of iterator.TbDetalleDocumento) {
          // Acumula el valor del monto de linea de todos los detalles de esa factura en la variable MontoTotallinea
          this.MontoTotalLinea = (this.MontoTotalLinea + detalles.TotalLinea);
        };

        //Consulta los abonos de esa factura.


        for (const item of this.listaAbonos) {
          if (item.IdDoc == iterator.Id) {
            //Acumula el monto de los abonos de esa factura en la variable MontoTotalAbono
            this.MontoTotalAbono = this.MontoTotalAbono + item.Monto;
          }

        };

        // Al total de la suma de todas la linea de ese documento se le resta los abonos de ese documento
        this.resul = (this.MontoTotalLinea - this.MontoTotalAbono);


        if (this.resul == 0) {

          //Modifica el estado del documento si el saldo pendiente fue 0, y lo envia a la base de datos.
          iterator.EstadoFactura = 1;
          this.docService.putData(iterator).subscribe(data => { this.msj.success("La factura a sido cancelada correctamente") },
            erro => { this.msj.error("ERROR AL CANCELAR LA FACTURA") });

          this.consultarTodos();
        }
        else {

          if (this.resul >= mont_abono) {
            //Si el resultado de la resta del total de linea menos el abono fue mayor o igual al monto abonar se realiza lo siguiente
            this.resul = this.resul - mont_abono;

            this.AbonoData.IdDoc = iterator.Id;
            this.AbonoData.TipoDoc = iterator.TipoDocumento;
            this.AbonoData.Monto = mont_abono;
            this.AbonoData.FechaUltMod = iterator.FechaUltMod;
            this.AbonoData.FechaCrea = iterator.FechaCrea;
            this.AbonoData.UsuarioCrea = "Antony";
            this.AbonoData.UsuarioUltMod = "Antony";
            this.AbonoData.Estado = true;

            //Envia los datos del abono a guardar.

            this.abonoservice.postData(this.AbonoData).subscribe(data => { this.msj.success("Abono realizado correctamente") },
              erro => { this.msj.error("ERROR AL ABONAR LA FACTURA") });

          }
          else {

            mont_abono = this.resul;
            this.resul = (this.resul - this.resul);
            this.AbonoData.IdDoc = iterator.Id;
            this.AbonoData.TipoDoc = iterator.TipoDocumento;
            this.AbonoData.Monto = mont_abono;
            this.AbonoData.FechaUltMod = iterator.FechaUltMod;
            this.AbonoData.FechaCrea = iterator.FechaCrea;
            this.AbonoData.UsuarioCrea = "Antony";
            this.AbonoData.UsuarioUltMod = "Antony";
            this.AbonoData.Estado = true;

            //Envia los datos del abono a guardar.
            this.abonoservice.postData(this.AbonoData).subscribe(data => { this.msj.success("Abono realizado correctamente") },
              erro => { this.msj.error("ERROR AL ABONAR LA FACTURA") });


          }
        }
        if (this.resul == 0) {
          //Modifica el estado del documento si el saldo pendiente fue 0, y lo envia a la base de datos.
          iterator.EstadoFactura = 1;
          this.docService.putData(iterator).subscribe(data => { this.msj.success("La factura a sido cancelada correctamente") },
            erro => {
              this.msj.error("ERROR AL CANCELAR LA FACTURA");
              this.consultarTodos();
            })

        }
        this.resul = 0;
        this.MontoTotalAbono = 0;
        this.MontoTotalLinea = 0;

      }
      this.msj.show("Abonos finalizados");
      this.Monto_Abono=0;
    })
    this.consultarTodos();
    this.ConsultarAbonos();
  }








}
