import { Component, OnInit } from '@angular/core';
import { ProducserviceService } from 'src/Services/Producto/producservice.service';
import { Router } from '@angular/router';
import { TbProducto } from '../../../Models/Producto';
import { TbImpuestos } from '../../../Models/Impuesto';
import { TbInventario } from '../../../Models/Inventario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  constructor( private service: ProducserviceService, private router: Router, private toastr: ToastrService ) { }

  producto= new TbProducto();
  _inventario = new TbInventario();

  ngOnInit() {
    this.service.cargarCategorias();
    this.service.cargarProveedores();
    this.service.cargarMedidas();
    this.service.cargarImpuestos();
    this.service.cargarTipoId();
    this.producto.EsExento = false;
   this._inventario = new TbInventario();
  }

  //Este metodo es para enviar los datos a guardar.
  onsubmit(producto:TbProducto){
    producto.IdProductoNavigation = this._inventario;
    console.log(producto);
    this.service.guardar(producto).subscribe(
        res => { this.toastr.success("Creado"), this.router.onSameUrlNavigation = 'reload'},
        err => { this.toastr.error("Error al crear producto")}
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


