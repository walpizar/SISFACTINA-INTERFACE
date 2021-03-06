import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ServiceGeneric } from '../ServiceGeneric';
import { TbParametrosEmpresa } from 'src/Models/ParametrosEmpresa';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  constructor(private http:HttpClient, private serviceGeneric: ServiceGeneric) { }

  getById(id){
    return this.http.get<TbParametrosEmpresa>(this.serviceGeneric.getURL()+"/parametrosEmpresa/"+id);
   }

}
