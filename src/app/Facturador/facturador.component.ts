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
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-factura',
  template: '<h3>{{errorMsg}}</h3>',
  templateUrl: './facturador.component.html',
  styleUrls: ['./facturador.component.css']
})
export class FacturadorComponent implements OnInit {

  constructor(private msjAlert: ToastrService, private facturaService: FacturaService, private tipoVentaService: TipoCompraService, private tipoIdService: DataTipoIdService, private clienteService: DataClienteService, private producservice: ProducserviceService, private tipoPagoService: TipoPagoService, private inventarioService: InventarioService) {
    //Estos son los metodos que necesitamos ejecutar al abrir el componente

    this.obtenerListaTipoId();
    this.obtenerListaTipoPago();
    this.obtenerListaTipoVenta();
    this.obtenerTodoInventario();
    this.obtenerTodosLosProductos();
    this.obtenerTodosClientes();
  }

  ngOnInit() {


  }
  @ViewChild('content') content:ElementRef;
  //Variables tipo: Date
  fecha: Date;
  //Variables tipo: string
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
  //Variables tipo: boolean
  Show: boolean = false;
  error: boolean = true;
  ckCorreo: boolean = false;
  //Variables tipo: number
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
  //Variables tipo: Objeto
  doc: TbDocumento;
  cliente: TbClientes = null;
  detalle: TbDetalleDocumento = new TbDetalleDocumento;
  productoConsultado: TbProducto;
  //Variables tipo: Array de objetos
  listaTipoId: Array<TbTipoId>;
  listaDetalles: Array<TbDetalleDocumento> = new Array();
  listaProductos: Array<TbProducto> = new Array();
  listaInventario: Array<TbInventario> = new Array();
  listaTipoPago: Array<TbTipoPago> = new Array();
  listaTipoVenta: Array<TbTipoVenta> = new Array();
  listaClientes: Array<TbClientes> = new Array();

  //Metodos

  plazoCredito() {
    //Este metodo se ejecutaciempre que en el input de plazo del credito se precione una tecla del teclado y lo que hace es validar.
    //Si...
    if (this.plazo <= 0) {
      //Entonces que le tiere un alert y le setea a plazo el plazo minimo que tiene el cliente.
      this.msjAlert.warning("El plazo no puede ser menor a 0, el plazo minimo es: 1")
      this.plazo = 1;
      //si no si...
    } else if (this.plazo > this.cliente.PlazoCreditoMax) {
      //Entonces que le tire un alert y le setea a plazo el plazo max que tiene el cliente.
      this.msjAlert.warning("El plazo no puede ser mayor a " + this.cliente.PlazoCreditoMax)
      this.plazo = this.cliente.PlazoCreditoMax;
    }

  }

  limpiar() {
    //Se utilza para 'limpiar' o setear un campo en 0.
    this.cuantoPaga = 0;
  }

  printDiv(divName) {
    //Este metodo se utiliza para imprimir un div completo y lo que resive de parametro es el Id del mismo.
    //getElementById(divName) Devuelve una referencia al primer objeto con el valor especificado del atributo ID o NOMBRE
    //Toma el html del la fracción de codigo selecciona por el Id
    var printContents = document.getElementById(divName).innerHTML;
    //Cualquier elemento HTML. Algunos elementos implementan directamente esta interfaz, mientras que otros la implementan a través de una interfaz que la hereda.
    var originalContents = document.body.innerHTML;
    //document.body.innerHTML se le setea printContents
    document.body.innerHTML = printContents;
    //Abre la ventana que va a imprimir 
    window.print();
    //document.body.innerHTML le seteamos lo que tiene originalContents
    document.body.innerHTML = originalContents;
    //Recaarga la pagina
    location.reload();
  }

  seleccionarCliente(cliente) {
    try {
      //Metodo que utilizamos para seleccionar un cliente
      //Seteamos volor a alguans variables
      this.cliente = cliente
      this.Show = true;
      this.clienteId = cliente.Id
      this.cliente.TipoId
      this.direccion = "";
      //Llamamos al metodo
      this.obtenerCliente(cliente.Id, cliente.TipoId);
    } catch (error) {
      //Tira un alert cuando susede una ex
      this.msjAlert.error("Error operacion.");
    }



  }

