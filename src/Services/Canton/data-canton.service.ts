import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TbCanton } from 'src/Models/Canton';
import { ServiceGeneric } from '../ServiceGeneric';

@Injectable({
  providedIn: 'root'
})
export class DataCantonService {

  constructor(private http:HttpClient,private serviceGeneric: ServiceGeneric) { }

  ConsultarTodos(){
    return this.http.get<TbCanton[]>(this.serviceGeneric.getURL()+"/canton")
  }
}
