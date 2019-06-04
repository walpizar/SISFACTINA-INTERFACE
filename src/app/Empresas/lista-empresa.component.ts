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
  Empresa: TbEmpresa = new TbEmpresa();
  Persona: TbPersona  = new TbPersona();
  ParametrosEmpresa: TbParametrosEmpresa = new TbParametrosEmpresa();
  ListaParametrosEmpre : Array<TbParametrosEmpresa> = new Array(); 
  ListEmpre: Array<TbEmpresa> = new Array();
  listaTipoId:Array<TbTipoId>;
  tipoId: number = 1;
  PrecioBase: number = 1;




  constructor(private empresaService: EmpresaService,private tipoIdService:DataTipoIdService,private parametrosEmpreService: ParametrosService) { 
    this.consultarTodos();
    this.obtenerListaTipoId();

  }

  ngOnInit() {
  }


  obtenerListaTipoId() {
    this.tipoIdService.getTipoId().subscribe(data=>{
      this.listaTipoId=data;
    });
  }



  formulario(){

    this.bandera = true;

  }

  cancelar(){

    if(this.modifica){
      this.ListEmpre.push(this.Empresa);
    }
    this.bandera = false;
    this.modifica = false;
    this.Empresa = new TbEmpresa();
    this.ParametrosEmpresa = new TbParametrosEmpresa();
    this.Persona = new TbPersona();
  }

  confirmar(empresa){
    this.Persona.Nombre = empresa.nombreComercial;
    this.Persona.Identificacion = empresa.Id;
    this.Persona.TipoId = this.tipoId;
    empresa.TipoId = 1;
    empresa.TbPersona = this.Persona;
    this.ListaParametrosEmpre[0] = this.ParametrosEmpresa;
    empresa.TbParametrosEmpresa = this.ListaParametrosEmpre;
    if (this.modifica) {
      this.empresaService.put(empresa).subscribe(data =>{
        if (data) {
          alert("Se modificó con exito");
          this.ListEmpre.push(empresa);
        }
        else{
          alert("No se pudo modificar");
        }
      });
      this.modifica = false;
    }
    else{
      this.Persona.Telefono = 0;
      this.Persona.CodigoPaisTel = "506";
      this.empresaService.post(empresa).subscribe(data =>{
        if (data) {
          alert("Se agregó correctamente");
          this.ListEmpre.push(empresa);
        }
        else{
          alert("No se pudo agregar");
        }
      });
    }
    this.bandera = false;
    this.Empresa = new TbEmpresa();
    this.ParametrosEmpresa = new TbParametrosEmpresa();
    this.Persona = new TbPersona();
  }

  modificar(Id){
      this.parametrosEmpreService.getById(Id).subscribe(data =>{
        this.ParametrosEmpresa = data;
        for (let i = 0; i < this.ListEmpre.length; i++) {
          if (this.ListEmpre[i].Id == Id) {
            this.Empresa = this.ListEmpre[i];
            this.Persona=this.Empresa.TbPersona;
            this.Empresa.TbParametrosEmpresa[0] = this.ParametrosEmpresa;
            this.modifica = true;
            this.bandera = true;
            console.log(this.Empresa);
            this.ListEmpre.splice(i,1);
          }
        }
      });
  }

  consultarTodos(){
    this.empresaService.get().subscribe(data=>{
    this.ListEmpre=data;
    })
  }

  eliminar(Id){
    for (let i = 0; i < this.ListEmpre.length; i++) {
      if (this.ListEmpre[i].Id == Id) {
        this.empresaService.delete(this.ListEmpre[i]).subscribe(data =>{
          if (data) {
            alert("Se eliminó con exito");
            this.ListEmpre.splice(i,1);
          }
          else{
            alert("No se ha podido eliminar");
          }
        });
      }
    }
  }
}
