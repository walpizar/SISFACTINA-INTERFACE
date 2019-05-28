import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TbBarrios } from 'src/Models/Barrios';
import { ServiceGeneric } from '../ServiceGeneric';


@Injectable({
  providedIn: 'root'
})
export class DataBarriosService {

  constructor(private http:HttpClient, private serviceGeneric: ServiceGeneric) { }
  ConsultarTodos(){
    return this.http.get<TbBarrios[]>(this.serviceGeneric.getURL()+"/barrio")
  }
}
