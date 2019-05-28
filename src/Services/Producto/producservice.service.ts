import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TbProducto } from '../../Models/Producto';
import { ServiceGeneric } from '../ServiceGeneric';


@Injectable({
  providedIn: 'root'
})
export class ProducserviceService {

  constructor(private http:HttpClient, private serviceGeneric: ServiceGeneric) {
    
   }


   get(){
    return this.http.get<TbProducto[]>(this.serviceGeneric.getURL()+"/producto");
   }
   getProductoById(id:number){
    return this.http.get<TbProducto>(this.serviceGeneric.getURL()+"/producto/"+id);
   }

}