  restaCantidad(cantidadPro, NumeroLiProduc, proId) {
    //Este metodo se utiliza cuando se le da click al boton -
    //aplicamos un for
    for (let i = 0; i < this.listaInventario.length; i++) {
      //si se clumple entonces...
      if (this.listaInventario[i].IdProducto == proId && 1 < cantidadPro) {
        //Calculamos... y seteamos
        this.listaDetalles[NumeroLiProduc - 1].Cantidad = this.listaDetalles[NumeroLiProduc - 1].Cantidad - 1;
        this.listaDetalles[NumeroLiProduc - 1].MontoTotal = this.listaDetalles[NumeroLiProduc - 1].Cantidad * this.listaDetalles[NumeroLiProduc - 1].Precio;
        this.listaDetalles[NumeroLiProduc - 1].MontoTotalDesc = this.listaDetalles[NumeroLiProduc - 1].MontoTotal * (this.listaDetalles[NumeroLiProduc - 1].Descuento / 100);
        this.listaDetalles[NumeroLiProduc - 1].MontoTotalImp = this.listaDetalles[NumeroLiProduc - 1].MontoTotal * 0.13;
        this.listaDetalles[NumeroLiProduc - 1].TotalLinea = this.listaDetalles[NumeroLiProduc - 1].MontoTotal - this.listaDetalles[NumeroLiProduc - 1].MontoTotalDesc + this.listaDetalles[NumeroLiProduc - 1].MontoTotalImp;
        //Llamos metodo
        this.MontosFactura();

        return;
      }
    }
    //Alert 
    this.msjAlert.warning("La cantidad minima es 1, no se le puede restar mas productos.")
  }

  setNumeroLinea() {
    //Metodo para setear el numero de linea
    //aplicamos un for
    for (let i = 0; i < this.listaDetalles.length; i++) {
      //Seteamos en numero de linea
      this.listaDetalles[i].NumLinea = i + 1;
    }

  }

  sumaCantidad(cantidadPro, NumeroLiProduc, proId) {
    //aplicamos un for
    for (let i = 0; i < this.listaInventario.length; i++) {

      //si se clumple entonces...
      if (this.listaInventario[i].IdProducto == proId && cantidadPro < this.listaInventario[i].Cantidad) {
        //Seteamos 
        this.listaDetalles[NumeroLiProduc - 1].Cantidad++;
        this.listaDetalles[NumeroLiProduc - 1].MontoTotal = this.listaDetalles[NumeroLiProduc - 1].Cantidad * this.listaDetalles[NumeroLiProduc - 1].Precio;
        this.listaDetalles[NumeroLiProduc - 1].MontoTotalDesc = this.listaDetalles[NumeroLiProduc - 1].MontoTotal * (this.listaDetalles[NumeroLiProduc - 1].Descuento / 100);
        this.listaDetalles[NumeroLiProduc - 1].MontoTotalImp = this.listaDetalles[NumeroLiProduc - 1].MontoTotal * 0.13;
        this.listaDetalles[NumeroLiProduc - 1].TotalLinea = this.listaDetalles[NumeroLiProduc - 1].MontoTotal - this.listaDetalles[NumeroLiProduc - 1].MontoTotalDesc + this.listaDetalles[NumeroLiProduc - 1].MontoTotalImp;
        //Llamamos metodo
        this.MontosFactura();
        return;
      }
    }
    //Alert
    this.msjAlert.warning("La cantidad maxima fue alcanzada, no se pueden agregar más productos.")
  }

