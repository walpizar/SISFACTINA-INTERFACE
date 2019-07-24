import { Component, OnInit } from '@angular/core';
import { ProducserviceService } from 'src/Services/Producto/producservice.service';
import { Router } from '@angular/router';
import {  TbProducto } from '../../Models/Producto';
import { TbImpuestos } from 'src/Models/Impuesto';
import { TbInventario } from 'src/Models/Inventario';
import { TbCategoriaProducto } from 'src/Models/CategoriaProducto';
import { TbTipoMedidas } from 'src/Models/TipoMedidas';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  pro:TbProducto;

  _pro = new TbProducto();
  _impuesto:TbImpuestos;
  _inventario:TbInventario;
  _categoria:TbCategoriaProducto;
  _medida:TbTipoMedidas;
  buscar:string;

  eliminado: boolean;

  constructor(private service : ProducserviceService, private Router:Router) { }

  ngOnInit() {
    this.service.cargarProductos();
  }

  productoSelect(producto){
    this.service.ProductoActual = producto;
  }

  productoDetalle(pro:TbProducto){
    this._impuesto = pro.IdTipoImpuestoNavigation;
    this._inventario = pro.IdProductoNavigation;
    this._pro = pro;
    this._categoria = pro.IdCategoriaNavigation;
    this._medida = pro.IdMedidaNavigation;

  }

  productoEliminar(pro:TbProducto){
    this._pro = pro;
  }
  
  
}
