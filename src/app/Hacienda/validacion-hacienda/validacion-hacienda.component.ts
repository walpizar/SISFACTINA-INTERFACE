import { Component, OnInit } from '@angular/core';
import { FacturaService } from 'src/Services/Factura/factura.service';
import { DataPersonaService } from 'src/Services/Persona/persona.service';
import { TbClientes } from 'src/Models/Cliente';
import { TbPersona } from 'src/Models/Personas';
import { ToastrService } from 'ngx-toastr';
import { Busqueda } from 'src/Models/Busqueda';

@Component({
  selector: 'app-validacion-hacienda',
  templateUrl: './validacion-hacienda.component.html',
  styleUrls: ['./validacion-hacienda.component.css']
})
export class ValidacionHaciendaComponent implements OnInit {

  constructor(private docservice:FacturaService,private personaService:DataPersonaService,private msj:ToastrService) { 
    
  }
  docBusca = new Busqueda();
  listaValidacion= new Array();
  ListaDocGeneral= new Array();
  ngOnInit() {  
    this.ConsultarDocValidacion();
    this.ConsultarTodos()
  }
  ConsultarTodos() {
    this.docservice.get().subscribe(data=>{
      this.ListaDocGeneral=data
    })
  }

  ConsultarDocValidacion() {
  this.docservice.ConsultarValidadosHacienda().subscribe(data=>{
  this.listaValidacion=data;  

},error=>{
this.msj.error("No hay registros");
})
  }

  FiltrarLista(doc: Busqueda): void {

    // asigno datos de todos los documentos    

    if (doc.IdCliente != null) {
     this.listaValidacion= this.ListaDocGeneral.filter(x => x.IdCliente !=null && x.IdCliente.trim() == doc.IdCliente.trim());
    }
    if (doc.TipoDocumento != null) {
      this.listaValidacion= this.ListaDocGeneral.filter(x => x.TipoDocumento !=null && x.TipoDocumento==doc.TipoDocumento);
    }
    if (doc.Id != null) {
      this.listaValidacion = this.ListaDocGeneral.filter(x => x.Id != null && x.Id == doc.Id);
    }
    if (doc.Clave != null) {
      this.listaValidacion = this.ListaDocGeneral.filter(x => x.Clave != null && x.Clave == doc.Clave);
    }
    if (doc.Consecutivo != null) {
      this.listaValidacion = this.ListaDocGeneral.filter(x => x.Consecutivo != null && x.Consecutivo == doc.Consecutivo);
    }
  }

  refrescarListas(){
    this.ConsultarDocValidacion();
    this.ConsultarTodos();
    this.docBusca= new Busqueda();
  }

}
