import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceGeneric } from '../ServiceGeneric';
import { TbCategoriaProducto } from 'src/Models/CategoriaProducto';

@Injectable({
  providedIn: 'root'
})
export class CategoriaProductoService {

  constructor(private http:HttpClient,private serviceGeneric:ServiceGeneric) { }

  CategoriaModify:TbCategoriaProducto;
  CategoriaDetalle:TbCategoriaProducto;
  Modify:boolean=false;

  GetById(id){
    
    return this.http.get<TbCategoriaProducto>(this.serviceGeneric.getURL()+"/categoriaproducto/"+id)
  }
  Get(){
    
    return this.http.get<TbCategoriaProducto[]>(this.serviceGeneric.getURL()+"/categoriaproducto/")
  }
  
  Post(body:TbCategoriaProducto){
    const headers=new HttpHeaders().set('Content-type','application/Json');
    return this.http.post<boolean>(this.serviceGeneric.getURL()+'/categoriaproducto/',body,{headers})
  }

  Put(body:TbCategoriaProducto){
    const headers=new HttpHeaders().set('Content-type','application/Json');
    return this.http.put<boolean>(this.serviceGeneric.getURL()+'/categoriaproducto/',body,{headers})
  }
  Delete(body:TbCategoriaProducto){
    console.log(body);    
    return this.http.delete<boolean>(this.serviceGeneric.getURL()+'/categoriaproducto/'+body.Id)
  }
 RecibeDatosComponeteModificar(catproductModify:TbCategoriaProducto){
   this.CategoriaModify=catproductModify;
   this.Modify=true;
 }
 RecibeDatosComponeteDetalle(catproductDetails:TbCategoriaProducto){
  this.CategoriaDetalle=catproductDetails;
 }

}
