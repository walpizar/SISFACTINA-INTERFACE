import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { TbTipoId } from '../../Models/TipoId';
import { ServiceGeneric } from '../ServiceGeneric';

@Injectable({
  providedIn: 'root'
})
export class DataTipoIdService {
  

  constructor(private http:HttpClient, private serviceGeneric: ServiceGeneric) { }

  getTipoId(){
    return this.http.get<TbTipoId[]>(this.serviceGeneric.getURL()+"/tipoid");
  }

}


