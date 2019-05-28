import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { TbClientes } from '../../Models/Cliente';
import { ServiceGeneric } from '../ServiceGeneric';
@Injectable({
  providedIn: 'root'
})
export class DataClienteService {

  constructor(private http:HttpClient,private servicioGeneric: ServiceGeneric ) { }

  consultarCliente(idCli:string,idTipo:number) {
    return this.http.get<TbClientes>(this.servicioGeneric.getURL()+'/facturador/cliente/'+idCli+'/'+idTipo);
  }
}
