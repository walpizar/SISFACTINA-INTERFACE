import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { TbTipoPago } from './Models/TipoPago';

@Injectable({
  providedIn: 'root'
})
export class TipoPagoService {

  constructor(private http:HttpClient) { }

  getListTipoPago(){
    return this.http.get<TbTipoPago[]>("http://localhost:63630/api/tipopago/");
   }



}
