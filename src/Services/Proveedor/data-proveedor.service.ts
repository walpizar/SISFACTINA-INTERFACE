import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { TbProveedores } from 'src/Models/Proveedores';

@Injectable({
  providedIn: 'root'
})
export class DataProveedorService {

  constructor(private http : HttpClient) { }
  Proveedor= new TbProveedores();
  DetalleProveedor= new TbProveedores();
  Modify:boolean=false;

  ConsultarById(id){
    
    return this.http.get<TbProveedores>("http://localhost:63630/api/proveedor/"+id)

  }
  ConsultaTodos(){
    
    return this.http.get<TbProveedores[]>("http://localhost:63630/api/proveedor")
  }
  
  Agregar(body:TbProveedores){
    const headers=new HttpHeaders().set('Content-type','application/Json');
    return this.http.post<TbProveedores>('http://localhost:63630/api/proveedor',body,{headers})
  }

  Modificar(body:TbProveedores){
    const headers=new HttpHeaders().set('Content-type','application/Json');
    return this.http.put<string>('http://localhost:63630/api/proveedor',body,{headers})
  }
  Eliminar(pro:TbProveedores){
    return this.http.delete("http://localhost:63630/api/proveedor/"+pro.Id+"/"+pro.TipoId)
  }
  RecibeDatos(prove:TbProveedores){
    this.Proveedor=prove;
    this.Modify=true;
    
  }
  RecibeDatoDetalle(proved:TbProveedores){
    this.DetalleProveedor=proved;
  }

  
    
    
  
}
