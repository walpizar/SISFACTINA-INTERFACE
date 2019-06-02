import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


import { DataTipoIdService } from '../../Services/TipoId/tipo-id.service';
import { DataClienteService } from '../../Services/Cliente/data-cliente.service';
import { TipoPagoService } from '../../Services/TipoPago/tipo-pago.service';
import { ProducserviceService } from '../../Services/Producto/producservice.service';
import { TipoCompraService } from '../../Services/TipoCompra/tipo-compra.service';
import { InventarioService } from '../../Services/Inventario/inventario.service';
import { FacturaService } from '../../Services/Factura/factura.service';

import { TbClientes } from '../../Models/Cliente';
import { TbTipoId } from '../../Models/TipoId';
import { TbProducto } from '../../Models/Producto';
import { TbDetalleDocumento } from '../../Models/DetalleDocumento';
import { TbTipoPago } from '../../Models/TipoPago';
import { TbTipoVenta } from '../../Models/TipoVenta';
import { TbInventario } from '../../Models/Inventario';
import { TbDocumento } from '../../Models/Documento';
import { TbUsuarios } from '../../Models/Usuarios';

@Component({
  selector: 'app-factura',
  template:'<h3>{{errorMsg}}</h3>',
  templateUrl: './facturador.component.html',
  styleUrls: ['./facturador.component.css']
})
export class FacturadorComponent implements OnInit {

  constructor(private facturaService: FacturaService,private tipoVentaService:TipoCompraService,private tipoIdService:DataTipoIdService,private clienteService:DataClienteService,private producservice:ProducserviceService,private tipoPagoService:TipoPagoService, private inventarioService:InventarioService) { 

    this.obtenerListaTipoId();
    this.obtenerListaTipoPago();
    this.obtenerListaTipoVenta();
    this.obtenerTodoInventario();
    this.obtenerTodosLosProductos();
    this.obtenerTodosClientes();
  }

  ngOnInit() {

    
  }
  error:boolean=true;
  Observaciones : string;
  plazo: number;
  ckCorreo:boolean=false;
  productoDescuento: number = 0
  subTotal: number = 0;
  descuento: number = 0;
  iva:number = 0;
  exonerado: number = 0;
  TotalFactura: number = 0;
  inventarioStock=0;
  listaTipoId:Array<TbTipoId>; 
  cliente:TbClientes = null;
  tipoId:number = 1;
  Id:string;
  producIdCombo : number = 1;
  clienteId:string;
  productoId:string = "1";
  apellidos:string;
  Show:boolean=false;
  direccion:string;
  nombre:string;
  correoElectronico2: string = null;
  Cantidad : number = 1;
  detalle:TbDetalleDocumento = new TbDetalleDocumento;
  listaDetalles:Array<TbDetalleDocumento> = new Array();
  productoConsultado : TbProducto;
  total:number = 0;
  listaProductos:Array<TbProducto>= new Array();
  listaInventario:Array<TbInventario>= new Array();
  listaTipoPago: Array<TbTipoPago> = new Array();
  listaTipoVenta: Array<TbTipoVenta> = new Array();
  tipoPago:number = 1;
  tipoVenta:number = 1;
  listaClientes:Array<TbClientes>= new Array();
  buscar: string;

  contiene(busca){


  }

  seleccionarCliente(cliente){
    this.cliente=cliente
    this.Show = true;
    this.clienteId=cliente.Id
    this.cliente.TipoId

      if(this.cliente.TbPersona.Apellido1!=null && this.cliente.TbPersona.Apellido2){
        this.apellidos=this.cliente.TbPersona.Apellido1.trim() + " " + this.cliente.TbPersona.Apellido2.trim();
      }
      if(this.cliente.TbPersona.Apellido1==null&&this.cliente.TbPersona.Apellido2!=null){
        this.apellidos= this.cliente.TbPersona.Apellido2.trim();
      }
      if(this.cliente.TbPersona.Apellido1!=null&&this.cliente.TbPersona.Apellido2==null){
        this.apellidos= this.cliente.TbPersona.Apellido1.trim();
      }
      


        
        
        this.direccion=this.cliente.TbPersona.TbBarrios.Nombre.trim()+", "+this.cliente.TbPersona.TbBarrios.TbDistrito.Nombre.trim()+", "+this.cliente.TbPersona.TbBarrios.TbDistrito.TbCanton.Nombre.trim()+", "+this.cliente.TbPersona.TbBarrios.TbDistrito.TbCanton.ProvinciaNavigation.Nombre.trim();
        
  }

