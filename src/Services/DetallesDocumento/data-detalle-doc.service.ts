import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TbDocumento } from 'src/Models/Documento';
import { TbDetalleDocumento } from 'src/Models/DetalleDocumento';
import { ServiceGeneric } from '../ServiceGeneric';


@Injectable({
  providedIn: 'root'
})
export class DataDetalleDocService {

  Detalles= new TbDocumento();
  constructor(private http:HttpClient,private serviceGeneric: ServiceGeneric) { }


  ConsultarDetalles(id:number){
   
    return this.http.get<TbDetalleDocumento[]>(this.serviceGeneric.getURL()+"/detalle/"+id);
  }
  recibirDetalles(DocumentoDetalle:TbDocumento){
      this.Detalles=DocumentoDetalle;
  }
}
