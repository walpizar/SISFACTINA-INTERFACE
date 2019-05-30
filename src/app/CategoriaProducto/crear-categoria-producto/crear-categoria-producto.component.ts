import { Component, OnInit } from '@angular/core';
import { TbCategoriaProducto } from 'src/Models/CategoriaProducto';
import { CategoriaProductoService } from 'src/Services/CategoriaProducto/categoria-producto.service';

@Component({
  selector: 'app-crear-categoria-producto',
  templateUrl: './crear-categoria-producto.component.html',
  styleUrls: ['./crear-categoria-producto.component.css']
})
export class CrearCategoriaProductoComponent implements OnInit {

  constructor(private CateProductService:CategoriaProductoService) { }
  CategoriaProducto = new TbCategoriaProducto();
  botonModificar:boolean=false;
  botonCrear:boolean;
  Modify:boolean=false;
  
  ngOnInit() {
    this.botonCrear=true;
    this.CateProductService.Modify
  if (this.Modify) {
    this.CategoriaProducto=this.CateProductService.CategoriaModify;
    this.botonModificar=true;
    this.botonCrear=false;
    alert("entro");
  }
  }
  agregar(CategoriaProduct:TbCategoriaProducto){
    if (CategoriaProduct.Nombre==null ) {
      alert("No se puede agregar,debe ingresar un nombre")
    }else{
      this.CateProductService.Post(CategoriaProduct).subscribe(data=>{})
      alert("Agregado Correctamente");
      this.CategoriaProducto = new TbCategoriaProducto();
    }
  }
  Modificar(CategoriaProductModify:TbCategoriaProducto){
    if (CategoriaProductModify.Nombre==null ) {
      alert("No se puede agregar,debe ingresar un nombre")
    }else{
      this.CateProductService.Put(CategoriaProductModify).subscribe(data=>{})
      alert("Modificado Correctamente");
      this.CategoriaProducto = new TbCategoriaProducto();
      this.botonModificar=false;
      this.botonCrear=true;
      this.Modify=false;
    }
  }
 
 Cancelar(){
  this.CategoriaProducto = new TbCategoriaProducto();
  this.botonModificar=false;
  this.botonCrear=true;
  this.Modify=false;
 }
}