  restaCantidad(cantidadPro,NumeroLiProduc,proId){
      for (let i = 0; i < this.listaInventario.length; i++) {
        if(this.listaInventario[i].IdProducto==proId && 1 < cantidadPro){
          this.listaDetalles[NumeroLiProduc-1].Cantidad =this.listaDetalles[NumeroLiProduc-1].Cantidad-1;
          this.listaDetalles[NumeroLiProduc-1].MontoTotal = this.listaDetalles[NumeroLiProduc-1].Cantidad * this.listaDetalles[NumeroLiProduc-1].Precio;

          this.listaDetalles[NumeroLiProduc-1].MontoTotalDesc = this.listaDetalles[NumeroLiProduc-1].MontoTotal * (this.listaDetalles[NumeroLiProduc-1].Descuento/100);
          this.listaDetalles[NumeroLiProduc-1].MontoTotalImp = this.listaDetalles[NumeroLiProduc-1].MontoTotal * 0.13;
          this.listaDetalles[NumeroLiProduc-1].TotalLinea = this.listaDetalles[NumeroLiProduc-1].MontoTotal - this.listaDetalles[NumeroLiProduc-1].MontoTotalDesc + this.listaDetalles[NumeroLiProduc-1].MontoTotalImp;
          this.MontosFactura();
          return;
        }
      }
      alert("La cantidad minima es 1 no se puede restar mas productos");
    console.log(cantidadPro, NumeroLiProduc, proId);
  }

  sumaCantidad(cantidadPro,NumeroLiProduc,proId){

    for (let i = 0; i < this.listaInventario.length; i++) {
      if(this.listaInventario[i].IdProducto==proId && cantidadPro < this.listaInventario[i].Cantidad){
        this.listaDetalles[NumeroLiProduc-1].Cantidad ++;
        this.listaDetalles[NumeroLiProduc-1].MontoTotal = this.listaDetalles[NumeroLiProduc-1].Cantidad * this.listaDetalles[NumeroLiProduc-1].Precio;
        this.listaDetalles[NumeroLiProduc-1].MontoTotalDesc = this.listaDetalles[NumeroLiProduc-1].MontoTotal * (this.listaDetalles[NumeroLiProduc-1].Descuento/100);
        this.listaDetalles[NumeroLiProduc-1].MontoTotalImp = this.listaDetalles[NumeroLiProduc-1].MontoTotal * 0.13;
        this.listaDetalles[NumeroLiProduc-1].TotalLinea = this.listaDetalles[NumeroLiProduc-1].MontoTotal - this.listaDetalles[NumeroLiProduc-1].MontoTotalDesc + this.listaDetalles[NumeroLiProduc-1].MontoTotalImp;
        this.MontosFactura();
          return;
      }
    }
    
    alert("La cantidad maxima fue alcanzada, no se pueden agregar más productos");
    console.log(cantidadPro, NumeroLiProduc, proId);
  }

  obtenerCliente(clienteId,tipoId){
    this.clienteService.consultarCliente(clienteId,parseInt(tipoId)).subscribe(data=>{
      this.cliente=data;


      if(this.cliente!=null){
        this.error=false;
        this.Show = true;
        this.apellidos=this.cliente.TbPersona.Apellido1.trim() + " " + this.cliente.TbPersona.Apellido2.trim();
        this.direccion=this.cliente.TbPersona.TbBarrios.Nombre.trim()+", "+this.cliente.TbPersona.TbBarrios.TbDistrito.Nombre.trim()+", "+this.cliente.TbPersona.TbBarrios.TbDistrito.TbCanton.Nombre.trim()+", "+this.cliente.TbPersona.TbBarrios.TbDistrito.TbCanton.ProvinciaNavigation.Nombre.trim();

      }
      else{
        alert("El cliente que busca no exite.");
      }
      
    });

      if(this.error==false){
        alert("El cliente que busca no exite.");
      }
  }
  
  obtenerListaTipoPago(){
    this.tipoPagoService.getListTipoPago().subscribe(data=>{
      this.listaTipoPago=data;
    })
  }
  obtenerListaTipoVenta(){
    this.tipoVentaService.getListTipoVenta().subscribe(data=>{
      this.listaTipoVenta=data;
    })
  }

