import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TbEmpresa } from './Models/Empresa';
import { post } from 'selenium-webdriver/http';
import { TbParametrosEmpresa } from './Models/ParametrosEmpresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http:HttpClient) { }

  get(){
    return this.http.get<TbEmpresa[]>("http://localhost:63630/api/empresa");
   }

   getById(id){
    return this.http.get<TbParametrosEmpresa>("http://localhost:63630/api/empresa/"+id);
   }

   delete(empre:TbEmpresa){
    return this.http.delete("http://localhost:63630/api/empresa/"+empre.Id);
   }

   put(empre : TbEmpresa,){
    const headers = new HttpHeaders().set('Content-type','application/Json');
    return this.http.put<TbEmpresa> ('http://localhost:63630/api/empresa/'+empre.Id,empre,{headers});
   }
  post(body : TbParametrosEmpresa,){
    const headers = new HttpHeaders().set('Content-type','application/Json');
    return this.http.post<TbParametrosEmpresa> ('http://localhost:63630/api/empresa',body,{headers});
   }


}


