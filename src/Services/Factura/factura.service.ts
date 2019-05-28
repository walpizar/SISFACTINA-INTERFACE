import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TbDocumento } from '../../Models/Documento';
import { Observable } from 'rxjs';
import { ServiceGeneric } from '../ServiceGeneric';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http:HttpClient, private serviceGeneric: ServiceGeneric) {

   }

   getInventarioById(id){
    return this.http.get<TbDocumento>(this.serviceGeneric.getURL()+"/documento"+id);
   }

   get(){
    return this.http.get<TbDocumento[]>(this.serviceGeneric.getURL()+"/documento");
   }

   post(body : TbDocumento,){
    const headers = new HttpHeaders().set('Content-type','application/Json');
    return this.http.post<TbDocumento> (this.serviceGeneric.getURL()+'/documento',body,{headers});
   }
   
}

