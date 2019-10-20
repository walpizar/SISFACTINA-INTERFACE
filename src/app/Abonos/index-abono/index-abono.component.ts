import { Component, OnInit } from '@angular/core';
import { DataDetalleDocService } from 'src/Services/DetallesDocumento/data-detalle-doc.service';

import { TbAbonos } from 'src/Models/Abonos';
import { FacturaService } from 'src/Services/Factura/factura.service';
import { TbDocumento } from 'src/Models/Documento';
import { DataAbonosService } from 'src/Services/Abonos/abonos.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import * as dateformat from 'dateformat';
import { ProducserviceService } from 'src/Services/Producto/producservice.service';
import { TipoPagoService } from 'src/Services/TipoPago/tipo-pago.service';

@Component({
  selector: 'app-index-abono',
  templateUrl: './index-abono.component.html',
  styleUrls: ['./index-abono.component.css']
})
export class IndexAbonoComponent implements OnInit {

  constructor(private docService: FacturaService,
    private DetalleService: DataDetalleDocService, private abonoservice: DataAbonosService, private msj: ToastrService,private tipoPagoService:TipoPagoService,
    private dataproducto:ProducserviceService) { }

    //Declaracion de variables
  detalle: boolean = false;
  listaDoc = new Array();  
  listaTipoPago = new Array();
  AbonoData = new TbAbonos();
  listaDocumentosFechas = new Array(); //lista para almacenar los documentos de la base de datos ordenados por fecha de la mas antigua a la mas reciente.
  idEmpresa: string;
  listaAbonos = new Array();
  listaProductos = new Array();
  MontoTotalAbono: number = 0;
  MontoTotalLinea: number = 0;
  Monto_Abono: number = 0;
  resul: number = 0;
  buscar:string=null; //Variable utilizada para realizar busquedas de documentos en la lista mostrada al usuario 

  ngOnInit() {
    this.ConsultarTipoPago(); //Consulta los tipos de pago a la BD
    this.consultarProductos(); //Consulta los productos a la BD
    this.consultarTodos(); //Consulta todas las facturas con el id de la empresa que sean a credito a la BD
    this.ConsultarAbonos(); //Consulta todos los abonos a la BD   
    
  }
 
  ConsultarTipoPago() {
    this.tipoPagoService.getListTipoPago().subscribe(data=>{this.listaTipoPago=data})
  }
  ConsultarAbonos() {
    this.abonoservice.consultaTodos().subscribe(data => {
      this.listaAbonos = data;
    })
  }
  
  consultarTodos() {
    this.idEmpresa = "603920529" //Variable temporal , ID de la empresa del usuario
    this.docService.ConsultarTodosAbono(this.idEmpresa).subscribe(data => {
      this.listaDoc = data;
      console.log(this.listaTipoPago);
      for (const iterator of this.listaDoc) {        
            for (const pago of this.listaTipoPago) {
              if (iterator.TipoPago==pago.Id) {
                iterator.TipoPagoNavigation=pago // agrega el tipo de pago a cada documento
              }
            }  
        
        iterator.mensaje=this.ValidarVencimientoCredito(iterator.Fecha,iterator.Plazo)
            /*Realiza una verificacion del documento dependiendo de su plazo y la fecha y almacena su resultado en
            iterator.mensaje*/


      }
      this.AgregarProducto(); //Metodo para agregar los productos a cada linea de detalle de ese documento
           
      
    }, error => { this.msj.error("No se encontraron registros") })

  }
  consultarProductos() {
    this.dataproducto.get().subscribe(data=>{this.listaProductos=data     
    })
  }

