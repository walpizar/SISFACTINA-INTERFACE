import { Component, OnInit, Input } from '@angular/core';
import { ProductosService } from 'src/Services/Productos/productos.service';
import { Router } from '@angular/router';
import { TbProducto } from '../../../Models/Producto';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css']
})
export class ModificarProductoComponent implements OnInit {

 producto= new TbProducto();
 
  constructor( private service:ProductosService, private router: Router , private toastr: ToastrService) {    

  }

    ngOnInit() { 
      //Cargo los combos.
      this.service.cargarCategorias();
      this.service.cargarProveedores();
      this.service.cargarMedidas();
      this.service.cargarImpuestos();
      this.service.cargarTipoId();
      this.getprod();
      this.checkEcento(this.producto);
    }

    getprod() {

      this.producto = this.service.ProductoActual;

      console.log(this.producto);
    }
    

  checkEcento(producto:TbProducto){
    if(producto.EsExento == true){
      document.getElementById("exento").style.display = "none";
    }
  }

  onsubmit(producto:TbProducto){
    console.log(producto);
    this.service.modificar(producto).subscribe(
      res => { this.toastr.success("Modificado")},
      err => { this.toastr.error("Error al modificar producto")}
    );
  }

  impuesto(){
    this.producto.IdTipoImpuesto = 0;
  }
  
  exento(){
    console.log(this.producto.EsExento);
    if(this.producto.EsExento == false){
      document.getElementById("exento").style.display = "none";
    } else {
      document.getElementById("exento").style.display = "block";
    }
  }
  
}

 
  
  

