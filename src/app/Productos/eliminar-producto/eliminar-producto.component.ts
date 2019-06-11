import { Component, OnInit, Input } from '@angular/core';
import { ProductosService } from 'src/Services/Productos/productos.service';
import { Router } from '@angular/router';
import {  TbProducto } from '../../../Models/Producto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css']
})
export class EliminarProductoComponent implements OnInit {

  constructor(private service : ProductosService, private router:Router, private toastr: ToastrService) { }
  
 

 producto= new TbProducto();

  ngOnInit() {
   this.getprod();
  }

  eliminar(){
    this.service.eliminar(this.producto).subscribe(
      res => { this.toastr.success("Eliminado"), this.router.navigateByUrl("/Productos");},
      err => { this.toastr.error("Error al elimimar producto")}
    );
    
  }

  getprod() {
    this.producto = this.service.ProductoActual;
    console.log(this.producto);
  }

}
