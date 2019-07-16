import { Injectable } from '@angular/core';
import { ServiceGeneric } from '../ServiceGeneric';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TbCajas } from 'src/Models/Cajas';

@Injectable({
  providedIn: 'root'
})
export class CajasService {

  constructor(private http:HttpClient, private serviceGeneric: ServiceGeneric) { }

  get(){
    return this.http.get<TbCajas[]>(this.serviceGeneric.getURL()+"/cajas");
   }

   getById(id){
    return this.http.get<TbCajas>(this.serviceGeneric.getURL()+"/cajas/"+id);
   }

   delete(cajas:TbCajas){
    return this.http.delete(this.serviceGeneric.getURL()+"/cajas/"+cajas.Id);
   }

   put(cajas : TbCajas,){
    const headers = new HttpHeaders().set('Content-type','application/Json');
    return this.http.put<TbCajas> (this.serviceGeneric.getURL()+'/cajas/'+cajas.Id,cajas,{headers});
   }
  post(body : TbCajas,){
    const headers = new HttpHeaders().set('Content-type','application/Json');
    return this.http.post<TbCajas> (this.serviceGeneric.getURL()+'/cajas',body,{headers});
   }
}
