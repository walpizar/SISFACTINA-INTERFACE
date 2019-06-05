import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceGeneric } from '../ServiceGeneric';
import { TbPersonasTribunalS } from 'src/Models/PersonaTribunal';

@Injectable({
  providedIn: 'root'
})
export class PersonaTribunalService {

  constructor(private http : HttpClient,private serviceGeneric: ServiceGeneric) { }

  ConsultarById(id){
    return this.http.get<TbPersonasTribunalS>(this.serviceGeneric.getURL()+"/personatri/"+id);
  }
}
