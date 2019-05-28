import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TbEmpresa } from '../../Models/Empresa';
import { post } from 'selenium-webdriver/http';
import { TbParametrosEmpresa } from '../../Models/ParametrosEmpresa';
import { ServiceGeneric } from '../ServiceGeneric';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http:HttpClient, private serviceGeneric: ServiceGeneric) { }

  get(){
    return this.http.get<TbEmpresa[]>(this.serviceGeneric.getURL()+"empresa");
   }

   getById(id){
    return this.http.get<TbParametrosEmpresa>(this.serviceGeneric.getURL()+"empresa/"+id);
   }

   delete(empre:TbEmpresa){
    return this.http.delete(this.serviceGeneric.getURL()+"empresa/"+empre.Id);
   }

   put(empre : TbEmpresa,){
    const headers = new HttpHeaders().set('Content-type','application/Json');
    return this.http.put<TbEmpresa> (this.serviceGeneric.getURL()+'empresa/'+empre.Id,empre,{headers});
   }
  post(body : TbParametrosEmpresa,){
    const headers = new HttpHeaders().set('Content-type','application/Json');
    return this.http.post<TbParametrosEmpresa> (this.serviceGeneric.getURL()+'empresa',body,{headers});
   }


}