  obtenerProductos(id: string){
    var bandera = false;
    var error = false;
    this.producservice.getProductoById(parseInt(id)).subscribe(data=>{
      
      this.productoConsultado=data;
      error=true;
      console.log(this.error);
      if(data!=null){
        
        let cantStock = data.IdProductoNavigation.Cantidad;
        if(this.productoDescuento > data.DescuentoMax){
          alert("No se puede aplicar el descuento digitado al producto, el descuento maximo es: "+data.DescuentoMax);
          this.productoDescuento = data.DescuentoMax;
          return;
        }
        if(this.Cantidad >0){
          this.detalle.IdTipoDoc = 1;
          this.detalle.IdDoc = 0;
          this.detalle.IdProducto = data.IdProducto.toString();
          this.detalle.Precio = data.PrecioVenta1;
          this.detalle.Cantidad = this.Cantidad;
          this.detalle.MontoTotal = this.detalle.Precio * this.detalle.Cantidad;
          this.detalle.MontoTotalImp = parseInt ((this.detalle.MontoTotal * 0.13).toString());
          if(this.cliente != null){
            if(this.cliente.IdExonercionNavigation != null){

              this.detalle.MontoTotalExo = (data.PrecioVenta1*(parseInt(this.cliente.IdExonercionNavigation.Valor.toString()))/100);
            }
          }
          else{
            this.detalle.MontoTotalExo = 0;
          }
          if(data.AplicaDescuento){
            this.detalle.Descuento = this.productoDescuento;
            this.detalle.MontoTotalDesc = (this.detalle.MontoTotal * (this.productoDescuento/100));
          }
          else{
            this.detalle.Descuento = 0;
            this.detalle.MontoTotalDesc = 0;
          }
          this.detalle.TotalLinea = this.detalle.MontoTotal - this.detalle.MontoTotalDesc + this.detalle.MontoTotalImp;
          if(this.listaDetalles.length == 0){
            this.detalle.NumLinea = this.listaDetalles.length+1;
            
            if( cantStock < this.Cantidad ){
              alert("No hay suficientes productos en inventario, la cantidad actual es de: "+cantStock);
              this.detalle = new TbDetalleDocumento;
              return;
            }
            this.listaDetalles.push(this.detalle);
            this.detalle = new TbDetalleDocumento;

          } 
          else{
          for(let i = 0; i < this.listaDetalles.length;i++){
            if(this.listaDetalles[i].IdProducto == data.IdProducto.toString()){
              if(this.listaDetalles[i].Cantidad == NaN){
                this.listaDetalles[i].Cantidad = 0;
              }
              
              this.listaDetalles[i].Cantidad = parseInt(this.listaDetalles[i].Cantidad.toString()) + parseInt(this.Cantidad.toString());
              if(cantStock < this.listaDetalles[i].Cantidad){
                alert("No hay suficientes productos en inventario, la cantidad actual es de: "+cantStock);
                this.listaDetalles[i].Cantidad = parseInt(this.listaDetalles[i].Cantidad.toString()) - parseInt(this.Cantidad.toString());
              }
              this.listaDetalles[i].MontoTotal = this.listaDetalles[i].Cantidad * this.listaDetalles[i].Precio;
              this.listaDetalles[i].MontoTotalDesc = this.listaDetalles[i].MontoTotal * (this.listaDetalles[i].Descuento/100);
              this.listaDetalles[i].MontoTotalImp = this.listaDetalles[i].MontoTotal * 0.13;
              if(this.cliente != null){
                if(this.cliente.IdExonercionNavigation != null){
    
                  this.listaDetalles[i].MontoTotalExo  = this.listaDetalles[i].MontoTotal * ((parseInt(this.cliente.IdExonercionNavigation.Valor.toString()))/100);
                }
                else{
                  this.listaDetalles[i].MontoTotalExo = 0;
                }
              }
              else{
                this.listaDetalles[i].MontoTotalExo = 0;
              }
              this.listaDetalles[i].TotalLinea = this.listaDetalles[i].MontoTotal - this.listaDetalles[i].MontoTotalDesc + this.listaDetalles[i].MontoTotalImp - this.listaDetalles[i].MontoTotalExo
              bandera = true;
            }
          }
          if(bandera == false){
                this.detalle.NumLinea = this.listaDetalles.length+1;
              if( cantStock < this.Cantidad ){
                alert("No hay suficientes productos en inventario, la cantidad actual es de: "+cantStock);
                this.detalle = new TbDetalleDocumento;
              return;
            }
                this.listaDetalles.push(this.detalle);
                this.detalle = new TbDetalleDocumento;
          }
        }
        }
        
      }
      else{
        alert("El producto ingresado no existe")
      }
     this.MontosFactura();
    })
    
  }

