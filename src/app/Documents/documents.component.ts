import { Component, OnInit } from '@angular/core';
import {FacturaService} from 'src/Services/Factura/factura.service';
import{Busqueda} from 'src/Models/Busqueda';
import { TbDocumento } from 'src/Models/Documento';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  
  docBusca:Busqueda;

  constructor(private service:FacturaService) {
    this.docBusca=new Busqueda();
   }

  ngOnInit() {
    this.service.getDocuments();
  }

  public DocActual(doc: TbDocumento) {
    this.service.Doc = doc;
    this.service.getDocuments();
  }
  
}
