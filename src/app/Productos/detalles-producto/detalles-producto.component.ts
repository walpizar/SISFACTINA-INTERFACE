import { Component, OnInit, Input } from '@angular/core';
import {  TbProducto } from '../../../Models/Producto';
import { TbImpuestos  } from '../../../Models/Impuesto';
import { TbInventario  } from '../../../Models/Inventario';
import { ProducserviceService } from 'src/Services/Producto/producservice.service';
import { TbCategoriaProducto } from 'src/Models/CategoriaProducto';
import { TbTipoMedidas } from 'src/Models/TipoMedidas';



@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.css']
})
export class DetallesProductoComponent implements OnInit {

  constructor(private service: ProducserviceService) { }

 @Input() public _pro:TbProducto;
 @Input() public _impuesto:TbImpuestos;    
 @Input() public _inventario:TbInventario; 
 @Input() public _categoria:TbCategoriaProducto;
 @Input() public _medida:TbTipoMedidas;

  ngOnInit() {
    this._pro = new TbProducto();
    this._impuesto = new TbImpuestos();
    this._inventario = new TbInventario();
    this._categoria = new TbCategoriaProducto();
    this._medida = new TbTipoMedidas();
    console.log(this._pro);
  }

}
