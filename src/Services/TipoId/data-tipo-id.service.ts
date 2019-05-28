import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { TbTipoId } from './Models/TipoId';

@Injectable({
  providedIn: 'root'
})
export class DataTipoIdService {
  

  constructor(private http:HttpClient) { }

  getTipoId(){
    return this.http.get<TbTipoId[]>("http://localhost:63630/api/tipoid");
  }

}


