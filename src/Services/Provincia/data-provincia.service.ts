import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TbProvincia } from 'src/Models/Provincia';
import { ServiceGeneric } from '../ServiceGeneric';


@Injectable({
  providedIn: 'root'
})
export class DataProvinciaService {

  constructor(private http:HttpClient,private serviceGeneric: ServiceGeneric) { }
  consultarTodos(){

    return this.http.get<TbProvincia[]>(this.serviceGeneric.getURL()+"/provincia");
    
  }
}
