import { Component, OnInit } from '@angular/core';
import { DataDetalleDocService } from 'src/Services/DetallesDocumento/data-detalle-doc.service';
import { DataAbonosService } from 'src/Services/Abonos/data-abonos.service';
import { TbAbonos } from 'src/Models/Abonos';
import { FacturaService } from 'src/Services/Factura/factura.service';
import { TbDocumento } from 'src/Models/Documento';



@Component({
  selector: 'app-index-abono',
  templateUrl: './index-abono.component.html',
  styleUrls: ['./index-abono.component.css']
})
export class IndexAbonoComponent implements OnInit {

  constructor(private docService:FacturaService, 
    private DetalleService : DataDetalleDocService,private abonoservice:DataAbonosService) { }

  ngOnInit() {
    this.consultarTodos();   
    this.ConsultarAbonos();
  }
  ConsultarAbonos() {
    this.abonoservice.consultaTodos().subscribe(data=>{
      this.listaAbonos=data;
    })
  }

  detalle:boolean=false;
  listaDoc= new Array();
  AbonoData=new TbAbonos();
  listaDocumentosFechas=new Array(); //lista para almacenar los documentos de la base de datos ordenados por fecha de la mas antigua a la mas reciente.
  idclient:string;
  listaAbonos=new Array();
  MontoTotalAbono:number=0;
  MontoTotalLinea: number=0;  
  Monto_Abono:number=0;
  resul:number=0;
  consultarTodos(){
    this.idclient="603480811"
    this.docService.ConsultarTodosAbono(this.idclient).subscribe(data=>{
      this.listaDoc=data;
      console.log(this.listaDoc);
    })
   
  }
  consultarDetalles(DocumentoDetails:TbDocumento){
  
  console.log(DocumentoDetails);
   this.DetalleService.recibirDetalles(DocumentoDetails);
   
  }
  abono(Documen:TbDocumento){
    console.log(Documen);
    this.abonoservice.recibeDocumento(Documen);
    
  }

  AbonoGeneral(mont_abono:number){
    this.docService.ConsultarPorFechas(this.idclient).subscribe(data=>{
      this.listaDocumentosFechas=data
      
    //recorre los documentos
    for (const iterator of this.listaDocumentosFechas) {
      // recorre la lista de detalles del documento
      for (const detalles of iterator.TbDetalleDocumento) {
        // Acumula el valor del monto de linea de todos los detalles de esa factura en la variable MontoTotallinea
        this.MontoTotalLinea=(this.MontoTotalLinea+detalles.TotalLinea);
      };
      
      //Consulta los abonos de esa factura.

        console.log(this.listaAbonos);
        for (const item of this.listaAbonos) {
          if (item.IdDoc==iterator.Id) {
            //Acumula el monto de los abonos de esa factura en la variable MontoTotalAbono
            this.MontoTotalAbono=this.MontoTotalAbono+item.Monto;
          }
                   
        };
        console.log(this.MontoTotalAbono);
     // Al total de la suma de todas la linea de ese documento se le resta los abonos de ese documento
      this.resul= (this.MontoTotalLinea - this.MontoTotalAbono); 
      console.log(this.resul);
      
      if (this.resul==0) {
          
        //Modifica el estado del documento si el saldo pendiente fue 0, y lo envia a la base de datos.
        iterator.EstadoFactura=1;
        this.docService.putData(iterator).subscribe(data=>{})
        alert("El Documento a sido cancelado correctamente");
        this.consultarTodos();   
      }
      else{

        if (this.resul >= mont_abono) {
          //Si el resultado de la resta del total de linea menos el abono fue mayor o igual al monto abonar se realiza lo siguiente
          this.resul=this.resul - mont_abono;    
          console.log(this.resul+"en el true");       
          this.AbonoData.IdDoc= iterator.Id;
          this.AbonoData.TipoDoc= iterator.TipoDocumento;
          this.AbonoData.Monto= mont_abono;
          this.AbonoData.FechaUltMod= iterator.FechaUltMod;
          this.AbonoData.FechaCrea= iterator.FechaCrea;
          this.AbonoData.UsuarioCrea="Antony";
          this.AbonoData.UsuarioUltMod= "Antony";
          this.AbonoData.Estado=true; 

              //Envia los datos del abono a guardar.

          this.abonoservice.postData(this.AbonoData).subscribe(data=>{});
           
        } 
        else 
        {
          
          mont_abono=this.resul;
          this.resul = (this.resul-this.resul);
          console.log(this.resul+"en el false");
          this.AbonoData.IdDoc= iterator.Id;
          this.AbonoData.TipoDoc= iterator.TipoDocumento;
          this.AbonoData.Monto= mont_abono;
          this.AbonoData.FechaUltMod= iterator.FechaUltMod;
          this.AbonoData.FechaCrea= iterator.FechaCrea;
          this.AbonoData.UsuarioCrea="Antony";
          this.AbonoData.UsuarioUltMod= "Antony";
          this.AbonoData.Estado=true;
      
          //Envia los datos del abono a guardar.
          this.abonoservice.postData(this.AbonoData).subscribe(data=>{});
        

        }          
      }
      if (this.resul==0) {
         //Modifica el estado del documento si el saldo pendiente fue 0, y lo envia a la base de datos.
         iterator.EstadoFactura=1;
         this.docService.putData(iterator).subscribe(data=>{})
         alert("El Documento a sido cancelado correctamente");
         this.consultarTodos();   
      }
      this.resul=0;
      this.MontoTotalAbono=0;
      this.MontoTotalLinea=0;
               
    }
    })
    this.consultarTodos();
    this.ConsultarAbonos();
  }
 







}
