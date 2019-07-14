import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { TbDocumento } from 'src/Models/Documento';
import { ComprasService } from 'src/Services/Compras/compras.service';
import { ToastrService } from 'ngx-toastr';
import { TbProducto } from 'src/Models/Producto';
import { TbProveedores } from 'src/Models/Proveedores';
import { TbDetalleDocumento } from 'src/Models/DetalleDocumento';

@Component({
  selector: 'app-compras-registro',
  templateUrl: './compras-registro.component.html',
  styleUrls: ['./compras-registro.component.css']
})
export class ComprasRegistroComponent implements OnInit {
  @ViewChild('myInvoice') myInvoice: ElementRef;
  @ViewChild('myProvider') myProvider: ElementRef;
  constructor(private service: ComprasService, private Alert: ToastrService) { }

  // Arreglos
  listaProductos: TbProducto[];
  listaProveedores: TbProveedores[];
  listaFacturas = new Array();
  ProductoActual = new TbProducto();
  FacturaCompras = new TbDocumento();
  FacturaReferencia = new TbDocumento();
  ProveedorActual = new TbProveedores();
  detalle: TbDetalleDocumento = new TbDetalleDocumento();
  detallesCompras: Array<TbDetalleDocumento> = new Array();
  // Variables
  fechaReporte: Date;
  fechaCompra: Date;
  idFactura: string;
  idProducto: string;
  idProveedor: string;
  TotalGrabado: number;
  TotalExonerado: number = 0;
  cantidadProducto: number = 0;
  ComprasTotalGrabado: number = 0;
  ComprasTotalExonerado: number = 0;
  TotalComprasFacturadas: number = 0;
  banderaAgregar: boolean = true;
  // cabecera de tabla compras
  headElements = ['Cantidad', 'Producto', 'total'];
  // inicializar metodos para obtener datos necesarios
  ngOnInit() {
    this.getInvoices();
    this.getProviders();
    this.getProducts();
  }

