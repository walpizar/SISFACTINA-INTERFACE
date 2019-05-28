import { Component, OnInit } from '@angular/core';
import { DataAbonosService } from 'src/Services/Abonos/data-abonos.service';
import { DataPersonaService } from 'src/Services/Persona/data-persona.service';
import { TbDocumento } from 'src/Models/Documento';
import { TbAbonos } from 'src/Models/Abonos';
import { TbPersona } from 'src/Models/Personas';
import { FacturaService } from 'src/Services/Factura/factura.service';
import { NgModule } from '@angular/core';




@Component({
  selector: 'app-abonos',
  templateUrl: './abonos.component.html',
  styleUrls: ['./abonos.component.css']
})
export class AbonosComponent implements OnInit {
  Documento=new TbDocumento();
  AbonoData=new TbAbonos();
  lista = new Array();
  abono:boolean=false;
  MontoTotalLinea: number=0;
  Persona= new TbPersona();
  idcli:number;
  tipoid:number;
  MontoAbono:number=0;
  Monto_Abono:number=0;
  resul:number=0;
  totalpendientefac:number=0;
  totalFactura:number=0;
  mont_abonoss:number=0;
  abonototal:number=0;
  constructor(private abonosService: DataAbonosService , private docService: FacturaService, private personaService:DataPersonaService) { }

  ngOnInit() {
    this.recibedatos();
    this.consultarDocu();
    this.consultarAbonos();   
  }  

  consultarAbonos(){
    this.abonosService.getData(this.Documento.Id).subscribe(data=>{
      this.lista = data;
      console.log(data);
      console.log(this.lista+"listaAbonos");
      for (const item of this.lista) {
        this.abonototal=this.abonototal+item.Monto;
      }
  
     //Lista Detalles almacena en MontoTotalLinea la suma del total de cada detalle de esa factura.
      for (const iterator of this.Documento.TbDetalleDocumento) {
         this.totalpendientefac=(this.totalpendientefac+iterator.TotalLinea);
         this.totalFactura=(this.totalFactura+iterator.TotalLinea);
        }     
          this.totalpendientefac= (this.totalpendientefac - this.abonototal);
          console.log(this.totalpendientefac);
    })
   
  }

  consultarDocu(){
    this.idcli=603480811; 
    this.tipoid=1; 
      this.personaService.getDataID(this.idcli,this.tipoid).subscribe(data=>{
        this.Persona=data;
      })     
  }
  recibedatos(){
    this.Documento=this.abonosService.Documen  
   
  }
  //this.mont_abonoss es la variable que llega por parametro del input
  abonar(mont_abono){
   
    this.mont_abonoss=mont_abono; // almacena en la variable el monto del abono que llego en el parametro.
    if (mont_abono==0 || mont_abono>this.totalpendientefac) {
      alert("El monto abonar no puede ser 0 o Mayor al total pendiente");
      
    } else {
      
       //Lista Abonos,almacena todos los abonos de esa factura.
   
    for (const item of this.lista) {
      this.Monto_Abono=this.Monto_Abono+item.Monto;
    }

   //Lista Detalles almacena en MontoTotalLinea la suma del total de cada detalle de esa factura.
    for (const iterator of this.Documento.TbDetalleDocumento) {
       this.MontoTotalLinea=(this.MontoTotalLinea+iterator.TotalLinea);
      }     
        this.resul= (this.MontoTotalLinea - this.Monto_Abono);
       console.log(this.resul+"MontoTotalLinea - abonoSql");
        if (this.resul==0) {
          
          //Modifica el estado del documento, y lo envia a la base de datos.
          this.Documento.EstadoFactura=1;
          this.docService.putData(this.Documento).subscribe(data=>{})
          alert("El Documento a sido cancelado correctamente");
        }
        else{

          if (this.resul >= this.mont_abonoss) {
            this.resul=this.resul - this.mont_abonoss;    
            console.log(this.resul+"en el true");       
            this.AbonoData.IdDoc= this.Documento.Id;
            this.AbonoData.TipoDoc= this.Documento.TipoDocumento;
            this.AbonoData.Monto= this.mont_abonoss;
            this.AbonoData.FechaUltMod= this.Documento.FechaUltMod;
            this.AbonoData.FechaCrea= this.Documento.FechaCrea;
            this.AbonoData.UsuarioCrea="Antony";
            this.AbonoData.UsuarioUltMod= "Antony";
            this.AbonoData.Estado=true; 

                //Envia los datos del abono a guardar.

            this.abonosService.postData(this.AbonoData).subscribe(data=>{});
              alert("El abono se realizo correctamente");
          } 
          else 
          {
            
            this.mont_abonoss=this.resul;
            this.resul = (this.resul-this.resul);
            console.log(this.resul+"en el false");
            this.AbonoData.IdDoc= this.Documento.Id;
            this.AbonoData.TipoDoc= this.Documento.TipoDocumento;
            this.AbonoData.Monto= this.mont_abonoss;
            this.AbonoData.FechaUltMod= this.Documento.FechaUltMod;
            this.AbonoData.FechaCrea= this.Documento.FechaCrea;
            this.AbonoData.UsuarioCrea="ANTONY";
            this.AbonoData.UsuarioUltMod= "ANTONY";
            this.AbonoData.Estado=true;
        
            //Envia los datos del abono a guardar.
            this.abonosService.postData(this.AbonoData).subscribe(data=>{});
            alert("El abono se realizo correctamente");

          }          
        }
        if (this.resul==0) {
           //Modifica el estado del documento, y lo envia a la base de datos.
           this.Documento.EstadoFactura=1;
           this.docService.putData(this.Documento).subscribe(data=>{})
           alert("El Documento a sido cancelado correctamente");
        }

    }
          
   }
}
