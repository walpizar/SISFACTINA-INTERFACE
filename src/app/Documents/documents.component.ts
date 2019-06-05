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
    this.service.get();
  }

  // obtengo doc con fecha actual
  documetsAct(){
    this.service.getDocumentsActules().subscribe(data =>{
      this.ListaDocActules = data;
    })
  }
  // obtengo todos los doc
  documentGeneral(){
    this.service.get().subscribe(data=> {
      this.ListaDocGeneral = data;
    })
  }

  public DocActual(doc: TbDocumento) {
    this.service.Doc = doc;
    this.service.get();
  }

  FiltrarLista(doc: Busqueda): void {
    // creo una varible para almacenar el resultado de la busqueda
    let resultado: any;
    if (doc.Id != 0) {
      resultado = this.service.list.filter(x => x.Id == doc.Id);
      this.service.list = resultado;
      return;
    }
    if ( doc.Clave != null) {
      resultado = this.service.list.filter(x => x.Clave == doc.Clave);
      this.service.list = resultado;
      return;
    }
    if ( doc.Consecutivo != null) {
      resultado = this.service.list.filter(x => x.Consecutivo == doc.Consecutivo);
      this.service.list = resultado;
      return;
    }
    if (doc.IdCliente != null) {
      this.listaBusq = new Array;
      for (let doc2 of this.service.list) {
        // verifico si es el mismo dato
        if (doc2.IdCliente != null) {
          if (doc2.IdCliente.trim() == doc.IdCliente) {
            this.listaBusq.push(doc2);
          }
        }
        
      }
      this.service.list = this.listaBusq;
      return;
    }
    if (doc.TipoDocumento != 0) {
      // aqui puede devolver mas de uno
      for (let doc2 of this.service.list) {
        // agrego a la lista

        if (doc2.TipoDocumento == doc.TipoDocumento) {
          this.listaBusq.push(doc2);
        }
      }
      this.service.list = this.listaBusq;
      return;
    }
  }

  reCargar() 
  {
    // reinicia la lista volviedo a llamar todos los datos
    this.service.getDocumentsActules();
    // referesca el objeto
    this.docBusca = new Busqueda();
    // refresca la lista
    this.listaBusq = new Array();
  }
}
