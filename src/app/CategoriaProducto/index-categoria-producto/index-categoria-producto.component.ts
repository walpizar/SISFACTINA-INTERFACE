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

  constructor(private CategoriaProductService: CategoriaProductoService, private msjAlert: ToastrService) { }
  //Variables
  listaCatProduct = new Array();
  elimina: TbCategoriaProducto;
  texto:string="?";
  ngOnInit() {
    this.ConsultarCategorias();
  }
  ConsultarCategorias() {
    this.CategoriaProductService.Get().subscribe(data => {
      this.listaCatProduct = data
    }, error => { this.msjAlert.error("No hay registros") })
  }
  Modificar(CatProduct: TbCategoriaProducto) {
    this.CategoriaProductService.RecibeDatosComponeteModificar(CatProduct);

  }
  consultarDetalles(categoriaproducto: TbCategoriaProducto) {
    this.CategoriaProductService.RecibeDatosComponeteDetalle(categoriaproducto);
  }
  EnviaDatoEliminar(CategoriaProducto: TbCategoriaProducto) {
    this.elimina = CategoriaProducto;
    this.texto=CategoriaProducto.Nombre;
  }
  EliminarCategoria() {
    try {

      this.msjAlert.info("Realizando la eliminacion,aguarda unos instantes");
      this.CategoriaProductService.Delete(this.elimina).subscribe(
        respuesta => {
          this.msjAlert.success('Eliminado Correctamente')
          this.ConsultarCategorias();
        },
        error => {
          this.msjAlert.error('Error: No se logro eliminar la categoria')

        });


    } catch (error) {
      this.msjAlert.error("Error operacion");
    }
  }
}
