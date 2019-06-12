import { Component, OnInit } from '@angular/core';
import { TbCategoriaProducto } from 'src/Models/CategoriaProducto';
import { CategoriaProductoService } from 'src/Services/CategoriaProducto/categoria-producto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-categoria-producto',
  templateUrl: './crear-categoria-producto.component.html',
  styleUrls: ['./crear-categoria-producto.component.css']
})
export class CrearCategoriaProductoComponent implements OnInit {

  constructor(private CateProductService: CategoriaProductoService, private msjAlert: ToastrService) { }
  CategoriaProducto = new TbCategoriaProducto();
  botonModificar: boolean = false;
  botonCrear: boolean;
  Modify: boolean = false;

  ngOnInit() {
    this.botonCrear = true;
    this.Modify = this.CateProductService.Modify

    if (this.Modify) {
      this.CategoriaProducto = this.CateProductService.CategoriaModify;
      this.CategoriaProducto.Nombre.trim();
      this.CategoriaProducto.Descripcion.trim();
      this.botonModificar = true;
      this.botonCrear = false;
    }
  }
  agregar(CategoriaProduct: TbCategoriaProducto) {
    try {
      if (CategoriaProduct.Nombre == null) {
        alert("No se puede agregar,debe ingresar un nombre")
      } else {
        this.msjAlert.info("Estamos agregando los datos,aguarda unos instantes");        
        this.CateProductService.Post(CategoriaProduct).subscribe(
          respuesta => { this.msjAlert.success('Agregado Correctamente') },
          error => { this.msjAlert.error('Error: No se logro agregar la categoria') });

        this.CategoriaProducto = new TbCategoriaProducto();
      }
    } catch (error) {
      this.msjAlert.error('Error operacion');
    }

  }
  //Modifica la categoria  
  Modificar(CategoriaProductModify: TbCategoriaProducto) {
    try {

      if (CategoriaProductModify.Nombre == null) {
        alert("No se puede modificar,debe ingresar un nombre")
      } else {
        this.msjAlert.info("Realizando la modificacion,aguarda un momento");
        //Envia los datos al api
        this.CateProductService.Put(CategoriaProductModify).subscribe(
          respuesta => { this.msjAlert.success('Modificado Correctamente') },
          error => { this.msjAlert.error('Error: No se logro modificar la categoria') });

        this.CategoriaProducto = new TbCategoriaProducto();
        this.botonModificar = false; //Oculta el boton de modificar
        this.botonCrear = true; // Muestra el boton de crear 
        this.CateProductService.Modify= false; //Indica a la variable del servicio,que ya se realizo la modificacion
      }
    } catch (error) {
      this.msjAlert.error('Error de operacion')
    }

  }

  Cancelar() {
    this.CategoriaProducto = new TbCategoriaProducto();
    this.botonModificar = false;
    this.botonCrear = true;
    this.CateProductService.Modify = false;
  }
}
