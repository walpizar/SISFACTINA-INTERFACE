import { Component, OnInit } from '@angular/core';
import { ComprasService } from 'src/Services/Compras/compras.service';
import { TbDocumento } from 'src/Models/Documento';
import { TbDetalleDocumento } from 'src/Models/DetalleDocumento';
import { TbProducto } from 'src/Models/Producto';

@Component({
  selector: 'app-compras-detalles',
  templateUrl: './compras-detalles.component.html',
  styleUrls: ['./compras-detalles.component.css']
})
export class ComprasDetallesComponent implements OnInit {

  // variables
  DocActual = new TbDocumento();
  detalle: Array<TbDetalleDocumento> = new Array();
  listaProductos: TbProducto[];
  headElements = ['Cantidad', 'Producto', 'total'];

  constructor(private service: ComprasService) {
    
  }


  ngOnInit() {
    this.getProducts();
    this.Purchase();
  }

  Purchase() {
    this.DocActual = this.service.currentPurchase;
    this.detalle = this.DocActual.TbDetalleDocumento;
    this.getInfoProd();
  }

  getProducts() {
    this.service.getProducts().subscribe(data => {
      this.listaProductos = data;
    });
  }

  ProductById(Id): TbProducto {
    try {
      if (Id != null) {
        let Product: Array<TbProducto> = new Array();
        let ProductoActual = new TbProducto();
        Product = this.listaProductos.filter(x => x.IdProducto == Id.trim());
        ProductoActual = Product[0];
        return ProductoActual;
      }
    } catch (error) {
      return error;
    }
  }

  getInfoProd() {
    for (let d of this.detalle) {
      d.IdProductoNavigation = this.ProductById(d.IdProducto);
      console.log(d.IdProductoNavigation.Nombre);
    }
  }



}
