import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TbInventario } from '../../Models/Inventario';
import { ServiceGeneric } from '../ServiceGeneric';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http:HttpClient,private serviceGeneric: ServiceGeneric) { }

  getInventarioById(id){
    return this.http.get<TbInventario>(this.serviceGeneric.getURL()+"/inventario"+id);
   }

   get(){
    return this.http.get<TbInventario[]>(this.serviceGeneric.getURL()+"/inventario");
   }
   put(body : TbInventario,){
    const headers = new HttpHeaders().set('Content-type','application/Json');
    return this.http.put<TbInventario> (this.serviceGeneric.getURL()+'/inventario',body,{headers});
   }
   delete(id){
    return this.http.delete<TbInventario>(this.serviceGeneric.getURL()+"/inventario/"+id);
   }
}
