import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TbDocumento } from './Models/Documento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http:HttpClient) {

   }

   getInventarioById(id){
    return this.http.get<TbDocumento>("http://localhost:63630/api/documento"+id);
   }

   get(){
    return this.http.get<TbDocumento[]>("http://localhost:63630/api/documento");
   }

   post(body : TbDocumento,){
    const headers = new HttpHeaders().set('Content-type','application/Json');
    return this.http.post<TbDocumento> ('http://localhost:63630/api/documento',body,{headers});
   }
   
}