  obtenerCliente(clienteId, tipoId) {
    //Ejecutamos este metodo para obtener el cliente
    try {

      //Consultamos el cliente(lo traemos de API)
      this.clienteService.consultarCliente(clienteId.trim(), parseInt(tipoId)).subscribe(data => {
        //Si esto se ejecuta es que si me trajo el cliente.
        //Ejecutamos un alert
        this.msjAlert.success("Cliente seleccionado correctamente.")
        //Seteamos lo que trajo el servicio
        this.cliente = data;
        //validamos y si se cumple entonces...
        if (this.cliente.TbPersona.Apellido1 != null && this.cliente.TbPersona.Apellido2) {
          //Seteamos a apellidos los dos apellidos que tiene la persona(Cliente)
          this.apellidos = this.cliente.TbPersona.Apellido1.trim() + " " + this.cliente.TbPersona.Apellido2.trim();
        }
        if (this.cliente.TbPersona.Apellido1 == null && this.cliente.TbPersona.Apellido2 != null) {
          //Seteamos a apellidos el segundo apellido que tiene la persona(Cliente)
          this.apellidos = this.cliente.TbPersona.Apellido2.trim();
        }
        if (this.cliente.TbPersona.Apellido1 != null && this.cliente.TbPersona.Apellido2 == null) {
          //Seteamos a apellidos el primer apellido que tiene la persona(Cliente)
          this.apellidos = this.cliente.TbPersona.Apellido1.trim();
        }

        if (this.cliente.TbPersona.TbBarrios.TbDistrito.TbCanton.ProvinciaNavigation.Nombre.trim() != null && this.cliente.TbPersona.TbBarrios.TbDistrito.TbCanton.Nombre.trim() != null && this.cliente.TbPersona.TbBarrios.TbDistrito.Nombre.trim() != null && this.cliente.TbPersona.TbBarrios.Nombre.trim() != null) {
          //Seteamos a direccion el barrio, canton, distrito y provicia.
          this.direccion = this.cliente.TbPersona.TbBarrios.Nombre.trim() + ", " + this.cliente.TbPersona.TbBarrios.TbDistrito.Nombre.trim() + ", " + this.cliente.TbPersona.TbBarrios.TbDistrito.TbCanton.Nombre.trim() + ", " + this.cliente.TbPersona.TbBarrios.TbDistrito.TbCanton.ProvinciaNavigation.Nombre.trim();
        }

      }, /*Si tira error mada un alert esto...*/ error => { this.msjAlert.error("No se pudo obtener el cliente consultado") })



    } catch (error) {
      //Tira un alert cuando susede una ex
      this.msjAlert.error("Error operacion.");
    }


  }

  obtenerListaTipoPago() {
    //Llamamos al metodo al cargar la pagina
    try {
      //Traemos todos los tipos de pago del API
      this.tipoPagoService.getListTipoPago().subscribe(data => {
        //Lo seteamos en la siguiente variable
        this.listaTipoPago = data;
      }, /*Si da error imprimimos en el alert*/error => { this.msjAlert.error("No se pudieron obtener los tipos de venta") })
    } catch (error) {
      //Tira un alert cuando susede una ex
      this.msjAlert.error("Error operacion.");
    }

  }
  obtenerListaTipoVenta() {
    try {
      this.tipoVentaService.getListTipoVenta().subscribe(data => {
        this.listaTipoVenta = data;
      }, /*Si da error imprimimos en el alert*/error => { this.msjAlert.error("No se pudieron obtener los tipos de venta") })

    } catch (error) {
      //Tira un alert cuando susede una ex
      this.msjAlert.error("Error operacion.");
    }

  }

  seleccionarProducto(Product: TbProducto) {
    //Este metodo es llamado desde el modal
    //Llamamos a los metodos
    this.agregarProducto(Product)

    this.MontosFactura();
  }

