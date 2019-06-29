import { Component, OnInit } from '@angular/core';
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

  constructor(private service: ComprasService, private Alert: ToastrService) {}

  // variables y arreglos
  listaFacturas = new Array();
  listaProveedores: TbProveedores[];
  listaProductos: TbProducto[];
  FacturaCompras = new TbDocumento();
  detallesCompras: Array<TbDetalleDocumento> = new Array();
  detalle: TbDetalleDocumento = new TbDetalleDocumento();

  idProveedor: string;
  idProducto: string;
  TotalGrabado: number;
  TotalExonerado:number = 0;
  ComprasTotalGrabado: number = 0;
  ComprasTotalExonerado: number = 0;
  TotalComprasFacturadas: number = 0;
  banderaAgregar:boolean = true;
  cantidadProducto: number;
  ProveedorActual = new TbProveedores();
  ProductoActual = new TbProducto();

  headElements = ['Cantidad', 'Producto', 'total'];

  ngOnInit() {
    this.getProviders();
    this.getProducts();
  }

  // get Providers
  // obtener provedores
  getProviders() {
    this.service.getProviders().subscribe( data => {
      this.listaProveedores = data;
    });
  }

  // get Invoices type:6
  // obtener facturas tipo: 6
  getInvoices() {
    this.service.getInvoices().subscribe( data => {
      this.listaFacturas = data;
    });
  }

  // get Products
  // obtener productos
  getProducts() {
    this.service.getProducts().subscribe( data => {
      this.listaProductos = data;
    });
  }

  // filter invoice by id
  // filtrar factura por id
  InvoiceById(Id) {
    try {
     
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
        if (provee != null) {
          this.ProveedorActual = provee[0];
        }
        console.log(this.ProveedorActual.ContactoProveedor);
      }
    } catch (error) {
      return 'Error de operación' + error;
    }
  }

  // pendiente! buscar producto?
  // cuando encuentro el id lo visualizo en pantalla y en pantalla agregro el resultado  a la lista
  ProductById(Id) {
    try {

      if (Id != null) {
        let Product = new Array();
        Product = this.listaProductos.filter(x => x.IdProducto == Id.trim());
        if (Product != null) {
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
        console.log(this.detalle.IdProductoNavigation.Nombre);

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
          this.Alert.success('Se agregó le nuevo producto');
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
        this.Alert.error('El producto y la cantidad son campos obligatorios');
      }

    } catch (error) {
      this.Alert.error('Error al agregar un nuevo producto a la lista');
    }

  }
  calculoExoneracion(): number {
    let sum = 0;
    for (let n of this.detallesCompras) {
      sum += n.MontoTotal;
    }
    return sum;
  }

  calculoImpuGrabado(product: TbProducto, cantidad: number): number {

    if (product != null) {
      const impuesto = parseInt( product.IdTipoImpuestoNavigation.Valor )/100;
      const impuest =  (product.PrecioReal * cantidad) * impuesto;
      return impuest;
    }
  }


}
