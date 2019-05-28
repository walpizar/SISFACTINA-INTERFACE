import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TbTipoVenta } from '../../Models/TipoVenta';
import { ServiceGeneric } from '../ServiceGeneric';

@Injectable({
  providedIn: 'root'
})
export class TipoCompraService {

  constructor(private http:HttpClient, private serviceGeneric: ServiceGeneric) { }

  getListTipoVenta(){
    return this.http.get<TbTipoVenta[]>(this.serviceGeneric.getURL()+"/tipoventa");
   }
}