  obtenerProductos(id: string) {
    //Metodo que consulta el producto
    try {
      //Inicializamos
      this.productoId = "";
      //Consultamos el producto
      this.producservice.getProductoById(parseInt(id)).subscribe(data => {
        //Seteamos lo que trajo el apo
        this.productoConsultado = data;
        //Llamamos al metodo que agrega el producto al detalle
        this.agregarProducto(this.productoConsultado)
        //Llamamos al metodo 
        this.MontosFactura();
      }, /*Si da error imprimimos en el alert*/error => { this.msjAlert.error("No se pudo obtener el producto consultado por codigo.") })

    } catch (error) {
      //Tira un alert cuando susede una ex
      this.msjAlert.error("Error operacion.");
    }


  }
  agregarProducto(data) {
    //declaramos variables
    var bandera = false;
    //si se clumple entonces...
    if (data != null) {

      //si se clumple entonces...
      if (data.AplicaDescuento) {
        //si se clumple entonces...
        if (this.productoDescuento > data.DescuentoMax) {
          //Alert
          this.msjAlert.warning("Lo mas que se puede aplicar de descuento al " + data.Nombre + " es: " + data.DescuentoMax + "%.")

        }
      }
      //si se clumple entonces...
      if (this.Cantidad > 0) {
        //Seteamos campos a detalle
        this.detalle.IdTipoDoc = 1;
        this.detalle.IdDoc = 0;
        this.detalle.IdProducto = data.IdProducto.toString();
        this.detalle.Precio = data.PrecioVenta1;
        this.detalle.Cantidad = this.Cantidad;
        this.detalle.MontoTotal = this.detalle.Precio * this.detalle.Cantidad;
        this.detalle.MontoTotalImp = parseInt((this.detalle.MontoTotal * 0.13).toString());
        this.detalle.IdProductoNavigation = data;

        //si se clumple entonces...
        if (this.cliente != null) {
          //si se clumple entonces...
          if (this.cliente.IdExonercionNavigation != null) {
            //Seteamos 
            this.detalle.MontoTotalExo = (data.PrecioVenta1 * (parseInt(this.cliente.IdExonercionNavigation.Valor.toString())) / 100);
          }

        }
        //Si no
        else {
          //Seteamos
          this.detalle.MontoTotalExo = 0;
        }
        //Seteamos
        this.detalle.Descuento = 0;
        this.detalle.MontoTotalDesc = 0;
        this.detalle.TotalLinea = this.detalle.MontoTotal - this.detalle.MontoTotalDesc - this.detalle.MontoTotalExo + this.detalle.MontoTotalImp;
        //si se clumple entonces...
        if (this.listaDetalles.length == 0) {
          //Seteamos
          this.detalle.NumLinea = this.listaDetalles.length + 1;
          //si se clumple entonces...
          if (data.IdProductoNavigation.Cantidad < this.Cantidad) {
            //Alert
            this.msjAlert.success("No hay suficientes productos en inventario, la cantidad actual es de: " + data.IdProductoNavigation.Cantidad)
            //Inicializamos la variable
            this.detalle = new TbDetalleDocumento;
            return;
          }
          //Insertamos el detalle a la lista
          this.listaDetalles.push(this.detalle);
          //Calculamos 
          this.calcularMontoPorLinea();
          //Inicializamos la variable
          this.detalle = new TbDetalleDocumento;

        }

        else {
          //aplicamos un for
          for (let i = 0; i < this.listaDetalles.length; i++) {
            //si se clumple entonces...
            if (this.listaDetalles[i].IdProducto == data.IdProducto.toString()) {
              //si se clumple entonces...
              if (this.listaDetalles[i].Cantidad == NaN) {
                //Seteamos
                this.listaDetalles[i].Cantidad = 0;
              }

              this.listaDetalles[i].Cantidad = parseInt(this.listaDetalles[i].Cantidad.toString()) + parseInt(this.Cantidad.toString());
              //si se clumple entonces...
              if (data.IdProductoNavigation.Cantidad < this.listaDetalles[i].Cantidad) {
                //alert
                this.msjAlert.success("No hay suficientes productos en inventario, la cantidad actual es de: " + data.IdProductoNavigation.Cantidad)
                //Seteamos
                this.listaDetalles[i].Cantidad = parseInt(this.listaDetalles[i].Cantidad.toString()) - parseInt(this.Cantidad.toString());

              }
              //Llamos al metodo

              this.calcularMontoPorLinea();

              //Seteamos
              bandera = true;
            }
          }
          //si se clumple entonces...
          if (bandera == false) {
            //Seteamos
            this.detalle.NumLinea = this.listaDetalles.length + 1;
            //si se clumple entonces...
            if (data.IdProductoNavigation.Cantidad < this.Cantidad) {
              //Alert
              this.msjAlert.success("No hay suficientes productos en inventario, la cantidad actual es de: " + data.IdProductoNavigation.Cantidad)
              //Seteamos
              this.detalle = new TbDetalleDocumento;
              return;

            }
            //
            this.listaDetalles.push(this.detalle);
            //Llamamos metodo
            this.calcularMontoPorLinea();
            //Seteamos
            this.detalle = new TbDetalleDocumento;

          }

        }
      }

    }

  }

