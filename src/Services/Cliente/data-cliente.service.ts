import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { TbClientes } from './Models/Cliente';
@Injectable({
  providedIn: 'root'
})
export class DataClienteService {

  constructor(private http:HttpClient) { }

  consultarCliente(idCli:string,idTipo:number) {
    return this.http.get<TbClientes>('http://localhost:63630/api/facturador/cliente/'+idCli+'/'+idTipo);
  }
}
