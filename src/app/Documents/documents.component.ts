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
  listaBusq = new Array;
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
    // creo una varible para almacenar el resultado de la busqueda
    // this.ListaDocActules = new Array();
    this.ListaDocActules = this.ListaDocGeneral;

    if (doc.IdCliente != null) {

     this.ListaDocActules= this.ListaDocActules.filter(x => x.IdCliente !=null && x.IdCliente.trim() == doc.IdCliente.trim());
      /*this.listaBusq = new Array;
      for (let doc2 of this.ListaDocActules) {
        // verifico si es el mismo dato
        if (doc2.IdCliente != null) {
          if (doc2.IdCliente.trim() == doc.IdCliente) {
            this.listaBusq.push(doc2);
          }

          this.ListaDocActules= this.ListaDocActules.filter(x => x.IdCliente == doc.IdCliente.trim());
        }
      }
      this.ListaDocActules = this.listaBusq;*/
    }

    if (doc.TipoDocumento != null) {
      // aqui puede devolver mas de uno
     /* for (let doc2 of this.ListaDocActules) {
        // agrego a la lista
        if (doc2.TipoDocumento == doc.TipoDocumento) {
          this.listaBusq.push(doc2);
        }
      }
      this.ListaDocActules = this.listaBusq;*/
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
    
    //retorno 
  }

  reCargar() 
  {
    // reinicia la lista volviedo a llamar todos los datos
    this.documetsAct();
    // referesca el objeto
    this.docBusca = new Busqueda();
    // refresca la lista
    this.listaBusq = new Array();
  }
}
