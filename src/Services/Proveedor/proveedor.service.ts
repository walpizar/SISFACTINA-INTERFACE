import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { TbProveedores } from 'src/Models/Proveedores';
import { ServiceGeneric } from '../ServiceGeneric';

@Injectable({
  providedIn: 'root'
})
export class DataProveedorService {

  constructor(private http : HttpClient,private serviceGeneric: ServiceGeneric) { }
  Proveedor= new TbProveedores();
  DetalleProveedor= new TbProveedores();
  Modify:boolean=false;

  ConsultarById(id){
    
    return this.http.get<TbProveedores>(this.serviceGeneric.getURL()+"/proveedor/"+id)

  }
  ConsultaTodos(){
    
    return this.http.get<TbProveedores[]>(this.serviceGeneric.getURL()+"/proveedor/")
  }
  
  Agregar(body:TbProveedores){
    const headers=new HttpHeaders().set('Content-type','application/Json');
    return this.http.post<boolean>(this.serviceGeneric.getURL()+'/proveedor/',body,{headers})
  }

  Modificar(body:TbProveedores){
    const headers=new HttpHeaders().set('Content-type','application/Json');
    return this.http.put<boolean>(this.serviceGeneric.getURL()+'/proveedor/',body,{headers})
  }
  Eliminar(pro:TbProveedores){
    return this.http.delete<boolean>(this.serviceGeneric.getURL()+"/proveedor/"+pro.Id+"/"+pro.TipoId)
  }
  RecibeDatos(prove:TbProveedores){
    this.Proveedor=prove;
    this.Modify=true;
    
  }
  RecibeDatoDetalle(proved:TbProveedores){
    this.DetalleProveedor=proved;
  }

  
    
    
  
}