  Eliminar(id){
    for(let i=0; this.listaDetalles.length>i; i++){
      if(this.listaDetalles[i].IdProducto==id){

        this.subTotal -= this.listaDetalles[i].MontoTotal;
        this.descuento -= this.listaDetalles[i].MontoTotalDesc;
        this.iva -= this.listaDetalles[i].MontoTotalImp;
        this.exonerado -= this.listaDetalles[i].MontoTotalExo;
        this.TotalFactura -= this.listaDetalles[i].TotalLinea;

        this.listaDetalles.splice(i,1)
       }
      }
  }

  MontosFactura(){
    this.subTotal = 0;
    this.descuento = 0;
    this.iva = 0;
    this.exonerado = 0;
    this.TotalFactura = 0;
    for(let i = 0; i <= this.listaDetalles.length-1;i++){
      this.subTotal = this.subTotal + this.listaDetalles[i].MontoTotal;
      this.descuento = this.descuento + this.listaDetalles[i].MontoTotalDesc;
      this.iva = this.iva + this.listaDetalles[i].MontoTotalImp;
      this.exonerado = this.exonerado + this.listaDetalles[i].MontoTotalExo;
      this.TotalFactura = this.TotalFactura + this.listaDetalles[i].TotalLinea;
    }
  }


  obtenerListaTipoId(){
    this.tipoIdService.getTipoId().subscribe(data=>{

      
      this.listaTipoId=data;
    })
  }
  obtenerStockInventario(productoId){
    this.inventarioService.getInventarioById(productoId).subscribe(data=>{

      
      this.inventarioStock=data.Cantidad
    })
  }
  obtenerTodosLosProductos(){
    this.producservice.get().subscribe(data=>{

      
      this.listaProductos=data
    })
  }
  obtenerTodoInventario(){

    this.inventarioService.get().subscribe(data=>{

      
      this.listaInventario=data
    })
  }
  obtenerTodosClientes(){

    this.clienteService.getClientes().subscribe(data=>{

      
      this.listaClientes=data
    })
  }

  CrearFactura(){

    let factura : TbDocumento;
    factura = new TbDocumento();

    if(this.listaDetalles.length == 0){
      alert("No hay detalles");
      return;
    }
      factura.Id = 0;
      factura.TipoDocumento = 1;
      factura.Consecutivo = "";
      factura.Clave = "";
      factura.ReporteElectronic = true;
      factura.Fecha = new Date;
      if(this.cliente == null){
        factura.IdCliente = null;
      }
      else{
        factura.IdCliente = this.cliente.Id;
      }
      factura.TipoIdCliente = this.tipoId;
      factura.TipoVenta = this.tipoVenta;
      factura.Plazo = this.plazo;
      factura.TipoPago = this.tipoPago;
      factura.RefPago = "";
      factura.TipoMoneda = 1;
      factura.TipoCambio = 0;
      factura.EstadoFactura = 1;
      factura.EstadoFacturaHacienda = "";
      factura.ReporteAceptaHacienda = true;
      factura.MensajeReporteHacienda = "";
      factura.MensajeRespHacienda = false;
      factura.FechaCrea = new Date;
      factura.FechaUltMod = new Date;
      factura.UsuarioCrea = "Carlos";
      factura.UsuarioUltMod = "Carlos";
      factura.Estado= true;
      factura.NotificarCorreo = this.ckCorreo;
      if(this.cliente == null){
        factura.Correo1 = null;
      }
      else{
        factura.Correo1 = this.cliente.CorreoElectConta;
      }
      factura.Correo2 = this.correoElectronico2;
      if(this.Observaciones == null){
        factura.Observaciones == null;
      }
      else{
        factura.Observaciones = this.Observaciones.substring(0,499);
      }
      
      factura.IdEmpresa = "603920529";
      factura.TipoIdEmpresa = 1;
      factura.TipoDocRef  = 0;
      factura.ClaveRef = "";
      factura.FechaRef = new Date;
      factura.CodigoRef = 0;
      factura.Razon = "";
      factura.XmlSinFirma = "";
      factura.XmlFirmado = "";
      factura.XmlRespuesta = "";

      factura.TbClientes = null;
      factura.TbEmpresa = null;
      factura.TipoDocumentoNavigation = null;;
      factura.TipoMonedaNavigation = null;  
      factura.TipoPagoNavigation = null; 
      factura.TipoVentaNavigation  = null;;
      factura.TbDetalleDocumento = this.listaDetalles;

      this.facturaService.post(factura).subscribe(data=>{
        if(data){
          alert("Se facturó correctamente, recargue la pagina");
        }
        else{
          alert("No se pudo facturar, verifique los datos");
        }
        
      })
  }

}
