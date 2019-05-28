import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TbProducto } from './Models/Producto';


@Injectable({
  providedIn: 'root'
})
export class ProducserviceService {

  constructor(private http:HttpClient) {
    
   }


   get(){
    return this.http.get<TbProducto[]>("http://localhost:63630/api/producto");
   }
   getProductoById(id:number){
    return this.http.get<TbProducto>("http://localhost:63630/api/producto/"+id);
   }

}
