import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
  template: '<h3>{{errorMsg}}</h3>',
  templateUrl: './facturador.component.html',
  styleUrls: ['./facturador.component.css']
})
export class FacturadorComponent implements OnInit {

  constructor(private msjAlert: ToastrService, private facturaService: FacturaService, private tipoVentaService: TipoCompraService, private tipoIdService: DataTipoIdService, private clienteService: DataClienteService, private producservice: ProducserviceService, private tipoPagoService: TipoPagoService, private inventarioService: InventarioService) {

    this.obtenerListaTipoId();
    this.obtenerListaTipoPago();
    this.obtenerListaTipoVenta();
    this.obtenerTodoInventario();
    this.obtenerTodosLosProductos();
    this.obtenerTodosClientes();
  }

  ngOnInit() {


  }

  fecha: Date;

  clave: string;
  refPago: string;
  Observaciones: string;
  Id: string;
  clienteId: string;
  productoId: string = "1";
  apellidos: string;
  direccion: string;
  nombre: string;
  correoElectronico2: string = null;
  eliminaNombreProducto: string;
  buscar: string = "";
  prueba: string = "";
  eliminaIdProducto: string;

  Show: boolean = false;
  error: boolean = true;
  ckCorreo: boolean = false;
  
  plazo: number = 1;
  productoDescuento: number = 0
  subTotal: number = 0;
  descuento: number = 0;
  iva: number = 0;
  exonerado: number = 0;
  TotalFactura: number = 0;
  inventarioStock: number = 0;
  tipoId: number = 1;
  producIdCombo: number = 1;
  tipoPago: number = 1;
  tipoVenta: number = 1;
  cuantoPaga: number;
  total: number = 0;
  Cantidad: number = 1;

  doc: TbDocumento;
  cliente: TbClientes = null;
  detalle: TbDetalleDocumento = new TbDetalleDocumento;
  productoConsultado: TbProducto;

  listaTipoId: Array<TbTipoId>;
  listaDetalles: Array<TbDetalleDocumento> = new Array();
  listaProductos: Array<TbProducto> = new Array();
  listaInventario: Array<TbInventario> = new Array();
  listaTipoPago: Array<TbTipoPago> = new Array();
  listaTipoVenta: Array<TbTipoVenta> = new Array();
  listaClientes: Array<TbClientes> = new Array();
  
  plazoCredito(){
    if(this.plazo<=0){
      this.msjAlert.warning("El plazo no puede ser menor a 0, el plazo minimo es: 1")
      this.plazo=1;
    } else if(this.plazo>this.cliente.PlazoCreditoMax){
      this.msjAlert.warning("El plazo no puede ser mayor a "+this.cliente.PlazoCreditoMax)
      this.plazo=this.cliente.PlazoCreditoMax;
    }
    
  }
  
