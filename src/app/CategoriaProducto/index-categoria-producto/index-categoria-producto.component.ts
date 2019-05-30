import { Component, OnInit } from '@angular/core';
import { CategoriaProductoService } from 'src/Services/CategoriaProducto/categoria-producto.service';
import { TbCategoriaProducto } from 'src/Models/CategoriaProducto';

@Component({
  selector: 'app-index-categoria-producto',
  templateUrl: './index-categoria-producto.component.html',
  styleUrls: ['./index-categoria-producto.component.css']
})
export class IndexCategoriaProductoComponent implements OnInit {

  constructor(private CategoriaProductService:CategoriaProductoService) { }
  //Variables
  listaCatProduct= new Array();
  ngOnInit() {
    this.ConsultarCategorias();
  }
  ConsultarCategorias() {
   this.CategoriaProductService.Get().subscribe(data=>{
     this.listaCatProduct=data
   })
  }
  Modificar(CatProduct:TbCategoriaProducto){
    this.CategoriaProductService.RecibeDatosComponeteModificar(CatProduct);
    
  }
  consultarDetalles(categoriaproducto:TbCategoriaProducto){
    this.CategoriaProductService.RecibeDatosComponeteDetalle(categoriaproducto);
  }
  Eliminar(CategoriaProducto:TbCategoriaProducto){
   this.CategoriaProductService.Delete(CategoriaProducto).subscribe(data=>{});
   alert("Se elimino correctamente");
  }

}
