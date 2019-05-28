import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TbParametrosEmpresa } from './Models/ParametrosEmpresa';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  constructor(private http:HttpClient) { }

  getById(id){
    return this.http.get<TbParametrosEmpresa>("http://localhost:63630/api/empresa/"+id);
   }



}