  calcularMontoPorLinea() {

    //aplicamos un for
    for (let i = 0; i < this.listaDetalles.length; i++) {

      //si se clumple entonces...
      if (this.listaDetalles[i].IdProductoNavigation.AplicaDescuento) {
        //si se clumple entonces...
        if (this.cliente == null) {
          //Seteamos
          this.listaDetalles[i].MontoTotalExo = 0;
          //si se clumple entonces...
          if (this.productoDescuento <= this.listaDetalles[i].IdProductoNavigation.DescuentoMax) {
            //Seteamos
            this.listaDetalles[i].Descuento = this.productoDescuento;
            //Si no
          } else {
            //Seteamos
            this.listaDetalles[i].Descuento = this.listaDetalles[i].IdProductoNavigation.DescuentoMax;

          }

        } else {
          //si se clumple entonces...
          if (this.cliente.IdExonercionNavigation != null) {
            //Seteamos
            this.listaDetalles[i].MontoTotalExo = this.listaDetalles[i].MontoTotal * ((parseInt(this.cliente.IdExonercionNavigation.Valor.toString())) / 100);
          }
          else {
            //Seteamos
            this.listaDetalles[i].MontoTotalExo = 0;
          }
          //si se clumple entonces...
          if (this.productoDescuento < this.cliente.DescuentoMax &&
            //Seteamos
            this.cliente.DescuentoMax < this.listaDetalles[i].IdProductoNavigation.DescuentoMax) {

            this.listaDetalles[i].Descuento = this.productoDescuento / 100;

          } else if (this.productoDescuento > this.cliente.DescuentoMax &&
            this.cliente.DescuentoMax > this.listaDetalles[i].IdProductoNavigation.DescuentoMax) {
            //Seteamos
            this.listaDetalles[i].Descuento = this.listaDetalles[i].IdProductoNavigation.DescuentoMax;

          } else {
            //Seteamos
            this.listaDetalles[i].Descuento = this.cliente.DescuentoMax;
          }

        }
        //Seteamos
        this.listaDetalles[i].MontoTotal = this.listaDetalles[i].Cantidad * this.listaDetalles[i].Precio;
        //Seteamos
        this.listaDetalles[i].MontoTotalDesc = this.listaDetalles[i].MontoTotal * (this.listaDetalles[i].Descuento / 100);
        //Seteamos
        this.listaDetalles[i].MontoTotalImp = this.listaDetalles[i].MontoTotal * 0.13;
        //Seteamos
        this.listaDetalles[i].TotalLinea = this.listaDetalles[i].MontoTotal - this.listaDetalles[i].MontoTotalDesc + this.listaDetalles[i].MontoTotalImp - this.listaDetalles[i].MontoTotalExo;
        //Llamamos metodo
        this.MontosFactura();
      }


    }
  }

  Eliminar(id) {
    //Elimina producto y detalle de la lista
    //aplicamos un for
    for (let i = 0; this.listaDetalles.length > i; i++) {
      //si se clumple entonces...
      if (this.listaDetalles[i].IdProducto == id) {
        //Le quitamos a la lista
        this.listaDetalles.splice(i, 1);
        //Llamamos metodos
        this.setNumeroLinea();
        this.MontosFactura();
      }
    }
  }


  EnviaDatoEliminar(id: string, nombre: string) {
    //Envia los datos para eliminar
    //Seteamos
    this.eliminaIdProducto = id;
    this.eliminaNombreProducto = nombre;

  }

  MontosFactura() {
    //Metodo que lo utilizamos para calcular el subTotal, descuento, iva, exonerado y Total
    //Seteamos
    this.subTotal = 0;
    this.descuento = 0;
    this.iva = 0;
    this.exonerado = 0;
    this.TotalFactura = 0;
    //aplicamos un for
    for (let i = 0; i <= this.listaDetalles.length - 1; i++) {
      //La idea es calcular los siguientes campos
      //Seteamos
      this.subTotal = this.subTotal + this.listaDetalles[i].MontoTotal;
      this.descuento = this.descuento + this.listaDetalles[i].MontoTotalDesc;

      this.iva = this.iva + this.listaDetalles[i].MontoTotalImp;
      this.exonerado = this.exonerado + this.listaDetalles[i].MontoTotalExo;
      //si se clumple entonces...
      if (this.listaDetalles[i].TotalLinea == NaN) {
        //Seteamo el valor de la factura
        this.listaDetalles[i].TotalLinea == 0;
      }
      //Seteamos
      this.TotalFactura = this.TotalFactura + this.listaDetalles[i].TotalLinea;
    }
  }


  obtenerListaTipoId() {
    //Este metodo obtiene todos los tipos de Id
    try {
      //Llamamos al servicio
      this.tipoIdService.getTipoId().subscribe(data => {
        //Seteamos lo que me trajo la consulta de API
        this.listaTipoId = data;
      }, /*Si da error imprimimos en el alert*/ error => { this.msjAlert.error("No se pudo obtener los tipos de Id") })
    }
    catch (error) {

    }


  }

