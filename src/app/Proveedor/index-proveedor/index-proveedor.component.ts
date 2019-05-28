import { Component, OnInit } from '@angular/core';
import { DataProveedorService } from 'src/Services/Proveedor/data-proveedor.service';
import { TbProveedores } from 'src/Models/Proveedores';


@Component({
  selector: 'app-index-proveedor',
  templateUrl: './index-proveedor.component.html',
  styleUrls: ['./index-proveedor.component.css']
})
export class IndexProveedorComponent implements OnInit {

  constructor(private ProveedorService:DataProveedorService) { }
// declaracion de variables
 listaProveedor= new Array();
 listaTipoId= new Array();
  ngOnInit() {
    
    this.ConsultarProveedores();   
    
  }
  AsignarTipoId() {
    console.log("llego");
    console.log(this.listaTipoId);
    console.log(this.listaProveedor);
    for (const iterator of this.listaProveedor) {
      for (const tiposid of this.listaTipoId) {
        if (tiposid.Id==iterator.TipoId) {
          console.log(tiposid);
          iterator.TbPersona.Tipo=tiposid;
          
        }
      }
    }
  }
  
  ConsultarProveedores() {
    this.ProveedorService.ConsultaTodos().subscribe(data=>{this.listaProveedor=data});
  }
  ConsultarDetalles(Proveedor:TbProveedores){
    this.ProveedorService.RecibeDatoDetalle(Proveedor);
  }
  Modificar(Proveedor:TbProveedores){
    this.ProveedorService.RecibeDatos(Proveedor);
  }
  Eliminar(Proved:TbProveedores){
    this.ProveedorService.Eliminar(Proved).subscribe(data=>{});
    this.ConsultarProveedores();
  }

}