  AgregarProducto() { 
     
    for (const iterator of this.listaDoc) { //Recorre los documentos
      for (const detalle of iterator.TbDetalleDocumento) { //Recorre los detalles de cada documento
        for (const itera of this.listaProductos) { //Recorre los productos consultados a la BD         
          if (detalle.IdProducto==itera.IdProducto) {          
            detalle.IdProductoNavigation=itera; //Agrega el producto a cada linea de detalle del documento
                     
          }
        }
      }      
     
    }  
        
  }
  //Envia al servicio el documento del cual desean detales
  consultarDetalles(DocumentoDetails: TbDocumento) {

    this.DetalleService.recibirDetalles(DocumentoDetails);

  }
  //Envia al servicio el documento del cual desean realizar un abono
  abono(Documen: TbDocumento) {

    this.abonoservice.recibeDocumento(Documen);

  }
  //Metodo para realizar la validacion del documento para verificar si se encuentra al dia o vencido
  ValidarVencimientoCredito(fechaparametro:Date,plazo:number):string{
    if (fechaparametro==null ) {
      return "Vencida";
  } else {
    var fechaFactura = moment(fechaparametro); //Calcula los milisegundos de la fecha de la factura
    
    var ahora= new Date(); //Almacena la fecha actual
    var date=dateformat(ahora,"isoDateTime");//Le da formato a la fecha actual
    var fechaActual = moment(date); //Calcula los milisegundos de la fecha actual
    var result=fechaActual.diff(fechaFactura, 'days'); //Calcula la diferencia de dias entre la fecha de la factura y la actual
    if (result>plazo) { //Si el resultado fue mayor al plazo de días de la factura 
      return "Vencida"; //Se retorna que la factura estara vencida
    } else { //sino
      return "Al Día"; //Retornara que la factura se encuntra al día
    }
  }
  
  }
 //Metodo para realizar el abono general
  AbonoGeneral(mont_abono: number) {
    if (mont_abono==0) { //Si el monto del abono fue 0,NO se podra realiizar el abono
      this.msj.info("El monto abonar no puede ser igual a 0")
    } else {
      this.msj.show("Realizando los abonos,espera unos minutos");
    this.docService.ConsultarPorFechas(this.idEmpresa).subscribe(data => {
      this.listaDocumentosFechas = data //Consulta por orden de fecha (la factura mas antigua a la mas reciente) y las almacena en la lista

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

        // Al total de la suma de todas las linea de ese documento se le resta los abonos de ese documento
        this.resul = (this.MontoTotalLinea - this.MontoTotalAbono);


        if (this.resul == 0) {

          //Modifica el estado del documento si el saldo pendiente fue 0, y lo envia a la base de datos.
          iterator.EstadoFactura = 1;
          this.docService.putData(iterator).subscribe(data => { this.msj.success("La factura a sido cancelada correctamente") },
            erro => { this.msj.error("ERROR: No se logro cancelar la factura de id: "+iterator.Id) });

          this.consultarTodos();
        }
        else {

          if (this.resul >= mont_abono) {
            //Si el resultado de la resta del total de linea menos el abono fue mayor o igual al monto abonar se realiza lo siguiente
            //Se le resta al saldo pendiente de la factura almacenado en la variable resultado el abono realizado
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
              erro => { this.msj.error("ERROR AL ABONAR LA FACTURA DEL ID: "+iterator.Id) });

          }
          else {
            //Si el abono fue mayor al saldo pendiente se cancela la factura con el monto exacto pendiente
            //Para ello se crea una variable temporal que almacene esa cantidad
            let montoFactPendiente=this.resul            
            this.resul = (this.resul - this.resul);
            this.AbonoData.IdDoc = iterator.Id;
            this.AbonoData.TipoDoc = iterator.TipoDocumento;
            this.AbonoData.Monto =montoFactPendiente;
            this.AbonoData.FechaUltMod = iterator.FechaUltMod;
            this.AbonoData.FechaCrea = iterator.FechaCrea;
            this.AbonoData.UsuarioCrea = "Antony";
            this.AbonoData.UsuarioUltMod = "Antony";
            this.AbonoData.Estado = true;

            //Envia los datos del abono a guardar.
            this.abonoservice.postData(this.AbonoData).subscribe(data => { this.msj.success("Abono realizado correctamente") },
              erro => { this.msj.error("ERROR AL ABONAR LA FACTURA DEL ID: "+iterator.Id) });

          }
        }
        if (this.resul == 0) {
          //Modifica el estado del documento si el saldo pendiente fue 0, y lo envia a la base de datos.
          iterator.EstadoFactura = 1;
          this.docService.putData(iterator).subscribe(data => { this.msj.success("La factura a sido cancelada correctamente") },
            erro => {
              this.msj.error("ERROR: No se logro cancelar la factura de id: "+iterator.Id);
              this.consultarTodos();
            })

        }
        this.resul = 0; //Se incicializan las variables en 0 para el calculo de la siguiente factura
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








}
