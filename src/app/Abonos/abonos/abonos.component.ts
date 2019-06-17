import { Component, OnInit } from '@angular/core';
import { TbDocumento } from 'src/Models/Documento';
import { TbAbonos } from 'src/Models/Abonos';
import { TbPersona } from 'src/Models/Personas';
import { FacturaService } from 'src/Services/Factura/factura.service';
import { NgModule } from '@angular/core';
import { DataAbonosService } from 'src/Services/Abonos/abonos.service';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-abonos',
  templateUrl: './abonos.component.html',
  styleUrls: ['./abonos.component.css']
})
export class AbonosComponent implements OnInit {

  //Declaracion de variables
  Documento = new TbDocumento();
  AbonoData = new TbAbonos();
  listaAbonos = new Array();
  abono: boolean = false;   
  MontoAbono: number = 0;
  Monto_Abono: number = 0; 
  totalpendientefac: number = 0;
  totalFactura: number = 0;
  mont_abonoss: number = 0;
  TotalAbonos: number = 0;
  constructor(private abonosService: DataAbonosService, private docService: FacturaService,
     private msj: ToastrService) { }

  ngOnInit() {
    this.recibedatos();    
    this.consultarAbonos();
  }

  // Extrae desde el servicio la entidad que se envio del index a la cual se le realizara el abono
  recibedatos() {
    this.Documento = this.abonosService.Documen

  }

  //Realiza la consulta de los abonos del documento enviado desde el index
  consultarAbonos() {
    this.abonosService.getData(this.Documento.Id).subscribe(data => {
      this.listaAbonos = data;

      for (const item of this.listaAbonos) {
        this.TotalAbonos = this.TotalAbonos + item.Monto;
      }

      //lista Detalles almacena en MontoTotalLinea la suma del total de cada detalle de esa factura.
      for (const iterator of this.Documento.TbDetalleDocumento) {
        this.totalpendientefac = (this.totalpendientefac + iterator.TotalLinea);
        this.totalFactura = (this.totalFactura + iterator.TotalLinea);
      }
      //En la variable total pendiente se almacena la resta del total de la factura menos el total de los abonos realizados
      this.totalpendientefac = (this.totalpendientefac - this.TotalAbonos);
      
    },err=>{
      //Si no se encontraron registros de abonos de ese documento, a la variable totalfactura y totalpendiente se le asignan la suma de cada total de linea de ese documento  
      for (const iterator of this.Documento.TbDetalleDocumento) {
        this.totalFactura=(this.totalFactura+iterator.TotalLinea)
        this.totalpendientefac=(this.totalpendientefac+iterator.TotalLinea)
      }
    })

  }
  
  //Recarga la pagina
  reFresh() {
    location.reload()
  }
 
  //Metodo para realizar el abono a la factura
  abonar(mont_abono) {

    this.mont_abonoss = mont_abono; // almacena en la variable el monto del abono que llego en el parametro.

    //Si el abono fue de 0 o mayor al saldo pendiente NO se podra realizar el abono
    if (mont_abono == 0 || mont_abono > this.totalpendientefac) {      
      this.msj.info("En caso de cancelar la factura,indique el monto igual al Saldo Pendiente")
      this.msj.info("El monto abonar no puede ser 0 o Mayor al Saldo pendiente")
     
    } else {
     
      
      //Si el totalpendiente fue 0 entonces envia a modificar dicho documento, su estado de factura quedara en "1" (cancelada)
      if (this.totalpendientefac == 0) {
        
        //Modifica el estado del documento, y lo envia a la base de datos.
        this.Documento.EstadoFactura = 1;
        this.docService.putData(this.Documento).subscribe(
          data => { this.msj.success("La Factura a sido cancelada correctamente") },
          error => { "ERROR:No se logro cancelar la factura" });

      }
      else {        
        
          this.totalpendientefac = this.totalpendientefac - this.mont_abonoss; // Total pendiente realiza la resta del abono que se acaba de realizar
          this.AbonoData.IdDoc = this.Documento.Id;
          this.AbonoData.TipoDoc = this.Documento.TipoDocumento;
          this.AbonoData.Monto = this.mont_abonoss;  //Se le asigna el monto del abono que se realizo
          this.AbonoData.FechaUltMod = this.Documento.FechaUltMod;
          this.AbonoData.FechaCrea = this.Documento.FechaCrea;
          this.AbonoData.UsuarioCrea = "Antony";
          this.AbonoData.UsuarioUltMod = "Antony";
          this.AbonoData.Estado = true;

          //Envia los datos del abono a guardar.

          this.abonosService.postData(this.AbonoData).subscribe(
            data => { this.msj.success("Abono realizado correctamente") },
            error => { this.msj.error("ERROR:No se logro realizar el abono") });        
       
      }
      //Se verifica nuevamente despues de realizar el abono si el saldo pendiente fue 0,de ser asi, se cancela el documento
      if (this.totalpendientefac == 0) {
        //Modifica el estado del documento, y lo envia a la base de datos.
        this.Documento.EstadoFactura = 1;
        this.docService.putData(this.Documento).subscribe(
          data => { this.msj.success("La Factura a sido cancelada correctamente") },
          error => { "ERROR:No se logro cancelar la factura" })

      }

    }
   this.MontoAbono=0;
  }
}