  limpiar() {
    this.cuantoPaga = 0;
  }
  printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
    location.reload();
  }

  seleccionarCliente(cliente) {
    try {

      console.log(cliente)
      this.cliente = cliente
      this.Show = true;
      this.clienteId = cliente.Id
      this.cliente.TipoId
      this.direccion = "";

      this.clienteService.consultarCliente(cliente.Id.trim(), parseInt(cliente.TipoId)).subscribe(data => {
        this.msjAlert.success("Cliente seleccionado correctamente.")
        this.cliente = data;
        if (this.cliente.TbPersona.Apellido1 != null && this.cliente.TbPersona.Apellido2) {
          this.apellidos = this.cliente.TbPersona.Apellido1.trim() + " " + this.cliente.TbPersona.Apellido2.trim();
        }
        if (this.cliente.TbPersona.Apellido1 == null && this.cliente.TbPersona.Apellido2 != null) {
          this.apellidos = this.cliente.TbPersona.Apellido2.trim();
        }
        if (this.cliente.TbPersona.Apellido1 != null && this.cliente.TbPersona.Apellido2 == null) {
          this.apellidos = this.cliente.TbPersona.Apellido1.trim();
        }

        if (this.cliente.TbPersona.TbBarrios.TbDistrito.TbCanton.ProvinciaNavigation.Nombre.trim() != null && this.cliente.TbPersona.TbBarrios.TbDistrito.TbCanton.Nombre.trim() != null && this.cliente.TbPersona.TbBarrios.TbDistrito.Nombre.trim() != null && this.cliente.TbPersona.TbBarrios.Nombre.trim() != null) {
          this.direccion = this.cliente.TbPersona.TbBarrios.Nombre.trim() + ", " + this.cliente.TbPersona.TbBarrios.TbDistrito.Nombre.trim() + ", " + this.cliente.TbPersona.TbBarrios.TbDistrito.TbCanton.Nombre.trim() + ", " + this.cliente.TbPersona.TbBarrios.TbDistrito.TbCanton.ProvinciaNavigation.Nombre.trim();
        }
      }, error => { this.msjAlert.error("No se pudo obtener el cliente consultado") })
    } catch (error) {
      this.msjAlert.error("Error operacion.");
    }



  }

  restaCantidad(cantidadPro, NumeroLiProduc, proId) {
    for (let i = 0; i < this.listaInventario.length; i++) {
      if (this.listaInventario[i].IdProducto == proId && 1 < cantidadPro) {
        this.listaDetalles[NumeroLiProduc - 1].Cantidad = this.listaDetalles[NumeroLiProduc - 1].Cantidad - 1;
        this.listaDetalles[NumeroLiProduc - 1].MontoTotal = this.listaDetalles[NumeroLiProduc - 1].Cantidad * this.listaDetalles[NumeroLiProduc - 1].Precio;

        this.listaDetalles[NumeroLiProduc - 1].MontoTotalDesc = this.listaDetalles[NumeroLiProduc - 1].MontoTotal * (this.listaDetalles[NumeroLiProduc - 1].Descuento / 100);
        this.listaDetalles[NumeroLiProduc - 1].MontoTotalImp = this.listaDetalles[NumeroLiProduc - 1].MontoTotal * 0.13;
        this.listaDetalles[NumeroLiProduc - 1].TotalLinea = this.listaDetalles[NumeroLiProduc - 1].MontoTotal - this.listaDetalles[NumeroLiProduc - 1].MontoTotalDesc + this.listaDetalles[NumeroLiProduc - 1].MontoTotalImp;
        
        this.MontosFactura();

        return;
      }
    }
    this.msjAlert.warning("La cantidad minima es 1, no se le puede restar mas productos.")
  }
  
  setNumeroLinea(){
    for (let i = 0; i < this.listaDetalles.length; i++) {
      this.listaDetalles[i].NumLinea = i+1;
    }
  }

  sumaCantidad(cantidadPro, NumeroLiProduc, proId) {

    for (let i = 0; i < this.listaInventario.length; i++) {

      
      if (this.listaInventario[i].IdProducto == proId && cantidadPro < this.listaInventario[i].Cantidad) {

        this.listaDetalles[NumeroLiProduc - 1].Cantidad ++;
        this.listaDetalles[NumeroLiProduc - 1].MontoTotal = this.listaDetalles[NumeroLiProduc - 1].Cantidad * this.listaDetalles[NumeroLiProduc - 1].Precio;
        this.listaDetalles[NumeroLiProduc - 1].MontoTotalDesc = this.listaDetalles[NumeroLiProduc - 1].MontoTotal * (this.listaDetalles[NumeroLiProduc - 1].Descuento / 100);
        this.listaDetalles[NumeroLiProduc - 1].MontoTotalImp = this.listaDetalles[NumeroLiProduc - 1].MontoTotal * 0.13;
        this.listaDetalles[NumeroLiProduc - 1].TotalLinea = this.listaDetalles[NumeroLiProduc - 1].MontoTotal - this.listaDetalles[NumeroLiProduc - 1].MontoTotalDesc + this.listaDetalles[NumeroLiProduc - 1].MontoTotalImp;
        this.MontosFactura();
        return;
      }
    }
    this.msjAlert.warning("La cantidad maxima fue alcanzada, no se pueden agregar más productos.")
  }

  obtenerCliente(clienteId, tipoId) {

    try {

      this.clienteService.consultarCliente(clienteId, parseInt(tipoId)).subscribe(data => {
        this.msjAlert.success("Cliente seleccionado correctamente.")
        this.cliente = data;
        this.error = false;
        this.Show = true;
        if (this.cliente.TbPersona.Apellido1 != null && this.cliente.TbPersona.Apellido2) {
          this.apellidos = this.cliente.TbPersona.Apellido1.trim() + " " + this.cliente.TbPersona.Apellido2.trim();
        }
        if (this.cliente.TbPersona.Apellido1 == null && this.cliente.TbPersona.Apellido2 != null) {
          this.apellidos = this.cliente.TbPersona.Apellido2.trim();
        }
        if (this.cliente.TbPersona.Apellido1 != null && this.cliente.TbPersona.Apellido2 == null) {
          this.apellidos = this.cliente.TbPersona.Apellido1.trim();
        }

        if (this.cliente.TbPersona.TbBarrios.TbDistrito.TbCanton.ProvinciaNavigation.Nombre.trim() != null && this.cliente.TbPersona.TbBarrios.TbDistrito.TbCanton.Nombre.trim() != null && this.cliente.TbPersona.TbBarrios.TbDistrito.Nombre.trim() != null && this.cliente.TbPersona.TbBarrios.Nombre.trim() != null) {
          this.direccion = this.cliente.TbPersona.TbBarrios.Nombre.trim() + ", " + this.cliente.TbPersona.TbBarrios.TbDistrito.Nombre.trim() + ", " + this.cliente.TbPersona.TbBarrios.TbDistrito.TbCanton.Nombre.trim() + ", " + this.cliente.TbPersona.TbBarrios.TbDistrito.TbCanton.ProvinciaNavigation.Nombre.trim();
        }

        this.calcularMontoPorLinea()
      }, error => { this.msjAlert.error("No se pudo obtener el cliente.") })

      if (this.error == false) {
        alert("El cliente que busca no exite.");
      }

    } catch (error) {
      this.msjAlert.error("Error operacion.");
    }


  }

  obtenerListaTipoPago() {
    try {
      this.tipoPagoService.getListTipoPago().subscribe(data => {
        this.listaTipoPago = data;
      }, error => { this.msjAlert.error("No se pudieron obtener los tipos de venta") })
    } catch (error) {
      this.msjAlert.error("Error operacion.");
    }

  }
  obtenerListaTipoVenta() {
    try {
      this.tipoVentaService.getListTipoVenta().subscribe(data => {
        this.listaTipoVenta = data;
      }, error => { this.msjAlert.error("No se pudieron obtener los tipos de venta") })

    } catch (error) {
      this.msjAlert.error("Error operacion.");
    }

  }

  seleccionarProducto(Product: TbProducto) {
    console.log(Product)
    this.agregarProducto(Product)

    this.MontosFactura();
  }

  obtenerProductos(id: string) {
    try {
      this.productoId = "";


      this.producservice.getProductoById(parseInt(id)).subscribe(data => {

        this.productoConsultado = data;

        this.agregarProducto(this.productoConsultado)

        this.MontosFactura();
      }, error => { this.msjAlert.error("No se pudo obtener el producto consultado por codigo.") })

    } catch (error) {
      this.msjAlert.error("Error operacion.");
    }


  }
  agregarProducto(data) {
    var bandera = false;
    var error = false;

    this.productoConsultado = data;
    error = true;
    console.log(data);
    if (data != null) {

      let cantStock = data.IdProductoNavigation.Cantidad;
      console.log(this.productoDescuento,data.DescuentoMax)
      if(data.AplicaDescuento){
        if (this.productoDescuento > data.DescuentoMax) {

          this.msjAlert.warning("Lo mas que se puede aplicar de descuento al "+ data.Nombre+" es:" + data.DescuentoMax + "%.")

        }
      }
      
      if (this.Cantidad > 0) {

        this.detalle.IdTipoDoc = 1;
        this.detalle.IdDoc = 0;
        this.detalle.IdProducto = data.IdProducto.toString();
        this.detalle.Precio = data.PrecioVenta1;
        this.detalle.Cantidad = this.Cantidad;
        this.detalle.MontoTotal = this.detalle.Precio * this.detalle.Cantidad;
        this.detalle.MontoTotalImp = parseInt((this.detalle.MontoTotal * 0.13).toString());
        this.detalle.IdProductoNavigation = data;

        if (this.cliente != null) {

          if (this.cliente.IdExonercionNavigation != null) {

            this.detalle.MontoTotalExo = (data.PrecioVenta1 * (parseInt(this.cliente.IdExonercionNavigation.Valor.toString())) / 100);
          }

        }
        else {

          this.detalle.MontoTotalExo = 0;
        }

        
          this.detalle.Descuento = 0;
          this.detalle.MontoTotalDesc = 0;
        

        this.detalle.TotalLinea = this.detalle.MontoTotal - this.detalle.MontoTotalDesc - this.detalle.MontoTotalExo + this.detalle.MontoTotalImp;

        if (this.listaDetalles.length == 0) {
          this.detalle.NumLinea = this.listaDetalles.length + 1;

          if (cantStock < this.Cantidad) {
            this.msjAlert.success("No hay suficientes productos en inventario, la cantidad actual es de: " + cantStock)

            this.detalle = new TbDetalleDocumento;
            return;
          }

          this.listaDetalles.push(this.detalle);
          this.calcularMontoPorLinea();
          this.detalle = new TbDetalleDocumento;

        }

        else {
          for (let i = 0; i < this.listaDetalles.length; i++) {
            if (this.listaDetalles[i].IdProducto == data.IdProducto.toString()) {

              if (this.listaDetalles[i].Cantidad == NaN) {
                this.listaDetalles[i].Cantidad = 0;
              }

              this.listaDetalles[i].Cantidad = parseInt(this.listaDetalles[i].Cantidad.toString()) + parseInt(this.Cantidad.toString());

              if (cantStock < this.listaDetalles[i].Cantidad) {
                this.msjAlert.success("No hay suficientes productos en inventario, la cantidad actual es de: " + cantStock)

                this.listaDetalles[i].Cantidad = parseInt(this.listaDetalles[i].Cantidad.toString()) - parseInt(this.Cantidad.toString());

              }
              //
              
              this.calcularMontoPorLinea();

              
              bandera = true;
            }
          }

          if (bandera == false) {

            this.detalle.NumLinea = this.listaDetalles.length + 1;

            if (cantStock < this.Cantidad) {

              this.msjAlert.success("No hay suficientes productos en inventario, la cantidad actual es de: " + cantStock)
              this.detalle = new TbDetalleDocumento;
              return;

            }

            this.listaDetalles.push(this.detalle);

            this.calcularMontoPorLinea();
            this.detalle = new TbDetalleDocumento;

          }

        }
      }

    }
    else {
      alert("El producto ingresado no existe")
    }
  }

  calcularMontoPorLinea() {
    
    
    for (let i = 0; i < this.listaDetalles.length; i++) {


      if (this.listaDetalles[i].IdProductoNavigation.AplicaDescuento) {
        
        this.listaDetalles[i].Descuento;

        this.listaDetalles[i].IdProductoNavigation.DescuentoMax;

        if (this.cliente == null) {
          
          this.listaDetalles[i].MontoTotalExo = 0;

          if (this.productoDescuento <= this.listaDetalles[i].IdProductoNavigation.DescuentoMax) {
            
            this.listaDetalles[i].Descuento = this.productoDescuento;
            
          } else {

            this.listaDetalles[i].Descuento = this.listaDetalles[i].IdProductoNavigation.DescuentoMax;

          }

        } else {

          if (this.cliente.IdExonercionNavigation != null) {

            this.listaDetalles[i].MontoTotalExo = this.listaDetalles[i].MontoTotal * ((parseInt(this.cliente.IdExonercionNavigation.Valor.toString())) / 100);
          }
          else {
            this.listaDetalles[i].MontoTotalExo = 0;
          }

          if (this.productoDescuento < this.cliente.DescuentoMax &&
            this.cliente.DescuentoMax < this.listaDetalles[i].IdProductoNavigation.DescuentoMax) {
              
            this.listaDetalles[i].Descuento = this.productoDescuento / 100;

          } else if (this.productoDescuento > this.cliente.DescuentoMax &&
            this.cliente.DescuentoMax > this.listaDetalles[i].IdProductoNavigation.DescuentoMax) {
              
            this.listaDetalles[i].Descuento = this.listaDetalles[i].IdProductoNavigation.DescuentoMax;

          } else {
            
            this.listaDetalles[i].Descuento = this.cliente.DescuentoMax;
          }

        }
        
        this.listaDetalles[i].MontoTotal = this.listaDetalles[i].Cantidad * this.listaDetalles[i].Precio;
        
        this.listaDetalles[i].MontoTotalDesc = this.listaDetalles[i].MontoTotal * (this.listaDetalles[i].Descuento / 100);
        
        this.listaDetalles[i].MontoTotalImp = this.listaDetalles[i].MontoTotal * 0.13;
        this.listaDetalles[i].TotalLinea = this.listaDetalles[i].MontoTotal - this.listaDetalles[i].MontoTotalDesc + this.listaDetalles[i].MontoTotalImp - this.listaDetalles[i].MontoTotalExo;

        this.MontosFactura();
      }


    }
  }

  Eliminar(id) {
    for (let i = 0; this.listaDetalles.length > i; i++) {
      
      if (this.listaDetalles[i].IdProducto == id) {

        this.listaDetalles.splice(i, 1);
        this.setNumeroLinea();
        this.MontosFactura();
      }
    }
  }


  EnviaDatoEliminar(id: string, nombre: string) {
    
    this.eliminaIdProducto = id;
    this.eliminaNombreProducto = nombre;

  }

  MontosFactura() {
    this.subTotal = 0;
    this.descuento = 0;
    this.iva = 0;
    this.exonerado = 0;
    this.TotalFactura = 0;

    for (let i = 0; i <= this.listaDetalles.length - 1; i++) {
      this.subTotal = this.subTotal + this.listaDetalles[i].MontoTotal;
      this.descuento = this.descuento + this.listaDetalles[i].MontoTotalDesc;

      this.iva = this.iva + this.listaDetalles[i].MontoTotalImp;
      this.exonerado = this.exonerado + this.listaDetalles[i].MontoTotalExo;
      if(this.listaDetalles[i].TotalLinea==NaN){
        this.listaDetalles[i].TotalLinea==0;
      }
      this.TotalFactura = this.TotalFactura + this.listaDetalles[i].TotalLinea;
    }
  }


  obtenerListaTipoId() {
    try {

      this.tipoIdService.getTipoId().subscribe(data => {


        this.listaTipoId = data;
      }, error => { this.msjAlert.error("No se pudo obtener los tipos de Id") })
    }
    catch (error) {

    }


  }
  obtenerStockInventario(productoId) {
    try {
      this.inventarioService.getInventarioById(productoId).subscribe(data => {


        this.inventarioStock = data.Cantidad
      }, error => { this.msjAlert.error("No se pudo obtener el inventario") })

    } catch (error) {
      this.msjAlert.error("Error operacion.");
    }

  }
  obtenerTodosLosProductos() {

    try {

      this.producservice.get().subscribe(data => {


        this.listaProductos = data
        console.log(this.listaProductos)
      }, error => { this.msjAlert.error("No se pudiero obtener todos los productos") })

    } catch (error) {
      this.msjAlert.error("Error operacion.");
    }



  }
  obtenerTodoInventario() {

    try {
      this.inventarioService.get().subscribe(data => {


        this.listaInventario = data
      }, error => { this.msjAlert.error("No se pudo obtener todo el inventario") })

    } catch (error) {
      this.msjAlert.error("Error operacion.");
    }


  }
  obtenerTodosClientes() {
    try {
      this.clienteService.getClientes().subscribe(data => {


        this.listaClientes = data
        console.log(this.listaClientes)
      }, error => { this.msjAlert.error("No se pudo obtener los clientes") })

    } catch (error) {
      this.msjAlert.error("Error operacion.");
    }

  }

  CrearFactura(Imprecion) {
    try {
      let factura: TbDocumento;
      factura = new TbDocumento();

      if (this.listaDetalles.length == 0) {
        alert("No hay detalles");
        return;
      }
      factura.Id = 0;
      factura.TipoDocumento = 1;
      factura.Consecutivo = "";
      factura.Clave = "";
      factura.ReporteElectronic = true;
      factura.Fecha = new Date;
      if (this.cliente == null) {
        factura.IdCliente = null;
      }
      else {
        factura.IdCliente = this.cliente.Id;
      }
      factura.TipoIdCliente = this.tipoId;
      factura.TipoVenta = this.tipoVenta;
      factura.Plazo = this.plazo;
      factura.TipoPago = this.tipoPago;
      factura.RefPago = this.refPago;
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
      factura.Estado = true;
      factura.NotificarCorreo = this.ckCorreo;
      if (this.cliente == null) {
        factura.Correo1 = null;
      }
      else {
        factura.Correo1 = this.cliente.CorreoElectConta;
      }
      factura.Correo2 = this.correoElectronico2;
      if (this.Observaciones == null) {
        factura.Observaciones == null;
      }
      else {
        factura.Observaciones = this.Observaciones.substring(0, 499);
      }

      factura.IdEmpresa = "603920529";
      factura.TipoIdEmpresa = 1;
      factura.TipoDocRef = 0;
      factura.ClaveRef = "";
      factura.FechaRef = new Date;
      factura.CodigoRef = 0;
      factura.Razon = "";
      factura.XmlSinFirma = "";
      factura.XmlFirmado = "";
      factura.XmlRespuesta = "";

      factura.TbClientes = this.cliente;
      factura.TbEmpresa = null;
      factura.TipoDocumentoNavigation = null;;
      factura.TipoMonedaNavigation = null;
      factura.TipoPagoNavigation = null;
      factura.TipoVentaNavigation = null;;
      factura.TbDetalleDocumento = this.listaDetalles;

      this.fecha = new Date();


      this.msjAlert.info("Estamos agregando los datos,aguarda unos instantes");
      alert("llego")
      this.facturaService.post(factura).subscribe(
        (data => {
          this.msjAlert.success('Factura agregada correctamente, ' + "La clave es:" + this.clave)
          this.doc = data;
          console.log(this.doc)
          this.clave = this.doc.Clave

        })


      )


    } catch (error) {
      this.msjAlert.error('Error operacion.');
    }
  }

}
