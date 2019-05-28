import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TbTipoVenta } from './Models/TipoVenta';

@Injectable({
  providedIn: 'root'
})
export class TipoCompraService {

  constructor(private http:HttpClient) { }

  getListTipoVenta(){
    return this.http.get<TbTipoVenta[]>("http://localhost:63630/api/tipoventa/");
   }
}
