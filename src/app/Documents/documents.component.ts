import { Component, OnInit } from '@angular/core';
import { FacturaService } from 'src/Services/Factura/factura.service';
import { Busqueda } from 'src/Models/Busqueda';
import { TbDocumento } from 'src/Models/Documento';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  

  docBusca = new Busqueda();
  // lista con documentos de fecha actual
  ListaDocActules = new Array();
  // lista con doc todos
  ListaDocGeneral = new Array();

  constructor(private service:FacturaService) {
    this.docBusca=new Busqueda();
   }

  ngOnInit() {
    // this.documentGeneral();
    this.documetsAct();
    this.documentGeneral();
  }

  // obtengo doc con fecha actual
  documetsAct(){
    this.service.getDocumentsActules().subscribe(data =>{
      this.ListaDocActules = data;
    })
  }
  // obtengo todos los doc
  documentGeneral(){
    this.service.get().subscribe(data =>{
      this.ListaDocGeneral = data;
    })
  }

  public DocActual(doc: TbDocumento) {
    this.service.Doc = doc;
    this.service.get();
  }

  FiltrarLista(doc: Busqueda): void {

    // asigno datos de todos los documentos
    this.ListaDocActules = this.ListaDocGeneral;

    if (doc.IdCliente != null) {
     this.ListaDocActules= this.ListaDocActules.filter(x => x.IdCliente !=null && x.IdCliente.trim() == doc.IdCliente.trim());
    }
    if (doc.TipoDocumento != null) {
      this.ListaDocActules= this.ListaDocActules.filter(x => x.TipoDocumento !=null && x.TipoDocumento==doc.TipoDocumento);
    }
    if (doc.Id != null) {
      this.ListaDocActules = this.ListaDocActules.filter(x => x.Id != null && x.Id == doc.Id);
    }
    if (doc.Clave != null) {
      this.ListaDocActules = this.ListaDocActules.filter(x => x.Clave != null && x.Clave == doc.Clave);
    }
    if (doc.Consecutivo != null) {
      this.ListaDocActules = this.ListaDocActules.filter(x => x.Consecutivo != null && x.Consecutivo == doc.Consecutivo);
    }
  }

  reCargar() 
  {
    // reinicia la lista volviedo a llamar todos los datos
    this.documetsAct();
    // referesca el objeto
    this.docBusca = new Busqueda();
  }
}
