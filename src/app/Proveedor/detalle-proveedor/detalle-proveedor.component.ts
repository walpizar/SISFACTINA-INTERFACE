import { Component, OnInit } from '@angular/core';
import { DataProvinciaService } from '../data-provincia.service';
import { DataCantonService } from '../data-canton.service';
import { DataDistritoService } from '../data-distrito.service';
import { DataBarriosService } from '../data-barrios.service';
import { DataTipoIdService } from '../data-tipo-id.service';
import { DataProveedorService } from 'src/Services/Proveedor/data-proveedor.service';
import { Provincia } from '../Models/Provincia';
import { Canton } from '../Models/Canton';
import { Distrito } from '../Models/Distrito';
import { Barrio } from '../Models/Barrios';
import { TbPersona } from 'src/Models/Personas';
import { TbProveedores } from 'src/Models/Proveedores';
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
  Provincia= new Provincia();
  Canton= new Canton();
  Distrito= new Distrito();
  Barrio=new Barrio();
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
    this.tipoidService.ConsultarTodos().subscribe(data=>{
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
