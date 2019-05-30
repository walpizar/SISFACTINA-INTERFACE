import { Component, OnInit } from '@angular/core';
import { TbEmpresa } from '../../Models/Empresa';
import { EmpresaService } from '../../Services/Empresas/empresa.service';
import { TbPersona } from '../../Models/Personas';
import { TbParametrosEmpresa } from '../../Models/ParametrosEmpresa';
import { ParametrosService } from 'src/Services/ParametrosEmpresa/parametros.service';
import { DataTipoIdService } from 'src/Services/TipoId/tipo-id.service';
import { TbTipoId } from 'src/Models/TipoId';

@Component({
  selector: 'app-lista-empresa',
  templateUrl: './lista-empresa.component.html',
  styleUrls: ['./lista-empresa.component.css']
})
export class ListaEmpresaComponent implements OnInit {
  
  modifica:boolean = false;
  bandera: boolean = false;
  show: boolean = false;
  inventario: boolean = false;
  factura: boolean = false;
  Empresa: TbEmpresa = new TbEmpresa();
  Persona: TbPersona  = new TbPersona();
  ParametrosEmpresa: TbParametrosEmpresa = new TbParametrosEmpresa();
  ListaParametrosEmpre : Array<TbParametrosEmpresa> = new Array(); 
  ListEmpre: Array<TbEmpresa> = new Array();
  listaTipoId:Array<TbTipoId>; 
  tipoId:number = 2;



  constructor(private empresaService: EmpresaService,private tipoIdService:DataTipoIdService) { 
    this.consultarTodos();
    this.obtenerListaTipoId();

  }

  ngOnInit() {
  }

  obtenerListaTipoId() {
    this.tipoIdService.getTipoId().subscribe(data=>{

      this.listaTipoId=data;
    })
  }



  formulario(){

    this.show = true;
    this.bandera = true ;

  }

  cancelar(){
    this.show = false;
    this.Empresa.Id = null;
    this.Empresa.NombreComercial = null;
    this.Empresa.CorreoElectronicoEmpresa = null
    this.inventario = false;
    this.factura =false;
    this.bandera = false;

  }

  agregar(){
    if(this.modifica){
      for(let i=0; this.ListEmpre.length>i; i++){
        if(this.ListEmpre[i].Id==this.Empresa.Id){
          this.ListEmpre.splice(i,1)
         }
        }
    }
    else{

    }
    this.Empresa.TipoId = this.tipoId;
    this.Persona.Identificacion = this.Empresa.Id;
    this.Persona.TipoId = this.tipoId;
    this.Persona.Nombre = this.Empresa.NombreComercial;
    this.Persona.Telefono = 0;
    this.Persona.CodigoPaisTel = "506";
    this.ParametrosEmpresa.IdEmpresa = this.Empresa.Id;
    this.ParametrosEmpresa.IdTipoEmpresa = this.Empresa.TipoId;
    this.ParametrosEmpresa.ManejaInventario = this.inventario;
    this.ParametrosEmpresa.FacturacionElectronica = this.factura;
    this.ListaParametrosEmpre.push(this.ParametrosEmpresa);
    this.Empresa.TbPersona = this.Persona;
    this.Empresa.TbParametrosEmpresa = this.ListaParametrosEmpre;
    this.ListaParametrosEmpre = new Array();
    this.ListEmpre.push(this.Empresa);
    

    if(this.modifica){
      this.empresaService.put(this.Empresa).subscribe(data =>{
        if(data){
          alert("Se modificó con exito");
          this.show = false;
          this.bandera = false;
        }
        else{
          alert("No se pudo modificar");
        }
      })
      this.modifica = false;
    }
    else{

      this.empresaService.post(this.Empresa).subscribe(data=>{
        if(data){
          alert("Se agregó la empresa");
          this.show = false;
          this.bandera = false;
        }
        else{
          alert("No se pudo agregar la empresa");
        }
  
      })

    }
    this.Empresa = new TbEmpresa();
  }

  modificar(Id){
    this.bandera = true;
    this.show = true;
    this.modifica = true;
    this.empresaService.getById(Id).subscribe(data =>{
      for (let i = 0; i < this.ListEmpre.length; i++) {
        if(this.ListEmpre[i].Id == Id){
          this.Empresa.Id = this.ListEmpre[i].Id;
          this.Empresa.NombreComercial = this.ListEmpre[i].NombreComercial;
          this.Empresa.CorreoElectronicoEmpresa = this.ListEmpre[i].CorreoElectronicoEmpresa;
        }
      }
    })
    
  }

  consultarTodos(){
    this.ListEmpre = null;
    this.empresaService.get().subscribe(data=>{
      this.ListEmpre=data;
    })
  }

  eliminar(Id){

    for (let i = 0; i < this.ListEmpre.length; i++) {
      if(this.ListEmpre[i].Id == Id){
        this.empresaService.delete(this.ListEmpre[i]).subscribe(data=>{
          if(data){
            alert("Se eliminó con exito");
          }
          else{
            alert("No se pudo eliminar");
          }
          
        })
        this.ListEmpre.splice(i,1);
      }
    }
  }


}
