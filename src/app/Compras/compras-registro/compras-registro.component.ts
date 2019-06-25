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

        // implementar logica si el producto ya exite lo modifico, sino lo agrego

        for (var i = 0; i < this.detallesCompras.length; i++) {
          if (this.detallesCompras[i].IdProducto == this.detalle.IdProducto) {
            // si el producto existe en la lista se modifica
            this.detallesCompras[i].Cantidad += this.detalle.Cantidad;
            this.detallesCompras[i].MontoTotal += this.detalle.MontoTotal;
            this.Alert.success('El producto se modificó correctamente');
            return;
          }
        }
        // agrego  a la lista el nuevo detalle
        this.detallesCompras.push(this.detalle);
        this.Alert.success('Se agregó le nuevo producto');

      } else {
        this.Alert.error('El producto y la cantidad son campos obligatorios');
      }

    } catch (error) {
      this.Alert.error('Error al agregar un nuevo producto a la lista');
    }

  }


}
