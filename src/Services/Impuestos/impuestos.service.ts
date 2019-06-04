import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceGeneric } from '../ServiceGeneric';
import { TbImpuestos } from 'src/Models/Impuesto';

@Injectable({
  providedIn: 'root'
})
export class ImpuestosService {

  constructor(private http:HttpClient,private serviceGeneric:ServiceGeneric) { }

  get(){
    return this.http.get<TbImpuestos[]>(this.serviceGeneric.getURL()+"/impuestos");
   }

   getById(id){
    return this.http.get<TbImpuestos>(this.serviceGeneric.getURL()+"/impuestos/"+id);
   }

   delete(impuest:TbImpuestos){
    return this.http.delete(this.serviceGeneric.getURL()+"/impuestos/"+impuest.Id);
   }

   put(impuest : TbImpuestos,){
    const headers = new HttpHeaders().set('Content-type','application/Json');
    return this.http.put<TbImpuestos> (this.serviceGeneric.getURL()+'/impuestos/'+impuest.Id,impuest,{headers});
   }
  post(body : TbImpuestos,){
    const headers = new HttpHeaders().set('Content-type','application/Json');
    return this.http.post<TbImpuestos> (this.serviceGeneric.getURL()+'/impuestos',body,{headers});
   }
}
