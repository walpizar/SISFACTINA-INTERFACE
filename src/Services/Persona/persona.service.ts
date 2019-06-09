import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TbPersona } from 'src/Models/Personas';
import { ServiceGeneric } from '../ServiceGeneric';


@Injectable({
  providedIn: 'root'
})
export class DataPersonaService {

  constructor(private http:HttpClient,private serviceGeneric: ServiceGeneric) { }

  getDataID(id:number,tipoId:number){
    
    return this.http.get<TbPersona>(this.serviceGeneric.getURL()+"/persona/"+id);
  }
}