  // get Providers
  // obtener provedores
  getProviders() {
    this.service.getProviders().subscribe(data => {
      this.listaProveedores = data;
    });
  }
  // get all Invoices
  // obtener facturas
  getInvoices() {
    this.service.getAllInvoices().subscribe(data => {
      this.listaFacturas = data;
    });
  }
  // get Products
  // obtener productos
  getProducts() {
    this.service.getProducts().subscribe(data => {
      this.listaProductos = data;
    });
  }
  // filter invoice by id
  // filtrar factura por id
  InvoiceById(Id) {
    try {
      if (Id != null) {
        let fact = new Array();
        fact = this.listaFacturas.filter(x => x.Id == Id.trim());
        if (fact.length != 0) {
          this.Alert.success('Factura Encontrada');
          this.FacturaReferencia = fact[0];
        } else {
          this.Alert.error('La Factura no está registrada, ingrese el dato de nuevo');
          this.myInvoice.nativeElement.focus(); // focus en el elemento html input IdFactura
        }
      } else {
        this.Alert.error('Debe ingresar un ID para la factura');
        this.myInvoice.nativeElement.focus();
      }
    } catch (error) {
      return 'Error de operación' + error;
    }
  }
  // filter Providers by Id
  // filtrar proveedores por id
  ProviderById(Id) {
    try {
      if (Id != null) {
        let provee = new Array();
        provee = this.listaProveedores.filter(x => x.Id.trim() == Id.trim());
        if (provee.length != 0) {
          this.ProveedorActual = provee[0];
        } else {
          this.Alert.error('El provedor no está registrado, ingrese el dato de nuevo');
          this.myProvider.nativeElement.focus();
        }
      } else {
        this.Alert.error('Debe ingresar un ID para el Provedor');
        this.myProvider.nativeElement.focus();
      }
    } catch (error) {
      return 'Error de operación' + error;
    }
  }
  // cuando encuentro el id lo visualizo en pantalla y en pantalla agregro el resultado  a la lista
  ProductById(Id) {
    try {
      if (Id != null) {
        let Product = new Array();
        Product = this.listaProductos.filter(x => x.IdProducto == Id.trim());
        if (Product.length != 0) {
          this.ProductoActual = Product[0];
        } else {
          this.Alert.error('El producto no está registrado, ingrese el dato de nuevo');
        }
      }
    } catch (error) {
      return 'Error de operación' + error;
    }
  }
  AgregarCompra(product: TbProducto, cantidad: number) {
    try {
    
      if (product != null && cantidad > 0) {
        this.detalle = new TbDetalleDocumento();
        this.detalle.IdProducto = product.IdProducto.toString();
        this.detalle.IdTipoDoc = 6;
        this.detalle.Cantidad = cantidad;
        this.detalle.MontoTotal = (product.PrecioReal * cantidad);
        this.detalle.IdProductoNavigation = product;
        this.detalle.Precio = product.PrecioReal;
        // si el producto se le aplica descuento entoces se relaizan las operaciones
        if (product.AplicaDescuento) {
          this.detalle.Descuento = product.DescuentoMax;
          this.detalle.MontoTotalDesc = this.detalle.MontoTotal * (this.detalle.Descuento / 100);
        } else {
          this.detalle.Descuento = 0;
          this.detalle.MontoTotalDesc = 0;
        }
        // si el producto ya exite lo modifico, sino lo agrego
        for (let i = 0; i < this.detallesCompras.length; i++) {
          if (this.detallesCompras[i].IdProducto == this.detalle.IdProducto) {
            // si el producto existe en la lista se modifica
            this.detallesCompras[i].Cantidad += this.detalle.Cantidad;
            this.detallesCompras[i].MontoTotal += this.detalle.MontoTotal;
            this.Alert.success('El producto se modificó correctamente');
            this.banderaAgregar = false;
          }
        }
        if (this.banderaAgregar) {
          // agrego  a la lista el nuevo detalle
          this.detallesCompras.push(this.detalle);
          this.Alert.success('Se agregó el nuevo producto');
        }
        // f(x) calculo de exoneracion
        this.TotalExonerado = this.calculoExoneracion();
        this.ComprasTotalExonerado = this.TotalExonerado;
        // f(x) calculo de Impuesto Grabado
        this.TotalGrabado = this.calculoImpuGrabado(product, cantidad);
        this.ComprasTotalGrabado += this.TotalGrabado;
        // total de la factura
        this.TotalComprasFacturadas = this.ComprasTotalGrabado + this.ComprasTotalExonerado;
        // modifco la bandera antes de salir
        this.banderaAgregar = true;

      } else {
        // si no se ingresa un producto o cantidad entonces se alerta al usuario
        this.Alert.error('El producto y la cantidad son campos obligatorios');
      }

    } catch (error) {
      this.Alert.error('Error al agregar un nuevo producto a la lista');
    }

  }
  // metodo para calcular el numero de linea a los prodcutos
  // to calculate the line number to the prodcuts
  calcularNumeroLinea() {
    let cont = 0;
    for (let n of this.detallesCompras) {
      cont += 1;
      n.NumLinea = cont;
    }
  }
  // metodo para calcular los montos de los productos exonerados
  // to calculate the amounts of exempt products
  calculoExoneracion(): number {
    // calculo la columna Monto total del arreglo detallesCompras y hago una suma de cada uno de los elementos
    let sum = 0;
    for (let n of this.detallesCompras) {
      sum += n.MontoTotal;
    }
    return sum;
  }
  // metodo para calcular el impuesto grabado en los productos
  // to calculate the tax registered on the products.
  calculoImpuGrabado(product: TbProducto, cantidad: number): number {
    // obtengo la cantidad y el producto
    // el impuesto lo casteo a entero y lo divido entre 100
    if (product != null) {
      // tslint:disable-next-line: radix
      const impuesto = parseInt(product.IdTipoImpuestoNavigation.Valor) / 100;
      const impuest = (product.PrecioReal * cantidad) * impuesto;
      return impuest;
    }
  }
  // metodo para Guardar la compra registrada
  // to Save the registered purchase
  guardarCompraFacturada() {

    try {

      // logica a implementar
      // En caso real se debe comprobar que los datos de la factura sean iguales a los de la compra que se gurdan
      // de lo contario no se permine guardar el comprobante de la compra
      if (this.FacturaReferencia != null && this.detallesCompras != null) {

        // agregar un nùmero de linea a los productos
        this.calcularNumeroLinea();
        // logica a implementar
        // los campos de ID factura y ID proveedor deben estar llenos ambos != null
        // para guardar un comprobante de compra debe tener un detalle minimo
        // datos de la factura
        this.FacturaCompras.ClaveRef = this.FacturaReferencia.Clave;
        this.FacturaCompras.TipoMoneda = this.FacturaReferencia.TipoMoneda;
        this.FacturaCompras.TipoCambio = this.FacturaReferencia.TipoCambio;
        this.FacturaCompras.TipoDocRef = this.FacturaReferencia.TipoDocumento;
        this.FacturaCompras.TipoPago = 1;
        this.FacturaCompras.TipoVenta = 1;
        this.FacturaCompras.TipoMoneda = 1;
        // consultar al profesor la empresa que debo registrar
        this.FacturaCompras.IdEmpresa = '603920529                     ';
        this.FacturaCompras.TipoIdEmpresa = 1;
        // El proveedor consultar con el profesor
        // this.FacturaCompras.IdCliente = this.ProveedorActual.Id;
        // this.FacturaCompras.TipoIdCliente = this.ProveedorActual.TipoId;
        this.FacturaCompras.TipoDocumento = 6;
        this.FacturaCompras.EstadoFactura = 1;
        this.FacturaCompras.Estado = true;
        this.FacturaCompras.ReporteAceptaHacienda = true;
        this.FacturaCompras.NotificarCorreo = false;
        this.FacturaCompras.ReporteElectronic = false;
        this.FacturaCompras.Fecha = this.fechaReporte;
        this.FacturaCompras.FechaRef = this.fechaCompra;
        // campos de detalle totales a calcular
        for (let x of this.detallesCompras) {
          x.MontoTotalImp = this.calculoImpuGrabado(x.IdProductoNavigation, x.Cantidad);
          x.MontoTotalExo = x.MontoTotal;
          x.TotalLinea = x.MontoTotalImp + (x.MontoTotalExo - x.MontoTotalDesc);
          x.IdProductoNavigation = null;
        }
        // agregar detalles de la factura
        this.FacturaCompras.TbDetalleDocumento = this.detallesCompras;
        try {
          this.service.post(this.FacturaCompras).subscribe(res => {
            this.Alert.success('Registro Realizado', 'Compras');
          });
        } catch (error) {
          this.Alert.error('Error de operación');
        }

      } else {
        this.Alert.error('Verificar el ID de La Compra Facturada');
        this.Alert.error('Verificar los Detalles de La Compra Facturada sean mayor a cero');
        this.myInvoice.nativeElement.focus();
      }
    } catch (error) {
      this.Alert.error('Error de operación','Compra');
    }
  } // fin de agregar


}
