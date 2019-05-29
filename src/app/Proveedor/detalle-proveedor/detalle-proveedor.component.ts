import { Component, OnInit } from '@angular/core';

import { TbPersona } from 'src/Models/Personas';
import { TbProveedores } from 'src/Models/Proveedores';
import { DataProvinciaService } from 'src/Services/Provincia/provincia.service';
import { DataCantonService } from 'src/Services/Canton/canton.service';
import { DataDistritoService } from 'src/Services/Distrito/data-distrito.service';

import { DataTipoIdService } from 'src/Services/TipoId/tipo-id.service';
import { TbProvincia } from 'src/Models/Provincia';
import { TbCanton } from 'src/Models/Canton';
import { TbDistrito } from 'src/Models/Distrito';
import { TbBarrios } from 'src/Models/Barrios';
import { DataBarriosService } from 'src/Services/Barrios/barrios.service';
import { DataProveedorService } from 'src/Services/Proveedor/proveedor.service';
@Component({
  selector: 'app-detalle-proveedor',
  templateUrl: './detalle-proveedor.component.html',
  styleUrls: ['./detalle-proveedor.component.css']
})
export class DetalleProveedorComponent implements OnInit {

  constructor(private provinciaService:DataProvinciaService,private cantonService:DataCantonService,
    private distritoService:DataDistritoService,private barrioService:DataBarriosService,
    private tipoidService:DataTipoIdService,private proveedorService:DataProveedorService) { }
  Proveedor= new TbProveedores();
  listaTipoId= new Array();
  listaProvincia=new Array();
  listaCanton=new Array();
  listaDistrito=new Array();
  listaBarrio=new Array();
  Provincia= new TbProvincia();
  Canton= new TbCanton();
  Distrito= new TbDistrito();
  Barrio=new TbBarrios();
  ngOnInit() {
    this.Proveedor.TbPersona=new TbPersona()
    this.Proveedor=this.proveedorService.DetalleProveedor
    this.ConsultarProvincia();
    this.ConsultarCanton();
    this.ConsultarDistrito();
    this.ConsultarBarrio();
    this.ConsultarTiposId();
    
    
  }
 
  ConsultarTiposId() {
    this.tipoidService.getTipoId().subscribe(data=>{
      this.listaTipoId=data
    })
  }
  ConsultarBarrio() {
    this.barrioService.ConsultarTodos().subscribe(data=>{
      this.listaBarrio=data
      for (const barri of this.listaBarrio) {
        if (barri.Provincia.trim()==this.Proveedor.TbPersona.Provincia && barri.Canton.trim()==this.Proveedor.TbPersona.Canton.trim() 
        && barri.Distrito.trim()==this.Proveedor.TbPersona.Distrito.trim() && barri.Barrio.trim()==this.Proveedor.TbPersona.Barrio.trim()) {
          this.Barrio=barri;
        }
      }
    })
  }
  ConsultarDistrito() {
    this.distritoService.ConsultarTodos().subscribe(data=>{
      this.listaDistrito=data
      for (const dis of this.listaDistrito) {
        if (dis.Provincia.trim()==this.Proveedor.TbPersona.Provincia && dis.Canton.trim()==this.Proveedor.TbPersona.Canton.trim() 
        && dis.Distrito.trim()==this.Proveedor.TbPersona.Distrito.trim()) {
          this.Distrito=dis;
        }
      }
    })
  }
  ConsultarCanton() {
    this.cantonService.ConsultarTodos().subscribe(data=>{
      this.listaCanton=data
      for (const can of this.listaCanton) {
        if (can.Provincia.trim()==this.Proveedor.TbPersona.Provincia && can.Canton.trim()==this.Proveedor.TbPersona.Canton.trim()) {
          this.Canton=can;
        }
      }
    })
  }
  ConsultarProvincia() {
    this.provinciaService.consultarTodos().subscribe(data=>{
      this.listaProvincia=data
      for (const pro of this.listaProvincia) {
        if (pro.Cod.trim()==this.Proveedor.TbPersona.Provincia) {
          this.Provincia=pro;
        }
      }
    })
  }
  AsignarLugares() {
    for (const pro of this.listaProvincia) {
      if (pro.Cod.trim()==this.Proveedor.TbPersona.Provincia) {
        this.Provincia=pro;
      }
    }
    for (const can of this.listaCanton) {
      if (can.Provincia.trim()==this.Proveedor.TbPersona.Provincia && can.Canton.trim()==this.Proveedor.TbPersona.Canton.trim()) {
        this.Canton=can;
      }
    }
    for (const dis of this.listaDistrito) {
      if (dis.Provincia.trim()==this.Proveedor.TbPersona.Provincia && dis.Canton.trim()==this.Proveedor.TbPersona.Canton.trim() 
      && dis.Distrito.trim()==this.Proveedor.TbPersona.Distrito.trim()) {
        this.Distrito=dis;
      }
    }
  }

}
