import { Injectable } from '@angular/core';
import { ServiceGeneric } from '../ServiceGeneric';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TbSucursales } from 'src/Models/Sucursales';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(private http:HttpClient, private serviceGeneric: ServiceGeneric) { }

  public Doc: TbSucursales;
  list: TbSucursales[];

  get(id,tipoId){
    return this.http.get<Array<TbSucursales>>(this.serviceGeneric.getURL()+"/sucursales/"+id+'/'+tipoId);
  }

  post(body : Array<object>){
    alert("hola")
    const headers = new HttpHeaders().set('Content-type','application/Json');
    return this.http.post<TbSucursales> (this.serviceGeneric.getURL()+'/sucursales',body,{headers});
  }

  delete(id, tipoId, idEmpresa){
    return this.http.delete<TbSucursales>(this.serviceGeneric.getURL()+"/sucursales/"+id+'/'+tipoId+'/'+idEmpresa);
   }
}
