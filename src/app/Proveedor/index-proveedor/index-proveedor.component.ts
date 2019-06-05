import { Component, OnInit } from '@angular/core';

import { TbProveedores } from 'src/Models/Proveedores';
import { DataProveedorService } from 'src/Services/Proveedor/proveedor.service';
import { ToastrService } from 'ngx-toastr';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-index-proveedor',
  templateUrl: './index-proveedor.component.html',
  styleUrls: ['./index-proveedor.component.css']
})
export class IndexProveedorComponent implements OnInit {

  constructor(private ProveedorService: DataProveedorService, private msj: ToastrService) { }
  // declaracion de variables
  listaProveedor = new Array();
  listaTipoId = new Array();
  Entidadeliminar:TbProveedores;
  texto:string="?";
  buscar:string;
  ngOnInit() {

    this.ConsultarProveedores();

  }
  AsignarTipoId() {

    for (const iterator of this.listaProveedor) {
      for (const tiposid of this.listaTipoId) {
        if (tiposid.Id == iterator.TipoId) {
          iterator.TbPersona.Tipo = tiposid;
        }
      }
    }
  }

  ConsultarProveedores() {
    this.ProveedorService.ConsultaTodos().subscribe(data => { this.listaProveedor = data },
      error => { this.msj.error("No se encontraron datos") });
  }
  ConsultarDetalles(Proveedor: TbProveedores) {
    this.ProveedorService.RecibeDatoDetalle(Proveedor);
  }
  Modificar(Proveedor: TbProveedores) {
    this.ProveedorService.RecibeDatos(Proveedor);
  }
  EnviaDatoEliminar(Proved: TbProveedores) {
    this.Entidadeliminar=Proved;
    this.texto=Proved.Id;
  }

  EliminarProveedor(){
    this.msj.info("Realizando la eliminacion,aguarda un momento");
      this.ProveedorService.Eliminar(this.Entidadeliminar).subscribe(
        data => { this.msj.success("Eliminado Correctamente") 
        this.ConsultarProveedores();
      },
        error => { this.msj.error("Error al eliminar el proveedor") }

      );
  }

}
