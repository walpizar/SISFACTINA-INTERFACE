import { Component, OnInit } from '@angular/core';
import { TbEmpresa } from '../../Models/Empresa';
import { EmpresaService } from '../../Services/Empresas/empresa.service';
import { TbPersona } from '../../Models/Personas';
import { TbParametrosEmpresa } from '../../Models/ParametrosEmpresa';

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
  ListEmpre: Array<TbEmpresa> = new Array();


  constructor(private empresaService: EmpresaService) { 

    this.consultarTodos();

  }

  ngOnInit() {
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
    this.Empresa.TipoId = 1
    this.Persona.Identificacion = this.Empresa.Id;
    this.Persona.TipoId = 1;
    this.Persona.Nombre = this.Empresa.NombreComercial;
    this.Persona.Telefono = 0;
    this.Persona.CodigoPaisTel = "506"
    this.ParametrosEmpresa.IdEmpresa = this.Empresa.Id;
    this.ParametrosEmpresa.IdTipoEmpresa = this.Empresa.TipoId;
    this.ParametrosEmpresa.ManejaInventario = this.inventario;
    this.ParametrosEmpresa.FacturacionElectronica = this.factura;
    this.Empresa.TbPersona = this.Persona;
    this.ParametrosEmpresa.IdNavigation = this.Empresa;

    if(this.modifica){
      this.empresaService.put(this.Empresa).subscribe(data =>{
        if(data){
          alert("Se modificó con exito");
        }
        else{
          alert("No se pudo modificar");
        }
      })
      this.modifica = false;
    }
    else{

      this.empresaService.post(this.ParametrosEmpresa).subscribe(data=>{
        if(data){
          alert("Se agregó la empresa");
        }
        else{
          alert("No se pudo agregar la empresa");
        }
  
      })

    }

    this.cancelar();
    this.consultarTodos();

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
          //this.inventario = data.ManejaInventario;
          //this.factura = data.FacturacionElectronica;
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
        
      }
    }
    this.consultarTodos();
  }


}
