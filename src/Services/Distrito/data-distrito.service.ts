import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TbDistrito } from 'src/Models/Distrito';
import { ServiceGeneric } from '../ServiceGeneric';


@Injectable({
  providedIn: 'root'
})
export class DataDistritoService {

  constructor(private http:HttpClient,private serviceGeneric: ServiceGeneric) { }

  ConsultarTodos(){
    return this.http.get<TbDistrito[]>(this.serviceGeneric.getURL()+"/distrito")
  }
}
