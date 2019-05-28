import { Component, OnInit } from '@angular/core';
import { DataProvinciaService } from '../data-provincia.service';
import { DataCantonService } from '../data-canton.service';
import { DataDistritoService } from '../data-distrito.service';
import { DataBarriosService } from '../data-barrios.service';
import { DataTipoIdService } from '../data-tipo-id.service';

import { TbPersona } from 'src/Models/Personas';
import { TbProveedores } from 'src/Models/Proveedores';
import { DataProveedorService } from 'src/Services/Proveedor/data-proveedor.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  constructor(private provinciaService:DataProvinciaService,private cantonService:DataCantonService,
   private distritoService:DataDistritoService,private barrioService:DataBarriosService,
   private tipoidService:DataTipoIdService,private proveedorService:DataProveedorService ) { }

   //Listas
  listaTipoId= new Array();
  listaProvincia=new Array();
  listaCanton=new Array();
  listaDistrito=new Array();
  listaBarrio=new Array();
  //Combos
  listaCantonCombo=new Array();
  listaDistritoCombo=new Array();
  listaBarrioCombo=new Array();
  //Variables
  Provincia:string;
  Canton:string;
  Distrito:string;
  Proveedor=new TbProveedores();
  Modificar:boolean;
  BotonCrear:boolean=true;
  BotonModificar:boolean=false;
  EsconderDatosPersonales:boolean=true;
  readonly:boolean=false;
  


  ngOnInit() {
    
    this.Proveedor.TbPersona=new TbPersona();
    this.Modificar=this.proveedorService.Modify;    
    this.ConsultarProvincias();
    this.ConsultarCantones();
    this.ConsultarDistritos();
    this.ConsultarBarrios();
    this.ConsultarTipoId();
    if (this.Modificar) {
      this.readonly=true;
      this.Proveedor=this.proveedorService.Proveedor;
      this.BotonCrear=false;
      this.BotonModificar=true;
      this.Proveedor.TbPersona.Canton.trim();
      console.log(this.Proveedor);
     
     
     this.listaDistritoCombo=this.listaDistritoCombo;
     this.listaBarrioCombo=this.listaBarrio;
    
    }
  }
  ConsultarTipoId() {
    this.tipoidService.ConsultarTodos().subscribe(data=>{
      this.listaTipoId=data;
    })
  }
  ConsultarBarrios() {
    this.barrioService.ConsultarTodos().subscribe(data=>{
      this.listaBarrio=data;
    })
  }
  ConsultarDistritos() {
    this.distritoService.ConsultarTodos().subscribe(data=>{
      this.listaDistrito=data;
    })
  }
  ConsultarCantones() {
    this.cantonService.ConsultarTodos().subscribe(data=>{
      this.listaCanton=data;     
     
    })
  }
  ConsultarProvincias() {
    this.provinciaService.consultarTodos().subscribe(data=>{
      this.listaProvincia=data;
    })
  }
  onChangeProv(codId){
   
      this.listaDistritoCombo=new Array();
    this.listaBarrioCombo=new Array();
    this.Provincia=codId;
    this.ActivaCanton(codId); 
    
  }
  onChangeCanton(CodCant){
    this.listaDistritoCombo=new Array();
    this.listaBarrioCombo=new Array();
    this.Canton=CodCant;
    this.ActivarDistrito(CodCant);
  }
  onChangeDistrito(codDistrit){
    this.listaBarrioCombo=new Array();
    this.Distrito=codDistrit;
    this.ActivaBarrio(codDistrit)
    
  }
 
  ActivaBarrio(codigodis) {
    for (const iterator of this.listaBarrio) {
      if (iterator.Provincia==this.Provincia && iterator.Canton==this.Canton && iterator.Distrito==codigodis) {
        this.listaBarrioCombo.push(iterator);
      } else {
        
      }
    }
  }
  ActivarDistrito(codigoCant:string){
    this.listaDistritoCombo=new Array();
   
    for (const iterator of this.listaDistrito) {
      if (iterator.Canton==codigoCant && iterator.Provincia==this.Provincia) {
        this.listaDistritoCombo.push(iterator);
      } else {
        
      }
    }
    
  }
  
  ActivaCanton(codigo:string){
    try {
      this.listaCantonCombo=new Array();
      for (const iterator of this.listaCanton) {
        if (iterator.Provincia==codigo) {
          this.listaCantonCombo.push(iterator);
          
        }
      }
    } catch (error) {
      
    }
    

      
  }
  CrearProveedor(prove:TbProveedores){
    console.log(prove);
    try {
    
      this.proveedorService.Agregar(prove).subscribe(data=>{})
    this.Proveedor=new TbProveedores();
    this.Proveedor.TbPersona=new TbPersona();
    alert("Se agrego correctamente");
    } catch (error) {
      alert("Ocurrio un error en el Servicio");
    }
    
  }
  ModificarProveedor(pro:TbProveedores){
    try {
      this.proveedorService.Modificar(pro).subscribe(data=>{})
      this.BotonCrear=true;
        this.BotonModificar=false;
        this.readonly=false;
        this.Proveedor=new TbProveedores();
        this.Proveedor.TbPersona= new TbPersona();
        this.proveedorService.Modify=false;
        alert("Se modifico correctamente");
    } catch (error) {
      
    }
   

  }
  Cancelar(){
    try {
      this.BotonCrear=true;
      this.BotonModificar=false;
      this.readonly=false;
      this.Proveedor=new TbProveedores();
      this.Proveedor.TbPersona= new TbPersona();
      this.proveedorService.Modify=false;
    } catch (error) {
      
    }
    
  }
  

}
