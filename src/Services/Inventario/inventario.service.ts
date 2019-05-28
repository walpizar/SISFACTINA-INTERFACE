import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TbInventario } from './Models/Inventario';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http:HttpClient) { }

  getInventarioById(id){
    return this.http.get<TbInventario>("http://localhost:63630/api/inventario"+id);
   }

   get(){
    return this.http.get<TbInventario[]>("http://localhost:63630/api/inventario");
   }
   put(body : TbInventario,){
    const headers = new HttpHeaders().set('Content-type','application/Json');
    return this.http.put<TbInventario> ('http://localhost:63630/api/inventario',body,{headers});
   }
   delete(id){
    return this.http.delete<TbInventario>("http://localhost:63630/api/inventario/"+id);
   }
}