  obtenerStockInventario(productoId) {
    //Este metodo me consulta el inventario de un producto
    try {
      this.inventarioService.getInventarioById(productoId).subscribe(data => {

        //Lo que me trae lo almaceno en la siguiente variable
        this.inventarioStock = data.Cantidad
      }, /*Si da error imprimimos en el alert*/ error => { this.msjAlert.error("No se pudo obtener el inventario") })

    } catch (error) {
      //Tira un alert cuando susede una ex
      this.msjAlert.error("Error operacion.");
    }

  }
  obtenerTodosLosProductos() {
    //Este metodo trae todos los los productos de api
    try {
      
      this.producservice.get().subscribe(data => {

        //En la siguiente variable seteamos lo que metrae data
        this.listaProductos = data
        
      }, /*Si da error imprimimos en el alert*/ error => { this.msjAlert.error("No se pudiero obtener todos los productos") })

    } catch (error) {
      //Tira un alert cuando susede una ex
      this.msjAlert.error("Error operacion.");
    }



  }
  obtenerTodoInventario() {
    //Este metodo lo que hace es traer todo el inventario y guardarlo en una variable
    try {

      this.inventarioService.get().subscribe(data => {
        //Seteamos lo que trae el servicio a la siguiente variable
        this.listaInventario = data
      }, /*Si da error imprimimos en el alert*/ error => { this.msjAlert.error("No se pudo obtener todo el inventario") })

    } catch (error) {
      //Tira un alert cuando susede una ex
      this.msjAlert.error("Error operacion.");
    }


  }
  obtenerTodosClientes() {
    try {
      this.clienteService.getClientes().subscribe(data => {


        this.listaClientes = data
        console.log(this.listaClientes)
      }, /*Si da error imprimimos en el alert*/ error => { this.msjAlert.error("No se pudo obtener los clientes") })

    } catch (error) {
      this.msjAlert.error("Error operacion.");
    }

  }

  CrearFactura(Imprecion) {
    try {
      //Declaramos e inicializamos 
      let factura: TbDocumento;
      factura = new TbDocumento();
      //Si se cumple entonces..
      if (this.listaDetalles.length == 0) {
        alert("No hay detalles");
        return;
      }
      //Seteamos
      factura.Id = 0;
      factura.TipoDocumento = 1;
      factura.Consecutivo = "";
      factura.Clave = "";
      factura.ReporteElectronic = true;
      factura.Fecha = new Date;
      //Si se cumple entonces...
      if (this.cliente == null) {
        //Seteamos
        factura.IdCliente = null;
      }
      //Si no
      else {
        //Seteamos
        factura.IdCliente = this.cliente.Id;
      }
      //Seteamos
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
      //si se clumple entonces...
      if (this.cliente == null) {
        //Seteamos
        factura.Correo1 = null;
      }
      //Si no
      else {
        //Seteamos
        factura.Correo1 = this.cliente.CorreoElectConta;
      }
      //Seteamos
      factura.Correo2 = this.correoElectronico2;
      //si se clumple entonces...
      if (this.Observaciones == null) {
        factura.Observaciones == null;
      }
      else {
        factura.Observaciones = this.Observaciones.substring(0, 499);
      }
      //Seteamos
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
      //Alert
      this.msjAlert.info("Estamos agregando los datos,aguarda unos instantes");
      //Enciamos la factura
      this.facturaService.post(factura).subscribe(
        (data => {
          //Alert
          this.msjAlert.success('Factura agregada correctamente, ' + "La clave es:" + this.clave)
          //Lo que me trae data se lo seteamos a doc.
          this.doc = data;
          //Seteamos
          this.clave = this.doc.Clave;
          
          let doc = new jsPDF();
          let specialElementHandlers ={'#editor':function(element,renderer){
            return true;
          }};
          let content = this.content.nativeElement;
          doc.fromHTML(content.innerHTML,15,15,{'width':198,'elementHandlers':specialElementHandlers});
          doc.save('test.pdf');
        })
      )


    } catch (error) {
      //Tira un alert cuando susede una ex
      this.msjAlert.error('Error operacion.');
    }
  }

}
