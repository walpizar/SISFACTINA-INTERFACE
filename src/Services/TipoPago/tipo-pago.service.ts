import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { TbTipoPago } from '../../Models/TipoPago';
import { ServiceGeneric } from '../ServiceGeneric';

@Injectable({
  providedIn: 'root'
})
export class TipoPagoService {

  constructor(private http:HttpClient, private serviceGeneric: ServiceGeneric) { }

  getListTipoPago(){
    return this.http.get<TbTipoPago[]>(this.serviceGeneric.getURL()+"/tipopago");
   }



}
