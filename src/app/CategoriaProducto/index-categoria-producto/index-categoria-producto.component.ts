import { Component, OnInit } from '@angular/core';
import { CategoriaProductoService } from 'src/Services/CategoriaProducto/categoria-producto.service';
import { TbCategoriaProducto } from 'src/Models/CategoriaProducto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-index-categoria-producto',
  templateUrl: './index-categoria-producto.component.html',
  styleUrls: ['./index-categoria-producto.component.css']
})
export class IndexCategoriaProductoComponent implements OnInit {

  constructor(private CategoriaProductService:CategoriaProductoService,private msjAlert: ToastrService) { }
  //Variables
  listaCatProduct= new Array();
  ngOnInit() {
    this.ConsultarCategorias();
  }
  ConsultarCategorias() {
   this.CategoriaProductService.Get().subscribe(data=>{
     this.listaCatProduct=data
   },error=>{this.msjAlert.error("No hay registros")})
  }
  Modificar(CatProduct:TbCategoriaProducto){
    this.CategoriaProductService.RecibeDatosComponeteModificar(CatProduct);
    
  }
  consultarDetalles(categoriaproducto:TbCategoriaProducto){
    this.CategoriaProductService.RecibeDatosComponeteDetalle(categoriaproducto);
  }
  Eliminar(CategoriaProducto:TbCategoriaProducto){
    try {
      if (confirm("Desea eliminar la categoria?")) {
        this.CategoriaProductService.Delete(CategoriaProducto).subscribe(
          respuesta => { this.msjAlert.success('Eliminado Correctamente') },
        error => { this.msjAlert.error('Error: No se logro eliminar la categoria') 
        this.ConsultarCategorias();
       });
      }
     
    } catch (error) {
      this.msjAlert.error("Error operacion");
    }
   
   
 
  }

}
