import { Component, OnInit } from '@angular/core';
import { CategoriaProductoService } from 'src/Services/CategoriaProducto/categoria-producto.service';
import { TbCategoriaProducto } from 'src/Models/CategoriaProducto';

@Component({
  selector: 'app-detalle-categoria-producto',
  templateUrl: './detalle-categoria-producto.component.html',
  styleUrls: ['./detalle-categoria-producto.component.css']
})
export class DetalleCategoriaProductoComponent implements OnInit {

  constructor(private catproductservice:CategoriaProductoService) { }
  CategoriaProducto= new TbCategoriaProducto();
 
  ngOnInit() {
    this.CategoriaProducto=this.catproductservice.CategoriaDetalle; // Extrae del servicio la entidad que se envio del index

  }

}
